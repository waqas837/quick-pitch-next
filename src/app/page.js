// 📁 app/page.tsx

import BuilderPage from "@/components/BuilderPage";

export const metadata = {
  title: "QuickPitch — 1-Page Startup Pitch Builder",
  description:
    "Create a powerful one-page startup pitch. Free tool for entrepreneurs, built by a web developer you can hire.",
  keywords: [
    "startup",
    "pitch",
    "entrepreneur",
    "one-pager",
    "startup idea",
    "pdf builder",
  ],
  authors: [{ name: "Waqas Khan", url: "https://trendcraftx.com" }],
  creator: "Waqas Khan",
  metadataBase: new URL("https://quickpitch.vercel.app"),
  openGraph: {
    title: "QuickPitch — 1-Page Startup Pitch Builder",
    description:
      "Free tool for startup founders to build and export their pitch in minutes.",
    url: "https://quickpitch.vercel.app",
    siteName: "QuickPitch",
    locale: "en_US",
    type: "website",
  },
};

const Home = () => {
  return (
    <div>
      <BuilderPage />
    </div>
  );
};

export default Home;
