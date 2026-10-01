"use strict";
(() => {
  const input = document.querySelector("#task-search");
  const box = document.querySelector("[data-search]");
  if (!input || !box) return;
  const items = Array.from(document.querySelectorAll("[data-task]"));
  const groups = Array.from(document.querySelectorAll("[data-task-group]"));
  const count = document.querySelector("#search-count");
  const empty = document.querySelector("#no-results");
  const clear = document.querySelector("#clear-search");
  const normalize = value => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const index = items.map(element => ({ element, text: normalize(element.textContent + " " + element.dataset.words) }));
  function filter() {
    const words = normalize(input.value).split(/\s+/).filter(Boolean);
    let shown = 0;
    for (const item of index) {
      item.element.hidden = !words.every(word => item.text.includes(word));
      if (!item.element.hidden) shown++;
    }
    for (const group of groups) {
      group.hidden = !Array.from(group.querySelectorAll("[data-task]")).some(item => !item.hidden);
    }
    count.textContent = shown + (shown === 1 ? " tarea disponible" : " tareas disponibles");
    empty.hidden = shown !== 0;
    clear.disabled = input.value.length === 0;
  }
  input.addEventListener("input", filter);
  clear.addEventListener("click", () => { input.value = ""; filter(); input.focus(); });
  box.hidden = false;
  filter();
})();
