import { createRouter } from "./context";
import * as trpc from "@trpc/server";
import { customerSchema } from "@/domains/customer";

export default createRouter()
  .query("get-all", {
    resolve({ ctx }) {
      return ctx.prisma.customer.findMany();
    },
  })

  .mutation("post", {
    input: customerSchema,
    resolve({ input, ctx }) {
      return ctx.prisma.customer
        .create({
          data: input,
        })
        .catch((err) => {
          if (err.code === "P2002") {
            throw new trpc.TRPCError({
              code: "CONFLICT",
              message: `There already is a customer named "${input.name}"`,
            });
          } else {
            throw err;
          }
        });
    },
  });
