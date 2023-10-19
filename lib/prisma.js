import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
console.log(process.env.NODE_ENV);
export default prisma;
