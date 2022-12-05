import { PageFacade } from '../infrastructure/page.facade';

export const fetchPages = async () => {
  const facade = new PageFacade();

  return await facade.getPages();
};
