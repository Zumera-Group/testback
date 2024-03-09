import { useTaxCalculatorStore } from 'lib/shared-domain/tax-calculator/store';
import { useEffect } from 'react';
import { getBrowserCookie, setBrowserCookie } from 'lib/shared-domain/tax-calculator/hooks/helpers';
import { uuid } from 'uuidv4';

export function useCookieSetup() {
  const { setUniqueId, uniqueId } = useTaxCalculatorStore();

  useEffect(() => {
    if (!uniqueId) {
      const uidCookie = getBrowserCookie('zumera_uid');
      if (uidCookie) {
        setUniqueId(uidCookie);
      } else {
        const newUuid = uuid();
        setUniqueId(newUuid);
        setBrowserCookie('zumera_uid', newUuid, 365);
      }
    }
  }, [uniqueId]);

}
