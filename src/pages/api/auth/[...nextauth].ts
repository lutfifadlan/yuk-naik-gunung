import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma"; // Adjust the import path as necessary
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req): Promise<{ id: string; name: string | null; email: string | null }> {
        // Ensure the required fields are provided
        if (!credentials?.email || !credentials.password) {
          throw new Error('Email and password are required');
        }

        // Find the user in the database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        }) as { id: number; name: string | null; email: string | null; emailVerified: Date | null; image: string | null; password: string };

        // If user is not found, throw an error
        if (!user) {
          throw new Error('No user found with the provided email');
        }

        // Compare the provided password with the hashed password in the database
        const isValidPassword = await bcrypt.compare(credentials.password, user.password!);

        if (!isValidPassword) {
          throw new Error('Incorrect password');
        }

        // Return user object if validation is successful
        return { id: user.id.toString(), name: user.name, email: user.email };
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        session.user = { ...session.user, id: token.id } as { name?: string | null | undefined; email?: string | null | undefined; image?: string | null | undefined; id?: string };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
  },
});
