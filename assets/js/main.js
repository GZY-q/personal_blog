document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => nav.classList.toggle('show'));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('show')));
  }

  // 平滑滚动（兼容性良好）
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', `#${targetId}`);
    });
  });

  // 项目卡片展开/收起
  document.querySelectorAll('[data-collapsible] .project-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const body = btn.parentElement.querySelector('.project-body');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (body) {
        body.hidden = expanded;
      }
    });
  });

  // 年份
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});


