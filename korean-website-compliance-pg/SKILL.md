---
name: korean-website-compliance-pg
description: 결제 웹사이트 구축 시 필수 법적 표시사항(푸터 Compliance), 무통장/송금 연동 및 PG사 심과 가이드.
---

# 💻 Step 3. 결제 웹사이트 구축 & 푸터 Compliance & 결제 연동 가이드

## 📌 1. 웹사이트 하단(Footer) 필수 표시사항 (Compliance)

온라인으로 서비스나 인강, 컨설팅을 판매하는 웹사이트는 전자상거래법 및 PG사 가맹점 심사를 위해 하단(Footer)에 법적 필수 정보를 명확히 노출해야 합니다.

### 푸터 필수 표기 8가지 항목
1. **상호명**: `{상호명}`
2. **대표자 성명**: `{대표자성명}`
3. **사업자등록번호**: `{사업자등록번호}`
4. **통신판매업 신고번호**: `{통신판매업신고번호}`
5. **사업장 소재지**: `{사업장소재지}`
6. **고객센터 연락처 및 이메일**: `{연락처}` / `{이메일주소}`
7. **호스팅 서비스 제공자**: `{호스팅업체명}`
8. **약관 및 정책 링크**: 이용약관(` terms.html`), 개인정보처리방침(`privacy.html`), 환불규정(`refund.html`)

### 모바일 가독성을 위한 CSS 및 HTML 레이아웃 코드예시
```html
<footer style="background:#07080d; color:#8e99ab; padding:40px 20px; font-size:13px; line-height:1.8; border-top:1px solid rgba(255,255,255,0.08);">
  <div style="max-width:1100px; margin:0 auto;">
    <p style="margin-bottom:12px; font-weight:700; color:#ffffff;">{상호명}</p>
    <p style="word-break:keep-all;">
      대표자: {대표자성명} | 사업자등록번호: {사업자등록번호} | 통신판매업신고번호: {통신판매업신고번호}<br>
      주소: {사업장소재지}<br>
      호스팅 서비스: {호스팅업체명} | 서비스 제공 기간: 결제 후 즉시 또는 별도 협의
    </p>
    <div style="margin-top:16px; display:flex; gap:16px; flex-wrap:wrap;">
      <a href="/terms" style="color:#c5ccda; text-decoration:none;">이용약관</a>
      <a href="/privacy" style="color:#c5ccda; text-decoration:none;">개인정보처리방침</a>
      <a href="/refund" style="color:#c5ccda; text-decoration:none;">환불규정</a>
    </div>
  </div>
</footer>
```

---

## 💳 2. 결제 수단 구축 (가성비 무통장/송금 vs PG사 연동)

### 케이스 A: 수수료 0원 가성비 무통장 및 간편송금 연동 (추천)
PG사 초기 가입비(22만 원 등)와 정산 수수료를 아끼기 위해 웹사이트 결제 모달에 계좌 정보와 토스 간편송금 링크를 결합하여 구성합니다.

```html
<!-- 결제 모달 예시 -->
<div class="payment-card" style="background:#101420; border:1px solid rgba(255,255,255,0.1); padding:24px; border-radius:12px; color:#fff;">
  <h3 style="margin-bottom:16px;">무통장 입금 및 간편 송금</h3>
  <p style="color:#c5ccda; font-size:14px; margin-bottom:12px;">
    은행명: {은행명}<br>
    계좌번호: <strong style="color:#00f2fe;">{계좌번호}</strong><br>
    예금주: {예금주명}
  </p>
  <div style="display:flex; gap:10px; margin-top:20px;">
    <a href="{간편송금링크주소}" target="_blank" rel="noopener noreferrer" style="flex:1; padding:12px; background:#e61862; color:#fff; text-align:center; text-decoration:none; font-weight:700; border-radius:4px;">송금하기</a>
    <button onclick="navigator.clipboard.writeText('{계좌번호숫자만}'); alert('계좌번호가 복사되었습니다.');" style="flex:1; padding:12px; background:transparent; border:1px solid rgba(255,255,255,0.2); color:#fff; cursor:pointer; border-radius:4px;">계좌복사</button>
  </div>
</div>
```

### 케이스 B: 포트원(PortOne) SDK V2 연동 가이드

**포트원(PortOne)**은 국내외 여러 PG사(KG이니시스, 한국결제네트웍스, 토스페이먼츠 등)와 간편결제사(카카오페이, 네이버페이 등)의 결제창을 하나의 표준화된 SDK로 통합 연동해 주는 결제 오케스트레이션 서비스입니다. 2024년 이후 V1(기존 아임포트)에서 **V2 SDK**로 전면 업그레이드되었습니다.

#### 1. 포트원 가맹점 관리자 콘솔 설정 단계
1. **포트원 회원가입 및 로그인** (`portone.io`)
2. **내 식별 정보 확인**: `결제 연동` -> `식별 정보`에서 **Store ID** (`store-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`) 확인.
3. **결제 채널 추가**: `결제 연동` -> `채널 관리`에서 테스트/실결제용 채널(PG사 및 결제 수단) 추가.
   * 예: *카카오페이 테스트 채널*, *한국결제네트웍스 테스트 채널* 추가.
4. **Channel Key 획득**: 각 채널 카드 오른쪽 상단의 **Channel Key** (`channel-key-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`) 복사.

#### 2. V2 브라우저 SDK 주요 파라미터 규격
* **`storeId`**: 가맹점 고유 식별 코드 (Store ID)
* **`paymentId`**: 거래마다 가맹점에서 직접 생성하는 고유 결제 ID (보통 `pay_` + 타임스탬프 + 난수 조합, 중복 결제 방지용).
* **`channelKey`**: 결제를 진행할 PG사 채널 키 (신용카드 결제용과 카카오페이 등 간편결제용 채널 키가 다름).
* **`orderName`**: 결제창에 노출될 상품명.
* **`totalAmount`**: 결제 총 금액 (부가세 포함된 최종 승인 희망액).
* **`currency`**: 화폐 규격 (대한민국 원화의 경우 `"CURRENCY_KRW"`).
* **`payMethod`**: 결제 수단 종류 (`"CARD"`, `"EASY_PAY"`, `"TRANSFER"` 등).
* **`easyPay.provider`**: 간편결제사 구분 (`"KAKAOPAY"`, `"NAVERPAY"` 등, `payMethod`가 `EASY_PAY`일 때 필수 지정).

#### 3. 프론트엔드 연동 HTML & JavaScript 예시 (V2)
```html
<!-- 포트원 V2 브라우저 SDK 로드 -->
<script src="https://cdn.portone.io/v2/browser-sdk.js"></script>

<script>
async function triggerPayment(methodName) {
  const amount = 55000; // 부가세 10% 포함된 결제 총 금액
  const productName = "컨설팅 및 교육 1시간권";
  
  let channelKey = "";
  let payMethod = "CARD";
  let easyPayProvider = null;

  if (methodName === 'KAKAOPAY') {
    channelKey = "{카카오페이_채널키}"; // 채널 관리에서 복사한 키
    payMethod = "EASY_PAY";
    easyPayProvider = "KAKAOPAY";
  } else if (methodName === 'CARD') {
    channelKey = "{신용카드_채널키}"; // 채널 관리에서 복사한 키
    payMethod = "CARD";
  }

  const paymentParams = {
    storeId: "{가맹점_Store_ID}",
    paymentId: "pay-" + Date.now() + Math.random().toString(36).substring(2, 10),
    orderName: productName,
    totalAmount: amount,
    currency: "CURRENCY_KRW",
    channelKey: channelKey,
    payMethod: payMethod,
    customer: {
      fullName: "구매자 성명",
      email: "buyer@example.com",
    }
  };

  if (easyPayProvider) {
    paymentParams.easyPay = { provider: easyPayProvider };
  }

  try {
    const response = await PortOne.requestPayment(paymentParams);

    // 에러/취소 처리
    if (response.code !== undefined) {
      if (response.code === "PAY_PROCESS_CANCELED") {
        alert("결제가 취소되었습니다.");
        return;
      }
      alert("결제 실패: " + (response.message || "오류 발생"));
      return;
    }

    // 결제 창 닫힌 후 성공 처리 (반드시 백엔드 서버에 paymentId를 보내 검증해야 함)
    alert("결제창 완료! 결제 ID: " + response.paymentId);
    
  } catch (error) {
    console.error("결제 프로세스 에러:", error);
  }
}
</script>
```

#### 4. 🔒 결제 위변조 방지 서버사이드 검증 (REST API V2)
클라이언트 브라우저에서 결제가 완료되었다 하더라도, **해커가 크롬 개발자 도구 등으로 결제 금액을 임의 수정(예: 55,000원 ➔ 100원)하여 승인받는 보안 취약점**이 있습니다.
따라서 결제 완료 후, **백엔드 서버**에서 아래 API를 호출하여 데이터베이스에 정의된 실제 상품 단가와 포트원 서버에 최종 승인된 금액이 같은지 확인해야 합니다.

* **포트원 V2 단건 결제 내역 조회 API**:
  * **Method**: `GET`
  * **URL**: `https://api.portone.io/v2/payments/{paymentId}`
  * **Header**:
    * `Authorization: PortOne {PORTONE_API_SECRET_KEY}` (포트원 콘솔에서 발급받은 API 비밀키)
  * **검증 비즈니스 로직**:
    1. 결제 완료된 `paymentId`를 서버로 전송.
    2. 포트원 API를 통해 해당 거래의 `status`가 `"PAID"`(결제 완료)인지 확인.
    3. API 응답의 `amount.total` 값과 데이터베이스의 원본 상품 단가(`55,000원`)가 일치하는지 비교.
    4. 일치할 경우에만 주문 완료 처리 및 라이선스/서비스 제공.

