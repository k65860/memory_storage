<div align="center">

# 💖 추억저장소 (Memory Storage)

사진과 함께 소중한 추억을 기록하고 공유하는 모바일 웹 서비스

</div>

---

## 📱 프로젝트 소개

**추억저장소**는 사진과 함께 추억을 저장하고 언제든 다시 꺼내볼 수 있는 모바일 기반 웹 서비스입니다.

사용자는 사진, 제목, 설명, 날짜를 등록하여 추억을 기록할 수 있으며,
등록된 추억은 카드 형태로 관리됩니다.

추후에는 QR 공유를 통해 가족, 연인, 친구와 함께 추억을 공유할 수 있도록 확장할 예정입니다.

---

## ✨ 주요 기능

### 서비스 이용
- 로그인 (로그인시 서비스 이용 가능)
- 회원가입

### 📸 추억 등록

- 사진 업로드
- 제목 입력
- 설명 입력
- 날짜 선택
- Supabase Storage 이미지 저장
- Supabase Database 저장

---

### 🖼 추억 목록

- 카드 형태 UI
- 이미지 미리보기
- 날짜 표시
- 제목 검색

---

### ✏️ 추억 수정

- 제목 수정
- 설명 수정
- 날짜 수정
- 이미지 변경
- 수정 완료 모달

---

### 🔍 검색

- 제목 기준 실시간 검색
- 검색 결과가 없으면
  > 추억이 없습니다.

---

### ☁️ 이미지 업로드

- 모바일 사진 업로드
- 이미지 미리보기
- Supabase Storage 저장

---

### 📱 모바일 UI

- Mobile First
- iPhone 기준 UI
- Bottom Navigation
- Drawer Sidebar

---

## 🛠 기술 스택

### Frontend

- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS

### Backend(BaaS)

- Supabase Database
- Supabase Storage

### Deployment

- Vercel

---

## 📂 프로젝트 구조

```text
app
 ├── components
 │     ├── Header
 │     ├── Footer
 │     ├── SideBar
 │     └── AlertModal
 │
 ├── home
 │     ├── MemoryCard
 │     ├── SearchSection
 │     └── EditMemoryModal
 │
 ├── memories
 │     ├── new
 │     └── [id]
 │
 ├── mypage
 │
 └── page.tsx

lib
 ├── supabase
 └── uploadMemoryImage.ts
```

---

## 🗄 Database

### memories

| Column | Type |
|---------|------|
| id | bigint |
| title | text |
| description | text |
| memory_date | date |
| image_url | text |
| created_at | timestamp |

---

## 📸 화면

### 홈

- 추억 목록
- 검색
- 사이드바

---

### 추억 추가

- 이미지 업로드
- 제목
- 설명
- 날짜

---

### 추억 수정

- 기존 정보 수정
- 이미지 변경

---

## 🚀 향후 개발 예정

### 🔗 공유 기능

- QR 코드 공유
- 링크 공유

---

### ❤️ 추억 좋아요

- 즐겨찾기 (목록에서 핀처리)
- 대표 추억 (즐겨찾기와 구분해서 어떻게 구현할지 생각 중..)

---

### 📅 캘린더

날짜별 추억 보기

---

## 💡 트러블슈팅

### Supabase Storage 이미지 업로드

- Storage Policy 설정
- 이미지 URL 저장
- Public URL 관리

---

### 모바일 Safari 대응

- Safe Area 대응
- Footer 고정
- Drawer Overlay 개선

---

### 모바일 UI

- Mobile First Layout
- 430px 기준 화면 설계

---

## 👨‍💻 개발자

김지연

Frontend Developer
