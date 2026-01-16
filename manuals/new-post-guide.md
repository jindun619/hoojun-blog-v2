# 새 포스트 작성 가이드

## 빠른 시작

```bash
npm run new-post "포스트 제목" [카테고리]
```

**예시:**
```bash
npm run new-post "React 18 새로운 기능" tech
npm run new-post "오늘의 일기" diary
npm run new-post "메모" Memo
npm run new-post "사이드 프로젝트" 토이프로젝트
```

> 카테고리 생략 시 기본값은 `tech`입니다.

---

## 1. 포스트 구조

포스트는 `/posts/` 디렉토리에 마크다운 파일로 저장됩니다.

```
posts/
├── 1.md
├── 2.md
├── 3.md
└── ...
```

- **파일명**: 숫자만 사용 (1.md, 2.md, 3.md, ...)
- **확장자**: `.md` (마크다운)

---

## 2. Frontmatter 필드

포스트 파일 상단에 YAML 형식의 메타데이터를 작성합니다.

### 필수 필드

| 필드 | 타입 | 설명 | 예시 |
|------|------|------|------|
| `slug` | string | 포스트 URL 경로 | `"/20"` |
| `date` | string | 발행 날짜 | `"2025-01-15"` |
| `title` | string | 포스트 제목 | `"3학년 2학기 회고"` |
| `category` | string | 카테고리 | `"diary"` |

### 선택 필드

| 필드 | 타입 | 설명 | 예시 |
|------|------|------|------|
| `tags` | string[] | 태그 배열 | `["회고", "프로젝트"]` |
| `references` | string[] | 참고 자료 링크 | `["https://example.com"]` |
| `hide` | boolean | true면 목록에서 숨김 | `true` |
| `coverImage` | string | 커스텀 커버 이미지 | `"/post_images/20/custom.jpg"` |

### 사용 가능한 카테고리

| 값 | 표시명 |
|---|--------|
| `tech` | 기술 (기본값) |
| `diary` | 일기 |
| `Memo` | 메모 |
| `anything` | 잡다한 것 |
| `토이프로젝트` | 토이프로젝트 |

---

## 3. 포스트 템플릿

```markdown
---
slug: "/20"
date: "2025-01-15"
title: "포스트 제목"
tags: ["태그1", "태그2"]
category: "tech"
references: []
---

# 포스트 제목

여기에 본문을 작성합니다.

## 소제목

본문 내용...

![이미지 설명](/post_images/20/image.png)
```

---

## 4. 이미지 추가

이미지는 `/public/post_images/{포스트번호}/` 디렉토리에 저장합니다.

```
public/post_images/
└── 20/
    ├── fi.png        ← 피처 이미지 (상단 대표 이미지)
    ├── diagram.png   ← 본문 이미지
    └── screenshot.png
```

### 피처 이미지 (선택)

- 파일명: `fi.png` (또는 fi.jpg)
- 위치: `public/post_images/{번호}/fi.png`
- 자동으로 포스트 상단에 표시됨

### 본문 이미지

마크다운 문법으로 삽입:
```markdown
![이미지 설명](/post_images/20/diagram.png)
```

### 커스텀 커버 이미지

frontmatter에서 지정:
```yaml
coverImage: "/post_images/20/custom-cover.jpg"
```

---

## 5. 작성 워크플로우

```
1. 포스트 생성
   └─ npm run new-post "제목" 카테고리

2. 파일 편집
   └─ posts/{번호}.md 열기
   └─ frontmatter 확인/수정
   └─ 마크다운 본문 작성

3. 이미지 추가 (필요시)
   └─ public/post_images/{번호}/ 폴더에 이미지 저장

4. 로컬 미리보기
   └─ npm run dev
   └─ http://localhost:3000/{slug} 에서 확인

5. 빌드 검증
   └─ npm run build
   └─ 경고 메시지 확인

6. 배포
   └─ git add .
   └─ git commit -m "new post: {번호}"
   └─ git push
```

---

## 6. 검증 규칙

`npm run build` 실행 시 자동으로 검사되는 항목:

- 필수 필드 누락 여부 (slug, date, title, category)
- 카테고리 유효성
- 날짜 형식 (YYYY-MM-DD)
- slug 중복 여부

**경고 예시:**
```
⚠️  포스트 유효성 검사 경고:
   [20.md] 필수 필드 누락: title
   [21.md] 잘못된 카테고리: "wrong"
   [22.md] 잘못된 날짜 형식: "2025/01/15"
```

---

## 7. 포스트 숨기기

특정 포스트를 목록에서 숨기려면 `hide: true` 추가:

```yaml
---
slug: "/20"
date: "2025-01-15"
title: "숨긴 포스트"
category: "diary"
hide: true
---
```

> 숨긴 포스트는 직접 URL로만 접근 가능합니다.

---

## 8. 체크리스트

새 포스트 작성 시:

- [ ] `npm run new-post` 실행
- [ ] 필수 필드 4개 확인 (slug, date, title, category)
- [ ] 카테고리가 유효한 값인지 확인
- [ ] 날짜 형식이 YYYY-MM-DD인지 확인
- [ ] 본문 마크다운 작성
- [ ] 이미지 추가 (선택)
- [ ] `npm run dev`로 미리보기
- [ ] `npm run build`로 검증
- [ ] git push로 배포

---

## 9. 관련 파일 위치

| 파일/폴더 | 설명 |
|----------|------|
| `posts/` | 포스트 마크다운 파일 |
| `public/post_images/` | 포스트별 이미지 |
| `scripts/new-post.js` | 포스트 생성 스크립트 |
| `lib/constants.ts` | 카테고리/태그 상수 |
| `lib/posts.tsx` | 포스트 로딩 및 검증 로직 |
