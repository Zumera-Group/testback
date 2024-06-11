import { PageFacade } from '../infrastructure/page.facade';

export const fetchPages = async (excludeHiddenPages: boolean = false) => {
  const facade = new PageFacade();

  return await facade.getPages(excludeHiddenPages);
};
