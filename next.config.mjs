/** @type {import('next').NextConfig} */

// On Cloudflare (Workers Builds sets WORKERS_CI, Pages sets CF_PAGES) the site is built as plain
// static files in the `out` folder. You can also force it with NEXT_OUTPUT=export.
// Any other host (such as Vercel) builds the site as usual.
const staticExport =
  process.env.NEXT_OUTPUT === "export" ||
  process.env.WORKERS_CI === "1" ||
  process.env.CF_PAGES === "1";

const nextConfig = {
  reactStrictMode: true,
  ...(staticExport
    ? {
        output: "export",
        // The image optimizer needs a server. The site doesn't use next/image.
        images: { unoptimized: true },
      }
    : {
        images: {
          formats: ["image/avif", "image/webp"],
        },
      }),
};

export default nextConfig;
