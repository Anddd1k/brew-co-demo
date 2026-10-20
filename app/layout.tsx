import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Brew & Co. — A little everyday magic",
  description:
    "A fictional café, a real working demo. Explore the coffee menu, build your bag and try a clearly labelled demo checkout.",
  robots: { index: false, follow: false },
  icons: { icon: "/icon.svg" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
