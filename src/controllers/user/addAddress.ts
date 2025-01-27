import { NextFunction, Request, Response } from "express";
import { AddressSchema } from "../../schema/users";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCode } from "../../exceptions/root";
import prisma from "../../DB/db.config";

export const addAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  AddressSchema.parse(req.body);

  if (!req.user) {
    return next(
      new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND)
    );
  }

  const address = await prisma.address.create({
    data: {
      ...req.body,
      userId: req.user.id,
    },
  });
  res.json({
    status: 200,
    data: address,
    message: "Address added successfully",
  });
};
