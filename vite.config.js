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
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    host: "crbv-app.local.com",
    port: 3000,
    proxy: {
      "/api": {
        target: process.env.APP_API_URL,
        changeOrigin: true,
        // TODO: review this
        secure: ["local", "development"].includes(process.env.APP_ENVIRONMENT), // Disable SSL verification
      },
    },
  },
});
