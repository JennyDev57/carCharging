// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  server: { 
    host: true,
    // @ts-ignore
    proxy: {
      "/auth": "http://localhost:5000"
    }
  },

  vite: {
      // @ts-ignore
      plugins: [tailwindcss()],
	},

  integrations: [react()],
});