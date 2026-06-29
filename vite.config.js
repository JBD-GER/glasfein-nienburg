import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import contactHandler from "./api/contact.js";

function localApiPlugin() {
  return {
    name: "glasfein-local-api",
    configureServer(server) {
      server.middlewares.use("/api/contact", async (req, res, next) => {
        try {
          const response = {
            setHeader: res.setHeader.bind(res),
            status(code) {
              res.statusCode = code;
              return response;
            },
            json(payload) {
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(payload));
              return response;
            },
            end(...args) {
              res.end(...args);
              return response;
            }
          };

          await contactHandler(req, response);
        } catch (error) {
          next(error);
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return {
    plugins: [react(), localApiPlugin()]
  };
});
