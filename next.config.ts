import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    // Needed because the root layout lives under the dynamic [locale] segment.
    globalNotFound: true,
  },
}

export default nextConfig
