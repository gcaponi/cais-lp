import { createRouter, publicQuery } from "./middleware";
import { contactRouter } from "./routers/contact";
import { configRouter } from "./routers/config";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  contact: contactRouter,
  config: configRouter,
});

export type AppRouter = typeof appRouter;
