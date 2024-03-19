export function ensureHttps(url: string): string {
  // Check if the URL already starts with 'http://' or 'https://'
  if (url.startsWith('http://') || url.startsWith('https://')) {
    // If the URL starts with 'http://', replace it with 'https://'
    if (url.startsWith('http://')) {
      return 'https://' + url.substring(7);
    }
    // If the URL already starts with 'https://', return it as is
    return url;
  } else {
    // If the URL doesn't start with any, prepend 'https://'
    return 'https://' + url;
  }
}