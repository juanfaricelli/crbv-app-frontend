// Plugins
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import ViteFonts from "unplugin-fonts/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import dotenv from "dotenv";

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

const host = ["development", "local"].includes(process.env.APP_ENVIRONMENT)
  ? `crbv-app.${process.env.APP_ENVIRONMENT}.com`
  : "crbv-app-frontend.onrender.com";
const proxy =
  process.env.NODE_HTTPS === "true"
    ? {
        "/api": {
          target: process.env.APP_API_URL_HTTPS,
          changeOrigin: true,
          // TODO: review this
          secure: process.env.NODE_ENV !== 'local', // Disable SSL verification
        },
      }
    : {
        "/api": process.env.APP_API_URL,
    };
const server = ["development", "local"].includes(process.env.APP_ENVIRONMENT)
  ? {
      host,
      port: 3000,
      proxy,
    }
    : {
      port: process.env.PORT,
      proxy,
    };

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
