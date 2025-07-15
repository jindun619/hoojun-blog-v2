import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer footer-center p-8 bg-base-200 text-base-content mt-16">
      <div className="grid grid-flow-col gap-4 mb-4">
        <Link href="/" className="link link-hover font-medium">
          홈
        </Link>
        <Link
          href="https://github.com/jindun619"
          className="link link-hover font-medium"
        >
          GitHub
        </Link>
        <Link
          href="mailto:jindun619@naver.com"
          className="link link-hover font-medium"
        >
          연락하기
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm">
          © {new Date().getFullYear()}{" "}
          <Link
            className="font-medium text-primary hover:underline"
            href="https://github.com/jindun619"
          >
            Hoojun
          </Link>
        </p>
        <span className="text-xs">•</span>
        <p className="text-sm flex items-center gap-1">
          Built with
          <Link
            href="https://nextjs.org/"
            className="inline-flex items-center hover:text-primary transition-colors"
          >
            <svg
              height="14"
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              viewBox="0 0 394.00000000000006 79.433"
              className="fill-current"
            >
              <path d="M261.919.033h68.628V12.7h-27.224v66.639H289.71V12.7h-27.791V.033zM149.052.033V12.7h-55.01v20.377h44.239v12.667H94.042v20.928h55.01V79.34H80.43V12.7h-.006V.033h68.628zM183.32.066h-17.814l63.806 79.306h17.866l-31.907-39.626L247.127.126l-17.815.028-22.96 28.516L183.32.066zM201.6 56.715l-8.921-11.092-27.224 33.81h17.865l18.28-22.718z" />
              <path
                clipRule="evenodd"
                d="M80.907 79.339L17.015 0H0v79.306h13.612V16.952l50.195 62.387h17.1z"
                fillRule="evenodd"
              />
            </svg>
          </Link>
        </p>
      </div>
    </footer>
  );
}
