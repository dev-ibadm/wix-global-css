<script>
window.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'MOBILE_MENU') {
    if (window.innerWidth <= 849) {
      var el = document.querySelector('.comp-mb7ogqrp_r_comp-mdr142kt');
      if (el) {
        if (e.data.action === 'open') {
          el.style.setProperty('height', '100%', 'important');
        } else {
          el.style.setProperty('height', '80px', 'important');
        }
      }
    }
  }
});
</script>
