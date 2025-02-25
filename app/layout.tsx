import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {GoogleAnalytics} from "nextjs-google-analytics-gtm"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stock Phoenix",
  description: "Stock Phoenix | The Future University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <GoogleAnalytics/>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-R0QPWVG6LX"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-R0QPWVG6LX');
          `,
          }}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "lty1y3p17h");`,
          }}
        ></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
