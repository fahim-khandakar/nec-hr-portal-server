import prisma from "../../DB/db.config";
import { NextFunction, Request, Response } from "express";
import { compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../shared/secrets";
import { BadRequestsException } from "../../exceptions/bad-request";
import { ErrorCode } from "../../exceptions/root";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const findUser = await prisma.user.findFirst({
      where: { email: email },
    });
    if (!findUser) {
      next(
        new BadRequestsException(
          "User does not exist!",
          ErrorCode.USER_NOT_FOUND
        )
      );
      return;
    }

    if (!compareSync(password, findUser.password)) {
      next(
        new BadRequestsException(
          "Incorrect Password",
          ErrorCode.INCORRECT_PASSWORD
        )
      );
      return;
    }

    const token = jwt.sign(
      { userId: findUser.id, email: findUser.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      status: 200,
      data: { token },
      message: "User logged in successfully",
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
