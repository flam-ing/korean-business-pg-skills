---
name: korean-pg-business-setup
description: >-
  Guide and automate the setup of a Korean personal business registration,
  compliant landing page creation (for PG audit), Cloudflare Pages hosting,
  and PortOne PG (Toss Payments / KG Inicis) integration.
---

# Korean PG & Business Setup Guide

## Overview
This skill provides a step-by-step workflow for setting up a sole proprietorship (개인사업자) in South Korea, deploying a compliant landing page to pass the Payment Gateway (PG) screening, and integrating PortOne (포트원) payments.

## Requirements Checklist
For the PG automated audit to pass, the website must contain:
1. **이용약관 (Terms of Service)**: Linkable from the footer (`/terms`).
2. **개인정보처리방침 (Privacy Policy)**: Linkable from the footer (`/privacy`). Must disclose the PG subcontractor (e.g., `(주)포트원` or `토스페이먼츠`) as a third-party handler.
3. **환불 규정 (Refund Policy)**: Linkable from the footer (`/refund`). Must specify exact refund rules.
4. **상품 및 가격 명시 (Pricing)**: Clear pricing list on the home page.
5. **사업자 정보 (Footer)**:
   - 상호명 (Business Name)
   - 대표자명 (Representative Name)
   - 사업장 소재지 (Business Address)
   - 전화번호 (Phone Number)
   - 이메일 (Email)
   - 사업자등록번호 (Business Registration Number)
   - 통신판매업신고번호 (Telecommunications Retail Report Number)
   - 구매안전서비스(에스크로) 가입 여부 및 계좌 정보

---

## Step-by-Step Workflow

### Phase 1: Business Registration & Escrow
1. **사업자등록 신청 (홈택스)**:
   - Apply for business registration on National Tax Service Hometax (hometax.go.kr) or at a local tax office.
2. **사업자 통장 개설 및 에스크로 발급**:
   - Open a business bank account (Toss Bank / Kakao Bank business accounts recommended for instant setup).
   - Download the **구매안전서비스 이용확인증 (에스크로)** PDF.

### Phase 2: Deploying Compliant Landing Page
1. Create the compliant legal pages (`terms.html`, `privacy.html`, `refund.html`).
2. Update the main page (`index.html`) to include the business information footer and explicit prices.
3. Deploy to **Cloudflare Pages** and bind the custom domain (e.g. `your-domain.com`).
4. Resolve any conflicting DNS records (like old Worker routes or A records) to make sure the custom domain is active.

### Phase 3: PortOne Registration & Privacy Update
1. Sign up on PortOne (portone.io) and submit the Website URL verification.
2. **Update the Privacy Policy** to disclose the payment gateway processor:
   ```html
   <h2>개인정보 처리 위탁</h2>
   <p>회사는 결제 서비스 제공을 위해 아래와 같이 개인정보 처리 업무를 위탁하고 있습니다.<br>
   - 수탁업체: (주)포트원 (PortOne)<br>
   - 위탁 업무: 결제 대행 및 에스크로 서비스 제공<br>
   - 보유 기간: 회원 탈퇴 또는 위탁 계약 종료 시까지</p>
   ```
3. Complete the PortOne PG application and upload required documents (ID copy, bankbook copy, business registration copy, escrow certificate).

### Phase 4: Telecommunications Retail Report (통신판매업 신고)
1. Go to **정부24 (gov.kr)** and search for `통신판매업 신고`.
2. Upload the Business Registration Certificate and the Escrow Certificate PDF.
3. Wait 1-2 business days for approval, pay the local tax, and copy the registration number.
4. Update the website footer with the registration number (e.g., `제 2026-서울서초-XXXX호`).

### Phase 5: PortOne Payment Integration
Add the PortOne SDK V2 to the website to handle checkouts:

```html
<!-- PortOne SDK V2 -->
<script src="https://cdn.portone.io/v2/browser-sdk.js"></script>

<script>
async function requestPayment(productName, price) {
  try {
    const response = await PortOne.requestPayment({
      storeId: "store-xxxxx-xxxxx", // Your PortOne Store ID
      paymentId: `payment-${crypto.randomUUID()}`,
      orderName: productName,
      totalAmount: price,
      currency: "CURRENCY_KRW",
      channelKey: "channel-key-xxxxx", // Your PortOne Channel Key (e.g. Kakao Pay, Toss Pay, Card)
      payMethod: "EASY_PAY", // or CARD
    });
    
    if (response.code !== undefined) {
      // payment failed
      alert(`Payment failed: ${response.message}`);
      return;
    }
    
    // Send payment details to server for verification
    console.log("Payment successful!", response);
  } catch (error) {
    console.error("Payment error:", error);
  }
}
</script>
```

---

## Common Mistakes
* **Old DNS records cache**: If the domain returns a 522 error or shows the old page, double check for conflicting A or AAAA records in the Cloudflare DNS tab.
* **Missing Subcontractor Disclosure**: Forgetting to add PortOne or the PG company to the privacy policy will fail the PG audit.
* **Mismatched Footer details**: The representative name and address in the website footer must match the Hometax Business Certificate exactly.
