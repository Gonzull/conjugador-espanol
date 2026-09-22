/* =========================================================================
   MOTOR DE CONJUGACIÓN
   ========================================================================= */

const PRONOMBRES = ['yo', 'tú', 'él/ella/usted', 'nosotros/as', 'vosotros/as', 'ellos/ellas/ustedes'];

const VOCALES = ['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú'];
const FUERTES = ['a', 'e', 'o', 'á', 'é', 'ó'];

function esVocal(ch) { return VOCALES.includes(ch); }
function esFuerte(ch) { return FUERTES.includes(ch); }

const ENDINGS = {
  presente_ind: {
    ar: ['o', 'as', 'a', 'amos', 'áis', 'an'],
    er: ['o', 'es', 'e', 'emos', 'éis', 'en'],
    ir: ['o', 'es', 'e', 'imos', 'ís', 'en']
  },
  imperfecto_ind: {
    ar: ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban'],
    er: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
    ir: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían']
  },
  preterito_ind: {
    ar: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'],
    er: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
    ir: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron']
  },
  futuro_ind: ['é', 'ás', 'á', 'emos', 'éis', 'án'],
  condicional_ind: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
  presente_subj: {
    ar: ['e', 'es', 'e', 'emos', 'éis', 'en'],
    er: ['a', 'as', 'a', 'amos', 'áis', 'an'],
    ir: ['a', 'as', 'a', 'amos', 'áis', 'an']
  }
};

const HABER = {
  presente: ['he', 'has', 'ha', 'hemos', 'habéis', 'han'],
  imperfecto: ['había', 'habías', 'había', 'habíamos', 'habíais', 'habían'],
  futuro: ['habré', 'habrás', 'habrá', 'habremos', 'habréis', 'habrán'],
  condicional: ['habría', 'habrías', 'habría', 'habríamos', 'habríais', 'habrían'],
  presenteSubj: ['haya', 'hayas', 'haya', 'hayamos', 'hayáis', 'hayan'],
  imperfectoSubj: ['hubiera', 'hubieras', 'hubiera', 'hubiéramos', 'hubierais', 'hubieran']
};

const PARTICIPIOS_IRREGULARES = {
  hacer: 'hecho', decir: 'dicho', poner: 'puesto', ver: 'visto', escribir: 'escrito',
  abrir: 'abierto', cubrir: 'cubierto', descubrir: 'descubierto', morir: 'muerto',
  romper: 'roto', volver: 'vuelto', devolver: 'devuelto', envolver: 'envuelto',
  resolver: 'resuelto', satisfacer: 'satisfecho', imprimir: 'impreso', freír: 'frito',
  ir: 'ido', ser: 'sido', proponer: 'propuesto', suponer: 'supuesto', disponer: 'dispuesto',
  exponer: 'expuesto', imponer: 'impuesto', oponer: 'opuesto', componer: 'compuesto',
  reponer: 'repuesto', contradecir: 'contradicho', deshacer: 'deshecho', rehacer: 'rehecho',
  bendecir: 'bendecido', maldecir: 'maldecido', describir: 'descrito',
  inscribir: 'inscrito', suscribir: 'suscrito', transcribir: 'transcrito',
  prescribir: 'prescrito', circunscribir: 'circunscrito', adscribir: 'adscrito'
};

function clasificar(infinitivo) {
  const fin = infinitivo.slice(-2);
  if (fin === 'ar' || fin === 'er' || fin === 'ir') return fin;
  if (fin === 'ír') return 'ir'; // oír, reír, freír, sonreír...
  return null;
}

function getRoot(infinitivo) {
  return infinitivo.slice(0, -2);
}

/* -------------------------------------------------------------------------
   Derivación por sufijo: verbos compuestos como "proponer" (poner),
   "mantener" (tener), "atraer" (traer), "sonreír" (reír)... se conjugan
   igual que su verbo base, con el mismo prefijo.
   ------------------------------------------------------------------------- */
const BASES_DERIVABLES = ['poner', 'tener', 'traer', 'venir', 'hacer', 'decir', 'valer', 'reír', 'freír'];

function buscarIrregularBase(infinitivo) {
  if (VERBS_DB.irregular[infinitivo]) return { data: VERBS_DB.irregular[infinitivo], prefix: '' };
  for (const base of BASES_DERIVABLES) {
    if (infinitivo.length > base.length && infinitivo.endsWith(base) && VERBS_DB.irregular[base]) {
      return { data: VERBS_DB.irregular[base], prefix: infinitivo.slice(0, -base.length) };
    }
  }
  return null;
}

function resolverIrregular(infinitivo) {
  const encontrado = buscarIrregularBase(infinitivo);
  if (!encontrado) return {};
  const { data, prefix } = encontrado;
  const out = {};
  ['presente', 'imperfecto', 'preterito', 'presenteSubj'].forEach(campo => {
    if (data[campo]) out[campo] = data[campo].map(f => prefix + f);
  });
  if (data.futuroStem) out.futuroStem = prefix + data.futuroStem;
  if (data.participio) out.participio = prefix + data.participio;
  if (data.gerundio) out.gerundio = prefix + data.gerundio;
  return out;
}

/* -------------------------------------------------------------------------
   Reglas de cambio de raíz (diptongación / debilitamiento vocálico)
   Índices de persona: 0 yo, 1 tú, 2 él, 3 nosotros, 4 vosotros, 5 ellos
   ------------------------------------------------------------------------- */
const PRIMARY_AFFECTED = [0, 1, 2, 5];
const SECONDARY_SUBJ_AFFECTED = [3, 4];

function cambiarUltimaVocalFuerte(raiz, de, a) {
  for (let i = raiz.length - 1; i >= 0; i--) {
    if (raiz[i] === de) return raiz.slice(0, i) + a + raiz.slice(i + 1);
  }
  return raiz;
}

function acentuar(vocal) {
  const map = { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú' };
  return map[vocal] || vocal;
}

function acentuarUltimaOcurrencia(raiz, letra) {
  for (let i = raiz.length - 1; i >= 0; i--) {
    if (raiz[i] === letra) return raiz.slice(0, i) + acentuar(letra) + raiz.slice(i + 1);
  }
  return raiz;
}

function aplicarCambioRaiz(raizBase, tipo, fase) {
  switch (tipo) {
    case 'ie': return fase === 'primaria' ? cambiarUltimaVocalFuerte(raizBase, 'e', 'ie') : raizBase;
    case 'ue': return fase === 'primaria' ? cambiarUltimaVocalFuerte(raizBase, 'o', 'ue') : raizBase;
    case 'u_ue': return fase === 'primaria' ? cambiarUltimaVocalFuerte(raizBase, 'u', 'ue') : raizBase;
    case 'i_ie': return fase === 'primaria' ? cambiarUltimaVocalFuerte(raizBase, 'i', 'ie') : raizBase;
    case 'i_i': return cambiarUltimaVocalFuerte(raizBase, 'e', 'i');
    case 'ie_i': return fase === 'primaria'
      ? cambiarUltimaVocalFuerte(raizBase, 'e', 'ie')
      : cambiarUltimaVocalFuerte(raizBase, 'e', 'i');
    case 'ue_u': return fase === 'primaria'
      ? cambiarUltimaVocalFuerte(raizBase, 'o', 'ue')
      : cambiarUltimaVocalFuerte(raizBase, 'o', 'u');
    case 'i_acento': return fase === 'primaria' ? acentuarUltimaOcurrencia(raizBase, 'i') : raizBase;
    case 'u_acento': return fase === 'primaria' ? acentuarUltimaOcurrencia(raizBase, 'u') : raizBase;
    default: return raizBase;
  }
}

/* -------------------------------------------------------------------------
   Ajustes ortográficos
   ------------------------------------------------------------------------- */
function ajusteOrtografico(infinitivo, raiz, terminacion) {
  const primeraLetra = terminacion[0];
  const esVocalFuerteInicial = ['a', 'á', 'o', 'ó'].includes(primeraLetra);
  const empiezaPorE = primeraLetra === 'e' || primeraLetra === 'é';

  if (infinitivo.endsWith('car') && empiezaPorE) {
    raiz = raiz.slice(0, -1) + 'qu';
  } else if (infinitivo.endsWith('gar') && empiezaPorE) {
    raiz = raiz.slice(0, -1) + 'gu';
  } else if (infinitivo.endsWith('zar') && empiezaPorE) {
    raiz = raiz.slice(0, -1) + 'c';
  } else if ((infinitivo.endsWith('ger') || infinitivo.endsWith('gir')) && esVocalFuerteInicial) {
    raiz = raiz.slice(0, -1) + 'j';
  } else if (infinitivo.endsWith('guir') && esVocalFuerteInicial && raiz.endsWith('gu')) {
    raiz = raiz.slice(0, -1);
  } else if ((infinitivo.endsWith('cer') || infinitivo.endsWith('cir')) && esVocalFuerteInicial && raiz.endsWith('c')) {
    if (!VERBS_DB.orthoSkip.includes(infinitivo)) {
      const prev = raiz[raiz.length - 2];
      raiz = prev && !esVocal(prev) ? raiz.slice(0, -1) + 'z' : raiz.slice(0, -1) + 'zc';
    } else {
      raiz = raiz.slice(0, -1) + 'z';
    }
  }

  const esUir = infinitivo.endsWith('uir') && !infinitivo.endsWith('guir') && !infinitivo.endsWith('quir');
  const raizTerminaVocal = raiz.length > 0 && esVocal(raiz[raiz.length - 1]);

  if (esUir && raizTerminaVocal) {
    if (['a', 'e', 'o'].includes(primeraLetra)) {
      raiz = raiz + 'y';
    } else if (primeraLetra === 'i' && esVocal(terminacion[1])) {
      terminacion = 'y' + terminacion.slice(1);
    }
  } else if (raizTerminaVocal && esFuerte(raiz[raiz.length - 1])) {
    if (primeraLetra === 'i' && esVocal(terminacion[1])) {
      terminacion = 'y' + terminacion.slice(1);
    } else if (primeraLetra === 'i' && !esVocal(terminacion[1])) {
      terminacion = 'í' + terminacion.slice(1);
    }
  }

  return raiz + terminacion;
}

function construirFormas(raizBase, terminacionesLista, infinitivo, tipoCambio, fasePrimaria, faseSecundariaPersonas) {
  const out = [];
  for (let p = 0; p < 6; p++) {
    let raiz = raizBase;
    if (tipoCambio) {
      if (fasePrimaria && PRIMARY_AFFECTED.includes(p)) {
        raiz = aplicarCambioRaiz(raizBase, tipoCambio, 'primaria');
      } else if (faseSecundariaPersonas && faseSecundariaPersonas.includes(p)) {
        raiz = aplicarCambioRaiz(raizBase, tipoCambio, 'secundaria');
      }
    }
    out.push(ajusteOrtografico(infinitivo, raiz, terminacionesLista[p]));
  }
  return out;
}

function participioRegular(infinitivo, raiz) {
  if (PARTICIPIOS_IRREGULARES[infinitivo]) return PARTICIPIOS_IRREGULARES[infinitivo];
  const irr = resolverIrregular(infinitivo);
  if (irr.participio) return irr.participio;
  const clase = clasificar(infinitivo);
  if (clase === 'ar') return raiz + 'ado';
  const ultima = raiz[raiz.length - 1];
  return esVocal(ultima) ? raiz + 'ído' : raiz + 'ido';
}

const GERUNDIOS_IRREGULARES = {
  ir: 'yendo', poder: 'pudiendo', decir: 'diciendo', venir: 'viniendo',
  tener: 'teniendo', reír: 'riendo', freír: 'friendo', oír: 'oyendo',
  traer: 'trayendo', caer: 'cayendo'
};

function gerundioRegular(infinitivo, raiz, tipoCambio) {
  if (GERUNDIOS_IRREGULARES[infinitivo]) return GERUNDIOS_IRREGULARES[infinitivo];
  const irr = resolverIrregular(infinitivo);
  if (irr.gerundio) return irr.gerundio;
  const clase = clasificar(infinitivo);
  let base = raiz;
  if (tipoCambio === 'ie_i' || tipoCambio === 'i_i') base = cambiarUltimaVocalFuerte(raiz, 'e', 'i');
  if (tipoCambio === 'ue_u') base = cambiarUltimaVocalFuerte(raiz, 'o', 'u');
  const term = clase === 'ar' ? 'ando' : 'iendo';
  return ajusteOrtografico(infinitivo, base, term);
}

function derivarImperfectoSubjuntivo(preterito) {
  const base = preterito[5].slice(0, -3); // quita "ron" de la 3ª pers. plural
  let idx = -1;
  for (let i = base.length - 1; i >= 0; i--) { if (esVocal(base[i])) { idx = i; break; } }
  const conAcento = idx >= 0
    ? base.slice(0, idx) + acentuar(base[idx]) + base.slice(idx + 1)
    : base;
  return [
    base + 'ra', base + 'ras', base + 'ra',
    conAcento + 'ramos', base + 'rais', base + 'ran'
  ];
}

function derivarFuturoSubjuntivo(preterito) {
  const base = preterito[5].slice(0, -3);
  let idx = -1;
  for (let i = base.length - 1; i >= 0; i--) { if (esVocal(base[i])) { idx = i; break; } }
  const conAcento = idx >= 0
    ? base.slice(0, idx) + acentuar(base[idx]) + base.slice(idx + 1)
    : base;
  return [base + 're', base + 'res', base + 're', conAcento + 'remos', base + 'reis', base + 'ren'];
}

function getParticipio(infinitivo) {
  return participioRegular(infinitivo, getRoot(infinitivo));
}

function getGerundio(infinitivo) {
  const tipoCambio = (VERBS_DB.stemChange && VERBS_DB.stemChange[infinitivo]) || null;
  return gerundioRegular(infinitivo, getRoot(infinitivo), tipoCambio);
}

/* -------------------------------------------------------------------------
   API principal
   ------------------------------------------------------------------------- */
function conjugate(infinitivoOriginal, tiempoKey) {
  const infinitivo = infinitivoOriginal.trim().toLowerCase();
  const clase = clasificar(infinitivo);
  if (!clase) return null;

  const raizBase = getRoot(infinitivo);
  const irr = resolverIrregular(infinitivo);
  const tipoCambio = (VERBS_DB.stemChange && VERBS_DB.stemChange[infinitivo]) || null;
  const secundariaPersonas = (tipoCambio === 'ie_i' || tipoCambio === 'ue_u' || tipoCambio === 'i_i') ? [2, 5] : null;

  const presenteInd = irr.presente || construirFormas(
    raizBase, ENDINGS.presente_ind[clase], infinitivo, tipoCambio, true, null
  );
  const preteritoInd = irr.preterito || construirFormas(
    raizBase, ENDINGS.preterito_ind[clase], infinitivo, tipoCambio, false, secundariaPersonas
  );
  const participio = getParticipio(infinitivo);

  switch (tiempoKey) {
    case 'ind_presente':
      return presenteInd;

    case 'ind_imperfecto':
      return irr.imperfecto || construirFormas(
        raizBase, ENDINGS.imperfecto_ind[clase], infinitivo, null, false, null
      );

    case 'ind_preterito':
      return preteritoInd;

    case 'ind_futuro': {
      const stem = irr.futuroStem || infinitivo;
      return ENDINGS.futuro_ind.map(e => stem + e);
    }

    case 'ind_condicional': {
      const stem = irr.futuroStem || infinitivo;
      return ENDINGS.condicional_ind.map(e => stem + e);
    }

    case 'ind_pretPerfecto':
      return HABER.presente.map(h => h + ' ' + participio);

    case 'ind_pluscuamperfecto':
      return HABER.imperfecto.map(h => h + ' ' + participio);

    case 'ind_futuroPerfecto':
      return HABER.futuro.map(h => h + ' ' + participio);

    case 'ind_condicionalPerfecto':
      return HABER.condicional.map(h => h + ' ' + participio);

    case 'subj_presente':
      return irr.presenteSubj || construirFormas(
        raizBase, ENDINGS.presente_subj[clase], infinitivo, tipoCambio, true,
        secundariaPersonas ? SECONDARY_SUBJ_AFFECTED : null
      );

    case 'subj_imperfecto':
      return derivarImperfectoSubjuntivo(preteritoInd);

    case 'subj_futuro':
      return derivarFuturoSubjuntivo(preteritoInd);

    case 'subj_pretPerfecto':
      return HABER.presenteSubj.map(h => h + ' ' + participio);

    case 'subj_pluscuamperfecto':
      return HABER.imperfectoSubj.map(h => h + ' ' + participio);

    default:
      return null;
  }
}

function esVerboValido(infinitivo) {
  const v = (infinitivo || '').trim().toLowerCase();
  if (v === 'ir') return true;
  return /^[a-záéíóúñü]+(ar|er|ir|ír)$/.test(v) && v.length > 2;
}
