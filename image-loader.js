// Custom next/image loader for static export on GitHub Pages.
// With `images.unoptimized`, Next does NOT prepend basePath to image src,
// so all images 404 under the project sub-path. This loader fixes that by
// prefixing every src with the base path. Width/quality are ignored since
// there is no image-optimization server on a static host.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function imageLoader({ src }) {
  // External URLs pass through untouched.
  if (/^https?:\/\//.test(src)) return src;
  return `${basePath}${src}`;
}
