---
name: korean-website-deployment-guide
description: 1인 창업자를 위한 기술적인 웹사이트/홈페이지 구축 및 호스팅 배포(Vercel, GitHub Pages, Netlify) 상세 가이드.
---

# 🌐 기술적인 웹사이트/홈페이지 구축 및 호스팅 배포 가이드

본 가이드는 1인 창업자, 인디 해커가 복잡한 백엔드 설정 없이 빠르게 프론트엔드 웹사이트(랜딩 페이지, 소개 사이트 등)를 빌드하고, 비용 없이 전 세계에 초고속 배포하며, 커스텀 도메인을 연결하는 기술 실무 가이드입니다.

---

## 🛠️ 1. 웹사이트 기술 스택 선택 가이드

개발 생산성과 유지보수 비용을 고려하여 아래 3가지 옵션 중 서비스 성격에 맞는 최적의 스택을 선택합니다.

| 분류 | 추천 기술 스택 | 적합한 서비스 형태 | 호스팅 추천 |
| :--- | :--- | :--- | :--- |
| **초간단 (No-Build)** | Vanilla HTML + CSS + JS (Single Page) | 랜딩 페이지, 단순 소개, 포트폴리오 | GitHub Pages, Netlify, Vercel |
| **정적 사이트 빌더** | Astro, Vite + React | 블로그, SEO가 극도로 중요한 정적 콘텐츠 위주 사이트 | Vercel, Netlify, Cloudflare Pages |
| **풀스택 프레임워크** | Next.js, Remix | DB 연동, 동적 API 라우트가 필요한 복잡한 웹 서비스 | Vercel, Netlify |

---

## 🚀 2. GitHub Pages를 활용한 100% 무료 정적 웹 호스팅

HTML/CSS/JS 파일만으로 구성된 간단한 웹사이트의 경우, GitHub Pages를 활용해 완전히 무료로 호스팅할 수 있습니다.

### 배포 순서
1. **GitHub 저장소 생성**: GitHub에 `my-landing-page` 저장소를 생성하고 코드(예: `index.html`, `style.css`, `app.js`)를 업로드합니다.
2. **Settings 진입**: GitHub 저장소의 `Settings` -> `Pages` 메뉴로 이동합니다.
3. **Build and deployment 설정**:
   * **Source**: `Deploy from a branch` 선택
   * **Branch**: `main` (또는 배포할 브랜치) 및 `/ (root)` 폴더 지정 후 `Save` 버튼 클릭
4. **배포 확인**: 약 1~2분 후 `https://<username>.github.io/<repository-name>/` 주소로 사이트가 라이브 배포됩니다.

---

## ⚡ 3. Vercel을 활용한 모던 웹사이트 배포 (Next.js / Vite)

React, Next.js 등의 프레임워크로 작성된 모던 웹앱은 **Vercel** 플랫폼을 사용해 클릭 한 번으로 배포 및 CI/CD(자동 배포)를 구축할 수 있습니다.

### 배포 순서
1. **Vercel 회원가입 및 로그인** (`vercel.com`): GitHub 계정으로 연동 가입합니다.
2. **프로젝트 연동**: `Add New` -> `Project`를 클릭한 뒤, 본인의 GitHub 저장소 목록에서 배포할 저장소를 선택하여 `Import` 합니다.
3. **빌드 설정 (Framework Preset)**:
   * Vercel이 프로젝트의 스택(Next.js, Vite 등)을 자동 감지하여 빌드 명령어(`npm run build`)와 아웃풋 디렉토리를 세팅해 줍니다.
   * 필요시 `Environment Variables` 항목에 API 키 등 환경 변수를 추가합니다.
4. **Deploy 실행**: `Deploy` 버튼을 클릭하면 수십 초 내에 빌드 및 배포가 완료되며, 고유의 `*.vercel.app` 도메인이 제공됩니다.

---

## 🔗 4. 커스텀 도메인(Custom Domain) 연결 및 SSL(HTTPS) 설정

가비아, 후이즈, Cloudflare 등에서 구매한 개인 도메인(`my-service.com`)을 Vercel 또는 GitHub Pages에 연결하여 브랜드 신뢰도를 확보합니다.

### Vercel 도메인 연결 방법 (A 레코드 & CNAME)
1. **Vercel 콘솔**: 프로젝트 내 `Settings` -> `Domains` 탭으로 이동합니다.
2. **도메인 추가**: 본인이 보유한 도메인 주소(예: `my-service.com` 및 `www.my-service.com`)를 입력하고 `Add`를 누릅니다.
3. **DNS 레코드 복사**: Vercel이 제시하는 DNS 레코드 값을 확인합니다:
   * **루트 도메인 (`my-service.com`)**: Type `A`, Value `76.76.21.21`
   * **서브 도메인 (`www.my-service.com`)**: Type `CNAME`, Value `cname.vercel-dns.com`
4. **도메인 등록기관(DNS 관리자) 설정**:
   * 도메인을 구매한 사이트(예: 가비아, Cloudflare)의 DNS 관리 페이지에 접속합니다.
   * 위 3단계에서 제공된 **A 레코드**와 **CNAME 레코드**를 추가/수정합니다.
5. **SSL 인증서 자동 발급**: DNS 설정이 완료되면 Vercel이 자동으로 Let's Encrypt를 통해 무료 SSL 보안인증서(HTTPS)를 발급 및 갱신해 줍니다.
