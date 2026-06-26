import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CRM AMISON S.A.",
    template: "%s | CRM AMISON S.A.",
  },
  description:
    "Sistema comercial para gestion de clientes, oportunidades y cotizaciones B2B",
  applicationName: "CRM AMISON S.A.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
