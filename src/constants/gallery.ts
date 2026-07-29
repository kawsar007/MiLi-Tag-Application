export type GallerySize = "lg" | "wide" | "tall" | "md";

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  /** Controls the bento span at sm+ breakpoints. Defaults to "md". */
  size?: GallerySize;
};

/**
 * Sample data — swap `src` for your own optimized assets.
 * If using remote images (e.g. Unsplash), remember to whitelist the
 * domain in next.config.js under images.remotePatterns.
 */
export const galleryImages: GalleryImage[] = [
  {
    id: "img-01",
    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80",
    alt: "Product resting on a matte concrete surface under soft daylight",
    caption: "Everyday carry, reimagined",
    size: "lg",
  },
  {
    id: "img-02",
    src: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80",
    alt: "Close-up detail of the stitched leather edge",
    caption: "Hand-finished edges",
    size: "md",
  },
  {
    id: "img-03",
    src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80",
    alt: "Product shown from a top-down angle on a linen backdrop",
    caption: "Considered from every angle",
    size: "md",
  },
  // {
  //   id: "img-04",
  //   src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=1000",
  //   alt: "Vertical shot highlighting the product's silhouette",
  //   caption: "A silhouette that holds up",
  //   size: "tall",
  // },
  // {
  //   id: "img-05",
  //   src: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&q=80",
  //   alt: "Wide lifestyle shot of the product in use on a desk setup",
  //   caption: "Built for the desk, made for the day",
  //   size: "wide",
  // },
  // {
  //   id: "img-06",
  //   src: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=80",
  //   alt: "Macro shot of the material texture and grain",
  //   caption: "Texture that rewards a closer look",
  //   size: "md",
  // },
  {
    id: "img-07",
    src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    alt: "Product packaging shown alongside the unboxed item",
    caption: "Packaging with the same care",
    size: "md",
  },
  {
    id: "img-08",
    src: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80",
    alt: "Wide shot of the product in a bright studio environment",
    caption: "Studio to shelf, unchanged",
    size: "wide",
  },
];