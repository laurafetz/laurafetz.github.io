(() => {
  'use strict';
  const menu = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const desktopLinks = [...document.querySelectorAll('.pill-nav a')];
  const mobileLinks = [...mobileNav.querySelectorAll('a')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileNav.hidden = !open;
    mobileNav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) mobileLinks[0].focus();
  }
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  mobileLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (mobileNav.hidden) return;
    if (event.key === 'Escape') { setMenu(false); menu.focus(); }
    if (event.key === 'Tab') {
      const first = mobileLinks[0];
      const last = mobileLinks[mobileLinks.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); menu.focus(); }
      else if (event.shiftKey && document.activeElement === menu) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); menu.focus(); }
      else if (!event.shiftKey && document.activeElement === menu) { event.preventDefault(); first.focus(); }
    }
  });
  window.matchMedia('(min-width: 769px)').addEventListener('change', event => { if (event.matches) setMenu(false); });
  const sections = [...document.querySelectorAll('main > section[id]')];
  function updateNavigation() {
    if (!sections.length) return;
    const active = [...sections].reverse().find(section => section.getBoundingClientRect().top <= window.innerHeight * .35) || sections[0];
    [...desktopLinks, ...mobileLinks].forEach(link => {
      const current = link.hash === '#' + active.id;
      link.classList.toggle('active', current);
      if (current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  let scheduled = false;
  window.addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { updateNavigation(); scheduled = false; });
  }, { passive: true });
  window.addEventListener('resize', updateNavigation);
  updateNavigation();
  const track = document.querySelector('.lookbook-track');
  if (!track) return;
  const previous = document.getElementById('lbPrev');
  const next = document.getElementById('lbNext');
  function updateArrows() {
    previous.disabled = track.scrollLeft < 2;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
  }
  function moveProjects(direction) {
    const card = track.querySelector('.project-card');
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  }
  previous.addEventListener('click', () => moveProjects(-1));
  next.addEventListener('click', () => moveProjects(1));
  track.addEventListener('scroll', updateArrows, { passive: true });
  track.addEventListener('keydown', event => {
    if (event.target !== track) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault(); moveProjects(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  window.addEventListener('resize', updateArrows);
  updateArrows();
})();
