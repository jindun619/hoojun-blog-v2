import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavbarProps {
  toggleTheme: () => void;
  currentTheme: "light" | "dark" | "system";
}

export function Navbar({ toggleTheme, currentTheme }: NavbarProps) {
  const router = useRouter();

  useEffect(() => {
    let prevScrollpos = window.scrollY;
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const navbar = document.querySelector(".navbar") as HTMLElement;
      if (navbar) {
        if (prevScrollpos > currentScrollPos) {
          navbar.style.top = "0";
        } else {
          navbar.style.top = "-80px";
        }
      }
      prevScrollpos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => router.pathname === path;

  return (
    <nav className="navbar sticky top-0 z-50 bg-primary/95 backdrop-blur-md shadow-sm transition-all duration-300 px-4 md:px-8">
      <div className="navbar-start">
        <Link
          href="/"
          className="text-xl font-bold text-primary-content hover:opacity-80 transition-opacity"
        >
          Hoojun.Kim
        </Link>
      </div>

      <div className="navbar-end gap-1">
        <Link
          href="/"
          className={`btn btn-ghost btn-sm font-medium text-primary-content hover:bg-primary-content/20 ${
            isActive("/") ? "bg-primary-content/10" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`btn btn-ghost btn-sm font-medium text-primary-content hover:bg-primary-content/20 ${
            isActive("/about") ? "bg-primary-content/10" : ""
          }`}
        >
          About
        </Link>

        <div className="divider divider-horizontal mx-1 h-6 self-center before:bg-primary-content/30 after:bg-primary-content/30"></div>

        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-sm btn-square text-primary-content hover:bg-primary-content/20"
          aria-label="테마 전환"
        >
          {currentTheme === "dark" ||
          (currentTheme === "system" &&
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-color-scheme: dark)").matches) ? (
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
    </nav>
  );
}
