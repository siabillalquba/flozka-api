import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { prisma } from "../../lib/prisma";
import { PrivateUserSchema } from "../user/schema";
import { AuthHeaderSchema } from "../auth/schema";

import { checkAuthorized } from "../auth/middleware";
import { CartSchema } from "./schema";

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
