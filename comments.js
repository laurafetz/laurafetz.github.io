(() => {
  'use strict';

  // Public jread URL from your signed-in HTML Comment Box install snippet.
  const embedUrl = 'https://www.htmlcommentbox.com/jread?mod=%241%24wq1rdBcg%24US2zxcJRa64ISk6JM.l1n.&opts=16798&num=10&ts=1792675868890';
  const section = document.getElementById('comments');
  if (!section) return;

  if (!embedUrl) {
    section.hidden = true;
    document.querySelectorAll('.project-contents a[href="#comments"]').forEach(link => {
      link.hidden = true;
    });
    return;
  }

  const status = section.querySelector('.comments-status');
  const retry = section.querySelector('.comments-retry');
  const thread = document.getElementById('HCB_comment_box');
  const path = location.pathname.replace(/index\.html$/, '').replace(/\/?$/, '/');
  const pageUrl = new URL(path, 'https://laurafetz.github.io').href;
  let loading = false;
  let script;
  let timeout;

  // The provider builds and replaces its form asynchronously, including on replies.
  const formObserver = new MutationObserver(() => {
    const name = thread.querySelector('#hcb_form_name');
    const message = thread.querySelector('#hcb_form_content');
    if (name) name.setAttribute('aria-label', 'Name');
    if (message) message.setAttribute('aria-label', 'Your comment');
  });
  formObserver.observe(thread, { childList: true, subtree: true });

  window.hcb_user = {
    PAGE: pageUrl,
    onload() {
      window.clearTimeout(timeout);
      status.hidden = true;
      retry.hidden = true;
    }
  };

  function unavailable() {
    window.clearTimeout(timeout);
    loading = false;
    if (script) script.remove();
    thread.hidden = true;
    status.textContent = 'Comments could not load. Please try again in a moment.';
    status.hidden = false;
    retry.hidden = false;
  }

  function loadComments() {
    if (loading) return;
    loading = true;
    retry.hidden = true;
    status.textContent = 'Loading comments…';
    status.hidden = false;
    thread.hidden = false;

    try {
      const url = new URL(embedUrl);
      if (url.origin !== 'https://www.htmlcommentbox.com' || url.pathname !== '/jread') {
        throw new Error('Invalid comment service configuration');
      }
      // Keep each page's thread stable across index.html, query strings, and anchors.
      url.searchParams.set('page', pageUrl);
      script = document.createElement('script');
      script.src = url.href;
      script.async = true;
      script.onerror = unavailable;
      timeout = window.setTimeout(unavailable, 20000);
      document.head.append(script);
    } catch {
      unavailable();
    }
  }

  retry.addEventListener('click', loadComments);
  document.querySelectorAll('.project-contents a[href="#comments"]').forEach(link => {
    link.addEventListener('click', loadComments);
  });
  if (location.hash === '#comments' || location.hash === '#HCB_comment_box') {
    loadComments();
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        loadComments();
      }
    }, { rootMargin: '300px' });
    observer.observe(section);
  } else {
    loadComments();
  }
})();
