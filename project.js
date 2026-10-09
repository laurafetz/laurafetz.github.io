(() => {
  'use strict';
  const tables = [...document.querySelectorAll('.report-table')];
  function updateTableHints() {
    tables.forEach(table => {
      const hint = table.nextElementSibling;
      if (hint && hint.classList.contains('report-table-hint')) {
        hint.hidden = table.scrollWidth <= table.clientWidth + 1;
      }
    });
  }
  window.addEventListener('resize', updateTableHints);
  if (document.fonts) document.fonts.ready.then(updateTableHints);
  updateTableHints();

  document.querySelectorAll('.notebook-linked-image').forEach(image => {
    function showUnavailable() {
      image.hidden = true;
      const figure = image.closest('.notebook-linked-figure');
      const hint = figure.querySelector('.notebook-image-hint');
      if (hint) hint.hidden = true;
      const message = figure.querySelector('.notebook-image-unavailable');
      if (message) message.hidden = false;
    }
    image.addEventListener('error', showUnavailable);
    if (image.complete && !image.naturalWidth) showUnavailable();
  });

  const button = document.getElementById('toggle-code');
  const cells = [...document.querySelectorAll('.notebook-code')];
  if (!button || !cells.length) return;
  button.hidden = false;
  function updateButton() {
    const allHidden = cells.every(cell => !cell.open);
    button.textContent = allHidden ? 'Show all code' : 'Hide all code';
    button.setAttribute('aria-pressed', String(allHidden));
  }
  button.addEventListener('click', () => {
    const hide = cells.some(cell => cell.open);
    cells.forEach(cell => { cell.open = !hide; });
    updateButton();
  });
  cells.forEach(cell => cell.addEventListener('toggle', updateButton));
  updateButton();
})();
