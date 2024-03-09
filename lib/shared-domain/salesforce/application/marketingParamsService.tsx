import { useEffect } from 'react';
import queryString from 'query-string';
import { browserName, browserVersion, isDesktop, isMobile, isTablet, osName, osVersion } from 'react-device-detect';

const config = {
  localStoreKey: 'MKT_QP:',
  // This keys will be mapped from URL and send back from retrieveMarketingParams
  desiredKeysToMap:
    process.env.NEXT_PUBLIC_MARKETING_QUERY_PARAMS?.split(',') || [],
};

const MarketingQueryStorage = {
  saveIfWithValue: (key: string, value: any) => {
    if (!value) return null;

    window.localStorage.setItem(
      config.localStoreKey + key,
      JSON.stringify(value),
    );
  },
  get: (key: string) => {
    try {
      return JSON.parse(
        window.localStorage.getItem(config.localStoreKey + key),
      );
    } catch (e) {
      return undefined;
    }
  },
};

const getExpiryRecord = (value) => {
  const expiryPeriod = 90 * 24 * 60 * 60 * 1000; // 90 day expiry in milliseconds

  const expiryDate = new Date().getTime() + expiryPeriod;
  return {
    value: value,
    expiryDate: expiryDate,
  };
};

const useSaveOnMount = () => {
  useEffect(() => {
    if (!window) return; // to avoid running on server side.

    const valuesForKeys = queryString.parse(window.location.search);

    //GOOGLE CLICK ID SETUP
    const gclsrcParam = valuesForKeys['gclsrc'];
    const gclidParam = valuesForKeys['gclid'];
    const isGclsrcValid = !gclsrcParam || gclsrcParam?.indexOf('aw') !== -1;
    let gclidRecord = null;

    if (gclidParam && isGclsrcValid) {
      gclidRecord = getExpiryRecord(gclidParam);
      MarketingQueryStorage.saveIfWithValue('gclid', gclidRecord);
    }

    const fbclidParam = valuesForKeys['fbclid'];
    let fbclidRecord = null;

    if (fbclidParam) {
      fbclidRecord = getExpiryRecord(fbclidParam);
      MarketingQueryStorage.saveIfWithValue('fbclid', fbclidRecord);
    }

    // we already stored the fbclid & gclid so we should run marketingQueryStorage for all other values except those.
    config.desiredKeysToMap
      .filter((key) => key !== 'gclid' && key !== 'fbclid')
      .forEach((key) => {
        MarketingQueryStorage.saveIfWithValue(key, valuesForKeys?.[key]);
      });
  }, []);
};

const retrieve = (): Record<string, any> => {
  const gclidRecord = null;
  const gclid =
    gclidRecord ||
    JSON.parse(localStorage?.getItem(config.localStoreKey + 'gclid'));
  const isGclidValid = gclid && new Date().getTime() < gclid.expiryDate;

  const fbclidRecord = null;
  const fbclid =
      fbclidRecord ||
      JSON.parse(localStorage?.getItem(config.localStoreKey + 'fbclid'));
  const isFbclidValid = fbclid && new Date().getTime() < fbclid.expiryDate;


  try {
    const data = config.desiredKeysToMap.reduce((total: any, key: any) => {
      const value = MarketingQueryStorage.get(key);
      if (key === 'gclid') {
        //GOOGLE CLICK ID SETUP
        if (value && isGclidValid) {
          total[key] = MarketingQueryStorage.get(key).value;
        }
      } else if(key === 'fbclid'){
          //FB CLICK ID SETUP
          if (value && isFbclidValid) {
            total[key] = MarketingQueryStorage.get(key).value;
          }
      } else {
        if (value) {
          total[key] = MarketingQueryStorage.get(key);
        }
      }

      return total;
    }, {});

    return data;
  } catch (e) {
    console.log('ERROR: Retrieving Marketing params' + e);
    return {};
  }
};

const renderHiddenInputElements = () => {
  return (
    <>
      {Object.entries(retrieve()).map(([key, val], i) => (
        <input key={i} type="hidden" name={key} value={val} />
      ))}
    </>
  );
};

function getCookieByName(name) {
  if (!document) return; // to avoid running on server side.

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const getCookies = () => {
  const gid = getCookieByName('_gid');
  const ga = getCookieByName('_ga');
  const uid = getCookieByName('_uid');

  return {
    gasessionid__c: ga,
    gauserid__c: gid,
    uid: uid,
  };
};

const collectDeviceInfo = () => {
  return {
    browserName: `${browserName} ${browserVersion}`,
    osName: `${osName} ${osVersion}`,
    deviceType: (isMobile ? 'Mobile' : isTablet ? 'Tablet' : isDesktop ? 'Desktop' : 'Unknown'),
  };
};


const formatMarketingParams = () => {
  const unformattedParams =
    process.env.NEXT_PUBLIC_MARKETING_QUERY_PARAMS?.split(',') || [];

  const marketingParams = retrieve();

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

  return Object.keys(marketingParams).reduce(
    (acc, key) => {
      const newKey = keyMap[key] || key;
      acc[newKey] = marketingParams[key];

      return acc;
    },
    {},
  );
};

export const MarketingParamsService = {
  useSaveOnMount,
  retrieve,
  renderHiddenInputElements,
  getCookies,
  collectDeviceInfo,
  formatMarketingParams,
};
