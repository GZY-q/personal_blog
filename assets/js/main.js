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

  // 滚动时导航高亮当前区块
  const sectionIds = Array.from(document.querySelectorAll('main section[id]')).map(s => s.id);
  const navLinks = sectionIds.map(id => document.querySelector(`nav a[href="#${id}"]`)).filter(Boolean);
  const activate = id => {
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
  };
  const io = ('IntersectionObserver' in window) ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) activate(entry.target.id);
    });
  }, { rootMargin: '-60% 0px -35% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }) : null;
  if (io) {
    document.querySelectorAll('main section[id]').forEach(sec => io.observe(sec));
  } else {
    // 退化方案：滚动监听
    window.addEventListener('scroll', () => {
      let current = sectionIds[0];
      const scrollY = window.scrollY + 100;
      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      });
      activate(current);
    }, { passive: true });
  }
});


