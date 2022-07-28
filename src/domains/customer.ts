import { z } from "zod";

export const customerSchema = z
  .object({
    name: z.string().min(2).max(100),
  })
  .strict();

export type Customer = z.infer<typeof customerSchema>;

export default Customer;
