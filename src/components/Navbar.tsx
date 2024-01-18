import { useState, useEffect } from "react";
import Link from "next/link";

import { useRecoilState } from "recoil";
import { navbarParamsState } from "@/recoil/state";

import { CategoryBtn } from "./CategoryBtn";
import { TagBtn } from "./TagBtn";

export function Navbar() {
  const [navbarParams] = useRecoilState(navbarParamsState);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    setCategories([...new Set(navbarParams.map((item) => item.category))]);

    const tagsSet = new Set<string>();
    navbarParams.forEach((item) => {
      item.tags.forEach((tag) => {
        if (tag) {
          tagsSet.add(tag);
        }
      });
    });
    setTags([...tagsSet]);
  }, [navbarParams]);

  useEffect(() => {
    var prevScrollpos = window.scrollY;
    window.onscroll = function () {
      var currentScrollPos = window.scrollY;
      if (prevScrollpos > currentScrollPos) {
        (document.querySelector(".navbar") as HTMLElement).style.top = "0";
      } else {
        (document.querySelector(".navbar") as HTMLElement).style.top = "-100px";
      }
      prevScrollpos = currentScrollPos;
    };
  });

  return (
    <div className="navbar bg-primary sticky top-0 z-10">
      <div className="navbar-start">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer"
              className="btn btn-primary btn-circle drawer-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 ml-0 w-80 min-h-full bg-base-200">
              <article className="prose m-5">
                <h1>
                  Categories
                  <div className="badge badge-ghost">{categories.length}</div>
                </h1>
              </article>
              {categories
                ? categories.map((it, idx) => (
                    <Link key={idx} href={`/category/${it}`}>
                      <li className="my-2">
                        <CategoryBtn name={it} isActive={true} />
                      </li>
                    </Link>
                  ))
                : ""}
              <article className="prose m-5">
                <h1>
                  Tags
                  <div className="badge badge-ghost">{tags.length}</div>
                </h1>
              </article>
              {tags
                ? tags.map((it, idx) => (
                    <li key={idx} className="my-2">
                      <TagBtn name={it} href={`/tag/${it}`} isActive={true} />
                    </li>
                  ))
                : ""}
            </ul>
          </div>
        </div>
      </div>
      {/**********/}
      <div className="navbar-center">
        <button className="btn btn-primary normal-case text-xl">
          <Link href="/">Hoojun.Kim</Link>
        </button>
      </div>
      <div className="navbar-end">
        {/* search btn zan shi bu yong  */}
        {/* <button className="btn btn-primary btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button> */}
      </div>
    </div>
  );
}
