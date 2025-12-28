import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Growth Track SaaS Starter",
  description: "Multi-tenant Growth Track starter (subdomain routing) for churches",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
