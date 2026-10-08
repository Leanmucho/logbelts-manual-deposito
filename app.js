(function () {
  var photoTriggers = Array.from(document.querySelectorAll('.photo-open'));
  if (photoTriggers.length) {
    var modal = document.createElement('dialog');
    modal.className = 'photo-dialog';
    modal.setAttribute('aria-labelledby', 'photo-dialog-title');
    modal.setAttribute('aria-describedby', 'photo-dialog-caption');
    modal.innerHTML = '<header><h2 id="photo-dialog-title"></h2><button type="button" class="photo-dialog-close" autofocus>Cerrar ×</button></header><div class="photo-dialog-view"></div><p class="photo-dialog-caption" id="photo-dialog-caption"></p>';
    document.body.appendChild(modal);
    var photoReturnFocus;
    var previousOverflow;
    photoTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var figure = trigger.closest('figure');
        photoReturnFocus = trigger;
        modal.querySelector('h2').textContent = figure.querySelector('figcaption strong').textContent;
        modal.querySelector('.photo-dialog-caption').textContent = figure.querySelector('figcaption p').textContent;
        var enlarged = trigger.querySelector('svg').cloneNode(true);
        var crop = enlarged.querySelector('clipPath');
        if (crop) {
          crop.id += '-expanded';
          enlarged.querySelector('image').setAttribute('clip-path', 'url(#' + crop.id + ')');
        }
        modal.querySelector('.photo-dialog-view').replaceChildren(enlarged);
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        modal.showModal();
      });
    });
    modal.querySelector('button').addEventListener('click', function () { modal.close(); });
    modal.addEventListener('click', function (event) {
      if (event.target !== modal) return;
      var rect = modal.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) modal.close();
    });
    modal.addEventListener('close', function () {
      document.body.style.overflow = previousOverflow;
      if (photoReturnFocus) photoReturnFocus.focus({ preventScroll: true });
    });
  }
  // Explicaciones del recorrido, basadas en los procedimientos de cada puesto.
  var stageData = [
    ['Autorización', 'Es la aprobación que permite empezar a preparar un pedido. La Encargada confirma esa aprobación, busca e imprime la nota de pedido (NP) y entrega la hoja al equipo.', 'Administración, Gerencia o Dirección aprueban; la Encargada confirma y organiza.', 'No se empieza a preparar sin aprobación. La hoja se entrega con el esquema anotado y los pedidos ordenados si hay prioridades.', 'valentina.html#apertura'],
    ['Picking y armado', 'Es buscar y reunir los artículos que pide el cliente. Se recorre el depósito por ubicación, se verifica cada código y se cuentan las cantidades para entregar el pedido al Controlador.', 'Equipo de Picking y armado.', 'Entregá la mercadería con la hoja y las cantidades realmente preparadas. Anotá los artículos que figuran en el otro depósito; no reemplaces por parecido.', 'picking.html#buscar'],
    ['Control, empaque y etiquetado', 'El Controlador compara la mercadería con la hoja, línea por línea. Cuando el control está resuelto, empaca, etiqueta cada bulto y anota el total en la hoja.', 'Controlador de depósito; Picking corrige las diferencias indicadas.', 'El código y la cantidad deben coincidir. Si hay diferencias, el pedido vuelve para corregirlo antes de continuar.', 'controlador.html#pedido'],
    ['Remito', 'Es el documento que acompaña la mercadería que sale. La Encargada carga las cantidades preparadas en BBJet y usa el código en PalJet para emitirlo.', 'Encargada de depósito. El Controlador puede cubrir la emisión con el acceso habilitado.', 'Documentá lo realmente preparado. Comprobá el comprobante y el resultado en el sistema antes de repetir una operación.', 'valentina.html#remito'],
    ['Salida y carga', 'Es la entrega del pedido para su despacho. La Encargada entrega los remitos y la hoja de control; el Controlador verifica la documentación y la carga de la camioneta.', 'El Controlador controla la carga. Picking puede trasladar bultos cuando él lo indica.', 'Comprobá los remitos y la carga. El apoyo de Picking en el traslado es una tarea separada de la preparación normal.', 'controlador.html#carga']
  ];
  var flow = document.querySelector('.order-flow');
  if (flow) {
    var stageButtons = Array.from(flow.querySelectorAll('.flow-step'));
    var panel = document.getElementById('stage-info');
    var activeStage = null;
    function closeStage(restoreFocus) {
      panel.hidden = true;
      stageButtons.forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
      if (restoreFocus && activeStage) activeStage.focus();
      activeStage = null;
    }
    stageButtons.forEach(function (button, index) {
      button.addEventListener('click', function () {
        if (activeStage === button) { closeStage(false); return; }
        var data = stageData[index];
        activeStage = button;
        stageButtons.forEach(function (b) { b.setAttribute('aria-expanded', String(b === button)); });
        document.getElementById('stage-count').textContent = 'ETAPA 0' + (index + 1) + ' DE 05';
        document.getElementById('stage-title').textContent = data[0];
        document.getElementById('stage-description').textContent = data[1];
        document.getElementById('stage-owner').textContent = data[2];
        document.getElementById('stage-check').textContent = data[3];
        document.getElementById('stage-link').href = data[4];
        panel.style.setProperty('--pointer', (index * 20 + 10) + '%');
        panel.hidden = false;
        panel.focus({ preventScroll: true });
        panel.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
      });
    });
    flow.querySelector('.stage-close').addEventListener('click', function () { closeStage(true); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && activeStage) { closeStage(true); }
    });
    document.addEventListener('click', function (e) {
      if (activeStage && !flow.contains(e.target)) closeStage(panel.contains(document.activeElement));
    });
  }
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
