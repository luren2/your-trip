export const getAssetUrl = (image) => {
  return new URL(image, import.meta.url).href;
};
