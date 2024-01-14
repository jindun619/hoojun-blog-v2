import { Navbar } from "./Navbar";
import { useEffect } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", "winter");
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto h-full">{children}</div>;
    </div>
  );
}
