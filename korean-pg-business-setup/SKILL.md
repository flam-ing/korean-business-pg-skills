---
name: korean-pg-business-setup
description: >-
  Guide and automate the setup of a Korean personal business registration,
  compliant landing page creation (for PG audit), Cloudflare Pages hosting,
  and PortOne PG (Toss Payments / KG Inicis) integration.
---

# Korean PG & Business Setup Guide

## Overview
This skill provides a step-by-step workflow for setting up a sole proprietorship (개인사업자) in South Korea, deploying a compliant landing page to pass the Payment Gateway (PG) screening, and integrating PortOne (포트원) payments. It includes critical workarounds for common chicken-and-egg problems.

## Compliance Checklist
For the PG automated audit to pass, the website must contain:
1. **이용약관 (Terms of Service)**: Linkable from the footer (`/terms`).
2. **개인정보처리방침 (Privacy Policy)**: Linkable from the footer (`/privacy`). Must disclose the PG subcontractor (e.g., `(주)포트원` or the selected PG company) as a third-party handler.
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

### Phase 1: Business Registration & Escrow (The PortOne Workaround)

> [!IMPORTANT]
> **The Chicken-and-Egg Problem:**
> * To get PG approval via PortOne, you need a **통신판매업신고번호** (Telecommunications Retail Report Number).
> * To get that number from 정부24, you need a **구매안전서비스 이용확인증** (Escrow Certificate).
> * However, **PortOne itself does NOT issue an Escrow Certificate** (it is a payment SDK bridge, not a direct PG). You cannot download one from the PortOne console.
> * **The Solution:** Use the **Naver Smartstore Workaround** below to get a free Escrow Certificate instantly.

1. **사업자등록 신청 (홈택스)**:
   - Apply for business registration on National Tax Service Hometax (hometax.go.kr) or at a local tax office.
   - If the original **사업자등록증** (Business Registration Card) is missing, you can download a **사업자등록증명원** (Proof of Business Registration) from Hometax:
     - Path: `국세증명·사업자등록·세금관련 신청/신고` -> `즉시발급 증명` -> `사업자등록증재발급` or `사업자등록증명`.
2. **Naver Smartstore Escrow Workaround**:
   - Sign up on [네이버 스마트스토어 센터](https://sell.smartstore.naver.com/) as a **Business Seller (사업자 판매자)**.
   - **Important settings during signup:**
     - Select **[통신판매업 미신고]** (since you don't have the number yet).
     - **Phone Number Privacy:** Keep your real number. The Smartstore page will remain deactivated (비활성화) and hidden from the public until you list a product, so your number won't be leaked. (Use Atalk for 070 number later if you decide to activate the store).
     - **Document Masking:** When uploading NTS certificates (사업자등록증명원 or 사업자등록증), you **must redact/mask the last 7 digits of your resident registration number** (주민등록번호 뒷자리, e.g. `930301-1*******`). Upload it in **PNG or JPG** format (PDF might not be supported by the uploader).
   - Once registration is submitted, go to **[판매자정보] -> [판매자 정보]** in the Smartstore console and download the **구매안전서비스 이용확인증** PDF.

### Phase 2: Telecommunications Retail Report (통신판매업 신고)
1. Go to **정부24 (gov.kr)** and search for `통신판매업 신고`.
2. Upload the Business Registration Certificate and the **Smartstore Escrow Certificate PDF** you just obtained.
3. Wait 1-2 business days for approval, pay the local tax, and copy the registration number (e.g. `제 2026-서울서초-XXXX호`).

### Phase 3: Deploying Compliant Landing Page
1. Create the compliant legal pages (`terms.html`, `privacy.html`, `refund.html`).
2. Update the main page (`index.html`) to include the business information footer and explicit prices. Update the placeholder with the new `통신판매업신고번호`.
3. Deploy to **Cloudflare Pages** and bind the custom domain (e.g. `your-domain.com`).
   > [!WARNING]
   > **No Free Domains:** Free domain providers like Freenom (providing `.tk`, `.ml`, etc.) have officially shut down as of 2024 due to legal/abuse issues. You must purchase a standard paid TLD (like `.com`, `.org`, `.kr`) from a registrar (e.g., Cloudflare, Porkbun) for PG approval.

### Phase 4: PortOne Registration & Privacy Update
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

## Troubleshooting & Crucial Tips

* **Why does the PG audit fail?**
  - Mismatched address/representative details between Hometax and the website footer.
  - Missing subcontractor disclosure (`(주)포트원`) in `privacy.html`.
  - Incomplete legal pages (`terms.html`, `refund.html`).
* **Document Upload Failures:**
  - NTS documents (사업자등록증/사업자등록증명원) with visible resident registration number tails will be rejected immediately.
  - Use Python script `fitz` (PyMuPDF) or image editor to draw a solid block over the last 7 digits (`xxxxxx-1******`).
