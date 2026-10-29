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
  const navigationBreakpoint = Number(menu.dataset.navBreakpoint) || 768;
  window.matchMedia('(min-width: ' + (navigationBreakpoint + 1) + 'px)').addEventListener('change', event => { if (event.matches) setMenu(false); });
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
  function bindDetailsDialog(dialogId, triggerSelector, templatePrefix, titleForTrigger) {
    const dialog = document.getElementById(dialogId);
    if (!dialog) return;
    const title = dialog.querySelector('.toolkit-header h2');
    const content = dialog.querySelector('[data-dialog-content]');
    const description = dialog.querySelector('.toolkit-description');
    const defaultDescription = description.textContent;
    let opener = null;
    let backdropPointerDown = false;
    const outsideDialog = event => {
      const bounds = dialog.getBoundingClientRect();
      return event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    };
    document.querySelectorAll(triggerSelector).forEach(button => {
      button.addEventListener('click', () => {
        const template = document.getElementById(templatePrefix + (button.dataset.toolkit || button.dataset.interest));
        if (!template || dialog.open) return;
        opener = button;
        title.textContent = template.dataset.title || titleForTrigger(button);
        description.textContent = template.dataset.description || defaultDescription;
        content.replaceChildren(template.content.cloneNode(true));
        dialog.classList.toggle('interest-dialog-wide', template.dataset.layout === 'wide');
        dialog.scrollTop = 0;
        dialog.showModal();
        document.body.classList.add('toolkit-open');
        dialog.dispatchEvent(new CustomEvent('details:open', { bubbles: true }));
      });
    });
    dialog.querySelector('.toolkit-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('pointerdown', event => { backdropPointerDown = outsideDialog(event); });
    dialog.addEventListener('click', event => {
      if (backdropPointerDown && outsideDialog(event)) dialog.close();
      backdropPointerDown = false;
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('toolkit-open');
      opener?.focus({ preventScroll: true });
    });
  }
  bindDetailsDialog('toolkit-dialog', '.toolkit-trigger', 'toolkit-', button => 'My ' + button.dataset.language + ' toolkit');
  bindDetailsDialog('interest-dialog', '.interest-trigger', 'interest-', button => button.textContent.trim());
  const track = document.querySelector('.lookbook-track');
  if (!track) return;
  const previous = document.getElementById('lbPrev');
  const next = document.getElementById('lbNext');
  function updateArrows() {
    if (track.classList.contains('is-grid')) return;
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
    if (event.target !== track || track.classList.contains('is-grid')) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault(); moveProjects(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  window.addEventListener('resize', updateArrows);
  updateArrows();
})();
