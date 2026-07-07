/* ============================================================
   김지환 Portfolio · main.js
   - 상단 내비게이션 ↔ 페이지 전환 (SPA 방식)
   - URL 해시(#about 등) 동기화 + 뒤로가기 지원
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

    // URL 해시 동기화 (history.pushState는 file:// 로 열었을 때 브라우저가
    // "Unsafe attempt to load URL ..." 보안 오류를 던지므로 location.hash를 사용)
    if (push && location.hash !== "#" + name) {
      location.hash = name;
    }
  }

  /* --- 내비게이션 클릭 --- */
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      showPage(link.dataset.page, true);
    });
  });

  /* --- CTA 버튼 / About → Work 프로젝트 바로가기 (data-goto) --- */
  document.querySelectorAll("[data-goto]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      showPage(el.dataset.goto, true);
      const anchorId = el.dataset.anchor;
      if (anchorId) {
        requestAnimationFrame(() => {
          const anchorTarget = document.getElementById(anchorId);
          if (anchorTarget) anchorTarget.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    });
  });

  /* --- 브라우저 뒤로/앞으로 (해시 변경 감지) --- */
  window.addEventListener("hashchange", () => {
    const name = (location.hash || "#home").slice(1);
    showPage(name, false);
  });

  /* --- 최초 진입 시 해시에 맞는 페이지 표시 --- */
  const initial = (location.hash || "#home").slice(1);
  showPage(document.getElementById("page-" + initial) ? initial : "home", false);

  /* --- Work 페이지 서브네비 스크롤 스파이 --- */
  const subnavLinks = Array.from(document.querySelectorAll(".work-subnav-link"));
  const workProjects = Array.from(document.querySelectorAll(".work-project, .wp-finale"));
  if (subnavLinks.length && workProjects.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          subnavLinks.forEach((l) =>
            l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id)
          );
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    workProjects.forEach((p) => spy.observe(p));
  }
})();
