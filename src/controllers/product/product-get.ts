import { Request, Response } from "express";
import prisma from "../../DB/db.config";
import { calculatePagination } from "../../shared/helpers/pagination";

export const getProduct = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;

  const totalItems = await prisma.product.count();

  const pagination = calculatePagination({
    currentPage: +page,
    itemsPerPage: +limit,
    totalItems,
  });
  console.log("pagination", pagination);
  const products = await prisma.product.findMany({
    take: pagination.limit,
    skip: pagination.offset,
  });
  res.json({
    status: 200,
    data: { products },
    message: "Products fetched successfully",
  });
};
