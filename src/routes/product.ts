import { Router } from "express";
import { errorHandler } from "../shared/helpers/error-handler";
import { createProduct } from "../controllers/product/product-create";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { updateProduct } from "../controllers/product/product-update";
import { deleteProduct } from "../controllers/product/product-delete";
import { getProduct } from "../controllers/product/product-get";
import { getProductById } from "../controllers/product/product-by-id";

const productRoutes: Router = Router();

productRoutes
  .get("/", [authMiddleware, adminMiddleware], errorHandler(getProduct))
  .post("/", [authMiddleware, adminMiddleware], errorHandler(createProduct))
  .get("/:id", [authMiddleware, adminMiddleware], errorHandler(getProductById))
  .put("/:id", [authMiddleware, adminMiddleware], errorHandler(updateProduct))
  .delete(
    "/:id",
    [authMiddleware, adminMiddleware],
    errorHandler(deleteProduct)
  );

export default productRoutes;
