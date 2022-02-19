import express, { Request, Response } from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import router from "./routes/routes";
import { config } from "dotenv";

config({ path: "./.env" });
createConnection().then(() => {
  const app = express();
  app.use(express.json({ limit: "10kb" }));
  app.use(cors({ origin: ["http://127.0.0.1:3000"] }));
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
  });
  app.use("/api/admin", router);
  app.listen(process.env.PORT, () => {
    console.log("listen to port 8000");
  });
});
