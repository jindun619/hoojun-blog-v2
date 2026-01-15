# 블로그 포스트 작성 가이드

## 1. 새 포스트 생성

```bash
npm run new-post "포스트 제목" [카테고리]
```

**예시:**

```bash
npm run new-post "React 18 새로운 기능" tech
npm run new-post "오늘의 일기" diary
npm run new-post "메모" Memo
npm run new-post "사이드 프로젝트" 토이프로젝트
npm run new-post "잡담" anything
```

**자동으로 생성되는 것:**

- `posts/{번호}.md` - 다음 번호 자동 계산
- `public/post_images/{번호}/` - 이미지 폴더
- frontmatter 템플릿 (오늘 날짜 자동 입력)

---

## 2. 사용 가능한 카테고리

| 카테고리       | 설명             |
| -------------- | ---------------- |
| `tech`         | 기술 (기본값)    |
| `diary`        | 일기             |
| `Memo`         | 메모             |
| `anything`     | 잡다한 것        |
| `토이프로젝트` | 토이프로젝트     |

새 카테고리 추가: `lib/constants.ts` 파일 수정

---

## 3. Frontmatter 구조

```yaml
---
slug: "/20"
date: "2026-01-15"
title: "포스트 제목"
tags: ["React", "Next.js"] # 선택
category: "tech"
references: [] # 선택
hide: true # 선택 (숨김 처리)
coverImage: "/post_images/20/fi.png" # 선택
---
```

### 필드 설명

| 필드         | 필수 | 설명                                    |
| ------------ | ---- | --------------------------------------- |
| `slug`       | O    | 포스트 URL 경로 (예: "/20")             |
| `date`       | O    | 발행 날짜 (YYYY-MM-DD 형식)             |
| `title`      | O    | 포스트 제목                             |
| `category`   | O    | 카테고리                                |
| `tags`       | X    | 태그 배열                               |
| `references` | X    | 참고 자료 링크 배열                     |
| `hide`       | X    | true면 목록에서 숨김                    |
| `coverImage` | X    | 커스텀 커버 이미지 경로                 |

---

## 4. 이미지 추가

### 피처 이미지 (상단 대표 이미지)

```
public/post_images/{번호}/fi.png
```

### 본문 이미지

```markdown
![설명](/post_images/20/diagram.png)
```

### 커스텀 커버 이미지 (선택)

frontmatter에 `coverImage` 필드 추가:

```yaml
coverImage: "/post_images/20/custom-cover.jpg"
```

---

## 5. 빌드 시 자동 검증

`npm run build` 실행 시 자동으로 검사:

- 필수 필드 누락 (slug, date, title, category)
- 잘못된 카테고리
- 날짜 형식 오류 (YYYY-MM-DD)
- slug 중복

**경고 예시:**

```
⚠️  포스트 유효성 검사 경고:
   [20.md] 필수 필드 누락: title
   [21.md] 잘못된 카테고리: "wrong" (사용 가능: tech, diary, ...)
```

---

## 6. 워크플로우 요약

```
1. npm run new-post "제목" 카테고리
2. posts/{번호}.md 열어서 내용 작성
3. 이미지 추가 (필요시): public/post_images/{번호}/
4. npm run dev 로 미리보기
5. npm run build 로 검증
6. git push 로 배포
```

---

## 7. 관련 파일 구조

```
hoojun-blog-v2/
├── posts/                    # 포스트 마크다운 파일
│   ├── 1.md
│   ├── 2.md
│   └── ...
├── public/
│   └── post_images/          # 포스트별 이미지
│       ├── 1/
│       │   └── fi.png
│       └── 2/
│           └── fi.png
├── lib/
│   ├── constants.ts          # 카테고리/태그 상수
│   └── posts.tsx             # 포스트 로딩 및 검증
├── scripts/
│   └── new-post.js           # 포스트 생성 스크립트
└── types/
    └── types.d.ts            # TypeScript 타입 정의
```

---

## 8. 카테고리/태그 추가 방법

`lib/constants.ts` 파일을 수정:

```typescript
// 카테고리 추가
export const CATEGORIES = {
  tech: "기술",
  diary: "일기",
  Memo: "메모",
  anything: "잡다한 것",
  토이프로젝트: "토이프로젝트",
  // 새 카테고리 추가
  newCategory: "새 카테고리",
} as const;

// 태그 추가
export const TAGS = [
  "회고",
  "프로젝트",
  // 새 태그 추가
  "newTag",
] as const;
```

`scripts/new-post.js`의 `VALID_CATEGORIES` 배열도 함께 수정 필요.
