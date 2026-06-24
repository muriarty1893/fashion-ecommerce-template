import type { Metadata } from "next";
import Script from "next/script";
import Providers from "./providers";
import "../index.css";
import GlobalLoader from "../components/GlobalLoader";

export const metadata: Metadata = {
  title: "MODE Fashion Commerce",
  description: "A local demo fashion e-commerce storefront.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" suppressHydrationWarning>
    <head>
      <Script id="loader-session-flag" strategy="beforeInteractive">
        {`try {
  if (sessionStorage.getItem('modeFashionLoaderShown') === 'true') {
    document.documentElement.classList.add('site-loader-should-skip');
  }
} catch (error) {}`}
      </Script>
    </head>
    <body>
      <GlobalLoader />
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
