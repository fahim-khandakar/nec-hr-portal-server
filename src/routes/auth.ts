import { Router } from "express";
import { signup } from "../controllers/auth/signup";
import { login } from "../controllers/auth/login";
import { errorHandler } from "../shared/helpers/error-handler";

const authRoutes: Router = Router();

authRoutes
  .post("/signup", errorHandler(signup))
  .post("/login", errorHandler(login));

export default authRoutes;
