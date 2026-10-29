(() => {
  'use strict';

  const viewToggle = document.getElementById('project-view-toggle');
  const projectTrack = document.getElementById('project-track');
  if (viewToggle && projectTrack) {
    viewToggle.hidden = false;
    viewToggle.addEventListener('click', () => {
      const grid = projectTrack.classList.toggle('is-grid');
      viewToggle.setAttribute('aria-expanded', String(grid));
      viewToggle.querySelector('span').textContent = grid ? 'Back to carousel' : 'View all projects';
      projectTrack.setAttribute('aria-label', grid ? 'All data projects' : 'Data projects, scroll horizontally');
      if (grid) projectTrack.removeAttribute('tabindex');
      else projectTrack.setAttribute('tabindex', '0');
      projectTrack.scrollLeft = 0;
      document.querySelector('.lookbook-arrows').hidden = grid;
      if (!grid) window.dispatchEvent(new Event('resize'));
    });
  }

})();
