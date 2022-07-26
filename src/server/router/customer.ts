import { createRouter } from "./context";
import { z } from "zod";

const postSchema = z
  .object({
    name: z.string().min(2).max(100),
  })
  .strict();

export default createRouter()
  .query("get-all", {
    resolve({ ctx }) {
      return ctx.prisma.customer.findMany();
    },
  })

  .mutation("post", {
    input: postSchema,
    resolve({ input, ctx }) {
      return ctx.prisma.customer.create({
        data: input,
      });
    },
  });

export type Customer = z.infer<typeof postSchema>;
