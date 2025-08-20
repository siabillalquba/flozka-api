import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { PublicUserSchema, UsersIdSchema, UsersSchema } from "./schema";
import { prisma } from "../../lib/prisma";

export const userRoute = new OpenAPIHono();

userRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      200: {
        content: { "application/json": { schema: UsersSchema } },
        description: "Get all users",
      },
    },
  }),
  async (c) => {
    const users = await prisma.user.findMany({
      omit: {
        email: true,
      },
    });

    return c.json(users);
  }
);

userRoute.openapi(
  createRoute({
    method: "get",
    path: "/{id}",
    request: {
      params: UsersIdSchema,
    },
    responses: {
      200: {
        content: { "application/json": { schema: PublicUserSchema } },
        description: "Get user by id",
      },
      404: {
        description: "User not found",
      },
    },
  }),
  async (c) => {
    const { id } = c.req.valid("param");

    const user = await prisma.user.findUnique({
      where: { id },
      omit: {
        email: true,
      },
    });
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json(user);
  }
);
