import { useEffect, useState } from "react";
import Head from "next/head";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

type Theme = "light" | "dark" | "system";

const THEME_STORAGE_KEY = "hoojun-blog-theme";

export function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    applyTheme(newTheme);
  };

  const applyTheme = (theme: Theme) => {
    const isDark = 
      theme === "dark" || 
      (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    document.querySelector("html")?.setAttribute(
      "data-theme", 
      isDark ? "myThemeDark" : "myTheme"
    );
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    const initialTheme = savedTheme || "system";
    setTheme(initialTheme);
    applyTheme(initialTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);
  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <Head>
        <meta name="theme-color" content="#77ca9f"></meta>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/asset/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/asset/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/asset/favicon-16x16.png"
        />
      </Head>
      <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
      <main className="flex-grow container max-w-3xl mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
