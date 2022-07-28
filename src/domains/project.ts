import { z } from "zod";

export const projectSchema = z
  .object({
    customerId: z.string().cuid(),
    name: z.string().min(2).max(100),
  })
  .strict();

export type Project = z.infer<typeof projectSchema>;

export default Project;
