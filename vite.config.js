import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr"

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    allowedHosts: [
      "c45b-2402-3a80-425c-47af-8555-b971-6d61-a115.ngrok-free.app"
    ],
    
  }
});