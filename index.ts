const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("node:path");
const helmet = require("helmet");
const { readdirSync } = require("node:fs");
require("dotenv").config();

const app = express();
const PORT = process.env.SERVER_PORT;

const allowedOrigins =
  process.env.ALLOWED_ORIGINS?.split(",").map((o) => o.trim()) ?? [];

app.disable("x-powered-by");

app.use(helmet.default());
app.use(
  cors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not Allowed By CORS"));
      }
    },
  }),
);
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const routePath = path.join(__dirname, "routes");
readdirSync(routePath).forEach((file: any) => {
  app.use("/api", require(`./routes/${file}`));
});

app.listen(PORT, () => console.log(`server is runing on port ${PORT}`));
