import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import type { NextAuthOptions } from "next-auth";
import axios from "axios";

type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials" as string,
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const val = await axios.post(process.env.API_BASE_URL + "/api/login", {
          email,
          password,
        });

        if (!val.data || !val.data.id) {
          throw new Error("Invalid Credentials (missing id)");
        }

        return {
          id: val.data.id,
          name: val.data.username,
          email: val.data.email,
          image: val.data.pfp,
        };
      },
    }),
  ],
  callbacks: {
    // @ts-ignore
    async jwt({ token, user, session, account }) {
      if (account?.provider === "google") {
        return {
          ...token,
          sub: account.sub,
        };
      }
      return token;
    },
    async session({ session, token, user }) {

      
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },

    async signIn({ account, profile, credentials }) {
      if (account?.provider === "google") {
        const resp = await axios.post(
          process.env.API_BASE_URL + "/api/register",
          {
            email: profile?.email,
            username: profile?.name,
            // @ts-ignore
            pfp: profile?.picture as string,
          }
        );
        account.sub = resp?.data?.id;
      }

      return true;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

// export default NextAuth(authOptions);

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
