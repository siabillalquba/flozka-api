import { Product } from "../../src/generated/prisma";

type SeedProduct = Pick<Product, "name" | "price" | "description" | "imageUrl">;

export const dataSeedProducts: SeedProduct[] = [
  {
    name: "Gerbera Large Colorful",
    price: 400000,
    description:
      "A vibrant bouquet of orange, pink, and burgundy gerberas and chrysanthemums is elegantly wrapped in white paper",
    imageUrl:
      "https://ucarecdn.com/96ba3d84-81c1-42d3-b108-db9189a6dfe7/-/preview/750x1000/",
  },
  {
    name: "Rose Medium Red",
    price: 190000,
    description:
      "A stunning bouquet of vibrant red roses wrapped in elegant black mesh paper",
    imageUrl:
      "https://ucarecdn.com/70ee3540-3e1e-4adc-a8fd-dc6adc594fbc/-/preview/750x1000/",
  },
];
