(() => {
  'use strict';
  const descriptions = {
    factor: {
      title: 'Conceptual factor model: a shared trait links four observed measures',
      caption: 'Concept sketch · a shared trait links the observed measures A–D.'
    },
    network: {
      title: 'Conceptual network model: direct connections link four observed measures',
      caption: 'Concept sketch · direct connections link the observed measures A–D.'
    }
  };
  document.querySelectorAll('[data-model-demo]').forEach(demo => {
    demo.querySelectorAll('[data-research-model]').forEach(button => {
      button.addEventListener('click', () => {
        const model = button.dataset.researchModel;
        demo.querySelectorAll('[data-research-model]').forEach(control => {
          control.setAttribute('aria-pressed', String(control === button));
        });
        demo.querySelectorAll('[data-model-view]').forEach(view => {
          if (view.dataset.modelView === model) view.removeAttribute('hidden');
          else view.setAttribute('hidden', '');
        });
        demo.querySelector('svg title').textContent = descriptions[model].title;
        demo.querySelector('.model-caption').textContent = descriptions[model].caption;
      });
    });
  });
})();
