import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

// import express from "express";
// import { User } from "@prisma/client";

// declare module "express" {
//   export interface Request {
//     user: User;
//   }
// }
