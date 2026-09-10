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
  const upgrade = img => {
    const src = img.getAttribute('src') || '';

    if (!src.includes('static.wixstatic.com/media/')) return;

    const match = src.match(/w_(\d+),h_(\d+)/);
    if (!match) return;

    const w = +match[1];
    const h = +match[2];

    const url = scale => {
      let u = src.replace(
        /w_\d+,h_\d+/,
        `w_${w * scale},h_${h * scale}`
      );

      if (/q_\d+/.test(u)) {
        u = u.replace(/q_\d+/, 'q_90');
      }

      return u;
    };

    const srcset =
      `${url(1)} 1x, ${url(2)} 2x, ${url(3)} 3x`;

    if (img.srcset !== srcset) {
      img.srcset = srcset;
    }
  };

  const run = root => {
    if (root.matches?.('img')) upgrade(root);
    root.querySelectorAll?.('img').forEach(upgrade);
  };

  run(document);

  new MutationObserver(mutations => {
    mutations.forEach(m => {
      if (m.type === 'attributes') {
        upgrade(m.target);
      }

      m.addedNodes.forEach(node => {
        if (node.nodeType === 1) run(node);
      });
    });
  }).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src']
  });
})();
