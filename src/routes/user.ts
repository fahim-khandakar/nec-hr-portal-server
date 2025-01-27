import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../shared/helpers/error-handler";
import { addAddress } from "../controllers/user/addAddress";
import { deleteAddress } from "../controllers/user/deleteAddress";
import { getAddress } from "../controllers/user/getAddress";

const usersRoutes: Router = Router();

usersRoutes
  .post("/address", [authMiddleware], errorHandler(addAddress))
  .delete("/address/:id", [authMiddleware], errorHandler(deleteAddress))
  .get("/address", [authMiddleware], errorHandler(getAddress));

export default usersRoutes;
