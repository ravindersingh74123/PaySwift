"use server";
import prisma from "@/db";
import bcrypt from "bcrypt";

export async function signup(email: string, password: string, number: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { number }],
    },
  });

  if (existingUser) {
    throw new Error("Email or number already exists.");
  }

  // Create user
  try {
    const user = await prisma.user.create({
      data: {
        email,
        number,
        password: hashedPassword,
        Balance: {
          // Create Balance for new user
          create: {
            amount: 0, // Initial balance is 0
            locked: 0, // Initial locked balance is 0
          },
        },
      },
      include: {
        Balance: true, // Ensure Balance is included in the result
      },
    });

    return {
      id: user.id.toString(),
      number: user.number,
      email: user.email,
      balance: user.Balance, // Return the newly created balance
    };
  } catch (e) {
    console.error(e);
  }

  return "Signed up!";
}
