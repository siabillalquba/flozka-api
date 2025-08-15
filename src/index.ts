import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { prisma } from "./lib/prisma";
import { cors } from "hono/cors";
import {
  ProductSchema,
  ProductsSchema,
  ProductsSlugSchema,
} from "./modules/product/schema";
import { Scalar } from "@scalar/hono-api-reference";

const app = new OpenAPIHono();

app.use(cors());

app.openapi(
  createRoute({
    method: "get",
    path: "/products",
    responses: {
      200: {
        content: { "application/json": { schema: ProductsSchema } },
        description: "Get all products",
      },
    },
  }),
  async (c) => {
    const products = await prisma.product.findMany();

    return c.json(products);
  }
);

app.openapi(
  createRoute({
    method: "get",
    path: "/products/{slug}",
    request: {
      params: ProductsSlugSchema,
    },
    responses: {
      200: {
        content: { "application/json": { schema: ProductSchema } },
        description: "Get product by slug",
      },
      404: {
        description: "Product not found",
      },
    },
  }),
  async (c) => {
    const { slug } = c.req.valid("param");

    const product = await prisma.product.findUnique({
      where: { slug },
    });
    if (!product) {
      return c.json({ error: "Product not found" }, 404);
    }

    return c.json(product);
  }
);

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Flozka API",
  },
});

app.get("/", Scalar({ url: "/openapi.json" }));

export default app;
