(function () {
  var sections = Array.prototype.slice.call(document.querySelectorAll('.process-section'));
  var details = Array.prototype.slice.call(document.querySelectorAll('details.deep'));
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.mode-toggle button'));

  function setMode(mode) {
    details.forEach(function (d) { d.open = mode === 'detalle'; });
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.mode === mode)); });
  }
  buttons.forEach(function (b) { b.addEventListener('click', function () { setMode(b.dataset.mode); }); });

  // Abrir el detalle de la sección a la que se llega por enlace
  function openFromHash() {
    var id = decodeURIComponent(location.hash.replace('#', ''));
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    var d = el.matches('details') ? el : el.querySelector('details.deep');
    if (d && el.dataset.open !== 'no') d.open = true;
  }
  window.addEventListener('hashchange', openFromHash);

  // Volver al resumen: cierra el detalle y sube al comienzo del proceso
  document.querySelectorAll('.back-to-summary').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var sec = a.closest('.process-section');
      var d = sec.querySelector('details.deep');
      if (d) d.open = false;
      sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Chip activo según la sección visible
  var chips = Array.prototype.slice.call(document.querySelectorAll('.process-index a'));
  if ('IntersectionObserver' in window && sections.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        chips.forEach(function (c) {
          var on = c.getAttribute('href') === '#' + en.target.id;
          c.classList.toggle('active', on);
          if (on) c.setAttribute('aria-current', 'true'); else c.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }

  // Impresión: mostrar todo el detalle
  window.addEventListener('beforeprint', function () { details.forEach(function (d) { d.open = true; }); });

  openFromHash();
})();
