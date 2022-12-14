// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import customerRouter from "./customer";
import projectRouter from "./project";
import { protectedExampleRouter } from "./protected-example-router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("customer.", customerRouter)
  .merge("project.", projectRouter)
  .merge("question.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
