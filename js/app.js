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
  els.tiempoUso = document.getElementById('tiempo-uso');
  els.ejercicioPista = document.getElementById('ejercicio-pista');
  els.ayudaPasos = document.getElementById('ayuda-pasos');
  els.noPersonales = document.getElementById('no-personales');

  wireIdioma();
  aplicarIdioma();

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
  // En chino también se puede buscar por el significado (por ejemplo "吃" → comer).
  const porSignificado = idiomaActual === 'zh'
    ? listaOrdenada.filter(v => !empiezaCon.includes(v) && !contiene.includes(v) && (VERBOS_ZH[v] || '').includes(texto.trim()))
    : [];
  return empiezaCon.concat(contiene, porSignificado);
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
    els.verboPanel.innerHTML = `<p class="verbo-panel-vacio">${t('panelVacio')}</p>`;
    return;
  }

  const contador = `<div class="verbo-panel-contador">${t('panelContador')(resultadosActuales.length)}</div>`;
  const items = visibles.map((v, i) => `
    <button type="button" class="verbo-item${i === indiceResaltado ? ' is-resaltado' : ''}" data-verbo="${v}" role="option">${v}${significadoZhHtml(v)}</button>
  `).join('');
  els.verboPanel.innerHTML = contador + items;

  els.verboPanel.querySelectorAll('.verbo-item').forEach(btn => {
    btn.addEventListener('mousedown', e => {
      e.preventDefault(); // evita perder el foco antes del click
      elegirVerbo(btn.dataset.verbo);
    });
  });
}

/** En chino, el significado del verbo entre paréntesis (solo en el desplegable). */
function significadoZhHtml(v) {
  if (idiomaActual !== 'zh' || !VERBOS_ZH[v]) return '';
  return `<span class="verbo-item-zh" lang="zh-CN">（${escapeHtml(VERBOS_ZH[v])}）</span>`;
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
    } else if (/[\u4e00-\u9fff]/.test(val)) {
      els.avisoVerbo.textContent = ''; // búsqueda por significado en chino: no es un error
    } else if (val.length > 0) {
      els.avisoVerbo.textContent = t('avisoVerboInvalido');
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
    return `<button type="button" class="modo-tab${activo}" data-modo="${modoKey}">${nombreModo(modoKey)}</button>`;
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
    return `<button type="button" class="tiempo-btn${activo}" data-tiempo="${t.key}">${nombreTiempoHtml(t)}</button>`;
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
  const tiempo = TENSES[state.modo].tiempos.find(x => x.key === state.tiempo);
  const tiempoZh = t('tiempos')[tiempo.key];
  els.tiempoTitulo.textContent = `${nombreModo(state.modo)} · ${tiempoZh ? tiempoZh + ' · ' : ''}${tiempo.label}`;

  const uso = t('usos')[tiempo.key];
  els.tiempoUso.textContent = uso || '';
  els.tiempoUso.hidden = !uso;

  formasActuales = conjugate(state.verbo, state.tiempo) || [];
  renderTabla();
  renderNoPersonales();
  renderEjercicio();
}

/* -------------------------------------------------------------------------
   Formas no personales: infinitivo, gerundio (-ando/-iendo) y
   participio (-ado/-ido). Se marca "irregular" cuando la forma no es la
   que daría la regla simple (raíz + terminación).
   ------------------------------------------------------------------------- */
function renderNoPersonales() {
  const v = state.verbo;
  const clase = clasificar(v);
  if (!clase) { els.noPersonales.innerHTML = ''; return; }
  const raiz = getRoot(v);
  const gerundio = getGerundio(v);
  const participio = getParticipio(v);
  const gerRegular = raiz + (clase === 'ar' ? 'ando' : 'iendo');
  const partRegular = raiz + (clase === 'ar' ? 'ado' : 'ido');
  const term = t('npTerminaciones');

  const tarjeta = (nombre, terminaciones, forma, uso, ejemplo, esIrregular) => `
    <div class="np-tarjeta">
      <div class="np-cabeza">
        <span class="np-nombre">${nombre}</span>
        <span class="np-term" lang="es">${terminaciones}</span>
      </div>
      <div class="np-forma" lang="es">${escapeHtml(forma)}${esIrregular
        ? ` <span class="np-irregular" title="${escapeHtml(t('npIrregularTitulo'))}">${escapeHtml(t('npIrregular'))}</span>` : ''}</div>
      <p class="np-uso">${escapeHtml(uso)}</p>
      <p class="np-ejemplo">${escapeHtml(ejemplo)}</p>
    </div>`;

  els.noPersonales.innerHTML =
    tarjeta(t('npInfinitivo'), term.infinitivo, v, t('npUsoInfinitivo'), t('npEjInfinitivo')(v), false) +
    tarjeta(t('npGerundio'), term.gerundio, gerundio, t('npUsoGerundio'), t('npEjGerundio')(gerundio), gerundio !== gerRegular) +
    tarjeta(t('npParticipio'), term.participio, participio, t('npUsoParticipio'), t('npEjParticipio')(participio), participio !== partRegular);
}

function renderTabla() {
  if (!formasActuales.length) {
    els.tablaBody.innerHTML = `<tr><td colspan="2">${t('noConjugable')}</td></tr>`;
    return;
  }
  els.tablaBody.innerHTML = formasActuales.map((forma, i) => `
    <tr>
      <td class="col-pronombre">${(t('pronombres') || PRONOMBRES)[i]}</td>
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
    els.ejercicioFeedback.textContent = t('correcto');
    els.ejercicioFeedback.className = 'ejercicio-feedback is-correcto';
  } else {
    els.ejercicioFeedback.textContent = t('incorrecto')(ejercicioActual.respuesta);
    els.ejercicioFeedback.className = 'ejercicio-feedback is-incorrecto';
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* -------------------------------------------------------------------------
   Idioma de la interfaz (ver js/i18n.js)
   ------------------------------------------------------------------------- */
function nombreModo(modoKey) {
  return t('modos')[modoKey] || TENSES[modoKey].label;
}

function nombreTiempoHtml(tiempo) {
  const zh = t('tiempos')[tiempo.key];
  if (!zh) return escapeHtml(tiempo.label);
  // En chino: nombre chino arriba y el nombre original en español debajo,
  // para que aprenda también cómo se llama cada tiempo en español.
  return `${escapeHtml(zh)}<span class="tiempo-btn-orig" lang="es">${escapeHtml(tiempo.label)}</span>`;
}

function aplicarIdioma() {
  document.documentElement.lang = t('htmlLang');
  document.title = t('tituloPagina');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = t(el.dataset.i18nTitle);
  });

  els.verboInput.placeholder = t('placeholderVerbo');
  els.ejercicioInput.placeholder = t('placeholderEjercicio');
  els.btnDesplegar.setAttribute('aria-label', t('ariaDesplegar'));
  els.modoTabs.setAttribute('aria-label', t('ariaModo'));
  els.tiempoMenu.setAttribute('aria-label', t('ariaTiempo'));
  els.contadorVerbos.textContent = t('contadorVerbos')(VERBS_DB.list.length);
  els.ayudaPasos.innerHTML = t('ayudaPasos').map(p => `<li>${p}</li>`).join('');

  const pista = t('pistaEjercicio');
  els.ejercicioPista.textContent = pista;
  els.ejercicioPista.hidden = !pista;

  // El aviso de verbo inválido y la corrección se vuelven a mostrar en el idioma nuevo.
  if (els.avisoVerbo.textContent) els.avisoVerbo.textContent = t('avisoVerboInvalido');
  els.ejercicioFeedback.textContent = '';
  els.ejercicioFeedback.className = 'ejercicio-feedback';

  document.querySelectorAll('.idioma-btn').forEach(btn => {
    const activo = btn.dataset.idioma === idiomaActual;
    btn.classList.toggle('is-active', activo);
    btn.setAttribute('aria-pressed', activo ? 'true' : 'false');
  });
}

function wireIdioma() {
  document.querySelectorAll('.idioma-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.idioma === idiomaActual) return;
      idiomaActual = btn.dataset.idioma;
      guardarIdioma(idiomaActual);
      aplicarIdioma();
      renderModoTabs();
      renderTiempoMenu();
      // Se refresca la tabla y títulos sin cambiar la oración del ejercicio.
      const ejercicioPrevio = ejercicioActual;
      const respuestaEscrita = els.ejercicioInput.value;
      actualizarTodo();
      if (ejercicioPrevio) restaurarEjercicio(ejercicioPrevio);
      els.ejercicioInput.value = respuestaEscrita;
    });
  });
}

function restaurarEjercicio(ej) {
  ejercicioActual = ej;
  els.ejercicioTexto.innerHTML =
    escapeHtml(ej.textoAntes) + '<span class="hueco-marcador">___</span>' + escapeHtml(ej.textoDespues);
}

document.addEventListener('DOMContentLoaded', init);
