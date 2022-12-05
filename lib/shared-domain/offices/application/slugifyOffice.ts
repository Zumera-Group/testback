export const slugifyOffice = (city: string) => {
  return city.toLowerCase().trim().replace(/\s/g, '-');
};
