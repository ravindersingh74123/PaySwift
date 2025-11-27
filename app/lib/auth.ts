import db from "@/db/index";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "1231231231",
          required: true,
        },
        number: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231231",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials: any) {
        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        // Fetch the existing user and include the related Balance model
        const existingUser = await db.user.findFirst({
          where: {
            OR: [{ email: credentials.email }, { number: credentials.number }],
          },
          include: {
            Balance: true, // Ensure Balance is included when fetching user
          },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              number: existingUser.number,
              email: existingUser.email,
              balance: existingUser.Balance, // Return balance if user exists
            };
          }
          return null;
        }

        try {
          const user = await db.user.create({
            data: {
              email: credentials.email,
              number: credentials.number,
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
            email: user.email,
            number: user.number,
            balance: user.Balance, // Return the newly created balance
          };
        } catch (e) {
          console.error(e);
        }

        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.number = user.number;
      }
      return token;
    },
    async session({ token, session }: any) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.number = token.number;
      return session;
    },
  },
};
