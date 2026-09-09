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

  const id = e.data.target?.slice(1);
  const el = id && document.getElementById(id);

  if (!el) return;

  const header = document.querySelector('header')?.offsetHeight || 0;
  const start = scrollY;
  const end = el.getBoundingClientRect().top + start - header;
  const distance = end - start;
  const duration = Math.min(2000, Math.max(900, Math.abs(distance) * .4));
  const begin = performance.now();

  function scroll(now) {
    const p = Math.min((now - begin) / duration, 1);
    const ease = p < .5
      ? 4 * p * p * p
      : 1 - Math.pow(-2 * p + 2, 3) / 2;

    window.scrollTo(0, start + distance * ease);

    if (p < 1) requestAnimationFrame(scroll);
  }

  requestAnimationFrame(scroll);
});
