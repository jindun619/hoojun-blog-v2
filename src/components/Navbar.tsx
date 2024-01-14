import { useEffect } from "react";
import Link from "next/link";
import { CategoryBtn } from "./CategoryBtn";

export function Navbar() {
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

  // const categories = data.distinct.map((it, idx) => (
  //   <Link key={idx} to={`/category=${it}`}>
  //     <li className="my-2">
  //       <CategoryBtn name={it} isActive={true} />
  //     </li>
  //   </Link>
  // ));

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
                  <div className="badge badge-ghost">
                    {/* {data.distinct.length} */}
                  </div>
                </h1>
              </article>
              {/* {categories} */}
            </ul>
          </div>
        </div>
      </div>
      {/**********/}
      <div className="navbar-center">
        <Link href="/" className="btn btn-primary normal-case text-xl">
          Hoojun.Kim
        </Link>
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
