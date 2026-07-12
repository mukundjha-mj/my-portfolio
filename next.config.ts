import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Allow MDX files to be treated as pages/content.
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      // Clerk proxies/serves user avatars (GitHub/Google profile photos) from this host.
      { protocol: "https", hostname: "img.clerk.com" },
    ],
  },
};

const withMDX = createMDX({
  options: {
    // Turbopack (default in Next 16) needs remark/rehype plugins as strings.
    // remark-frontmatter parses (and drops from output) the `---` YAML block.
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
  },
});

export default withMDX(nextConfig);
