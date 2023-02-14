import { trackApplicationError } from 'lib/ErrorTrackingBoundary';
import { AxiosService } from 'lib/services/axios.service';
import {
  qErrorLogs,
  qLogs,
} from 'lib/shared-domain/questionnaire/application/log';
import { MarketingParamsService } from '../application/marketingParamsService';

const BASE_URL = process.env.NEXT_PUBLIC_SALESFORCE_API_BASE_URL;
const unformattedParams =
  process.env.NEXT_PUBLIC_MARKETING_QUERY_PARAMS?.split(',') || [];

const endpoints = {
  getSectionsAndIndustries: 'overview',
  submitContactForm: 'contact',
  createOrUpdateLeadEntry: 'lead_entries',
  getLeadEntry: (id: string) => 'lead_entries/' + id,
  getLeadEntryScore: (id: string) => 'lead_entries/' + id + '/score',
};

const requestsConfig = {
  baseURL: BASE_URL,
};

export class SalesforceFacade {
  constructor(private httpService = new AxiosService()) {}

  async createOrUpdateLeadEntry(
    uniqueId: string,
    fields: Record<string, any>,
    industryId: string,
    sectorId: string,
    industrySheetName: string,
    sectorSheetName: string,
  ): Promise<void> {
    try {
      const marketingParams = MarketingParamsService.retrieve();
      const cookies = MarketingParamsService.getCookies();

      let keyMap = {
        [unformattedParams[0]]: 'UTMSource__c',
        [unformattedParams[1]]: 'UTMMedium__c',
        [unformattedParams[2]]: 'UTMCampaign__c',
        [unformattedParams[3]]: 'UTM_ID__c',
        [unformattedParams[4]]: 'UTM_Source_Platform__c',
        [unformattedParams[5]]: 'UTMTerm__c',
        [unformattedParams[6]]: 'UTM_Content__c',
      };
      const formattedMarketingParams = Object.keys(marketingParams).reduce(
        (acc, key) => {
          const newKey = keyMap[key] || key;
          acc[newKey] = marketingParams[key];
          return acc;
        },
        {},
      );

      const params = {
        lead_entry: {
          unique_id: uniqueId,
          data: {
            ...fields,
            ...formattedMarketingParams,
            ...cookies,
            industry_id: industryId,
            sector_id: sectorId,
            industry_sheet_name: industrySheetName,
            sector_sheet_name: sectorSheetName,
          },
        },
      };

      qLogs(
        'SalesforceFacade.createOrUpdateLeadEntry ' + JSON.stringify(fields),
      );
      qLogs(marketingParams); //console.log

      await this.httpService.post(
        endpoints.createOrUpdateLeadEntry,
        params,
        requestsConfig,
      );
    } catch (e) {
      qErrorLogs('ERRORsetAnswer => updating to' + JSON.stringify(e));
      trackApplicationError('createOrUpdateLeadEntry', e);

      throw new Error(e);
    }
  }

  async getLeadEntry(uniqueId: string): Promise<Record<string, any>> {
    try {
      const response = await this.httpService.get(
        endpoints.getLeadEntry(uniqueId),
        requestsConfig,
      );
      return response.data.data;
    } catch (e) {
      trackApplicationError('getLeadEntry', e);
    }
  }

  async getLeadEntryScore(uniqueId: string) {
    try {
      const response = await this.httpService.get(
        endpoints.getLeadEntryScore(uniqueId),
        requestsConfig,
      );

      return {
        points: response.data.company,
        percentage: response.data.comparison,
        calendly: response.data.calendly,
        avg: response.data.avg,
      };
    } catch (e) {
      trackApplicationError('getLeadEntryScore', e);
    }
  }

  async submitContactForm(contact: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    message: string;
  }): Promise<void> {
    try {
      const marketingParams = MarketingParamsService.retrieve();
      const cookies = MarketingParamsService.getCookies();

      let keyMap = {
        [unformattedParams[0]]: 'UTMSource__c',
        [unformattedParams[1]]: 'UTMMedium__c',
        [unformattedParams[2]]: 'UTMCampaign__c',
        [unformattedParams[3]]: 'UTM_ID__c',
        [unformattedParams[4]]: 'UTM_Source_Platform__c',
        [unformattedParams[5]]: 'UTMTerm__c',
        [unformattedParams[6]]: 'UTM_Content__c',
      };
      const formattedMarketingParams = Object.keys(marketingParams).reduce(
        (acc, key) => {
          const newKey = keyMap[key] || key;
          acc[newKey] = marketingParams[key];
          return acc;
        },
        {},
      );

      await this.httpService.post(
        endpoints.submitContactForm,
        {
          contact: {
            ...formattedMarketingParams,
            ...cookies,
            email: contact.email,
            phone: contact.phone,
            first_name: contact.firstName,
            last_name: contact.lastName,
            company: contact.firstName + ' ' + contact.lastName,
            message: contact.message,
          },
        },
        requestsConfig,
      );
    } catch (e) {
      throw new Error(e);
    }
  }
}
