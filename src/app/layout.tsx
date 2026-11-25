import type { Metadata } from "next";
import { preload } from "react-dom";
import "./globals.css";
import "../styles/WorkPhelo-fonts.css";
import "../styles/bootstrap.css";
import "../styles/WorkPhelo.css";
import "../styles/WorkPhelo-fix.css";
import "../styles/WorkPhelo-motion.css";
import "../styles/WorkPhelo-apple.css";
import "../styles/WorkPhelo-vibe.css";

export const metadata: Metadata = {
  title: "Datrix Tech Solutions | WorkPhelo Business Management Software",
  description:
    "WorkPhelo by Datrix Tech Solutions unites every tool your business needs in one smart suite — AccountingPhelo online accounting, HRPhelo HRMS, Customized Software and MarketingPhelo CRM.",
  robots: "index, follow",
  icons: {
    icon: "/assets/img/datrix-mark.png",
  },
};

// Above-the-fold art, brand marks and client logos — preloaded in the
// exact order the production build serves them.
const PRELOADS = [
  ["/assets/img/datrix-mark.png", "image"],
  ["/assets/img/datrix-logo.png", "image"],
  ["/assets/img/datrix-logo-white.png", "image"],
  ["/assets/img/Financials.png", "image"],
  ["/assets/img/payroll.png", "image"],
  ["/assets/img/customized.png", "image"],
  ["/assets/img/CRM.png", "image"],
  ["/assets/img/page-financials/silverline", "image"],
  ["/assets/img/page-financials/eye360.png", "image"],
  ["/assets/img/page-financials/iriskre.png", "image"],
  ["/assets/img/page-financials/sahare.jpg", "image"],
  ["/assets/img/page-financials/open-ai.png", "image"],
  ["/assets/img/page-financials/claude-ai.png", "image"],
 
] as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  for (const [href, as] of PRELOADS) {
    preload(href, { as });
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="body- index antialiased" id="index">
        {children}
      </body>
    </html>
  );
}
