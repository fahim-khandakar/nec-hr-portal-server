import { Router } from "express";
import { errorHandler } from "../shared/helpers/error-handler";
import { createProduct } from "../controllers/product/product-create";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";

const productRoutes: Router = Router();

productRoutes.post(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(createProduct)
);

export default productRoutes;
