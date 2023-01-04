import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("Please provide process.env.NEXTAUTH_SECRET");
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials.");
        }
        const { email, password } = credentials;
        if (password === "password") {
          return {
            id: "1",
            email: email,
            name: "Test User",
          };
        }
        return null;
      },
    }),
  ],
});
