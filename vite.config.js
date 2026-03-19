import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr"

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    allowedHosts: [
      "defence-powder-deviation-walker.trycloudflare.com"
    ],
    
  }
});