---
name: korean-domain-and-logo-setup
description: 비즈니스를 위한 도메인 구매, DNS 네임서버 설정, 로고 디자인 및 파비콘(Favicon .ico) 변환 가이드.
---

# 🌐 Step 1. 도메인 구매 및 로고/파비콘(.ico) 제작 가이드

브랜드의 독자적인 정체성을 확립하고 PG 결제 승인 및 세무 준비를 원활하게 진행하기 위해, 도메인 주소를 확보하고 웹사이트의 기본 시각 요소를 세팅하는 실무 단계입니다.

---

## 🔗 1. 도메인 구매 및 DNS 네임서버 설정

인터넷 주소인 도메인(예: `my-brand.com`)은 국내외 등록 대행기관에서 구매할 수 있으며, 효율적인 웹 관리와 무료 이메일 수신을 위해 **Cloudflare** 네임서버에 연동하는 것을 적극 권장합니다.

### ① 도메인 구매
* **추천 대행사**: Cloudflare Registrar (수수료 없는 최저가), 가비아 (한글 지원 및 국내 도메인 `.co.kr` 편리), Namecheap 등.
* **TIPS**: 글로벌 확장성을 위해 되도록 `.com` 또는 `.io` 주소를 권장하며, 국내 한정 비즈니스인 경우 `.co.kr` 도메인도 좋은 대안입니다.

### ② Cloudflare DNS 네임서버 변경 연동
1. **Cloudflare 로그인 및 사이트 추가**: `cloudflare.com`에 가입한 뒤 `Add a site`를 눌러 본인이 구매한 도메인 주소를 입력합니다.
2. **네임서버(NS) 확인**: Cloudflare가 배정해 주는 고유 네임서버 주소 2개(예: `alice.ns.cloudflare.com`, `bob.ns.cloudflare.com`)를 확인 및 복사합니다.
3. **도메인 등록사 네임서버 변경**:
   * 도메인을 구매한 사이트(예: 가비아)의 도메인 관리 메뉴로 이동합니다.
   * `네임서버 설정/변경` ➔ 1차 및 2차 네임서버에 Cloudflare에서 복사한 주소를 각각 입력하고 저장합니다.
4. **활성화**: 네임서버 정보 전파에는 수 분에서 최대 24시간이 소요되며, 완료 시 Cloudflare로부터 활성화 완료 이메일이 발송됩니다.

---

## 🎨 2. 로고 디자인 및 파비콘(Favicon .ico) 제작

웹사이트 상단 탭에 노출되는 파비콘(`.ico`)과 메인 로고는 브랜드의 신뢰도를 확보하는 장치입니다. PG 심사 시 사이트 로고 및 파비콘이 누락되거나 디폴트 아이콘으로 노출되면 심사가 반려될 수 있습니다.

### ① 로고 및 파비콘 규격
* **로고**: 가로형 로고(PNG/SVG, 투명 배경)를 최소 500x120px 이상의 해상도로 준비합니다.
* **파비콘 원본**: 정사각형 로고(투명 배경 PNG)를 **512x512px** 규격으로 제작합니다.

### ② Python을 이용한 고화질 다중 해상도 `.ico` 파일 변환
브랜드 로고 이미지를 구형 브라우저(IE 등)와 신형 브라우저 탭 전체에서 깨짐 없이 표시하려면 16x16, 32x32, 48x48 픽셀이 모두 내장된 **다중 해상도 ICO 파일**로 변환해야 합니다.

파이썬의 `Pillow` 라이브러리를 사용해 터미널에서 간단하게 다중 해상도 파비콘을 추출할 수 있습니다.

```python
# 필수 라이브러리 설치
# pip install Pillow

from PIL import Image

def convert_to_favicon(png_path, output_ico_path):
    img = Image.open(png_path)
    
    # 브라우저별 파비콘 표준 규격 해상도 정의
    sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    
    # RGBA 모드 유지하여 투명 배경 보존
    img.save(output_ico_path, format='ICO', sizes=sizes)
    print(f"Favicon saved successfully to {output_ico_path}")

# 실행 예시
convert_to_favicon("logo_source_512.png", "favicon.ico")
```

### ③ HTML 적용 코드
변환된 `favicon.ico` 및 PNG 에셋들을 웹사이트의 `index.html` 내 `<head>` 영역에 다음과 같이 링크합니다.

```html
<!-- 브라우저 범용 파비콘 (16/32/48px 지원) -->
<link rel="icon" href="/favicon.ico" type="image/x-icon">

<!-- 모던 브라우저용 고해상도 PNG 파비콘 -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png">

<!-- 애플 기기용 파비콘 (홈화면 아이콘) -->
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```
