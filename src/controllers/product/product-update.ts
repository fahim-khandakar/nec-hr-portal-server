import { NextFunction, Request, Response } from "express";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCode } from "../../exceptions/root";
import prisma from "../../DB/db.config";
import { productSchema } from "../../schema/product";

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  productSchema.parse(req.body);
  try {
    const product = req.body;
    if (product.tags) {
      product.tags = product.tags.join(",");
    }
    const updatedProduct = await prisma.product.update({
      where: {
        id: +req.params.id,
      },
      data: product,
    });
    res.json({
      status: 200,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    next(
      new NotFoundException("Product not found", error, ErrorCode.NOT_FOUND)
    );
  }
};
