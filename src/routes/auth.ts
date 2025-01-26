import { Router } from "express";
import { signup } from "../controllers/auth/signup";
import { login } from "../controllers/auth/login";
import { errorHandler } from "../shared/helpers/error-handler";
import authMiddleware from "../middlewares/auth";
import { me } from "../controllers/auth/me";

const authRoutes: Router = Router();

authRoutes
  .post("/signup", errorHandler(signup))
  .post("/login", errorHandler(login))
  .get("/me", [authMiddleware], errorHandler(me));

export default authRoutes;
