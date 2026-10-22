import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  experimental: { serverActions: { bodySizeLimit: "6mb" } },
  async redirects() {
    return [
      { source: "/home.php", destination: "/", permanent: true },
      {
        source: "/index.php",
        has: [{ type: "query" as const, key: "action", value: "login" }],
        destination: "/admin/login",
        permanent: true,
      },
      {
        source: "/index.php",
        has: [
          {
            type: "query" as const,
            key: "action",
            value: "dashboard|viewVehicles",
          },
        ],
        destination: "/admin",
        permanent: true,
      },
      { source: "/index.php", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};
export default config;
