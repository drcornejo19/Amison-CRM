import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CRM AMISON S.A.",
    short_name: "AMISON CRM",
    description:
      "Sistema comercial para gestion de clientes, oportunidades y cotizaciones B2B",
    start_url: "/login",
    display: "standalone",
    background_color: "#060b12",
    theme_color: "#274dff",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
