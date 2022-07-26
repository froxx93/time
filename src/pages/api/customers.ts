// src/pages/api/customers.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";

const customers = async (req: NextApiRequest, res: NextApiResponse) => {
  const customers = await prisma.customer.findMany();
  res.status(200).json(customers);
};

export default customers;
