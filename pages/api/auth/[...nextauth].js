// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
  },
  /*   pages: {
    signIn: "/auth/signin",
  }, */
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    logo: "/icons/ODOW.png", // Absolute URL to image
  },
};

const authHandler = NextAuth(authOptions);

export default async function handler(...params) {
  await authHandler(...params);
}
