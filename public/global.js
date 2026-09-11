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

  const frames = [...document.querySelectorAll(
    '#comp-mtaeju8d iframe, #comp-mtcgqknb iframe, #comp-mt7evu7d iframe'
  )];
  if (!frames.length) { console.warn('No iframes found for selectors'); return; }

  let iframe = frames.find(f => f.contentWindow === e.source) || frames[0];
  const h = e.data.height + 'px';
  console.log('height received:', h, iframe);

  iframe.style.setProperty('height', h, 'important');

  const wixIframe = iframe.closest('.wix-iframe');
  if (wixIframe) wixIframe.style.setProperty('height', h, 'important');

  const htmlComp = iframe.closest('.html-component');
  if (htmlComp) htmlComp.style.setProperty('height', h, 'important');

  // parent section/grid item bhi (Wix grid stretch ko override karne ke liye)
  const gridItem = iframe.closest('[data-testid="internal-container-content"]')?.parentElement;
  if (gridItem) gridItem.style.setProperty('height', h, 'important');
});
