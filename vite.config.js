import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// base: "./" makes the built site work on any static host or sub-folder
// (Netlify, GitHub Pages project sites, Cloudflare Pages, etc.)
export default defineConfig({
  base: "./",
  plugins: [vue()],
});
