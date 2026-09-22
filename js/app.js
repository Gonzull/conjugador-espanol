/* =========================================================================
   INTERFAZ — cableado de menús, conjugación y ejercicio
   ========================================================================= */

const TENSES = {
  indicativo: {
    label: 'Modo indicativo',
    tiempos: [
      { key: 'ind_presente', label: 'Presente' },
      { key: 'ind_imperfecto', label: 'Pretérito imperfecto' },
      { key: 'ind_preterito', label: 'Pretérito perfecto simple' },
      { key: 'ind_futuro', label: 'Futuro simple' },
      { key: 'ind_condicional', label: 'Condicional simple' },
      { key: 'ind_pretPerfecto', label: 'Pretérito perfecto compuesto' },
      { key: 'ind_pluscuamperfecto', label: 'Pretérito pluscuamperfecto' },
      { key: 'ind_futuroPerfecto', label: 'Futuro compuesto' },
      { key: 'ind_condicionalPerfecto', label: 'Condicional compuesto' }
    ]
  },
  subjuntivo: {
    label: 'Modo subjuntivo',
    tiempos: [
      { key: 'subj_presente', label: 'Presente' },
      { key: 'subj_imperfecto', label: 'Pretérito imperfecto' },
      { key: 'subj_futuro', label: 'Futuro simple (poco usado)' },
      { key: 'subj_pretPerfecto', label: 'Pretérito perfecto' },
      { key: 'subj_pluscuamperfecto', label: 'Pretérito pluscuamperfecto' }
    ]
  }
};

const state = {
  verbo: 'hablar',
  modo: 'indicativo',
  tiempo: 'ind_presente'
};

const els = {};

function init() {
  els.verboInput = document.getElementById('verbo-input');
  els.verboPanel = document.getElementById('verbo-panel');
  els.btnDesplegar = document.getElementById('btn-desplegar');
  els.verboActual = document.getElementById('verbo-actual');
  els.contadorVerbos = document.getElementById('contador-verbos');
  els.avisoVerbo = document.getElementById('aviso-verbo');
  els.modoTabs = document.getElementById('modo-tabs');
  els.tiempoMenu = document.getElementById('tiempo-menu');
  els.tablaBody = document.getElementById('tabla-conjugacion');
  els.tiempoTitulo = document.getElementById('tiempo-titulo');
  els.ejercicioTexto = document.getElementById('ejercicio-texto');
  els.ejercicioInput = document.getElementById('ejercicio-input');
  els.ejercicioComprobar = document.getElementById('ejercicio-comprobar');
  els.ejercicioNuevo = document.getElementById('ejercicio-nuevo');
  els.ejercicioFeedback = document.getElementById('ejercicio-feedback');
  els.btnAleatorio = document.getElementById('btn-aleatorio');

  els.contadorVerbos.textContent = `${VERBS_DB.list.length} verbos disponibles`;

  renderModoTabs();
  renderTiempoMenu();
  wireVerboBuscador();
  wireEjercicio();

  els.verboInput.value = state.verbo;
  actualizarTodo();
}

/* -------------------------------------------------------------------------
   Buscador de verbos (desplegable propio, sin depender del <datalist>)
   ------------------------------------------------------------------------- */
let indiceResaltado = -1;
let resultadosActuales = [];

function normalizarBusqueda(str) {
  return str.trim().toLowerCase()
    .replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i')
    .replace(/ó/g, 'o').replace(/ú/g, 'u');
}

function filtrarVerbos(texto) {
  const listaOrdenada = VERBS_DB.list.slice().sort((a, b) => a.localeCompare(b, 'es'));
  const q = normalizarBusqueda(texto || '');
  if (!q) return listaOrdenada;
  const empiezaCon = listaOrdenada.filter(v => normalizarBusqueda(v).startsWith(q));
  const contiene = listaOrdenada.filter(v => !normalizarBusqueda(v).startsWith(q) && normalizarBusqueda(v).includes(q));
  return empiezaCon.concat(contiene);
}

function abrirPanel(texto) {
  resultadosActuales = filtrarVerbos(texto);
  indiceResaltado = -1;
  renderPanel();
  els.verboPanel.hidden = false;
  els.verboInput.setAttribute('aria-expanded', 'true');
}

function cerrarPanel() {
  els.verboPanel.hidden = true;
  els.verboInput.setAttribute('aria-expanded', 'false');
}

function renderPanel() {
  const MAX_VISIBLES = 200;
  const visibles = resultadosActuales.slice(0, MAX_VISIBLES);

  if (!visibles.length) {
    els.verboPanel.innerHTML = '<p class="verbo-panel-vacio">No hay verbos que coincidan.</p>';
    return;
  }

  const contador = `<div class="verbo-panel-contador">${resultadosActuales.length} verbo${resultadosActuales.length === 1 ? '' : 's'}</div>`;
  const items = visibles.map((v, i) => `
    <button type="button" class="verbo-item${i === indiceResaltado ? ' is-resaltado' : ''}" data-verbo="${v}" role="option">${v}</button>
  `).join('');
  els.verboPanel.innerHTML = contador + items;

  els.verboPanel.querySelectorAll('.verbo-item').forEach(btn => {
    btn.addEventListener('mousedown', e => {
      e.preventDefault(); // evita perder el foco antes del click
      elegirVerbo(btn.dataset.verbo);
    });
  });
}

function elegirVerbo(v) {
  els.verboInput.value = v;
  state.verbo = v;
  els.avisoVerbo.textContent = '';
  cerrarPanel();
  actualizarTodo();
}

function wireVerboBuscador() {
  els.verboInput.addEventListener('focus', () => abrirPanel(''));

  els.verboInput.addEventListener('input', () => {
    const val = els.verboInput.value.trim().toLowerCase();
    abrirPanel(val);
    if (esVerboValido(val)) {
      state.verbo = val;
      els.avisoVerbo.textContent = '';
      actualizarTodo();
    } else if (val.length > 0) {
      els.avisoVerbo.textContent = 'Escribe un verbo terminado en -ar, -er o -ir, o elígelo de la lista.';
    }
  });

  els.verboInput.addEventListener('keydown', e => {
    const visibles = Math.min(resultadosActuales.length, 200);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (els.verboPanel.hidden) { abrirPanel(els.verboInput.value); return; }
      indiceResaltado = Math.min(indiceResaltado + 1, visibles - 1);
      renderPanel();
      scrollResaltadoAlaVista();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      indiceResaltado = Math.max(indiceResaltado - 1, 0);
      renderPanel();
      scrollResaltadoAlaVista();
    } else if (e.key === 'Enter') {
      if (indiceResaltado >= 0 && resultadosActuales[indiceResaltado]) {
        e.preventDefault();
        elegirVerbo(resultadosActuales[indiceResaltado]);
      } else {
        cerrarPanel();
      }
    } else if (e.key === 'Escape') {
      cerrarPanel();
    }
  });

  els.btnDesplegar.addEventListener('click', () => {
    if (els.verboPanel.hidden) {
      abrirPanel('');
      els.verboInput.focus();
    } else {
      cerrarPanel();
    }
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.verbo-buscador')) cerrarPanel();
  });

  els.btnAleatorio.addEventListener('click', () => {
    const lista = VERBS_DB.list;
    const v = lista[Math.floor(Math.random() * lista.length)];
    elegirVerbo(v);
  });
}

function scrollResaltadoAlaVista() {
  const activo = els.verboPanel.querySelector('.verbo-item.is-resaltado');
  if (activo) activo.scrollIntoView({ block: 'nearest' });
}

function renderModoTabs() {
  els.modoTabs.innerHTML = Object.keys(TENSES).map(modoKey => {
    const activo = modoKey === state.modo ? ' is-active' : '';
    return `<button type="button" class="modo-tab${activo}" data-modo="${modoKey}">${TENSES[modoKey].label}</button>`;
  }).join('');

  els.modoTabs.querySelectorAll('.modo-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.modo = btn.dataset.modo;
      state.tiempo = TENSES[state.modo].tiempos[0].key;
      renderModoTabs();
      renderTiempoMenu();
      actualizarTodo();
    });
  });
}

function renderTiempoMenu() {
  const tiempos = TENSES[state.modo].tiempos;
  els.tiempoMenu.innerHTML = tiempos.map(t => {
    const activo = t.key === state.tiempo ? ' is-active' : '';
    return `<button type="button" class="tiempo-btn${activo}" data-tiempo="${t.key}">${t.label}</button>`;
  }).join('');

  els.tiempoMenu.querySelectorAll('.tiempo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.tiempo = btn.dataset.tiempo;
      renderTiempoMenu();
      actualizarTodo();
    });
  });
}

function wireEjercicio() {
  els.ejercicioComprobar.addEventListener('click', comprobarEjercicio);
  els.ejercicioInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') comprobarEjercicio();
  });
  els.ejercicioNuevo.addEventListener('click', () => {
    renderEjercicio();
    els.ejercicioInput.focus();
  });
}

let formasActuales = [];
let ejercicioActual = null;

function actualizarTodo() {
  els.verboActual.textContent = state.verbo;
  const tiempoLabel = TENSES[state.modo].tiempos.find(t => t.key === state.tiempo).label;
  els.tiempoTitulo.textContent = `${TENSES[state.modo].label} · ${tiempoLabel}`;

  formasActuales = conjugate(state.verbo, state.tiempo) || [];
  renderTabla();
  renderEjercicio();
}

function renderTabla() {
  if (!formasActuales.length) {
    els.tablaBody.innerHTML = '<tr><td colspan="2">No se pudo conjugar ese verbo.</td></tr>';
    return;
  }
  els.tablaBody.innerHTML = formasActuales.map((forma, i) => `
    <tr>
      <td class="col-pronombre">${PRONOMBRES[i]}</td>
      <td class="col-forma">${forma}</td>
    </tr>
  `).join('');
}

function renderEjercicio() {
  if (!formasActuales.length) return;
  ejercicioActual = generarEjercicio(state.verbo, state.tiempo, formasActuales);
  els.ejercicioTexto.innerHTML =
    escapeHtml(ejercicioActual.textoAntes) +
    '<span class="hueco-marcador">___</span>' +
    escapeHtml(ejercicioActual.textoDespues);
  els.ejercicioInput.value = '';
  els.ejercicioFeedback.textContent = '';
  els.ejercicioFeedback.className = 'ejercicio-feedback';
}

function normalizar(str) {
  return str.trim().toLowerCase();
}

function comprobarEjercicio() {
  if (!ejercicioActual) return;
  const respuestaUsuario = normalizar(els.ejercicioInput.value);
  const respuestaCorrecta = normalizar(ejercicioActual.respuesta);

  if (respuestaUsuario === respuestaCorrecta) {
    els.ejercicioFeedback.textContent = '¡Correcto!';
    els.ejercicioFeedback.className = 'ejercicio-feedback is-correcto';
  } else {
    els.ejercicioFeedback.textContent = `No es correcto. La forma esperada es: "${ejercicioActual.respuesta}".`;
    els.ejercicioFeedback.className = 'ejercicio-feedback is-incorrecto';
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', init);
