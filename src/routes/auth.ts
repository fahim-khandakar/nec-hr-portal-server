import { Router } from "express";
import { signup } from "../controllers/auth/signup";
import { login } from "../controllers/auth/login";

const authRoutes: Router = Router();

authRoutes.post("/signup", signup).post("/login", login);

export default authRoutes;
