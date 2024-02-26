import { AxiosService } from 'lib/services/axios.service';
import { MarketingParamsService } from '../application/marketingParamsService';
import { logError } from 'lib/logError';

const BASE_URL = process.env.NEXT_PUBLIC_SALESFORCE_API_BASE_URL;
const unformattedParams =
  process.env.NEXT_PUBLIC_MARKETING_QUERY_PARAMS?.split(',') || [];

const endpoints = {
  getSectionsAndIndustries: 'overview',
  submitContactForm: 'contact',
  createOrUpdateLeadEntry: 'lead_entries',
  createOrUpdateHistory: (id: string) => '/lead_entries/'+ id + '/lead_history',
  getLeadEntry: (id: string) => 'lead_entries/' + id,
  getLeadEntryScore: (id: string) => 'lead_entries/' + id + '/score',
};

const requestsConfig = {
  baseURL: BASE_URL,
};

export class SalesforceFacade {
  constructor(private httpService = new AxiosService()) {}

  async createLeadHistory(
      uniqueId: string,
  ): Promise<void> {
    try {
      const marketingParams = MarketingParamsService.retrieve();
      const cookies = MarketingParamsService.getCookies();
      const deviceInfo = MarketingParamsService.collectDeviceInfo();

      const keyMap = {
        [unformattedParams[0]]: 'UTMSource__c',
        [unformattedParams[1]]: 'UTMMedium__c',
        [unformattedParams[2]]: 'UTMCampaign__c',
        [unformattedParams[3]]: 'UTM_ID__c',
        [unformattedParams[4]]: 'UTM_Source_Platform__c',
        [unformattedParams[5]]: 'UTMTerm__c',
        [unformattedParams[6]]: 'UTM_Content__c',
        [unformattedParams[7]]: 'gclid__c',
        [unformattedParams[8]]: 'fbclid__c',
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
            ...formattedMarketingParams,
            ...cookies,
            ...deviceInfo,
          }
        },
      };


      await this.httpService.post(
          endpoints.createOrUpdateHistory(uniqueId),
          params,
          requestsConfig,
      );
    } catch (e) {
      logError(e, { where: 'createLeadHistory' });

      throw new Error(e);
    }
  }

  async createOrUpdateLeadEntry(
    uniqueId: string,
    currentProgress: number,
    fields: Record<string, any>,
    industryId: string,
    sectorId: string,
    industrySheetName: string,
    sectorSheetName: string,
    assessmentPurpose: string,
    leadSourceURL: string,
    currentQuestionNumber: string,
    currentField: string,
    currencyAnswers: Record<string, any>,
  ): Promise<void> {
    try {
      const marketingParams = MarketingParamsService.retrieve();
      const cookies = MarketingParamsService.getCookies();
      const deviceInfo = MarketingParamsService.collectDeviceInfo();

      const keyMap = {
        [unformattedParams[0]]: 'UTMSource__c',
        [unformattedParams[1]]: 'UTMMedium__c',
        [unformattedParams[2]]: 'UTMCampaign__c',
        [unformattedParams[3]]: 'UTM_ID__c',
        [unformattedParams[4]]: 'UTM_Source_Platform__c',
        [unformattedParams[5]]: 'UTMTerm__c',
        [unformattedParams[6]]: 'UTM_Content__c',
        [unformattedParams[7]]: 'gclid__c',
        [unformattedParams[8]]: 'fbclid__c',
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
            Lead_Source_URL__c: leadSourceURL,
            Assessment_Purpose__c: assessmentPurpose,
            ...fields,
            ...formattedMarketingParams,
            ...cookies,
            ...currencyAnswers,
            industry_id: industryId,
            sector_id: sectorId,
            industry_sheet_name: industrySheetName,
            sector_sheet_name: sectorSheetName,
            ...deviceInfo,

          },
          dropped_at: {
            field: currentField,
            progress: currentQuestionNumber,
          },
        },
      };


      await this.httpService.post(
        endpoints.createOrUpdateLeadEntry,
        params,
        requestsConfig,
      );
    } catch (e) {
      logError(e, { where: 'createOrUpdateLeadEntry' });

      throw new Error(e);
    }
  }

  async leadDetailsSubmission(
    uniqueId: string,
    fields: Record<string, any>,
  ): Promise<void> {
    try {
      const leadParams = {
        lead_entry: {
          email: fields.email,
          last_name: fields.LastName,
          phone: fields.phone,
        },
      };

      await this.httpService.put(
        `lead_entries/${uniqueId}/salesforce`,
        leadParams,
        requestsConfig,
      );
    } catch (e) {
      logError(e, { where: 'leadDetailsSubmission' });
      return e;
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
      logError(e, { where: 'getLeadEntry' });
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
      logError(e, { where: 'getLeadEntryScore' });
      return e;
    }
  }

  async submitContactForm(contact: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    message: string;
    leadSourceURL: string;
  }): Promise<void> {
    try {
      const cookies = MarketingParamsService.getCookies();

      await this.httpService.post(
        endpoints.submitContactForm,
        {
          contact: {
            ...cookies,
            email: contact.email,
            phone: contact.phone,
            first_name: contact.firstName,
            last_name: contact.lastName,
            company: contact.firstName + ' ' + contact.lastName,
            message: contact.message,
            Lead_Source_URL__c: contact.leadSourceURL,
          },
        },
        requestsConfig,
      );
    } catch (e) {
      throw new Error(e);
    }
  }
}
