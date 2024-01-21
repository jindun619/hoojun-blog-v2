import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";

import { parseCookies } from "nookies";
import axios from "axios";

import { Post } from "@/components/Post";

import { verifyToken, markdownToHtml } from "@/utils/utils";

import { getSortedPostsData } from "../../../lib/posts";

function isEmpty(value: string): boolean;
function isEmpty(value: string[]): boolean;
function isEmpty(value: any): boolean {
  if (typeof value === "string") {
    return value.length === 0;
  } else if (Array.isArray(value)) {
    return value.length === 0;
  }
  throw new Error("Invalid input");
}

interface InputValues {
  category: string;
  title: string;
  content: string;
  tags: string[];
  references: string[];
}
interface AdminWirtePageProps {
  allCategories: string[];
  allTags: string[];
}
export default function AdminWritePage({
  allCategories,
  allTags,
}: AdminWirtePageProps) {
  const [inputValues, setInputValues] = useState<InputValues>({
    category: "",
    title: "",
    content: "",
    tags: [],
    references: [],
  });
  const [html, setHtml] = useState<string>("");
  const [isCategorySelectable, setIsCategorySelectable] =
    useState<boolean>(true);
  const [tagInput, setTagInput] = useState<string>("");
  const [referenceInput, setReferenceInput] = useState<string>("");
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    e.preventDefault();
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const toggleCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsCategorySelectable((prev) => !prev);
    setInputValues((prev) => ({
      ...prev,
      category: "",
    }));
  };

  //TAG Handlers
  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    if (inputValues.tags.includes(e.target.value)) {
      alert(`#${e.target.value} already exists!`);
    } else {
      setInputValues((prev) => ({
        ...prev,
        tags: [...prev.tags, e.target.value],
      }));
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTagInput(e.target.value);
  };

  const handleTagSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (tagInput.length === 0) {
      alert("tag name is empty!");
    } else if (inputValues.tags.includes(tagInput)) {
      alert(`#${tagInput} already exists!`);
    } else {
      setInputValues((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput],
      }));
      setTagInput("");
    }
  };

  //Reference Handlers
  const handleReferenceInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setReferenceInput(e.target.value);
  };

  const handleReferenceSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (referenceInput.length === 0) {
      alert("reference is empty!");
    } else if (inputValues.references.includes(referenceInput)) {
      alert(`${referenceInput} already exists!`);
    } else {
      setInputValues((prev) => ({
        ...prev,
        references: [...prev.references, referenceInput],
      }));
      setReferenceInput("");
    }
  };

  const handlePostSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSubmitLoading(true);

    const isInputsValid: boolean =
      !isEmpty(inputValues.category) &&
      !isEmpty(inputValues.title) &&
      !isEmpty(inputValues.content);
    if (isInputsValid) {
      axios
        .post("/api/uploadPost", inputValues)
        .then((res) => {
          setSubmitLoading(false);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("inputs not valid!");
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const content = inputValues.content;
      const convertedHtml = await markdownToHtml(content);
      setHtml(convertedHtml);
    })();
  }, [inputValues.content]);

  const date = new Date();

  const categoryMessage = "Select a category";
  const tagMessage = "Select a tag";

  return (
    <>
      <form className="form-control w-full max-w-lg mx-auto px-1 md:px-0">
        {/* Category */}
        <div className="label">
          <span className="label-text">카테고리</span>
        </div>
        {isCategorySelectable ? (
          <div className="flex gap-3">
            <select
              name="category"
              className="select select-bordered max-w-xs"
              onChange={handleInputChange}
              defaultValue={categoryMessage}>
              <option disabled>{categoryMessage}</option>
              {allCategories.map((it, idx) => (
                <option key={idx} value={it}>
                  {it}
                </option>
              ))}
            </select>
            <button
              className="btn btn-square btn-outline"
              onClick={toggleCategory}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          </div>
        ) : (
          ""
        )}
        {!isCategorySelectable ? (
          <div className="flex gap-3">
            <input
              type="text"
              name="category"
              className="input input-bordered"
              onChange={handleInputChange}
              placeholder="create new one"
            />
            <button
              className="btn btn-square btn-outline"
              onClick={toggleCategory}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          </div>
        ) : (
          ""
        )}
        {/* Title */}
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
        {/* Content */}
        <div className="label">
          <span className="label-text">내용</span>
        </div>
        <textarea
          name="content"
          className="textarea textarea-bordered h-96"
          onChange={handleInputChange}
          placeholder="내용을 입력하세요"></textarea>
        {/* Tags */}
        <div className="label">
          <span className="label-text">태그</span>
        </div>
        <div className="flex items-center gap-3">
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={handleTagChange}
            defaultValue={tagMessage}>
            <option disabled>{tagMessage}</option>
            {allTags.map((it, idx) => (
              <option key={idx} value={it}>
                {it}
              </option>
            ))}
          </select>
          OR
          <input
            type="text"
            className="input input-bordered"
            onChange={handleTagInputChange}
            value={tagInput}
            placeholder="create new one"
          />
          <button
            className="btn btn-square btn-outline"
            onClick={handleTagSubmit}>
            Create
          </button>
        </div>
        <div className="mt-3 flex gap-3">
          {inputValues.tags.map((it, idx) => (
            <p key={idx} className="font-bold">
              #{it}
            </p>
          ))}
        </div>
        {/* References */}
        <div className="label">
          <span className="label-text">참고</span>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            className="input input-bordered"
            onChange={handleReferenceInputChange}
            value={referenceInput}
            placeholder="input a reference"
          />
          <button
            className="btn btn-square btn-outline"
            onClick={handleReferenceSubmit}>
            Create
          </button>
        </div>
        <div className="mt-3">
          {inputValues.references.map((it, idx) => (
            <p key={idx} className="text-primary">
              {it}
            </p>
          ))}
        </div>
        {/* Submit */}
        <button className="mt-3 btn btn-neutral" onClick={handlePostSubmit}>
          {submitLoading ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            "제출"
          )}
        </button>
      </form>
      <div className="divider divider-neutral">PREVIEW</div>
      <Post
        slug="/0"
        title={inputValues.title}
        category={inputValues.category}
        tags={inputValues.tags}
        date={date.toISOString().substring(0, 10)}
        references={inputValues.references}
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

  const allPostsData = getSortedPostsData();
  //get all categories/tags list
  const allCategories = [
    ...new Set(allPostsData.map((item) => item.frontmatter.category)),
  ];
  const tagsSet = new Set<string>();
  allPostsData.forEach((item) => {
    item.frontmatter.tags.forEach((tag: string) => {
      if (tag) {
        tagsSet.add(tag);
      }
    });
  });
  const allTags = [...tagsSet];

  return { props: { allCategories, allTags } };
};
