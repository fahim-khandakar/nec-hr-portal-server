import prisma from "../../DB/db.config";
import { NextFunction, Request, Response } from "express";
import { hashSync } from "bcrypt";
import { BadRequestsException } from "../../exceptions/bad-request";
import { ErrorCode } from "../../exceptions/root";
import { UnprocessableEntity } from "../../exceptions/validation";
import { signupSchema } from "../../schema/users";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  signupSchema.parse(req.body);
  const { email, name, password } = req.body;
  const findUser = await prisma.user.findUnique({
    where: { email: email },
  });
  if (findUser) {
    next(
      new BadRequestsException(
        "Email Already Taken. Please another email.",
        ErrorCode.USER_ALREADY_EXIST
      )
    );
  }

  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashSync(password, 10),
    },
  });
  res.json({
    status: 200,
    data: newUser,
    message: "User created successfully",
  });
};
