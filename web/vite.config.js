import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const target =
    env.VITE_ENV === "Docker" ? "http://server:8000" : "http://localhost:8000";

  return {
    plugins: [react()],
    server: {
      host: true,
      port: 3000,
      proxy: {
        "^/api/v1": {
          target,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/v1/, ""),
        },
      },
    },
    preview: {
      host: true,
      port: 3000,
    },
  };
});
