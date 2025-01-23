import express, { Express, Request, Response } from "express";
import { PORT } from "./shared/secrets";
import rootRouter from "./routes";
import { errorMiddleware } from "./middlewares/errors";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", rootRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
