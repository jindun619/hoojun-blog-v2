import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

interface User {
  token: string;
}

const authenticateUser = (password: string): User | null => {
  // 여기에 사용자 인증 로직 구현
  // 예시를 위한 가짜 데이터
  if (password === process.env.ADMIN_PASSWORD) {
    return { token: process.env.ADMIN_TOKEN || "" };
  }
  return null;
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { password } = req.body;

  const user = authenticateUser(password);
  if (user) {
    setCookie({ res }, "auth-token", user.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
};
