// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig, loadEnv } from "vite";
// eslint-disable-next-line import/no-extraneous-dependencies
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 5050,
      watch: {
        usePolling: true,
      },
    },
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    build: {
      sourcemap: true,
    },
  };
});
