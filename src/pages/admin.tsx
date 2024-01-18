import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

const verifyToken = (token: string) => {
  // 토큰 검증 로직 구현
  return token === process.env.ADMIN_TOKEN;
};

export default function AdminPage() {
  return <h1>hi</h1>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const token = cookies["auth-token"];

  const isAuthenticated = verifyToken(token);

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
