---
name: korean-cloudflare-email-setup
description: Cloudflare를 이용한 무료 도메인 이메일 수발신 구축 및 DNS(MX, SPF, DKIM, DMARC) 설정 가이드.
---

# ✉️ Cloudflare 무료 도메인 이메일 수발신 및 DNS 설정 가이드

본 가이드는 나만의 커스텀 도메인(예: `contact@my-domain.com`)을 활용해 이메일을 완전히 무료로 수신 및 발신하고, 스팸 처리 차단을 위해 필수적인 DNS 보안 레코드(MX, SPF, DKIM, DMARC)를 연동 및 설정하는 실무 가이드입니다.

---

## 📥 1. Cloudflare Email Routing을 활용한 무료 이메일 수신 (포워딩)

도메인을 **Cloudflare**에서 관리하고 있다면, 유료 이메일 솔루션(Google Workspace 등) 없이도 특정 도메인 이메일로 수신된 메일을 본인의 개인 이메일(Gmail 등)로 무료 포워딩할 수 있습니다.

### 설정 단계
1. **Cloudflare 콘솔 로그인**: 도메인 관리 영역에서 `Email` -> `Email Routing` 메뉴로 이동합니다.
2. **이메일 라우팅 활성화**: `Get started`를 클릭합니다.
3. **대상 주소 등록 (Destination addresses)**: 포워딩을 받을 개인 이메일 주소(예: `my-personal@gmail.com`)를 입력합니다.
   * 입력 후 해당 개인 이메일 함으로 발송된 인증 메일을 열어 **Verify email address** 버튼을 클릭하여 인증을 마쳐야 합니다.
4. **라우팅 규칙 생성 (Routing rules)**:
   * **Source address**: 커스텀 도메인 이메일 주소 지정 (예: `contact@my-domain.com`)
   * **Action**: `Send to` 선택
   * **Destination address**: 앞서 인증한 개인 이메일 주소 선택
5. **자동 DNS 레코드 등록**: `Email Routing`을 활성화하면 Cloudflare가 수신을 위해 필요한 **MX 레코드**와 **SPF 레코드**를 DNS 설정 탭에 원클릭으로 자동 등록해 줍니다.

---

## 📤 2. Resend를 활용한 무료 도메인 이메일 발신 (보내기)

받은 메일에 회신하거나 웹사이트에서 인증 메일/알림 메일을 내 도메인 주소(`contact@my-domain.com`)로 발송하려면 **Resend** 서비스를 연동합니다. (무료 플랜 기준 일 100건 발송 가능)

### 설정 단계
1. **Resend 가입** (`resend.com`): 회원 가입 후 API 키를 생성합니다.
2. **도메인 추가**: `Domains` -> `Add Domain`을 누른 후 본인 도메인(예: `my-domain.com`)을 입력합니다.
3. **DNS 검증 레코드 추가**: Resend가 제공하는 **DKIM 레코드 (TXT)** 3개와 **SPF 레코드 (TXT)** 1개를 복사합니다.
4. **Cloudflare DNS 설정**:
   * Cloudflare DNS 관리 탭으로 이동하여 복사한 TXT 레코드들을 추가합니다.
5. **Verify 완료**: 약 1~5분 후 Resend 콘솔에서 `Verify` 상태가 `Verified`로 표시되는지 확인합니다.

---

## 🛡️ 3. 메일 수발신 및 스팸 방지를 위한 필수 DNS 레코드 이해

정상적으로 이메일이 오가고, 수신 측(Gmail, Outlook 등)에서 스팸으로 처리되지 않도록 아래 4가지 DNS 레코드를 반드시 Cloudflare DNS에 올바르게 입력해야 합니다.

### ① MX (Mail Exchanger) 레코드
* **목적**: 전 세계 서버에 "내 도메인으로 오는 이메일을 처리하는 메일 서버가 어디인지" 알려줍니다.
* **설정 예시 (Cloudflare Email Routing 기준)**:
  * Type: `MX`, Name: `@`, Value: `route1.mx.cloudflare.net`, Priority: `10`
  * Type: `MX`, Name: `@`, Value: `route2.mx.cloudflare.net`, Priority: `20`
  * Type: `MX`, Name: `@`, Value: `route3.mx.cloudflare.net`, Priority: `30`

### ② SPF (Sender Policy Framework) 레코드
* **목적**: "내 도메인을 사칭하지 않고 메일을 보낼 수 있는 허가된 서버 IP/도메인 목록"을 공표합니다. (위조 방지)
* **설정 예시**:
  * Type: `TXT`, Name: `@`, Value: `v=spf1 include:spf.cloudflare.net include:sendgrid.net include:amazonses.com -all` (허가된 발송 솔루션 명시)

### ③ DKIM (DomainKeys Identified Mail) 레코드
* **목적**: 이메일 헤더에 디지털 서명을 첨부하여 수신자가 메일의 송신 도중 변조 여부를 검증하게 만듭니다. (암호화 서명)
* **설정 예시 (Resend 연동 시 제공되는 레코드)**:
  * Type: `TXT`, Name: `resend._domainkey`, Value: `k=rsa; p=MIIBIjANBgkqhkiG9w0BAQ...`

### ④ DMARC (Domain-based Message Authentication, Reporting and Conformance) 레코드
* **목적**: SPF 또는 DKIM 검증에 실패한 사칭 메일을 수신 측에서 어떻게 처리(수신 거부, 스팸 분류 등)할 것인지 규칙을 정의합니다.
* **설정 예시**:
  * Type: `TXT`, Name: `_dmarc`, Value: `v=DMARC1; p=quarantine; pct=100; rua=mailto:dmarc-reports@my-domain.com`
  * *옵션 설명*:
    * `p=none`: 모니터링만 수행
    * `p=quarantine`: 검증 실패 시 스팸함으로 격리 (권장)
    * `p=reject`: 검증 실패 시 즉시 수신 거부/삭제
