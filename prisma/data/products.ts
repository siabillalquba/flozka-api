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
  {
    name: "Lili Medium White",
    price: 300000,
    description:
      "An elegant bouquet of white lilies, pink carnations, and baby’s breath, wrapped in soft grey and white paper",
    imageUrl:
      "https://ucarecdn.com/a760b4fe-5520-45e0-a7da-62a8027ea566/-/preview/750x1000/",
  },
  {
    name: "Rose Large Red",
    price: 400000,
    description:
      "A lavish bouquet of dozens vibrant red roses, elegantly wrapped in white paper and adorned with red satin ribbons",
    imageUrl:
      "https://ucarecdn.com/453b1f10-71ee-4ce0-acfe-75a0197fee75/-/preview/750x1000/",
  },
  {
    name: "Box Medium",
    price: 250000,
    description:
      "A charming woven basket filled with pink lilies, white roses, soft peach blooms, and baby's breath, accented with lush greenery",
    imageUrl:
      "https://ucarecdn.com/bbecc857-cf29-44b2-b307-4c214f019368/-/preview/750x1000/",
  },
];
