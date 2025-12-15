<br>

<h1 align="middle">수강 신청 서비스</h1>
<p align="middle">월급쟁이부자들 FE 사전 과제 '수강 신청 서비스' 구현입니다.</p>

<br>

## 기능 소개

<br>

웹에서 회원 가입, 강의 개설, 수강 신청까지 한 번에 처리할 수 있는 모바일 웹 서비스를 구현합니다.
강사는 강의를 등록하고, 수강생과 강사 모두가 무한 스크롤/정렬 기능이 있는 강의 목록에서 여러 강의를 선택해 수강 신청할 수 있습니다.
이 과정에서 재사용 가능한 구조, 높은 코드 품질, 테스트 코드 및 문서화를 통해 실제 서비스 운영 수준의 프론트엔드를 구현하는 것이 목표입니다.

| | |
|---|---|
| <img width="1290" height="2796" alt="localhost_5173_courses_enroll(iPhone 14 Pro Max) (2)" src="https://github.com/user-attachments/assets/874dd949-82f0-4618-98b0-afaaccc30f2a" /> | <img width="1290" height="2796" alt="localhost_5173_courses_enroll(iPhone 14 Pro Max) (1)" src="https://github.com/user-attachments/assets/4ca4d8a6-e6f5-4f2f-ad00-f18ef5673b44" /> |

| | | |
|---|---|---|
| <img width="1290" height="2796" alt="localhost_5173_courses_enroll(iPhone 14 Pro Max) (5)" src="https://github.com/user-attachments/assets/b4e599ce-7339-4038-8d7d-c359d80cf392" /> | <img width="1290" height="2796" alt="localhost_5173_courses_enroll(iPhone 14 Pro Max) (4)" src="https://github.com/user-attachments/assets/01a6a7c3-7a13-416d-b63d-5341538736db" /> | <img width="1290" height="2796" alt="localhost_5173_courses_enroll(iPhone 14 Pro Max) (3)" src="https://github.com/user-attachments/assets/db6fee26-7a83-47b7-be66-9a44a51001c9" /> |



<br>

<img width="728" height="270" alt="image" src="https://github.com/user-attachments/assets/2888a245-8469-4761-9db5-665c9a55abf3" />

## 시작하기

### 1. Docker를 실행하고 다음 명령어를 실행합니다.

```
# 1. API 애플리케이션 이미지 로드
docker load -i backend_mock.tar
# 2. 서버 실행
docker run --rm -p 8080:8080 backend_mock_for_assignment-api:latest
```

### 2. 프로젝트 폴더 터미널에서 다음 명령어를 실행합니다.

```
npm i && npm run build && npm run preview
```

## 📝 TODO: 구현 기능

- [x] **회원 가입**
  - [x] 이름, 이메일, 휴대폰 번호, 비밀번호, 회원 유형(수강생/강사) 입력 폼 구현
  - [x] 비밀번호 유효성 검증(6~10자, 영문 대·소문자/숫자 중 최소 2가지 조합)
  - [x] 가입 완료 시 강의 목록 화면으로 이동
- [x] **강의 등록**
  - [x] 강의명, 최대 수강 인원, 가격 입력 및 등록하기 시 강의 생성
  - [x] 등록 완료 후 강의 목록 화면으로 리다이렉트
- [x] **강의 신청**

  - [x] 무한 스크롤 가능한 강의 목록(강의명, 가격, 강사명, 현재 신청자 수, 최대 수강 인원 정보 표시)

  - [x] 정렬 옵션 제공(최근 등록순, 신청자 많은 순, 신청률 높은 순)
  - [x] 여러 강의를 동시에 선택 후 한 번에 수강 신청 가능(수강생·강사 회원 모두 신청 가능)

- [x] 강의 상세 보기
  - [x] 강의 상세 모달
  - [x] 개별 강의 수강 신청

## TODO: 추가 구현 기능

- [x] 강의 상세 조회
  - [x] 강의를 클릭 시 상세 정보가 담긴 모달 오픈
  - [x] 상세 모달에서 단일 강의 수강 신청 구현

## 🔧 TODO: 공통 모듈 개발

- [x] 공용 컴포넌트를 제작한다.
  - [x] 토스트 컴포넌트 제작
  - [x] 버튼 컴포넌트 제작
  - [x] 에러 바운더리 제작
  - [x] 인풋 제어/비제어 컴포넌트 제작
  - [] 모달 컴포넌트 제작
- [x] 공용 훅을 제작한다.
  - [x] useDebounce 훅 제작
  - [x] useBoolean 훅 제작
- [x] 전역 스타일 토큰을 만들고 사용한다.
  - [x] Global 스타일 토큰 구현
  - [x] 모바일 반응형만을 고려해 max-width 는 480px로 지정

## 🔧 TODO: 성능 개선 및 방어 코드

리팩토링

- [x] 컴포넌트 분리
- [x] 훅 분리

테스트

- [x] 컴포넌트 테스트 코드 작성

  - [x] 로그인 폼 컴포넌트
  - [x] 회원가입 폼 컴포넌트
  - [x] 강의 목록 체크 리스트 컴포넌트
  - [x] 무한 스크롤 컴포넌트

- [x] 훅/함수 테스트 코드 작성
  - [x] 무한 스크롤 훅
  - [x] URL 유틸 함수
  - [x] 깊은 비교 함수

성능 개선

- [x] 적절한 메모이제이션으로 체크 선택 시 리렌더링 범위 최소화
- [x] 무한 스크롤 이벤트에 디바운스 적용(인터섹션 옵저버의 호출의 딜레이를 위해)
- [x] 로딩 스피너 도입
- [x] Modal 강제 리플로우 제거

방어 코드

- [x] 강의명, 가격 등 maxLength 방어
- [x] API 에러 처리 (특히 각 인증 에러 시에 재로그인 유도)
- [x] 버튼 클릭 시 로딩 상태 동안 disabled 처리
- [x] 강의 목록이 비어있을 때 Empty State UI 표시
- [x] 수강 인원이 가득 찬 강의 신청 불가 처리
- [x] 이미 신청한 강의 중복 신청 방지

접근성 개선

- [x] 스크린 리더 지원을 위한 ARIA 레이블 추가
- [x] 로딩스피너, 체크박스, 폼 등에 ARIA 상태 및 라벨 추가
- [x] 색상 대비 개선 (WCAG AA 준수)
- [x] 시멘틱 마크업 및 태그 계층 구조 개선
- [x] HTML 메타 정보 개선

## 🚀 Frontend Code Convention Guide

프로젝트에서 일관되고 효율적인 코드를 지키기 위해 컨벤션을 세우고 작성하였습니다.

---

### 1. 네이밍 규칙 ✍️

- **변수/함수:** `camelCase`
  - 일반 함수, 컴포넌트 내부에서만 사용되는 함수 : 동사 prefix
  - 이벤트 핸들러 : handle- prefix, -event postfix (ex: handleButtonClick)
  - 이벤트 트리거 : on prefix
- **컴포넌트 파일:** `PascalCase`
- **페이지 파일:** `PascalCase + Page` 접미사 (예: `LoginPage.tsx`)
- **스타일 파일:** 컴포넌트명과 동일하게 (예: `Button.tsx` / `Button.styles.ts`)
- **상수:** `UPPER_SNAKE_CASE` (예: `PRICE_NUMBER`)

### 2. 코드 스타일 🎨

- **들여쓰기:** space 2칸
- **세미콜론:** 항상 사용
- **따옴표:** 홑따옴표 (`'`)
- **주석:** 필요한 부분에만 간결하게, 미구현(TODO) 명시
- **Lint 도구:** ESLint, Prettier 도입
- **함수 선언**: 컴포넌트 선언은 function, 그 이외 함수는 화살표함수

### 3. 파일 및 폴더 구조 🗂️

colocation 방식으로 폴더를 구성하되, “단방향 파일 참조” 를 지켜 순환 참조를 방지할 수 있도록 파일을 나눈다.
예시:

```md
// 아래 폴더만 참조할 수 있습니다.
📦src
┣ 📂pages # 라우트별 페이지 컴포넌트
┣ 📂domains
┃ ┗ 📂{domain명}
┃ ┃ ┗ 📂components
┃ ┃ ┗ 📂hooks
┃ ┃ ┗ 📂utils
┃ ┃ ┗ 📂types
┣ 📂apis
┃ ┗ 📂{domain명}
┣ 📂shared # 공통 유틸리티, 타입, 라이브러리, UI 컴포넌트 등
┃ ┗ 📂components # 공용 컴포넌트 안에 분류 폴더
┃ ┗ ┣ 📂assets. # 로딩 스피너같은 assets 폴더
┃ ┗ ┃ ┗ 📜Loading.tsx
┃ ┗ ┣ 📂inputs
┃ ┗ ┣ 📂layout
┃ ┗ 📂hooks
┃ ┗ 📂styles
┃ ┃ ┗ 📜reset.ts
┃ ┃ ┗ 📜global.ts
┃ ┗ 📂types
┣ 📜App.tsx
┣ 📜main.tsx
```

### 4. CSS/스타일 컨벤션 💅

- **스타일 라이브러리:** `@emotion/styled` 사용
- **전역 테마/글로벌 스타일:** emotion의 ThemeProvider, Global 활용
- **컬러/타이포:** 전역 시스템에서 일괄 관리
- **색상 표기:** HEX 코드, 소문자, full로 작성 (예: `#ffffff`)
- **속성 순서:** display, position, box-model, color 등 논리적 순서로 작성
- **단위마다 줄바꿈**

```css
 {
  display: flex;
  position: relative;

  width: 100%;
  height: 40px;
  margin: 0;
  padding: 0;

  background: #fff;

  color: #222;
  letter-spacing: 0.1em;

  animation: fadeIn 0.2s;
}
```

**속성 그룹 순서**

1. 레이아웃:
   display, visibility, overflow, float, clear, position, top, right, bottom, left, z-index
2. 박스:
   width, height, margin, padding, border
3. 배경: background
4. 폰트:
   color, letter-spacing, text-align, text-decoration, text-indent, vertical-align, white-space
5. 동작: animation
6. 기타

### 5. Import & Export 컨벤션 📦

- **import 순서:**
  1. 컴포넌트
  2. 도메인 포함 컴포넌트
  3. 공통 컴포넌트
  4. React 내장 훅
  5. Custom 훅
  6. 일반 함수
  7. 상수
  8. 라이브러리
  9. 스타일
- **export 방식:**
  - 컴포넌트: default export
  - Hook: named export
  - 함수: named export
  - 상수: named export

### 6. JavaScript/TypeScript 컨벤션 🧑‍💻

- 함수형 프로그래밍(map, filter 등 내장 함수) 적극 활용
- 불필요한 전역 변수 지양
- 상수 정의는 모두 UPPER_SNAKE_CASE
- 타입 선언은 모두 type을 우선시한다
- props 타입 네이밍은 Props (외부에 꺼낼 일 없이 해당 컴포넌트 상단에 위치)
- 이외 type 네이밍은 ~Type postfix

```jsx
export const PRICE_NUMBER = {
  FIRST: 10000,
};
```

### 7. React 컨벤션 🧑‍💻

- `useCallback` : Hook, props로 넘겨주는 함수인 경우 감싸기
- `Suspense` : loading fallback UI 처리
- `ErrorBoundary` : error fallback UI 처리
- `try-catch` : 코드 실행 중 오류

### 8. 접근성 📡

- 시맨틱 태그 잘 사용하기

---

## 📁 도입 라이브러리

## 스타일 라이브러리: Emotion/Styled 💅

### CSS-in-JS 선택 이유

- 스타일 충돌 방지  
   기존 CSS는 `class` 명이 겹치면 의도하지 않는 충돌이 일어날 수 있다.  
   CSS-in-JS는 컴포넌트 별로 CSS를 관리하기 때문에 스타일 충돌을 방지할 수 있다.
- 동적 스타일 지원  
   JavaScript 문법을 활용해 **조건부·동적 스타일링**이 가능하며,  
   사용자 상호작용이나 테마 변경 등 다양한 상황에 유연하게 대응할 수 있다.

### 1. 활발한 커뮤니티와 안정성

- Emotion은 오픈소스 커뮤니티에서 활발히 유지·보수되고 있어,   
  **문서화와 지원이 잘 되어 있고 신뢰성**이 높다.

### 2. **빠른 온보딩 및 일관된 코드 스타일**

- 팀원 모두가 Emotion의 문법과 활용법에 익숙해,  
  새로운 프로젝트에서도 별도의 학습 곡선 없이 즉시 생산성을 극대화할 수 있다.
- 공통된 스타일링 패턴과 규칙을 공유함으로써,  
  코드 리뷰 과정이 원활해지고 유지보수 시 혼란이 줄어든다.

### 3. emotion-styled

- 컴포넌트 개발 패러다임  
   컴포넌트 단위로 스타일을 정의하고 곧바로 재사용 가능한 React 컴포넌트를 생성한다.
- 동적 스타일링  
   props를 활용한 동적 스타일링이 직관적으로 가능하다.

- 가독성과 생산성  
   UI 구조와 스타일이 논리적으로 결합되어 있어, 코드의 가독성이 높고 생산성이 향상된다.

## 서버 상태 라이브러리: Tanstack Query

### 서버 상태 라이브러리 도입 이유

**서버 데이터 캐싱**
동일한 API 요청에 대해 캐싱을 적용해 불필요한 네트워크 호출을 줄이고, 목록/상세 등에서 빠른 화면 전환 경험을 제공하기 위함

**Suspense와의 안정적인 연동**
CSR 환경에서 데이터 패칭 시 생성되는 프로미스를 렌더 주기와 분리해, 로딩·에러·데이터 상태를 예측 가능하게 관리

**서버 상태와 클라이언트 상태 분리**
서버에서 오는 비동기 데이터와 로컬 UI 상태를 분리해 관리함으로써, 상태 관리 복잡도를 낮추고 유지보수를 용이하게 하기 위함

### Tanstack query 선택 이유

**검증된 안정성과 생태계**
TanStack Query는 프론트엔드 생태계에서 가장 널리 사용되는 서버 상태 관리 라이브러리 중 하나로, 다양한 규모의 프로덕션에서 검증된 안정성과 풍부한 사례를 제공

**강력한 기능 세트**
캐싱, 요청 중복 제거, 자동 재시도, 리페치 정책, 무한 스크롤 등 과제 요구사항과 실제 서비스에서 자주 필요한 기능들을 기본으로 제공해, 직접 인프라를 구현하는 비용을 줄일 수 있음

## 입력 폼 라이브러리: React-hook-form
### React-hook-form 선택 이유

**선언적인 검증 로직**
입력값 검증을 register 옵션과 스키마 기반 설정으로 선언적으로 작성할 수 있어, 각 필드별 규칙(필수 여부, 길이, 패턴 등)을 한곳에 모아 관리할 가능

**불필요한 리렌더링 방지**
비제어 컴포넌트로 React 상태 업데이트를 최소화하여 폼 입력 시 전체 컴포넌트가 매번 리렌더링되는 문제 개선
