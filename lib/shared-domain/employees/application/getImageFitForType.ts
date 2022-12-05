export const getImageFitForType = (
  type: 'headshot' | 'standing' | 'sitting',
): 'contain' | 'cover' => {
  if (type === 'headshot') return 'contain';
  if (type === 'standing') return 'cover';
  if (type === 'sitting') return 'cover';
  return 'cover';
};
