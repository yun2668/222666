document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const siteNav = document.getElementById("siteNav");
  const toTop = document.getElementById("toTop");

  // Mobile menu
  menuBtn?.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuBtn?.setAttribute("aria-expanded", "false");
    });
  });

  // FAQ accordion
  document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const wasOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item.open").forEach(openItem => {
        openItem.classList.remove("open");
        openItem.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
      });

      if (!wasOpen) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Back to top
  const updateToTop = () => {
    toTop?.classList.toggle("show", window.scrollY > 480);
  };
  window.addEventListener("scroll", updateToTop, { passive: true });
  updateToTop();

  toTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Automatically determine current diesel light-truck control phase.
  // This keeps the page useful after 2027 and 2029 without manual changes.
  const now = new Date();
  const stage1 = new Date("2025-01-01T00:00:00+08:00");
  const stage2 = new Date("2027-01-01T00:00:00+08:00");
  const stage3 = new Date("2029-01-01T00:00:00+08:00");

  let currentIndex = -1;
  let statusText = "尚未開始";
  let faqText = "分階段管制尚未開始。";

  if (now >= stage3) {
    currentIndex = 2;
    statusText = "第三階段｜所有期別柴油小貨車";
    faqText = "目前已進入第三階段：所有期別柴油小貨車皆屬公告納管範圍，仍須依規定確認排煙檢驗或適用的排除條件。";
  } else if (now >= stage2) {
    currentIndex = 1;
    statusText = "第二階段｜2011.12.31（含）前出廠";
    faqText = "目前為第二階段：2011 年 12 月 31 日（含）前出廠的柴油小貨車已納入管制。";
  } else if (now >= stage1) {
    currentIndex = 0;
    statusText = "第一階段｜2006.09.30（含）前出廠";
    faqText = "目前為第一階段：2006 年 9 月 30 日（含）前出廠的柴油小貨車已納入管制；第二階段將自 2027 年 1 月 1 日起實施。";
  }

  const currentStage = document.getElementById("currentStage");
  const truckFaq = document.getElementById("truckFaq");
  if (currentStage) currentStage.textContent = statusText;
  if (truckFaq) truckFaq.textContent = faqText;

  document.querySelectorAll(".timeline-item").forEach((item, index) => {
    const badge = item.querySelector(".stage-badge");
    item.classList.toggle("active", index === currentIndex);

    if (!badge) return;
    if (index < currentIndex) badge.textContent = "已實施";
    else if (index === currentIndex) badge.textContent = "目前階段";
    else badge.textContent = "尚未開始";
  });

  // Gentle reveal on scroll
  const revealTargets = document.querySelectorAll(
    ".feature-card, .rule-card, .timeline-item, .road-list > div, .faq-item"
  );

  if ("IntersectionObserver" in window) {
    revealTargets.forEach(el => el.classList.add("reveal"));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(el => observer.observe(el));
  }
});
