export const stripSpacesFromString = (str?: string) => {
  if (!str) {
    return str;
  }
  if (typeof str !== 'string') {
    return str;
  }

  return str.replace(/\s/g, '');
};