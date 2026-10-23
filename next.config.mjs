/** @type {import('next').NextConfig} */

// Cloudflare builds set NEXT_OUTPUT=export, which makes `npm run build` write plain static files
// to the `out` folder. Any other host (such as Vercel) builds the site as usual.
const staticExport = process.env.NEXT_OUTPUT === "export";

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
