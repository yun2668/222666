const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.site-nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// 柴油小貨車分階段管制：依官網公告日期自動切換。
function getCurrentStage() {
  const now = new Date();
  const stage2 = new Date('2027-01-01T00:00:00+08:00');
  const stage3 = new Date('2029-01-01T00:00:00+08:00');

  if (now >= stage3) {
    return {
      number: 3,
      short: '目前：第三階段｜全期別柴油小貨車納管',
      faq: '目前已進入第三階段（118 年 1 月 1 日起），全期別柴油小貨車均納入管制；仍應依公告確認排煙檢驗或例外資格。'
    };
  }

  if (now >= stage2) {
    return {
      number: 2,
      short: '目前：第二階段｜100.12.31（含）前出廠車輛納管',
      faq: '目前為第二階段（116 年 1 月 1 日起），納管 100 年 12 月 31 日（含）前出廠之柴油小貨車。'
    };
  }

  return {
    number: 1,
    short: '目前：第一階段｜95.09.30（含）前出廠車輛納管',
    faq: '目前為第一階段，納管 95 年 9 月 30 日（含）前出廠之柴油小貨車；第二階段將自 116 年 1 月 1 日起實施。'
  };
}

const stage = getCurrentStage();
const currentStage = document.querySelector('#currentStage');
const faqStage = document.querySelector('#faqStage');
if (currentStage) currentStage.textContent = stage.short;
if (faqStage) faqStage.textContent = stage.faq;

document.querySelectorAll('.t-item').forEach(item => {
  item.classList.toggle('active', Number(item.dataset.stage) === stage.number);
});

// 捲動進場動畫
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// 回到頁首按鈕
const toTop = document.querySelector('.to-top');
window.addEventListener('scroll', () => {
  if (toTop) toTop.classList.toggle('show', window.scrollY > 500);
});
if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// 實景照片：官方來源若暫時無法連線，先切換到 Wikimedia Commons 實景備援圖。
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => {
    const fallback = img.dataset.fallback;
    if (fallback && img.src !== fallback && img.dataset.fallbackUsed !== '1') {
      img.dataset.fallbackUsed = '1';
      img.src = fallback;
      return;
    }

    const box = document.createElement('div');
    box.className = 'image-fallback';
    box.textContent = '照片暫時無法載入，請確認網路連線後重新整理頁面。';
    box.style.cssText = 'min-height:240px;display:grid;place-items:center;padding:28px;text-align:center;background:#edf5f5;color:#58717d;font-size:14px;';
    img.replaceWith(box);
  });
});
