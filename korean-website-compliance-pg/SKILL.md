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

### 케이스 B: 포트원(PortOne) SDK V2 연동 (카드/카카오페이 자동 정산 필요 시)
```html
<script src="https://cdn.portone.io/v2/browser-sdk.js"></script>
<script>
async function requestPayment(productName, price) {
  try {
    const response = await PortOne.requestPayment({
      storeId: "{포트원StoreId}", // Store ID
      paymentId: "pay" + Date.now() + Math.random().toString(36).substring(2, 8), // 32byte 이내 ID
      orderName: productName,
      totalAmount: price,
      currency: "CURRENCY_KRW",
      channelKey: "{포트원ChannelKey}", // Channel Key
      payMethod: "EASY_PAY",
    });
  } catch (error) {
    console.error("Payment Error:", error);
  }
}
</script>
```
