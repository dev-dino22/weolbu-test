<br>

<h1 align="middle">수강 신청 서비스</h1>
<p align="middle">월급쟁이부자들 FE 사전 과제 '수강 신청 서비스' 구현입니다.</p>

<br>

## 기능 소개

<br>

웹에서 회원 가입, 강의 개설, 수강 신청까지 한 번에 처리할 수 있는 모바일 웹 서비스를 구현합니다.
강사는 강의를 등록하고, 수강생과 강사 모두가 무한 스크롤/정렬 기능이 있는 강의 목록에서 여러 강의를 선택해 수강 신청할 수 있습니다.
이 과정에서 재사용 가능한 구조, 높은 코드 품질, 테스트 코드 및 문서화를 통해 실제 서비스 운영 수준의 프론트엔드를 구현하는 것이 목표입니다.

<br>

## 📝 TODO: 구현 기능

- [ ] 회원 가입
  - [ ] 이름, 이메일, 휴대폰 번호, 비밀번호, 회원 유형(수강생/강사) 입력 폼 구현
  - [ ] 비밀번호 유효성 검증(6~10자, 영문 대·소문자/숫자 중 최소 2가지 조합)
  - [ ] 가입 완료 시 강의 목록 화면으로 이동
  - [ ] 버튼 클릭 시 불필요한 중복 요청 방지를 위해 Loading disabled
- [ ] 강의 등록
  - [ ] 강사 회원 전용 강의 등록 화면 진입(강의 목록 → 강의 개설 버튼)
  - [ ] 강의명, 최대 수강 인원, 가격 입력 및 등록하기 시 강의 생성
  - [ ] 등록 완료 후 강의 목록 화면으로 리다이렉트
- [ ] 강의 신청
  - [ ] 무한 스크롤 가능한 강의 목록(강의명, 가격, 강사명, 현재 신청자 수, 최대 수강 인원 정보 표시)
    - [ ] 무한 스크롤 성능 지표에 따라 가상리스트 도입 고려
  - [ ] 정렬 옵션 제공(최근 등록순, 신청자 많은 순, 신청률 높은 순)
  - [ ] 여러 강의를 동시에 선택 후 한 번에 수강 신청 가능(수강생·강사 회원 모두 신청 가능)

## 🔧 TODO: 공통 모듈 개발

- [ ] 공용 컴포넌트 제작
  - [ ] 이름, 이메일, 휴대폰 번호, 비밀번호, 회원 유형(수강생/강사) 입력 폼 구현
  - [ ] 비밀번호 유효성 검증(6~10자, 영문 대·소문자/숫자 중 최소 2가지 조합)
  - [ ] 가입 완료 시 강의 목록 화면으로 이동
  - [ ] 버튼 클릭 시 불필요한 중복 요청 방지를 위해 Loading disabled
- [ ] 스타일 토큰 체계화

## 🔧 TODO: 성능 개선 및 방어 코드

성능 개선

- [ ] 가상 리스트 도입 검토
- [ ] 정렬 옵션 변경 시 디바운스 적용하여 불필요한 API 호출 방지
- [ ] 무한 스크롤 이벤트에 쓰로틀 적용

방어 코드

- [ ] 네트워크 에러 처리
- [ ] API 요청 실패 시 재시도 로직 구현
- [ ] 타임아웃 처리 및 사용자에게 적절한 에러 메시지 표시
- [ ] 오프라인 상태 감지 및 안내
- [ ] XSS 방지를 위한 입력값 sanitization​
- [ ] 중복 요청 방지
- [ ] 버튼 클릭 시 로딩 상태 동안 disabled 처리
- [ ] 강의 목록이 비어있을 때 Empty State UI 표시
- [ ] 수강 인원이 가득 찬 강의 신청 불가 처리
- [ ] 이미 신청한 강의 중복 신청 방지

접근성 개선

- [ ] 스크린 리더 지원을 위한 ARIA 레이블 추가
- [ ] 에러 메시지에 role="alert" 추가​

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

### React-hook-form 선택 이유

**선언적인 검증 로직**
입력값 검증을 register 옵션과 스키마 기반 설정으로 선언적으로 작성할 수 있어, 각 필드별 규칙(필수 여부, 길이, 패턴 등)을 한곳에 모아 관리할 가능

**불필요한 리렌더링 방지**
React 상태 업데이트를 최소화하여 폼 입력 시 전체 컴포넌트가 매번 리렌더링되는 문제 개선
