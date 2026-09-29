/* =========================================================================
   PLANTILLAS DE ORACIONES PARA EL EJERCICIO DE RELLENO
   ========================================================================= */

const SUJETOS = ['Yo', 'Tú', 'Él / Ella', 'Nosotros', 'Vosotros', 'Ellos / Ellas'];

const PLANTILLAS = {
  ind_presente: [
    '{suj} ___ (INF) todos los días.',
    'Normalmente, {suj} ___ (INF) sin problema.',
    'Cada mañana {suj} ___ (INF) antes de salir.'
  ],
  ind_imperfecto: [
    'Cuando era pequeño/a, {suj} ___ (INF) muy seguido.',
    'Antes, {suj} ___ (INF) todos los fines de semana.',
    'En esa época, {suj} ___ (INF) sin descanso.'
  ],
  ind_preterito: [
    'Ayer, {suj} ___ (INF) sin problemas.',
    'La semana pasada {suj} ___ (INF) por primera vez.',
    'Anoche {suj} ___ (INF) hasta muy tarde.'
  ],
  ind_futuro: [
    'El próximo mes, {suj} ___ (INF) de nuevo.',
    'Mañana {suj} ___ (INF) temprano.',
    'Dentro de poco, {suj} ___ (INF) sin ayuda.'
  ],
  ind_condicional: [
    'En esa situación, {suj} ___ (INF) sin dudarlo.',
    'Con más tiempo, {suj} ___ (INF) mejor.',
    'Yo creo que {suj} ___ (INF) lo mismo.'
  ],
  ind_pretPerfecto: [
    'Hasta ahora, {suj} ___ (INF) tres veces este año.',
    'Esta semana {suj} ___ (INF) mucho.',
    'Todavía no {suj} ___ (INF) suficiente.'
  ],
  ind_pluscuamperfecto: [
    'Antes de la reunión, {suj} ya ___ (INF).',
    'Cuando llegamos, {suj} ya ___ (INF) todo.',
    'Nunca antes {suj} ___ (INF) algo así.'
  ],
  ind_futuroPerfecto: [
    'Para el próximo año, {suj} ___ (INF) ese proyecto.',
    'Cuando vuelvas, {suj} ya ___ (INF) todo.',
    'Antes de las cinco, {suj} ___ (INF) el trabajo.'
  ],
  ind_condicionalPerfecto: [
    'En tu lugar, {suj} ___ (INF) lo mismo.',
    'Sin ese problema, {suj} ___ (INF) antes.',
    'Con más ayuda, {suj} ___ (INF) todo a tiempo.'
  ],
  subj_presente: [
    'Espero que {suj} ___ (INF) pronto.',
    'Ojalá que {suj} ___ (INF) sin problemas.',
    'Es importante que {suj} ___ (INF) hoy mismo.'
  ],
  subj_imperfecto: [
    'Si {suj} ___ (INF), todo sería distinto.',
    'Ojalá {suj} ___ (INF) más a menudo.',
    'Era como si {suj} ___ (INF) toda la vida.'
  ],
  subj_futuro: [
    'Adonde {suj} ___ (INF), iré yo también.',
    'Quien ___ (INF) primero, que avise.',
    'Como {suj} ___ (INF), así se hará.'
  ],
  subj_pretPerfecto: [
    'Ojalá que {suj} ___ (INF) para entonces.',
    'Espero que {suj} ___ (INF) a tiempo.',
    'No creo que {suj} ___ (INF) todavía.'
  ],
  subj_pluscuamperfecto: [
    'Si {suj} ___ (INF) antes, no habría problema.',
    'Ojalá {suj} ___ (INF) la verdad desde el principio.',
    'Como si {suj} ___ (INF) toda la respuesta.'
  ]
};

/**
 * Genera un ejercicio de completar para un verbo, tiempo y persona dados.
 * Devuelve { textoAntes, textoDespues, respuesta, sujeto }
 */
function generarEjercicio(infinitivo, tiempoKey, formas) {
  const plantillas = PLANTILLAS[tiempoKey] || ['{suj} ___ (INF).'];
  const personaIdx = Math.floor(Math.random() * 6);
  const plantilla = plantillas[Math.floor(Math.random() * plantillas.length)];
  const respuesta = formas[personaIdx];

  // El sujeto va con mayúscula solo si abre la oración ("Yo...", pero
  // "Ayer, yo..."); si no, iría "Ayer, Yo...".
  const sujeto = plantilla.startsWith('{suj}')
    ? SUJETOS[personaIdx]
    : SUJETOS[personaIdx].toLowerCase();
  const conSujeto = plantilla.replace('{suj}', sujeto);
  const conInfinitivo = conSujeto.replace('(INF)', '(' + infinitivo + ')');
  const partes = conInfinitivo.split('___');

  return {
    textoAntes: partes[0] || '',
    textoDespues: partes[1] || '',
    respuesta: respuesta,
    sujeto: SUJETOS[personaIdx],
    personaIdx: personaIdx
  };
}
