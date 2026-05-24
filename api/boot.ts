import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import type { HttpBindings } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";
import { createContext } from "./context";
import { env } from "./lib/env";
import fs from "fs";
import path from "path";

const app = new Hono<{ Bindings: HttpBindings }>();

app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));

// === IMAGE API ENDPOINT (must be BEFORE /api/* catch-all) ===
const publicPath = env.isProduction
  ? path.resolve(process.cwd(), "dist/public")
  : path.resolve(process.cwd(), "public");

app.get("/api/images/:name", (c) => {
  const name = c.req.param("name");
  const filePath = path.join(publicPath, name);
  if (!filePath.startsWith(publicPath)) return c.json({ error: "Invalid path" }, 400);
  try {
    const content = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes: Record<string, string> = {
      ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
      ".gif": "image/gif", ".webp": "image/webp", ".svg": "image/svg+xml",
    };
    return c.body(content, 200, {
      "Content-Type": mimeTypes[ext] || "image/jpeg",
      "Cache-Control": "public, max-age=31536000",
    });
  } catch {
    return c.json({ error: "Image not found" }, 404);
  }
});

// tRPC routes
app.use("/api/trpc/*", async (c) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext,
  });
});

// Catch-all for unmatched /api/* routes
app.all("/api/*", (c) => c.json({ error: "Not Found" }, 404));

export default app;

if (env.isProduction) {
  const { serve } = await import("@hono/node-server");
  const { serveStaticFiles } = await import("./lib/vite");
  serveStaticFiles(app);

  const port = parseInt(process.env.PORT || "3000");
  serve({ fetch: app.fetch, port }, () => {
    console.log(`[CAIS] Server running on http://localhost:${port}/`);
    console.log(`[CAIS] Images: http://localhost:${port}/api/images/{name}`);
  });
}
