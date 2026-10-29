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
      projectTrack.setAttribute('aria-label', grid ? 'All programming projects' : 'Programming projects, scroll horizontally');
      if (grid) projectTrack.removeAttribute('tabindex');
      else projectTrack.setAttribute('tabindex', '0');
      projectTrack.scrollLeft = 0;
      document.querySelector('.lookbook-arrows').hidden = grid;
      if (!grid) window.dispatchEvent(new Event('resize'));
    });
  }

  let profileRequest;
  let mapRequest;
  async function readJson(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Could not load ' + url);
    return response.json();
  }
  function loadProfile() {
    if (!profileRequest) profileRequest = readJson('data/interests.json?v=map-bookshelf').catch(error => {
      profileRequest = null;
      throw error;
    });
    return profileRequest;
  }
  function loadMap() {
    if (!mapRequest) mapRequest = readJson('data/travel-map.json?v=country-focus').catch(error => {
      mapRequest = null;
      throw error;
    });
    return mapRequest;
  }
  function showRetry(container, text, retry) {
    const message = document.createElement('p');
    message.className = 'map-error';
    message.setAttribute('role', 'status');
    message.textContent = text;
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Try again';
    button.addEventListener('click', retry, { once: true });
    message.append(button);
    container.replaceChildren(message);
  }

  async function renderBookshelf(shelf) {
    shelf.setAttribute('aria-busy', 'true');
    const grid = shelf.querySelector('[data-bookshelf-books]');
    try {
      const profile = await loadProfile();
      if (!shelf.isConnected) return;
      const cards = profile.books.map(book => {
        const article = document.createElement('article');
        article.className = 'book-card';
        const cover = document.createElement('div');
        cover.className = 'book-cover';
        const title = document.createElement('h4');
        title.textContent = book.title;
        const author = document.createElement('p');
        author.className = 'book-author';
        author.textContent = book.author;
        cover.append(title, author);
        article.append(cover);
        if (book.note) {
          const note = document.createElement('p');
          note.className = 'book-note';
          note.textContent = book.note;
          article.append(note);
        }
        return article;
      });
      grid.replaceChildren(...cards);
    } catch {
      if (shelf.isConnected) showRetry(grid, 'My bookshelf could not load. Please try again.', () => renderBookshelf(shelf));
    } finally {
      shelf.setAttribute('aria-busy', 'false');
    }
  }

  async function renderTravelMap(atlas) {
    atlas.setAttribute('aria-busy', 'true');
    const frame = atlas.querySelector('[data-map-frame]');
    try {
      const [world, profile] = await Promise.all([loadMap(), loadProfile()]);
      if (!atlas.isConnected) return;
      const visited = new Set(profile.visited);
      const countries = new Map(world.countries.map(country => [country.id, country]));
      const selector = atlas.querySelector('[data-map-country]');
      const info = atlas.querySelector('[data-map-info]');
      const zoomIn = atlas.querySelector('[data-map-zoom="in"]');
      const zoomOut = atlas.querySelector('[data-map-zoom="out"]');
      const reset = atlas.querySelector('[data-map-reset]');
      const namespace = 'http://www.w3.org/2000/svg';
      const svgNode = (name, attributes = {}) => {
        const node = document.createElementNS(namespace, name);
        Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, String(value)));
        return node;
      };
      const svg = svgNode('svg', { viewBox: '0 0 ' + world.width + ' ' + world.height, role: 'img', 'aria-labelledby': 'travel-svg-title travel-svg-description' });
      const title = svgNode('title', { id: 'travel-svg-title' });
      title.textContent = 'My travel map';
      const description = svgNode('desc', { id: 'travel-svg-description' });
      description.textContent = 'Countries I have visited are green. Use the country selector and zoom buttons to explore the map.';
      svg.append(title, description, svgNode('path', { d: world.sphere, class: 'map-ocean' }), svgNode('path', { d: world.graticule, class: 'map-graticule' }));
      const paths = new Map();
      world.countries.forEach(country => {
        const path = svgNode('path', { d: country.path, class: 'map-country' + (visited.has(country.id) ? ' is-visited' : ''), 'data-country': country.id });
        const label = svgNode('title');
        label.textContent = country.name + (visited.has(country.id) ? ' · visited' : ' · still to explore');
        path.append(label);
        paths.set(country.id, path);
        svg.append(path);
      });
      const options = world.countries.map(country => {
        const option = document.createElement('option');
        option.value = country.id;
        option.textContent = country.name + (visited.has(country.id) ? ' · visited' : '');
        return option;
      });
      selector.replaceChildren(new Option('Choose a place', ''), ...options);
      frame.replaceChildren(svg);
      atlas.querySelector('[data-travel-count]').textContent = visited.size + (visited.size === 1 ? ' place visited' : ' places visited');
      const visitedList = atlas.querySelector('[data-visited-places]');
      const placeButtons = [...visited].map(id => countries.get(id)).filter(Boolean).sort((a, b) => a.name.localeCompare(b.name)).map(country => {
        const item = document.createElement('li');
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = country.name;
        button.addEventListener('click', () => selectCountry(country.id, true));
        item.append(button);
        return item;
      });
      visitedList.replaceChildren(...placeButtons);
      let view = { x: 0, y: 0, width: world.width, height: world.height };
      let selectedPath;
      function setView(next) {
        const width = Math.min(world.width, Math.max(world.width / 12, next.width));
        const height = width * world.height / world.width;
        const centerX = next.x + next.width / 2;
        const centerY = next.y + next.height / 2;
        view = {
          x: Math.max(0, Math.min(world.width - width, centerX - width / 2)),
          y: Math.max(0, Math.min(world.height - height, centerY - height / 2)),
          width, height
        };
        svg.setAttribute('viewBox', [view.x, view.y, view.width, view.height].join(' '));
        zoomIn.disabled = width <= world.width / 12 + .01;
        zoomOut.disabled = width >= world.width - .01;
      }
      function selectCountry(id, focusMap) {
        const country = countries.get(id);
        if (!country) return;
        selectedPath?.classList.remove('is-selected');
        selectedPath = paths.get(id);
        selectedPath.classList.add('is-selected');
        selectedPath.parentNode.append(selectedPath);
        selector.value = id;
        info.textContent = country.name + (visited.has(id) ? ' — one of the places I’ve visited.' : ' — somewhere I’d love to explore.');
        if (focusMap) {
          const [x0, y0, x1, y1] = country.focusBounds || country.bounds;
          const width = Math.max((x1 - x0) * 1.7, (y1 - y0) * 1.7 * world.width / world.height, world.width / 12);
          const height = width * world.height / world.width;
          setView({ x: (x0 + x1 - width) / 2, y: (y0 + y1 - height) / 2, width, height });
        }
      }
      function zoom(factor) {
        const width = view.width * factor;
        const height = view.height * factor;
        setView({ x: view.x + (view.width - width) / 2, y: view.y + (view.height - height) / 2, width, height });
      }
      selector.disabled = false;
      selector.addEventListener('change', () => {
        if (selector.value) selectCountry(selector.value, true);
        else reset.click();
      });
      zoomIn.addEventListener('click', () => zoom(1 / 1.8));
      zoomOut.addEventListener('click', () => zoom(1.8));
      reset.disabled = false;
      reset.addEventListener('click', () => {
        selectedPath?.classList.remove('is-selected');
        selectedPath = null;
        selector.value = '';
        info.textContent = 'A lifetime of exploring ahead.';
        setView({ x: 0, y: 0, width: world.width, height: world.height });
      });
      let drag;
      let dragged = false;
      svg.addEventListener('pointerdown', event => {
        if (event.button !== 0) return;
        dragged = false;
        drag = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, view: { ...view }, scale: svg.getScreenCTM().a };
      });
      svg.addEventListener('pointermove', event => {
        if (!drag || drag.pointerId !== event.pointerId) return;
        const dx = event.clientX - drag.x;
        const dy = event.clientY - drag.y;
        if (!dragged && Math.hypot(dx, dy) < 6) return;
        dragged = true;
        if (!svg.hasPointerCapture(event.pointerId)) svg.setPointerCapture(event.pointerId);
        svg.classList.add('is-dragging');
        setView({ ...drag.view, x: drag.view.x - dx / drag.scale, y: drag.view.y - dy / drag.scale });
      });
      const endDrag = event => {
        if (svg.hasPointerCapture(event.pointerId)) svg.releasePointerCapture(event.pointerId);
        drag = null;
        svg.classList.remove('is-dragging');
      };
      svg.addEventListener('pointerup', endDrag);
      svg.addEventListener('pointercancel', endDrag);
      svg.addEventListener('click', event => {
        if (dragged) { dragged = false; return; }
        const country = event.target.closest('[data-country]');
        if (country) selectCountry(country.dataset.country, false);
      });
      setView(view);
    } catch {
      if (atlas.isConnected) showRetry(frame, 'My travel map could not load. Please try again.', () => renderTravelMap(atlas));
    } finally {
      atlas.setAttribute('aria-busy', 'false');
    }
  }

  document.addEventListener('details:open', event => {
    const atlas = event.target.querySelector('[data-travel-map]');
    const shelf = event.target.querySelector('[data-bookshelf]');
    if (atlas) renderTravelMap(atlas);
    if (shelf) renderBookshelf(shelf);
  });
})();
