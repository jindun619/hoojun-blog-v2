import { GetServerSideProps } from "next";

import { parseCookies } from "nookies";

import { verifyToken } from "@/utils/utils";

export default function AdminEditPage() {
  return (
    <div>
      <h1>AdminEditPage</h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const token = cookies["auth-token"];

  const isAuthenticated = verifyToken(token);

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
