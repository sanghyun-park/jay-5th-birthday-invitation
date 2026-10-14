# 준규의 다섯 번째 생일 초대장 🎉

Vite + React 로 만든 모바일 원페이지 초대장입니다. GitHub Pages로 배포됩니다.

## 개발

```bash
npm install
npm run dev
```

## 빌드 / 미리보기

```bash
npm run build
npm run preview
```

## 배포 (GitHub Pages)

### 방법 1. GitHub Actions (권장)
1. GitHub에 저장소를 만들고 코드를 푸시합니다. (저장소 이름: `jay-5th-birthday-invitation`)
2. 저장소 **Settings → Pages → Source** 를 **GitHub Actions** 로 설정합니다.
3. `main` 브랜치에 푸시하면 자동으로 빌드 & 배포됩니다.
4. 배포 주소: `https://<사용자명>.github.io/jay-5th-birthday-invitation/`

### 방법 2. gh-pages 수동 배포
```bash
npm run deploy
```

> 저장소 이름이 다르면 [vite.config.js](vite.config.js)의 `base` 값을 `/저장소이름/` 으로 바꿔주세요.

## 내용 수정

- 파티 날짜·장소·문구 등: [src/data/party.js](src/data/party.js)
- 사진: `public/images/` 폴더 ([안내](public/images/README.md))
