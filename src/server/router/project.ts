import { createRouter } from "./context";
import { TRPCError } from "@trpc/server";
import { projectSchema } from "@/domains/project";
import { z } from "zod";

export default createRouter()
  .query("get-all", {
    input: z
      .object({
        customerId: z.string().cuid().optional(),
      })
      .default({}),
    resolve({ ctx, input: { customerId } }) {
      return ctx.prisma.project.findMany(
        customerId
          ? {
              where: {
                customer: {
                  id: {
                    equals: customerId,
                  },
                },
              },
            }
          : undefined
      );
    },
  })

  .mutation("post", {
    input: projectSchema,
    async resolve({ input, ctx }) {
      const found = await ctx.prisma.project.findFirst({
        where: {
          AND: {
            customer: {
              id: {
                equals: input.customerId,
              },
            },
            name: {
              equals: input.name,
            },
          },
        },
      });

      if (found) {
        throw new TRPCError({
          code: "CONFLICT",
          message: `There already is a project named "${input.name}" for this customer`,
          cause: "name",
        });
      }

      return ctx.prisma.project.create({
        data: input,
      });
    },
  });
