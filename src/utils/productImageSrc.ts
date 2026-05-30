export const productImageSrc = (image: string) => {
  if (!image) return "/assets/product image 1.jpg";
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  if (image.startsWith("/")) return image;
  return `/assets/${image}`;
};

