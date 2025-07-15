import { SEO } from "@/components/SEO";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <SEO title="About" description="김호준에 대해 알아보세요" />

      <div className="max-w-4xl mx-auto py-10">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* 프로필 이미지 */}
          <div className="avatar">
            <div className="relative w-40 h-40 rounded-xl ring ring-primary ring-offset-base-100 ring-offset-4 overflow-hidden">
              <Image
                src="/asset/bio-image.PNG"
                alt="김호준 프로필 이미지"
                fill={true}
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* 기본 정보 */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4 text-center md:text-left">
              김호준 <span className="text-primary">@jindun619</span>
            </h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="badge badge-outline">풀스택 개발자</span>
            </div>
            <p className="text-lg mb-6 text-base-content/80">
              안녕하세요! 상해교통대학교에서 정보통신공학을 전공하고 있는
              김호준입니다. 풀스택 개발자로 성장하기 위해, 다양한 기술을 배우고
              프로젝트에 적용하는 데에 열정을 가지고 있습니다.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                href="https://github.com/jindun619"
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </Link>
              <Link
                href="mailto:jindun619@naver.com"
                className="btn btn-secondary"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
                </svg>
                이메일
              </Link>
            </div>
          </div>
        </div>

        {/* 교육 섹션 */}
        <div className="mt-16">
          <div className="divider">
            <h2 className="text-2xl font-bold">교육</h2>
          </div>
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-bold">상해교통대학교</h3>
                  <p className="text-base-content/70">전자정보 및 전기공학부</p>
                  <p className="text-base-content/80 font-medium">
                    정보통신공학 학사
                  </p>
                </div>
                <div className="badge badge-lg">2020.09 - 2026.06</div>
              </div>
              <div className="divider my-2"></div>
              <div>
                <p className="font-medium mb-2">병역:</p>
                <div className="flex items-center gap-2">
                  <span className="badge badge-primary">대한민국 공군</span>
                  <span>2022.09 - 2024.06</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 수상 경력 섹션 */}
        <div className="mt-16">
          <div className="divider">
            <h2 className="text-2xl font-bold">수상 경력</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body p-4">
                <div className="flex justify-between items-start">
                  <h3 className="card-title text-lg">본과 3등 장학금</h3>
                  <span className="badge badge-primary">4회 수상</span>
                </div>
                <p className="text-base-content/70">상해교통대학교</p>
                <p className="text-sm text-base-content/50">2020 - 2026</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body p-4">
                <h3 className="card-title text-lg">
                  중국 대학생 혁신 대회 국가급 후보로 추천
                </h3>
                <p className="text-base-content/70">
                  OpenVINO를 활용한 시각장애인 보조 시스템
                </p>
                <p className="text-sm text-base-content/50">2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* 기술 스택 섹션 */}
        <div className="mt-16">
          <div className="divider">
            <h2 className="text-2xl font-bold">기술 스택</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body p-4">
                <h3 className="card-title text-lg">언어</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="badge badge-primary">TypeScript</span>
                  <span className="badge badge-primary">C++</span>
                  <span className="badge badge-primary">Python</span>
                </div>
              </div>
            </div>
            <div className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body p-4">
                <h3 className="card-title text-lg">프론트엔드</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="badge badge-secondary">React</span>
                  <span className="badge badge-secondary">React Native</span>
                  <span className="badge badge-secondary">Next.js</span>
                </div>
              </div>
            </div>
            <div className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body p-4">
                <h3 className="card-title text-lg">백엔드</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="badge badge-accent">Spring Boot</span>
                  <span className="badge badge-accent">Flask</span>
                  <span className="badge badge-accent">MySQL</span>
                </div>
              </div>
            </div>
            <div className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body p-4">
                <h3 className="card-title text-lg">언어 능력</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="badge">한국어 (모국어)</span>
                  <span className="badge">중국어 (유창)</span>
                  <span className="badge">영어 (능숙)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 프로젝트 섹션 */}
        <div className="mt-16">
          <div className="divider">
            <h2 className="text-2xl font-bold">프로젝트</h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <h3 className="card-title">
                    OpenVINO를 활용한 AIGC와 LLM 응용
                  </h3>
                  <span className="badge badge-primary">2024.09 - 2025.05</span>
                </div>
                <p className="text-base-content/70 mb-4">
                  시각장애인을 위한 빠른 환경 설명 및 위험 감지 장치 개발.
                  카메라 이미지를 인식하고 음성으로 출력합니다.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="badge badge-outline">AWS EC2</span>
                  <span className="badge badge-outline">Flask</span>
                  <span className="badge badge-outline">OpenVINO</span>
                  <span className="badge badge-outline">LLaVA</span>
                </div>
                <ul className="list-disc list-inside text-base-content/70 mb-4">
                  <li>서버 아키텍처 설계 및 배포</li>
                  <li>모델 추론 성능 최적화</li>
                  <li>저지연 응답 보장</li>
                </ul>
                <div className="card-actions justify-end mt-4">
                  <span className="badge badge-accent">
                    중국 대학생 혁신 대회 국가급 후보로 추천
                  </span>
                  <Link
                    href="https://github.com/jindun619/openvino-flask-server"
                    className="btn btn-outline btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </Link>
                </div>
              </div>
            </div>

            <div className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <h3 className="card-title">Movie App (모바일)</h3>
                  <span className="badge badge-primary">2024.08</span>
                </div>
                <p className="text-base-content/70 mb-4">
                  영화, TV 시리즈 및 배우 정보를 보여주는 크로스 플랫폼 모바일
                  애플리케이션입니다.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="badge badge-outline">React Native</span>
                  <span className="badge badge-outline">TypeScript</span>
                  <span className="badge badge-outline">React Navigation</span>
                  <span className="badge badge-outline">React Query</span>
                  <span className="badge badge-outline">Styled Components</span>
                </div>
                <ul className="list-disc list-inside text-base-content/70 mb-4">
                  <li>홈페이지, 검색, 상세 페이지 개발</li>
                  <li>다크 모드 및 무한 스크롤 구현</li>
                  <li>React Query 캐싱 최적화</li>
                </ul>
                <div className="card-actions justify-end mt-4">
                  <Link
                    href="https://github.com/jindun619/movie-app"
                    className="btn btn-outline btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </Link>
                </div>
              </div>
            </div>

            <div className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <h3 className="card-title">Movie Web (웹)</h3>
                  <span className="badge badge-primary">2023.10</span>
                </div>
                <p className="text-base-content/70 mb-4">
                  영화 정보 검색 및 추천 기능을 제공하는 웹 플랫폼입니다.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="badge badge-outline">Next.js</span>
                  <span className="badge badge-outline">TypeScript</span>
                  <span className="badge badge-outline">TMDB API</span>
                  <span className="badge badge-outline">Recoil</span>
                  <span className="badge badge-outline">TailwindCSS</span>
                </div>
                <ul className="list-disc list-inside text-base-content/70 mb-4">
                  <li>컴포넌트화 설계 및 데이터 렌더링 최적화</li>
                  <li>전역 상태 관리</li>
                  <li>반응형 UI 구현</li>
                </ul>
                <div className="card-actions justify-end mt-4">
                  <Link
                    href="https://github.com/jindun619/movie-web"
                    className="btn btn-outline btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 자격증 섹션 */}
        <div className="mt-16">
          <div className="divider">
            <h2 className="text-2xl font-bold">자격증</h2>
          </div>
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <ul className="list-disc list-inside">
                <li className="mb-2">
                  <span className="font-medium">정보처리기능사</span>
                  <span className="text-base-content/70 ml-2">
                    (한국산업인력공단)
                  </span>
                </li>
                <li className="mb-2">
                  <span className="font-medium">TOEFL:</span>
                  <span className="text-base-content/70 ml-2">90점</span>
                </li>
                <li className="mb-2">
                  <span className="font-medium">HSK 6급:</span>
                  <span className="text-base-content/70 ml-2">238점</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 기타 경험 섹션 */}
        <div className="mt-16">
          <div className="divider">
            <h2 className="text-2xl font-bold">기타 경험</h2>
          </div>
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <ul className="list-disc list-inside">
                <li className="mb-2">
                  <span className="font-medium">
                    2023 성남시 장애인 잡업박람회 지원봉사
                  </span>
                </li>
                <li className="mb-2">
                  <span className="font-medium">2020 상해 마라톤 지원봉사</span>
                </li>
                <li className="mb-2">
                  <span className="font-medium">
                    2020 상해교통대학교 신입생컵 축구대회 우승 및 최우수선수상
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 연락처 섹션 */}
        <div className="mt-16">
          <div className="divider">
            <h2 className="text-2xl font-bold">연락처</h2>
          </div>
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1">
                  <p className="mb-4">
                    프로젝트 협업이나 문의사항이 있으시면 언제든지 연락 주세요!
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <span>jindun619@naver.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        ></path>
                      </svg>
                      <Link
                        href="https://github.com/jindun619"
                        className="link link-hover"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        github.com/jindun619
                      </Link>
                    </div>
                  </div>
                </div>
                <div>
                  <Link
                    href="mailto:jindun619@naver.com"
                    className="btn btn-primary btn-lg"
                  >
                    이메일 보내기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 블로그로 돌아가기 */}
        <div className="mt-16 text-center">
          <Link href="/" className="btn btn-outline btn-wide">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"
              ></path>
            </svg>
            블로그로 돌아가기
          </Link>
        </div>
      </div>
    </>
  );
}
