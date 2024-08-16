import type { NextAuthOptions, Session as NextAuthSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import prisma from "@/db";

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
        if (!credentials) return null;

        const { email, password } = credentials;

        try {
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

          if (!user) return null;

          if (
            user.password &&
            (await bcrypt.compare(password, user.password))
          ) {
            return {
              id: user.id.toString(),
              username: user.username,
              provider: user.provider,
              email,
            };
          }
        } catch (error) {
          console.error("Error during authentication: ", error);
        }
        return null;
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
      if (account?.provider === "google") {
        const username = user.name ?? "";
        const email = user.email ?? "";
        const image = user.image ?? "";

        const existingUser = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              username,
              email,
              provider: account?.provider,
              image,
            },
          });
        }
      }
      return true;
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
