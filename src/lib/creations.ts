import { getCldImageUrl } from "next-cloudinary";

// Define an explicit type for collage templates
type CollageTemplateFunction = (publicIds: string[]) => {
  overlays: Array<{
    publicId: string;
    position: { gravity: string };
    effects: Array<{ width: number; height: number; crop: string; gravity: string }>;
  }>;
};

// Define collage templates based on the number of images
const collageTemplates: Record<number, CollageTemplateFunction> = {
  2: (publicIds) => ({
    overlays: [
      {
        publicId: publicIds[0],
        position: { gravity: "west" },
        effects: [{ width: 600, height: 1200, crop: "fill", gravity: "auto" }],
      },
      {
        publicId: publicIds[1],
        position: { gravity: "east" },
        effects: [{ width: 600, height: 1200, crop: "fill", gravity: "auto" }],
      },
    ],
  }),

  3: (publicIds) => ({
    overlays: [
      {
        publicId: publicIds[0],
        position: { gravity: "west" },
        effects: [{ width: 600, height: 1200, crop: "fill", gravity: "auto" }],
      },
      {
        publicId: publicIds[1],
        position: { gravity: "north_east" },
        effects: [{ width: 600, height: 600, crop: "fill", gravity: "auto" }],
      },
      {
        publicId: publicIds[2],
        position: { gravity: "south_east" },
        effects: [{ width: 600, height: 600, crop: "fill", gravity: "auto" }],
      },
    ],
  }),

  4: (publicIds) => ({
    overlays: [
      {
        publicId: publicIds[0],
        position: { gravity: "north_west" },
        effects: [{ width: 600, height: 600, crop: "fill", gravity: "auto" }],
      },
      {
        publicId: publicIds[1],
        position: { gravity: "south_west" },
        effects: [{ width: 600, height: 600, crop: "fill", gravity: "auto" }],
      },
      {
        publicId: publicIds[2],
        position: { gravity: "north_east" },
        effects: [{ width: 600, height: 600, crop: "fill", gravity: "auto" }],
      },
      {
        publicId: publicIds[3],
        position: { gravity: "south_east" },
        effects: [{ width: 600, height: 600, crop: "fill", gravity: "auto" }],
      },
    ],
  }),
};

// Function to get collage image URL
export function getCollage(publicIds: string[]): string {
  const template = collageTemplates[publicIds.length];

  if (!template) {
    throw new Error("Template not defined for the given number of images");
  }

  return getCldImageUrl({
    src: publicIds[0], // Base image
    width: 1200,
    height: 1200,
    crop: { type: "fill", source: true },
    version: Date.now(),
    effects: [{ colorize: "100,co_white", background: "white" }],
    ...template(publicIds), // Apply overlays
  });
}

// Function to get animated image URL
export function getAnimation(publicIds: string[]): string {
  return getCldImageUrl({
    src: publicIds[0],
    width: 1200,
    height: 1200,
    crop: { type: "fill", source: true, gravity: "center" },
    zoompan: "loop",
    version: Date.now(),
  });
}
