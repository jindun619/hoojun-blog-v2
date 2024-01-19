import { GetServerSideProps } from "next";
import Link from "next/link";

import { parseCookies } from "nookies";

import { verifyToken } from "@/utils/utils";

export default function AdminPage() {
  return (
    <div className="mt-16 flex gap-3">
      <Link href="/admin/write">
        <button className="btn btn-neutral">게시글 작성</button>
      </Link>
      <Link href="/admin/edit">
        {/* 수정 페이지에서 삭제, 숨기기 기능 구현 */}
        <button className="btn btn-neutral">게시글 수정</button>
      </Link>
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
