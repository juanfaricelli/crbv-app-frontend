// Plugins
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import vueDevTools from "vite-plugin-vue-devtools";
import ViteFonts from "unplugin-fonts/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import dotenv from "dotenv";

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

const host = `crbv-app.${process.env.NODE_ENV}.com`;

const targetLocal =
  process.env.NODE_HTTPS === "true"
    ? `${process.env.APP_API_URL_HTTPS}:${process.env.APP_API_PORT}`
    : `${process.env.APP_API_URL}:${process.env.APP_API_PORT}`;
const proxyLocal = {
  "/api": {
    target: ["local", "development"].includes(process.env.NODE_ENV)
      ? targetLocal
      : process.env.APP_API_URL_HTTPS,
    changeOrigin: true,
    // TODO: review this
    secure: process.env.NODE_HTTPS === "true", // Disable SSL verification
  },
};
const proxy = {
  "/api": "https://crbv-app-backend.onrender.com/",
};

const serverLocal = {
  host,
  port: process.env.PORT || 3000,
  proxy: process.env.NODE_ENV === "development" ? proxy : proxyLocal,
};
const serverProd = {
  https: process.env.NODE_HTTPS === "true",
  port: process.env.PORT || 3000,
  proxy: process.env.NODE_HTTPS === "true" ? proxy : proxyLocal,
};
const server = ["local", "development"].includes(process.env.NODE_ENV)
  ? serverLocal
  : serverProd;

console.log("Server configs", server);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    vuetify({
      autoImport: true,
    }),
    ViteFonts({
      google: {
        families: [
          {
            name: "Roboto",
            styles: "wght@100;300;400;500;700;900",
          },
        ],
      },
    }),
    basicSsl(),
    vueDevTools(),
  ],
  define: {
    "process.env": {
      APP_API: JSON.stringify(process.env.APP_API_URL),
      NODE_ENV: JSON.stringify(process.env.APP_ENVIRONMENT),
      APP_SECRET_KEY: process.env.APP_SECRET_KEY,
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server,
});
