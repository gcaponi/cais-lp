import type { Hono } from "hono";
import type { HttpBindings } from "@hono/node-server";
import fs from "fs";
import path from "path";

type App = Hono<{ Bindings: HttpBindings }>;

export function serveStaticFiles(app: App) {
  // After esbuild bundling, this code runs from dist/boot.js
  // So import.meta.dirname is the 'dist/' folder, and public/ is right there
  const distPath = path.resolve(import.meta.dirname, "./public");

  // Custom static file handler with explicit path resolution
  app.use("*", async (c, next) => {
    if (c.req.method !== "GET") return next();

    const url = new URL(c.req.url);
    const pathname = url.pathname;

    // Skip API routes
    if (pathname.startsWith("/api/")) return next();

    const filePath = path.join(distPath, pathname);

    // Security: ensure resolved path is within distPath
    if (!filePath.startsWith(distPath)) return next();

    try {
      const stat = fs.statSync(filePath);
      if (!stat.isFile()) return next();

      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes: Record<string, string> = {
        ".html": "text/html",
        ".js": "application/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".ico": "image/x-icon",
        ".woff": "font/woff",
        ".woff2": "font/woff2",
        ".ttf": "font/ttf",
        ".mp4": "video/mp4",
        ".webm": "video/webm",
      };
      const contentType = mimeTypes[ext] || "application/octet-stream";

      const content = fs.readFileSync(filePath);
      return c.body(content, 200, {
        "Content-Type": contentType,
        "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=31536000",
      });
    } catch {
      return next();
    }
  });

  // SPA fallback
  app.notFound((c) => {
    const accept = c.req.header("accept") ?? "";
    if (!accept.includes("text/html")) {
      return c.json({ error: "Not Found" }, 404);
    }
    const indexPath = path.resolve(distPath, "index.html");
    const content = fs.readFileSync(indexPath, "utf-8");
    return c.html(content);
  });
}
