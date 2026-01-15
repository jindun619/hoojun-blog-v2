#!/usr/bin/env node

/**
 * 새 블로그 포스트 생성 스크립트
 *
 * 사용법:
 *   npm run new-post "포스트 제목" [카테고리]
 *
 * 예시:
 *   npm run new-post "React 18 새로운 기능" tech
 *   npm run new-post "오늘의 일기" diary
 *   npm run new-post "메모" (카테고리 기본값: tech)
 */

const fs = require("fs");
const path = require("path");

// 카테고리 목록 (lib/constants.ts와 동기화)
const VALID_CATEGORIES = ["tech", "diary", "Memo", "anything", "토이프로젝트"];

// 인자 파싱
const args = process.argv.slice(2);
const title = args[0];
const category = args[1] || "tech";

// 유효성 검사
if (!title) {
  console.error("\x1b[31m오류: 포스트 제목을 입력해주세요.\x1b[0m");
  console.log("\n사용법: npm run new-post \"포스트 제목\" [카테고리]");
  console.log("예시: npm run new-post \"React 18 새로운 기능\" tech");
  console.log(`\n사용 가능한 카테고리: ${VALID_CATEGORIES.join(", ")}`);
  process.exit(1);
}

if (!VALID_CATEGORIES.includes(category)) {
  console.error(`\x1b[31m오류: 잘못된 카테고리입니다: ${category}\x1b[0m`);
  console.log(`사용 가능한 카테고리: ${VALID_CATEGORIES.join(", ")}`);
  process.exit(1);
}

// posts 디렉토리 경로
const postsDir = path.join(__dirname, "..", "posts");
const postImagesDir = path.join(__dirname, "..", "public", "post_images");

// 다음 포스트 번호 계산
function getNextPostNumber() {
  const files = fs.readdirSync(postsDir);
  const numbers = files
    .filter((f) => f.endsWith(".md"))
    .map((f) => parseInt(f.replace(".md", ""), 10))
    .filter((n) => !isNaN(n));

  if (numbers.length === 0) return 1;
  return Math.max(...numbers) + 1;
}

// 오늘 날짜 (YYYY-MM-DD)
function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 포스트 템플릿 생성
function createPostTemplate(postNumber, title, category, date) {
  return `---
slug: "/${postNumber}"
date: "${date}"
title: "${title}"
tags: []
category: "${category}"
references: []
---

여기에 내용을 작성하세요.
`;
}

// 메인 실행
const postNumber = getNextPostNumber();
const date = getTodayDate();
const postPath = path.join(postsDir, `${postNumber}.md`);
const imageDir = path.join(postImagesDir, String(postNumber));

// 포스트 파일 생성
const template = createPostTemplate(postNumber, title, category, date);
fs.writeFileSync(postPath, template, "utf8");

// 이미지 디렉토리 생성
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

// 성공 메시지
console.log("\x1b[32m✓ 새 포스트가 생성되었습니다!\x1b[0m\n");
console.log(`  파일: posts/${postNumber}.md`);
console.log(`  이미지 폴더: public/post_images/${postNumber}/`);
console.log(`  URL: /post/${postNumber}`);
console.log(`\n\x1b[33m다음 단계:\x1b[0m`);
console.log(`  1. posts/${postNumber}.md 파일을 열어 내용을 작성하세요.`);
console.log(`  2. 피처 이미지를 추가하려면 public/post_images/${postNumber}/fi.png 파일을 추가하세요.`);
console.log(`  3. npm run dev 로 미리보기를 확인하세요.`);
