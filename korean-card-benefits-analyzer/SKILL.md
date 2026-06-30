---
name: korean-card-benefits-analyzer
description: 대한민국 신용카드/체크카드 혜택 데이터베이스(card-data.json)를 검색하고 분석하여 최적의 피킹률 및 혜택 카드를 추천하는 스킬.
---

# 💳 대한민국 신용카드 혜택 분석 및 추천 스킬 (Korean Card Benefits Analyzer)

이 스킬은 2026년 기준 대한민국 신용카드 및 체크카드의 데이터셋(약 100여 개 이상 카드사 카드 데이터)을 기반으로, 소비자의 소비 패턴에 최적화된 카드(연회비, 전월실적, 피킹률, 세금 실적 인정 여부 등)를 찾아서 분석 및 추천하는 가이드입니다.

---

## 🔎 사용 방법 (How to use)

본 프로젝트의 카드 데이터베이스는 용량이 59MB에 달하므로, 텍스트 전체를 에이전트 컨텍스트에 담을 수 없습니다. 
대신 이 스킬 폴더에 내장된 **`query-cards.js`** CLI 스크립트를 사용하여 필요한 키워드나 혜택 조건을 초고속으로 검색해야 합니다.

### CLI 검색 명령어 실행 경로
* **위치**: `.agents/skills/korean-card-benefits-analyzer/scripts/query-cards.js`
* **실행 예시**:
  ```bash
  node .agents/skills/korean-card-benefits-analyzer/scripts/query-cards.js <키워드>
  ```

### 주요 검색 추천 키워드 예시
* **세금/지방세 납부용 카드 검색**:
  ```bash
  node .agents/skills/korean-card-benefits-analyzer/scripts/query-cards.js 세금
  ```
* **대한항공 / 아시아나 항공 마일리지 적립 카드 검색**:
  ```bash
  node .agents/skills/korean-card-benefits-analyzer/scripts/query-cards.js 마일리지
  ```
* **주유 할인/적립 카드 검색**:
  ```bash
  node .agents/skills/korean-card-benefits-analyzer/scripts/query-cards.js 주유
  ```

---

## 📊 카드 추천 및 피킹률 분석 가이드라인

카드를 추천할 때는 단순한 혜택 나열이 아니라 아래 항목을 정밀하게 검증하여 계산해야 합니다:

1. **연회비 (Annual Fee)**: 국내전용 및 해외겸용 연회비 구분 확인.
2. **전월실적 기준 (Threshold)**: 30만 원, 40만 원, 50만 원 등 혜택을 받기 위한 최소 허들 확인.
3. **통합 할인 한도 (Monthly Cap)**: 전월실적 구간별 월 최대 할인/적립 한도가 정해져 있는지 대조.
4. **실적 제외 항목**: 상품권 구매(상테크), 세금/공과금, 아파트관리비 등이 전월실적 산정에 포함되는지 확인.
