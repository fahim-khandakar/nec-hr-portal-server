import { Request, Response } from "express";
import prisma from "../../DB/db.config";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCode } from "../../exceptions/root";

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProduct = await prisma.product.delete({
      where: {
        id: +id,
      },
    });
    res.json({
      data: deletedProduct,
      status: 200,
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    new NotFoundException("Product not found", error, ErrorCode.NOT_FOUND);
  }
};
