import { NextFunction, Request, Response } from "express";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCode } from "../../exceptions/root";
import prisma from "../../DB/db.config";

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const data = await prisma.product.findFirstOrThrow({
      where: {
        id: Number(id),
      },
    });
    res.json({
      status: 200,
      data: data,
      message: "Product fetched successfully",
    });
  } catch (error) {
    next(
      new NotFoundException("Product not found", error, ErrorCode.NOT_FOUND)
    );
  }
};
