import { useState, useEffect } from "react";
import Link from "next/link";

import { useRecoilState } from "recoil";
import { navbarParamsState } from "@/recoil/state";

interface NavbarParams {
  category: string;
  tags: string[];
}

interface NavbarProps {
  toggleTheme: () => void;
  currentTheme: "light" | "dark" | "system";
}

import { CategoryBtn } from "./CategoryBtn";
import { TagBtn } from "./TagBtn";

export function Navbar({ toggleTheme, currentTheme }: NavbarProps) {
  const [navbarParams] = useRecoilState<NavbarParams[]>(navbarParamsState);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    setCategories([
      ...new Set(navbarParams.map((item: NavbarParams) => item.category)),
    ]);

    const tagsSet = new Set<string>();
    navbarParams.forEach((item: NavbarParams) => {
      item.tags.forEach((tag: string) => {
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
    <div className="navbar bg-primary sticky top-0 z-10 shadow-md backdrop-blur-sm bg-opacity-95 transition-all duration-300">
      <div className="navbar-start">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer"
              className="btn btn-ghost btn-circle drawer-button hover:bg-primary-content/20 text-primary-content"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
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
            <ul className="menu p-6 ml-0 w-80 min-h-full bg-base-100 shadow-lg">
              <div className="flex flex-col gap-2 mb-8">
                <h2 className="text-2xl font-bold text-primary">Hoojun.Kim</h2>
                <p className="text-sm text-base-content/70">개발 블로그</p>
              </div>
              <div className="divider"></div>
              <article className="mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                  Categories
                  <div className="badge badge-primary badge-sm">
                    {categories.length}
                  </div>
                </h3>
                <div className="flex flex-col gap-1">
                  {categories
                    ? categories.map((it, idx) => (
                        <Link key={idx} href={`/category/${it}`}>
                          <div className="pl-2">
                            <CategoryBtn name={it} isActive={true} />
                          </div>
                        </Link>
                      ))
                    : ""}
                </div>
              </article>
              <div className="divider"></div>
              <article className="mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                  Tags
                  <div className="badge badge-secondary badge-sm">
                    {tags.length}
                  </div>
                </h3>
                <div className="flex flex-wrap gap-2 pl-2">
                  {tags
                    ? tags.map((it, idx) => (
                        <TagBtn
                          key={idx}
                          name={it}
                          href={`/tag/${it}`}
                          isActive={true}
                        />
                      ))
                    : ""}
                </div>
              </article>
            </ul>
          </div>
        </div>
      </div>
      <div className="navbar-center">
        <Link
          href="/"
          className="btn btn-ghost normal-case text-xl font-bold text-primary-content hover:bg-primary-content/20"
        >
          Hoojun.Kim
        </Link>
      </div>
      <div className="navbar-end flex gap-2">
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle hover:bg-primary-content/20"
          aria-label="테마 전환"
        >
          {currentTheme === "dark" ||
          (currentTheme === "system" &&
            typeof window !== "undefined" &&
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches) ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-primary-content"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-primary-content"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
