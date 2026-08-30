<script>
window.addEventListener('message', function(event) {

  if (!event.data || event.data.type !== 'MOBILE_MENU') {
    return;
  }

  const iframe = document.querySelector(
    '.comp-mb7ogqrp_r_comp-mdr142kt ._iframe_j35j1_7'
  );

  if (!iframe) {
    return;
  }

  if (event.data.action === 'open') {
    iframe.style.setProperty('height', '100vh', 'important');
  }

  if (event.data.action === 'close') {
    iframe.style.setProperty('height', '67px', 'important');
  }

});
</script>
