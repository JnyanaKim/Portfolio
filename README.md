# 김지환 Portfolio

사이드바 내비게이션 + JavaScript 페이지 전환(SPA) 방식의 포트폴리오 사이트.

## 구조
```
portfolio-site/
├─ index.html        # 마크업 (모든 섹션이 .page 로 들어있음)
├─ css/
│  └─ style.css      # 스타일 — 색/폰트/여백은 :root 변수로 커스텀
└─ js/
   └─ main.js        # 사이드바 내비, 페이지 전환, 모바일 토글
```

## VS Code에서 열기
1. 이 폴더를 VS Code로 열기 (File → Open Folder)
2. `index.html` 우클릭 → "Open with Live Server" (Live Server 확장 추천)
   또는 그냥 index.html을 브라우저로 열어도 동작함

## 커스터마이즈 포인트
- **색상 테마**: `css/style.css` 최상단 `:root` 의 `--accent`, `--bg` 등 변경
- **사이드바 폭**: `--side-w`
- **메뉴 추가**: index.html 의 `.nav` 안에 `<a class="nav-link" data-page="새이름">` 추가 후,
  대응하는 `<section class="page" id="page-새이름">` 를 main 안에 추가하면 JS가 자동 연결됨
- **지역/직무 문구**: index.html 에서 지원처에 따라 교체

## 배포
- GitHub Pages: 이 폴더를 레포에 push → Settings → Pages → 브랜치 지정
- Notion: 배포된 URL을 embed
