import { PrismaClient } from "@prisma/client";
import { signupSchema } from "../schema/users";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
  errorFormat: "pretty",
});
export default prisma;
