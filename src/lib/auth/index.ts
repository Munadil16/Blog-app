import type { NextAuthOptions, Session as NextAuthSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import prisma from "@/db";
import { SignInType, signInSchema } from "../schemas/signInSchema";

type GoogleProviderOptions = {
  clientId: string;
  clientSecret: string;
};

export interface Session extends NextAuthSession {
  user: {
    id: string;
    email: string;
    name: string;
    image: string;
  };
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { success, error, data } = signInSchema.safeParse(credentials);

          if (!success) {
            throw new Error(error.errors[0].message);
          }

          const { email, password }: SignInType = data;

          const user = await prisma.user.findFirst({
            where: {
              email,
            },
            select: {
              id: true,
              username: true,
              password: true,
              provider: true,
            },
          });

          if (!user) {
            throw new Error("User not found");
          }

          if (!user.password) {
            throw new Error("Try signing in with Google");
          }

          if (await bcrypt.compare(password, user.password)) {
            return {
              id: user.id.toString(),
              name: user.username,
              email,
            };
          } else {
            throw new Error("Incorrect password");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } as GoogleProviderOptions),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          const existingUser = await prisma.user.findFirst({
            where: {
              email: user.email ?? "",
            },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                username: user.name ?? "",
                email: user.email ?? "",
                provider: account?.provider,
                image: user.image ?? "",
              },
            });
          }
        }
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    async session({ session, token }) {
      const customSession = session as Session;

      if (customSession.user) {
        customSession.user.id = token.sub as string;
      }

      return session;
    },
  },
} satisfies NextAuthOptions;
