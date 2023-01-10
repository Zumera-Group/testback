const footerMenuTypes = {
  normal: 'menuItems',
  services: 'serviceMenuItems',
  sectors: 'sectorMenuItems',
  tools: 'toolsMenuItems',
};

export const getFooterSitemap = (sitemap) => {
  if (!sitemap.length) return;

  return sitemap.map((item) => {
    if (!item?.type) return;
    if (footerMenuTypes.hasOwnProperty(item?.type)) {
      return {
        _key: item?._key,
        type: item?.type,
        title: item?.title,
        items: item[footerMenuTypes[item?.type]],
      };
    }
  });
} 