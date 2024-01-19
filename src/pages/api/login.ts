import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

interface User {
  token: string;
}

const authenticateUser = (password: string): User | null => {
  if (password === process.env.ADMIN_PASSWORD) {
    return { token: process.env.ADMIN_TOKEN || "" };
  }
  return null;
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { password } = req.body;

    const user = authenticateUser(password);
    if (user) {
      setCookie({ res }, "auth-token", user.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  }
};
