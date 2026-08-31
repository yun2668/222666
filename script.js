document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");

  menuBtn.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  navMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  // 只更新「目前階段」文字，不會隱藏任何網頁內容。
  const now = new Date();
  const d2027 = new Date("2027-01-01T00:00:00+08:00");
  const d2029 = new Date("2029-01-01T00:00:00+08:00");

  const stageText = document.getElementById("stageText");
  const truckRule = document.getElementById("truckRule");
  const faqTruck = document.getElementById("faqTruck");
  const stages = [
    document.getElementById("stage1"),
    document.getElementById("stage2"),
    document.getElementById("stage3")
  ];

  let current = 0;
  if (now >= d2029) current = 2;
  else if (now >= d2027) current = 1;

  const data = [
    {
      label: "第一階段｜2006.09.30（含）前出廠",
      rule: "目前第一階段，2006 年 9 月 30 日（含）前出廠的柴油小貨車已納入管制。",
      faq: "目前第一階段：2006 年 9 月 30 日（含）前出廠的柴油小貨車已納入管制；第二階段自 2027 年 1 月 1 日起擴大。"
    },
    {
      label: "第二階段｜2011.12.31（含）前出廠",
      rule: "目前第二階段，2011 年 12 月 31 日（含）前出廠的柴油小貨車已納入管制。",
      faq: "目前第二階段：2011 年 12 月 31 日（含）前出廠的柴油小貨車已納入管制；第三階段自 2029 年 1 月 1 日起擴及所有期別。"
    },
    {
      label: "第三階段｜所有期別柴油小貨車",
      rule: "目前第三階段，所有期別柴油小貨車皆已納入公告管制範圍。",
      faq: "目前第三階段：所有期別柴油小貨車皆已納入公告管制範圍。"
    }
  ];

  stageText.textContent = data[current].label;
  truckRule.textContent = data[current].rule;
  faqTruck.textContent = data[current].faq;

  stages.forEach((stage, i) => {
    stage.classList.toggle("active", i === current);
    const label = stage.querySelector("small");
    if (i < current) label.textContent = "已實施";
    else if (i === current) label.textContent = "目前階段";
    else label.textContent = "尚未開始";
  });
});
