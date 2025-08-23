import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../lib/prisma";
import { PrivateUserSchema } from "../user/schema";
import { AuthLoginSchema, AuthRegisterSchema } from "./schema";

export const authRoute = new OpenAPIHono();

authRoute.openapi(
  createRoute({
    method: "post",
    path: "/register",
    request: {
      body: {
        content: {
          "application/json": { schema: AuthRegisterSchema },
        },
      },
    },
    responses: {
      201: {
        content: { "application/json": { schema: PrivateUserSchema } },
        description: "Register success",
      },
    },
  }),
  async (c) => {
    const body = c.req.valid("json");

    const user = await prisma.user.create({
      data: {
        email: body.email,
        fullName: body.fullName,
      },
    });

    return c.json(user);
  }
);

authRoute.openapi(
  createRoute({
    method: "post",
    path: "/login",
    request: {
      body: {
        content: {
          "application/json": { schema: AuthLoginSchema },
        },
      },
    },
    responses: {
      200: {
        content: { "application/json": { schema: PrivateUserSchema } },
        description: "Login success",
      },
      404: {
        description: "User not found",
      },
    },
  }),
  async (c) => {
    const body = c.req.valid("json");

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      return c.notFound();
    }

    return c.json(user);
  }
);

authRoute.openapi(
  createRoute({
    method: "get",
    path: "/me",
    responses: {
      200: {
        content: { "application/json": { schema: PrivateUserSchema } },
        description: "Login success",
      },
      404: {
        description: "User not found",
      },
    },
  }),
  async (c) => {
    const user = await prisma.user.findFirst();
    if (!user) {
      return c.notFound();
    }

    return c.json(user);
  }
);
