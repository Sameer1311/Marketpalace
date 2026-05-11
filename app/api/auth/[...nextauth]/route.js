import User from "@/app/models/Users";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectMongoDB } from "@/lib/mongodb";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
  const { email, password } = credentials;

  try {
    await connectMongoDB();

    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    const user = await User.findOne({ email });

    console.log("USER:", user);

    if (!user) {
      console.log("No user found");
      return null;
    }

    console.log("DB PASSWORD:", user.password);

    const passwordsMatch = await bcrypt.compare(
      password,
      user.password
    );

    console.log("MATCH:", passwordsMatch);

    if (!passwordsMatch) {
      console.log("Password incorrect");
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };

  } catch (error) {
    console.log("AUTH ERROR:", error);
    return null;
  }
},
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };