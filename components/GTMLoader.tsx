import {useEffect} from 'react';
import TagManager from 'react-gtm-module';

export default function GTMLoader() {
  // Initialise Google tag manager
  useEffect(() => {
    if (process.browser && process.env.NEXT_PUBLIC_TAG_MANAGER_ID) {
      TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_TAG_MANAGER_ID });
    }
  }, []);

  return null;
}