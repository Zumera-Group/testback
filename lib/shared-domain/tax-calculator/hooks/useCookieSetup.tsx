import { useTaxCalculatorStore } from 'lib/shared-domain/tax-calculator/store';
import { useEffect } from 'react';
import { getBrowserCookie, setBrowserCookie } from 'lib/shared-domain/tax-calculator/hooks/helpers';
import { uuid } from 'uuidv4';

const COOKIE_NAME = 'zumera_tax_calc_uid';

export function useCookieSetup() {
  const { setUniqueId, uniqueId } = useTaxCalculatorStore();

  useEffect(() => {
    if (!uniqueId) {
      const uidCookie = getBrowserCookie(COOKIE_NAME);
      if (uidCookie) {
        setUniqueId(uidCookie);
      } else {
        const newUuid = uuid();
        setUniqueId(newUuid);
        setBrowserCookie(COOKIE_NAME, newUuid, 365);
      }
    }
  }, [uniqueId]);

}
