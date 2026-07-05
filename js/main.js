/* ============================================================
   김지환 Portfolio · main.js
   - 사이드바 내비게이션 ↔ 페이지 전환 (SPA 방식)
   - URL 해시(#about 등) 동기화 + 뒤로가기 지원
   - 모바일 사이드바 토글
   ============================================================ */

(function () {
  "use strict";

  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const pages = Array.from(document.querySelectorAll(".page"));
  const main = document.getElementById("main");

  /* --- 페이지 전환 핵심 함수 --- */
  function showPage(name, push) {
    const target = document.getElementById("page-" + name);
    if (!target) return;

    pages.forEach((p) => p.classList.remove("active"));
    target.classList.add("active");

    navLinks.forEach((l) =>
      l.classList.toggle("active", l.dataset.page === name)
    );

    // 콘텐츠 상단으로 스크롤 (전환 시 항상 처음부터)
    if (main) main.scrollTo({ top: 0, behavior: "auto" });
    window.scrollTo({ top: 0, behavior: "auto" });

    // URL 해시 동기화
    if (push && location.hash !== "#" + name) {
      history.pushState({ page: name }, "", "#" + name);
    }

    closeSidebar();
  }

  /* --- 내비게이션 클릭 --- */
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      showPage(link.dataset.page, true);
    });
  });

  /* --- 홈 화면의 CTA 버튼 (data-goto) --- */
  document.querySelectorAll("[data-goto]").forEach((btn) => {
    btn.addEventListener("click", () => showPage(btn.dataset.goto, true));
  });

  /* --- 브라우저 뒤로/앞으로 --- */
  window.addEventListener("popstate", () => {
    const name = (location.hash || "#home").slice(1);
    showPage(name, false);
  });

  /* --- 모바일 사이드바 토글 --- */
  const toggle = document.getElementById("mbToggle");
  const sidebar = document.getElementById("sidebar");
  const scrim = document.getElementById("scrim");

  function openSidebar() {
    sidebar.classList.add("open");
    scrim.classList.add("show");
    if (toggle) toggle.classList.add("open");
  }
  function closeSidebar() {
    sidebar.classList.remove("open");
    scrim.classList.remove("show");
    if (toggle) toggle.classList.remove("open");
  }
  if (toggle) {
    toggle.addEventListener("click", () => {
      sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
    });
  }
  if (scrim) scrim.addEventListener("click", closeSidebar);

  /* --- 키보드 접근성: Esc로 사이드바 닫기 --- */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });

  /* --- 최초 진입 시 해시에 맞는 페이지 표시 --- */
  const initial = (location.hash || "#home").slice(1);
  showPage(document.getElementById("page-" + initial) ? initial : "home", false);
})();
