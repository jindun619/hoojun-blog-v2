import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";

import { parseCookies } from "nookies";

import { Post } from "@/components/Post";

import { verifyToken } from "@/utils/utils";

import { markdownToHtml } from "@/utils/utils";

interface InputValues {
  title: string;
  content: string;
}
export default function AdminWritePage() {
  const [inputValues, setInputValues] = useState<InputValues>({
    title: "",
    content: "",
  });
  const [html, setHtml] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    (async () => {
      const content = inputValues.content;
      const convertedHtml = await markdownToHtml(content);
      setHtml(convertedHtml);
    })();
  }, [inputValues.content]);

  return (
    <>
      <form className="form-control w-full max-w-lg mx-auto px-1 md:px-0">
        <div className="label">
          <span className="label-text">제목</span>
        </div>
        <input
          type="text"
          name="title"
          className="input input-bordered w-full"
          onChange={handleInputChange}
          placeholder="제목을 입력하세요."
        />
        <div className="label">
          <span className="label-text">내용</span>
        </div>
        <textarea
          name="content"
          className="textarea textarea-bordered h-96"
          onChange={handleInputChange}
          placeholder="내용을 입력하세요"></textarea>
      </form>
      <Post
        slug="/1"
        title={inputValues.title}
        category="category"
        tags={["tag"]}
        date="2222-22-22"
        references={["reference"]}
        html={html}
      />
    </>
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
