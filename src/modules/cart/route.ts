import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { prisma } from "../../lib/prisma";
import { PrivateUserSchema } from "../user/schema";
import { AuthHeaderSchema } from "../auth/schema";

import { checkAuthorized } from "../auth/middleware";
import { AddCartItemSchema, CartItemSchema, CartSchema } from "./schema";

export const cartRoute = new OpenAPIHono();

// GET /cart
cartRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    request: {
      headers: AuthHeaderSchema,
    },
    middleware: checkAuthorized,
    responses: {
      200: {
        content: { "application/json": { schema: CartSchema } },
        description: "Get cart",
      },
      404: {
        description: "Cart not found",
      },
    },
  }),
  async (c) => {
    const user = c.get("user");

    const cart = await prisma.cart.findFirst({
      where: { userId: user.id },
      include: { items: { include: { product: true } } },
    });

    if (!cart) {
      const newCart = await prisma.cart.create({
        data: { userId: user.id },
        include: { items: { include: { product: true } } },
      });

      return c.json(newCart);
    }

    return c.json(cart);
  }
);

// POST /cart/items
cartRoute.openapi(
  createRoute({
    method: "post",
    path: "/items",
    request: {
      body: { content: { "application/json": { schema: AddCartItemSchema } } },
    },
    middleware: checkAuthorized,
    responses: {
      200: {
        content: { "application/json": { schema: CartItemSchema } },
        description: "Add item to cart",
      },
      400: {
        description: "Failed to add item to cart",
      },
      404: {
        description: "Cart not found",
      },
    },
  }),
  async (c) => {
    try {
      const body = c.req.valid("json");
      const user = c.get("user");

      const cart = await prisma.cart.findFirst({
        where: { userId: user.id },
        include: { items: { include: { product: true } } },
      });

      if (!cart) {
        return c.json({ message: "Cart not found" }, 404);
      }

      const newCartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: body.productId,
          quantity: body.quantity,
        },
        include: { product: true },
      });

      return c.json(newCartItem);
    } catch (error) {
      return c.json({ message: "Failed to add item to cart" }, 400);
    }
  }
);
