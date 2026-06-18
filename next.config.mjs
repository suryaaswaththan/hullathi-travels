/** @type {import('next').NextConfig} */

// Set NEXT_PUBLIC_BASE_PATH="/hullathi-travels" in CI to deploy under the
// GitHub Pages project sub-path. Left empty for local dev (serves at root).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export", // static HTML export -> ./out (works on GitHub Pages)
  images: { unoptimized: true }, // no Next image server on a static host
  basePath,
  trailingSlash: true, // emit /about/index.html so GH Pages routes cleanly
};

export default nextConfig;
