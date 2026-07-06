---
name: korean-pg-business-setup
description: >-
  대한민국 예비창업자 및 1인 개인사업자를 위한 창업, 에스크로, 통신판매업, 홈택스 서류, 결제 구축 및 절세 종합 마스터 스킬 index.
---

# 🚀 대한민국 개인사업자 창업·결제·절세 마스터 스킬 (Index)

이 스킬은 대한민국 1인 디지털/교육/전자상거래 사업자가 예비창업자 단계부터 창업, 결제 구축, 실전 절세까지순서대로 실행할 수 있는 세부 서브 스킬 목록입니다.

## 📚 단계별 순서 (Step 0 -> Step 9 Execution Workflow)

* **Phase 1: 설립 및 인프라 준비 (순차 실행)**
  0. **[Step 0. 예비창업자 혜택 확인](../korean-pre-startup-benefits/SKILL.md)**
     - 사업자등록 전 K-Startup 포털 등을 통한 무상 지원금(예창패 등) 요건 탐색 필수
  1. **[Step 1. 도메인 구매 및 로고/파비콘 세팅](../korean-domain-and-logo-setup/SKILL.md)**
     - 가비아/Cloudflare 도메인 구매와 네임서버 포인팅, Python Pillow 기반의 16px~256px 다중 해상도 ICO favicon 변환
  2. **[Step 2. 홈택스 사업자등록 상세 가이드](../korean-business-registration-hometax/SKILL.md)**
     - 홈택스 메뉴 클릭 경로 및 화면별 1~5 실제 입력 칸(상호, 주소, 무상사용승낙서, 업종코드 `525101`/`809026`/`525105`, 간이 선택) 상세 입력법
  3. **[Step 3. 업종코드 - 표준산업분류 연계표 활용](../korean-business-classification-mapping/SKILL.md)**
     - 525101(전자상거래), 722000(SW 개발) 등 IT 업종의 국세청 업종코드와 통계청 표준산업분류(KSIC) 5자리 연계 및 청년창업 소득세 감면 연동

* **Phase 2: 사이트 및 통신판매 신고 (병렬 진행 가능)**
  4. **[Step 4. 에스크로 & 통신판매업 신고 가이드](../korean-escrow-telecom-report/SKILL.md)**
     - 스마트스토어 가입을 통한 무료 에스크로 즉시 발급 (닭과 계란 해결) 및 정부24 통신판매업 신고서 서식 기입법
  5. **[Step 5. 기술적인 웹사이트/홈페이지 구축 및 배포 가이드](../korean-website-deployment-guide/SKILL.md)**
     - HTML/CSS/JS 단일 파일 템플릿부터 React, Next.js 등의 모던 스택 선택 가이드, Vercel/GitHub Pages 무료 호스팅 및 SSL 설정
  6. **[Step 6. Cloudflare 무료 도메인 이메일 및 DNS 설정 가이드](../korean-cloudflare-email-setup/SKILL.md)**
     - Cloudflare Email Routing 기반 무료 도메인 이메일 포워딩 수신 및 Resend 연동 발신(보내기) 구축, 필수 DNS(MX, SPF, DKIM, DMARC) 설정 실무

* **Phase 3: 심사 및 독립 결제망 구축 (순차 실행)**
  7. **[Step 7. 웹사이트 필수 법적 준수 요건 검사](../korean-website-compliance-pg/SKILL.md)**
     - 웹사이트 하단 푸터 법적 필수 표기 8가지 및 모바일 Responsive CSS 레이아웃, 이용약관/개인정보/환불규정 템플릿 검사
  8. **[Step 8. 독자 결제 사이트 구현 & PG 연동](../korean-pg-business-setup/SKILL.md)**
     - PortOne V2 API 기준의 결제창 연동 스크립트, Webhook 수신 검증 로직, DB 상태 업데이트 스키마를 포함한 백엔드 연동 템플릿
  9. **[Step 9. 사업용 카드 피킹 & 마일리지 & 상품권 절세](../korean-business-tax-and-cards/SKILL.md)**
     - 홈택스 사업용 카드 구분 등록, 항공 마일리지 적립 카드 주유/하이패스 적립 및 차량유지비 100% 비용처리, 기프티쇼 비즈 상품권 100% 접대비 절세
