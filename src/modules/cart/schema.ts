import { z } from "@hono/zod-openapi";

import { ProductSchema } from "../product/schema";
import { AuthRegisterSchema } from "../auth/schema";

export const CartItemSchema = z.object({
  id: z.string(),
  quantity: z.number(),

  productId: z.string(),
  product: ProductSchema,

  cardId: z.string(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CartSchema = z.object({
  id: z.string(),

  items: z.array(CartItemSchema),

  userId: z.string(),
  user: AuthRegisterSchema.optional(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const AddCartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().default(1),
});

export type Cart = z.infer<typeof CartSchema>;
