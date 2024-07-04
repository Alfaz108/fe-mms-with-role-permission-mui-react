import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://be-mms-with-role-permission-nest.vercel.app/",
    },
  },
  plugins: [react()],
});
