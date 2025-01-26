import { Request, Response } from "express";
import prisma from "../../DB/db.config";
import { productSchema } from "../../schema/product";

export const createProduct = async (req: Request, res: Response) => {
  productSchema.parse(req.body);
  const product = await prisma.product.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(","),
    },
  });
  res.json({
    message: "Product Created Successfully",
    success: true,
    product,
  });
};
