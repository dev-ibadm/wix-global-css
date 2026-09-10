window.addEventListener('message', function (event) {
  if (!event.data || event.data.type !== 'MOBILE_MENU') return;

  const iframe = document.querySelector(
    '.comp-mb7ogqrp_r_comp-mdr142kt ._iframe_j35j1_7'
  );

  if (!iframe) return;

  iframe.classList.toggle(
    'mobile-menu-open',
    event.data.action === 'open'
  );
});


window.addEventListener('message', e => {
  if (e.data?.type !== 'EG_SCROLL') return;

  const el = document.getElementById((e.data.target || '').slice(1));
  if (!el) return;

  const from = window.scrollY;
  const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const to = el.getBoundingClientRect().top + from - offset;
  const distance = to - from;
  const start = performance.now();
  const duration = Math.min(2000, Math.max(900, Math.abs(distance) * .4));

  function move(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

    window.scrollTo(0, from + distance * ease);

    if (p < 1) requestAnimationFrame(move);
  }

  requestAnimationFrame(move);
});



window.addEventListener('message', e => {
  if (e.data?.type !== 'IFRAME_HEIGHT') return;

  const iframe = [...document.querySelectorAll(
    '#comp-mtaeju8d iframe, #comp-mtcgqknb iframe, #comp-mt7evu7d iframe'
  )].find(frame => frame.contentWindow === e.source);

  if (!iframe) return;

  const h = e.data.height + 'px';

  iframe.style.height = h;
  iframe.parentElement.style.height = h;
  iframe.closest('.html-component')?.style.setProperty('height', h);
});




(() => {
  const fixImage = img => {
    if (!(img instanceof HTMLImageElement)) return;

    const src = img.getAttribute('src') || '';

    if (!src.includes('static.wixstatic.com/media/')) return;

    const match = src.match(/\/w_(\d+),h_(\d+),/);
    if (!match) return;

    const w = Number(match[1]);
    const h = Number(match[2]);

    // Already upgraded
    if (w >= 1000) return;

    const scale = 3;

    const newSrc = src
      .replace(
        /\/w_\d+,h_\d+,/,
        `/w_${w * scale},h_${h * scale},`
      )
      .replace(/q_\d+/, 'q_90');

    if (src !== newSrc) {
      img.removeAttribute('srcset');
      img.src = newSrc;
    }
  };

  const scan = root => {
    if (root instanceof HTMLImageElement) fixImage(root);
    root.querySelectorAll?.('img').forEach(fixImage);
  };

  const start = () => {
    scan(document);

    new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (
          mutation.type === 'attributes' &&
          mutation.target instanceof HTMLImageElement
        ) {
          fixImage(mutation.target);
        }

        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) scan(node);
        });
      });
    }).observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['src']
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
