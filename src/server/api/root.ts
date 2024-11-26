import { createTRPCRouter } from "~/server/api/trpc";
import { subscribeRouter } from "./routers/subscribe";
import { aisleRouter } from "./routers/aisles";
import { areaRouter } from "./routers/areas";
import { zoneRouter } from "./routers/zones";
import { allUpdateRouter } from "./routers/allUpdate";
import { productsRouter } from "./routers/product";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  subscribe: subscribeRouter,
  aisles: aisleRouter,
  areas: areaRouter,
  zones: zoneRouter,
  allUpdate: allUpdateRouter,
  products: productsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
