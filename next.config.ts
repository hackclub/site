import type { NextConfig } from "next";
import { execSync } from "node:child_process";

const getsha = (): string => {
  const sha = process.env.NEXT_PUBLIC_COMMIT_SHA ?? process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GITHUB_SHA;
  if (sha) return sha.slice(0, 6);

  try {
    return execSync("git describe --always --dirty", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "dev";
  }
};

const nextConfig: NextConfig = {
  trailingSlash: false,
  productionBrowserSourceMaps: true,
  env: {
    NEXT_PUBLIC_COMMIT_SHA: getsha(),
  },
  async redirects() {
    return [
      ...["minecraft", "onboard", "replit", "sponsorship", "amas", "ship", "pizza"].map((route) => ({
        source: `/${route}`,
        destination: `https://v3.hackclub.com/${route}`,
        permanent: true,
      })),
      {
        source: "/fiscal-sponsorship/apply/",
        destination: "https://hcb.hackclub.com/applications/new",
        permanent: false,
      },
      {
        source: "/hcb",
        destination: "/fiscal-sponsorship",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/privacy-and-terms",
        permanent: true,
      },
      {
        source: "/sprig",
        destination: "https://sprig.hackclub.com",
        permanent: true,
      },
      { source: "/start/", destination: "/", permanent: false },
      {
        source: "/slack_invite/",
        destination: "https://slack.hackclub.com",
        permanent: true,
      },
      {
        source: "/first",
        destination: "/bank/first/",
        permanent: false,
      },
      {
        source: "/bank/frc",
        destination: "/bank/first/",
        permanent: false,
      },
      {
        source: "/bank/ftc",
        destination: "/bank/first/",
        permanent: false,
      },
      {
        source: "/bank/fll",
        destination: "/bank/first/",
        permanent: false,
      },
      {
        source: "/wom",
        destination: "/winter",
        permanent: false,
      },
      {
        source: "/workshops/slack",
        destination: "https://slack.hackclub.com",
        permanent: true,
      },
      {
        source: "/community",
        destination: "https://slack.hackclub.com",
        permanent: true,
      },
      { source: "/hack_camp", destination: "/camp", permanent: true },
      { source: "/branding", destination: "/brand", permanent: true },
      { source: "/ama/", destination: "/amas", permanent: false },
      { source: "/geohot", destination: "/amas/geohot", permanent: false },
      { source: "/sal", destination: "/amas/sal", permanent: false },
      { source: "/vitalik", destination: "/amas/vitalik", permanent: false },
      {
        source: "/open-source/",
        destination: "/opensource/",
        permanent: false,
      },
      { source: "/coc", destination: "/conduct", permanent: true },
      {
        source: "/code_of_conduct",
        destination: "/conduct",
        permanent: true,
      },
      {
        source: "/safeguarding-policy",
        destination: "/safeguarding",
        permanent: true,
      },
      {
        source: "/finder",
        destination: "https://finder.hackclub.com",
        permanent: true,
      },
      {
        source: "/stickers",
        destination: "https://stickers.hackclub.com",
        permanent: true,
      },
      {
        source: "/stickers/",
        destination: "https://stickers.hackclub.com",
        permanent: true,
      },
      {
        source: "/camp/",
        destination: "https://camp.hackclub.com",
        permanent: true,
      },
      {
        source: "/apply/",
        destination: "https://apply.hackclub.com",
        permanent: true,
      },
      {
        source: "/icons/",
        destination: "https://icons.hackclub.com",
        permanent: true,
      },
      {
        source: "/workshops/",
        destination: "https://workshops.hackclub.com/",
        permanent: false,
      },
      {
        source: "/workshops/([a-z_]+)/",
        destination: "https://workshops.hackclub.com/$1/",
        permanent: true,
      },
      {
        source: "/daysofservice/",
        destination: "https://daysofservice.hackclub.com",
        permanent: true,
      },
      {
        source: "/blot/",
        destination: "https://blot.hackclub.com",
        permanent: false,
      },
      {
        source: "/donate",
        destination: "/philanthropy",
        permanent: false,
      },
      {
        source: "/github",
        destination: "https://github.com/hackclub",
        permanent: true,
      },
      {
        source: "/nest",
        destination: "https://hackclub.app",
        permanent: true,
      },
      {
        source: "/security",
        destination: "https://security.hackclub.com",
        permanent: true,
      },
      {
        source: "/congressional-app-challenge",
        destination: "https://finalist.hackclub.com",
        permanent: true,
      },
      {
        source: "/hardware",
        destination: "https://blueprint.hackclub.com",
        permanent: true,
      },
      {
        source: "/slack",
        destination: "https://slack.hackclub.com",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/fiscal-sponsorship/mobile-app/",
        destination: "/fiscal-sponsorship/mobile/",
      },
      {
        source: "/sponsorship",
        destination: "/content/sponsorship",
      },
      {
        source: "/bin/beta",
        destination: "/bin/landing-new",
      },
      {
        source: "/covid19",
        destination: "/content/covid19",
      },
      {
        source: "/it-admins",
        destination: "/content/it-admins",
      },
      {
        source: "/sunsetting-som",
        destination: "/content/sunsetting-som",
      },
      {
        source: "/map",
        destination: "https://map.hackclub.dev/",
      },
      {
        source: "/map/(.*)",
        destination: "https://map.hackclub.dev/$1",
      },
      {
        source: "/how-to-organize-a-hackathon",
        destination: "https://expandables.hackclub.dev/organizing.html",
      },
      {
        source: "/how-to-organize-a-hackathon/style.css",
        destination: "https://expandables.hackclub.dev/style.css",
      },
      {
        source: "/bin/",
        destination: "/bin/index.html",
      },
      {
        source: "/bin/:path*",
        destination: "/bin/:path*",
      },
      {
        source: "/bin/selector/",
        destination: "/bin/selector/index.html",
      },
      {
        source: "/arcade/:path+",
        destination: "/arcade",
      },
      {
        source: "/imprint",
        destination: "/content/imprint",
      },
    ];
  },
  images: {
    qualities: [75, 85, 100],
    remotePatterns: [
      { protocol: "https", hostname: "www.figma.com" },
      { protocol: "https", hostname: "assets.hackclub.com" },
      { protocol: "https", hostname: "cdn.hackclub.com" },
      { protocol: "https", hostname: "hcb.hackclub.com" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "cachet.dunkirk.sh" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "github.com" },
    ],
  },
};

export default nextConfig;
