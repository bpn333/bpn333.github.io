import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import sitemap from "vite-plugin-sitemap";
import { links } from "./src/data/navLinks";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    sitemap({
      hostname: "https://bpn.07032004.xyz",
      dynamicRoutes: links.map((i) => i.path),
      exclude: ["/google994689eea4e12801"],
    }),
  ],
});
