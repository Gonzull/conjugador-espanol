/* =========================================================================
   PRONOMBRES DE OBJETO (pronombres personales átonos)
   -------------------------------------------------------------------------
   "Yo te quiero", "tú me llamas", "él nos ayuda"...
   El verbo se conjuga igual que siempre (según el sujeto); el pronombre
   solo se coloca delante. Este archivo tiene los datos y las reglas; la
   interfaz está en app.js.
   ========================================================================= */

// persona: 0 yo · 1 tú · 2 él/ella · 3 nosotros · 4 vosotros · 5 ellos/ellas
// tipo: 'ambos' (objeto directo e indirecto), 'directo' o 'indirecto'
// pista: cómo se indica el objeto en el ejercicio ("querer → a ti")
const PRONOMBRES_OBJETO = [
  { forma: 'me',  persona: 0, tipo: 'ambos',     pista: 'a mí' },
  { forma: 'te',  persona: 1, tipo: 'ambos',     pista: 'a ti' },
  { forma: 'lo',  persona: 2, tipo: 'directo',   pista: 'a él' },
  { forma: 'la',  persona: 2, tipo: 'directo',   pista: 'a ella' },
  { forma: 'le',  persona: 2, tipo: 'indirecto', pista: 'a él o a ella, objeto indirecto' },
  { forma: 'nos', persona: 3, tipo: 'ambos',     pista: 'a nosotros' },
  { forma: 'os',  persona: 4, tipo: 'ambos',     pista: 'a vosotros' },
  { forma: 'los', persona: 5, tipo: 'directo',   pista: 'a ellos' },
  { forma: 'las', persona: 5, tipo: 'directo',   pista: 'a ellas' },
  { forma: 'les', persona: 5, tipo: 'indirecto', pista: 'a ellos o a ellas, objeto indirecto' }
];

const SUJETOS_SIMPLES = ['yo', 'tú', 'él / ella', 'nosotros', 'vosotros', 'ellos / ellas'];

// Verbos buenos para practicar (se sugieren cuando el verbo elegido no
// admite pronombre de objeto).
const VERBOS_SUGERIDOS_PRON = ['querer', 'ver', 'llamar', 'ayudar', 'escuchar', 'esperar', 'buscar', 'invitar'];

/* -------------------------------------------------------------------------
   Verbos de la lista que normalmente NO llevan pronombre de objeto con un
   sujeto personal: verbos de movimiento o de estado sin objeto (ir,
   llegar, nacer...), del clima (llover, nevar...), auxiliares (poder,
   soler) y verbos cuyo sujeto suele ser una cosa (doler, ocurrir...).
   Es una lista prudente: si un verbo no está aquí, se muestra la tabla.
   ------------------------------------------------------------------------- */
const VERBOS_SIN_OBJETO = new Set([
  'ser', 'estar', 'ir', 'venir', 'llegar', 'salir', 'entrar', 'caer', 'nacer',
  'morir', 'existir', 'ocurrir', 'llover', 'lloviznar', 'nevar', 'tronar',
  'relampaguear', 'amanecer', 'anochecer', 'atardecer', 'andar', 'caminar',
  'correr', 'nadar', 'viajar', 'volar', 'descansar', 'trabajar', 'brillar',
  'relucir', 'crecer', 'aparecer', 'desaparecer', 'temblar', 'toser',
  'estornudar', 'sudar', 'respirar', 'reír', 'brincar', 'trotar', 'marchar',
  'deambular', 'vagar', 'transitar', 'circular', 'navegar', 'remar',
  'pedalear', 'flotar', 'emerger', 'aterrizar', 'resbalar', 'retroceder',
  'regresar', 'retornar', 'volver', 'escapar', 'huir', 'soler', 'poder',
  'caber', 'valer', 'fluctuar', 'competir', 'insistir', 'disentir',
  'desconfiar', 'enfermar', 'sanar', 'gemir', 'piar', 'almorzar',
  'merendar', 'intervenir', 'provenir', 'ascender', 'descender', 'quedar',
  'resultar', 'convenir', 'tributar', 'renegar', 'actuar', 'costar', 'doler'
]);

function admitePronombreObjeto(infinitivo) {
  return !VERBOS_SIN_OBJETO.has(infinitivo);
}

/* -------------------------------------------------------------------------
   Combinación sujeto + pronombre:
   - 'normal'     yo te quiero
   - 'reflexivo'  yo me quiero (sujeto y objeto son la misma persona)
   - 'invalido'   *yo nos quiero, *nosotros me queremos (no se usa)
   ------------------------------------------------------------------------- */
function tipoCombinacion(personaSujeto, pron) {
  const grupo = p => (p === 0 || p === 3) ? 1 : (p === 1 || p === 4) ? 2 : 3;
  if (grupo(personaSujeto) === 3 || grupo(pron.persona) === 3) return 'normal';
  if (grupo(personaSujeto) !== grupo(pron.persona)) return 'normal';
  return personaSujeto === pron.persona ? 'reflexivo' : 'invalido';
}

// Con infinitivo el pronombre se pega al final: verte, quererte, oírte.
function infinitivoConPronombre(infinitivo, pron) {
  return infinitivo + pron;
}

// Con gerundio también, y la palabra pasa a llevar tilde:
// viendo → viéndote, hablando → hablándote, yendo → yéndote.
function gerundioConPronombre(gerundio, pron) {
  return gerundio.replace(/ando$/, 'ándo').replace(/endo$/, 'éndo') + pron;
}

/* -------------------------------------------------------------------------
   Ejercicio: oraciones sin otro objeto, para que el pronombre encaje.
   ------------------------------------------------------------------------- */
const PLANTILLAS_PRON = {
  ind_presente: ['{suj} ___ (INF) todos los días.', 'Normalmente, {suj} ___ (INF).'],
  ind_imperfecto: ['Antes, {suj} ___ (INF) muy seguido.', 'En esa época, {suj} ___ (INF) siempre.'],
  ind_preterito: ['Ayer, {suj} ___ (INF).', 'La semana pasada {suj} ___ (INF) por primera vez.'],
  ind_futuro: ['Mañana {suj} ___ (INF).', 'El próximo mes, {suj} ___ (INF) de nuevo.'],
  ind_condicional: ['En esa situación, {suj} ___ (INF) sin dudarlo.', 'Con más tiempo, {suj} ___ (INF).'],
  ind_pretPerfecto: ['Esta semana {suj} ___ (INF) mucho.', 'Hoy {suj} ___ (INF) dos veces.'],
  ind_pluscuamperfecto: ['Antes de la reunión, {suj} ya ___ (INF).', 'Hasta ese día, {suj} nunca ___ (INF).'],
  ind_futuroPerfecto: ['Para el próximo año, {suj} ya ___ (INF).', 'Antes de las cinco, {suj} ___ (INF).'],
  ind_condicionalPerfecto: ['En tu lugar, {suj} ___ (INF).', 'Con más ayuda, {suj} ___ (INF) a tiempo.']
};

/**
 * Genera un ejercicio "pronombre + verbo" (por ejemplo "te quiero").
 * Elige al azar un sujeto que combine con el pronombre elegido.
 */
function generarEjercicioPronombre(infinitivo, tiempoKey, formas, pron) {
  const validos = [0, 1, 2, 3, 4, 5].filter(p => tipoCombinacion(p, pron) === 'normal');
  const personaIdx = validos[Math.floor(Math.random() * validos.length)];
  const plantillas = PLANTILLAS_PRON[tiempoKey] || ['{suj} ___ (INF).'];
  const plantilla = plantillas[Math.floor(Math.random() * plantillas.length)];

  const sujeto = plantilla.startsWith('{suj}')
    ? SUJETOS[personaIdx]
    : SUJETOS[personaIdx].toLowerCase();
  const texto = plantilla
    .replace('{suj}', sujeto)
    .replace('(INF)', `(${infinitivo} → ${pron.pista})`);
  const partes = texto.split('___');

  return {
    textoAntes: partes[0] || '',
    textoDespues: partes[1] || '',
    respuesta: pron.forma + ' ' + formas[personaIdx],
    sujeto: SUJETOS[personaIdx],
    personaIdx: personaIdx
  };
}
