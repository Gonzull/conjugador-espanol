/* =========================================================================
   BASE DE DATOS DE VERBOS ESPAÑOLES
   -------------------------------------------------------------------------
   VERBS_DB.irregular     -> verbos totalmente irregulares (formas fijas)
   VERBS_DB.stemChange    -> verbos con diptongación / cambio de raíz
   VERBS_DB.orthoSkip     -> verbos que NO deben recibir la regla c->zc
   VERBS_DB.list          -> listado general para el buscador/menú
   ========================================================================= */

const VERBS_DB = {

  // Formas totalmente irregulares. Todo lo que no se declare aquí para un
  // tiempo dado, se calcula con las reglas regulares + cambio de raíz +
  // ortografía. "futuroStem" es la raíz a la que se pegan las terminaciones
  // regulares de futuro/condicional.
  irregular: {
    ser: {
      presente: ['soy', 'eres', 'es', 'somos', 'sois', 'son'],
      imperfecto: ['era', 'eras', 'era', 'éramos', 'erais', 'eran'],
      preterito: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
      presenteSubj: ['sea', 'seas', 'sea', 'seamos', 'seáis', 'sean'],
      futuroStem: 'ser',
      participio: 'sido',
      gerundio: 'siendo'
    },
    estar: {
      presente: ['estoy', 'estás', 'está', 'estamos', 'estáis', 'están'],
      preterito: ['estuve', 'estuviste', 'estuvo', 'estuvimos', 'estuvisteis', 'estuvieron'],
      presenteSubj: ['esté', 'estés', 'esté', 'estemos', 'estéis', 'estén'],
      futuroStem: 'estar',
      participio: 'estado',
      gerundio: 'estando'
    },
    ir: {
      presente: ['voy', 'vas', 'va', 'vamos', 'vais', 'van'],
      imperfecto: ['iba', 'ibas', 'iba', 'íbamos', 'ibais', 'iban'],
      preterito: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
      presenteSubj: ['vaya', 'vayas', 'vaya', 'vayamos', 'vayáis', 'vayan'],
      futuroStem: 'ir',
      participio: 'ido',
      gerundio: 'yendo'
    },
    haber: {
      presente: ['he', 'has', 'ha', 'hemos', 'habéis', 'han'],
      preterito: ['hube', 'hubiste', 'hubo', 'hubimos', 'hubisteis', 'hubieron'],
      presenteSubj: ['haya', 'hayas', 'haya', 'hayamos', 'hayáis', 'hayan'],
      futuroStem: 'habr',
      participio: 'habido',
      gerundio: 'habiendo'
    },
    tener: {
      presente: ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'],
      preterito: ['tuve', 'tuviste', 'tuvo', 'tuvimos', 'tuvisteis', 'tuvieron'],
      presenteSubj: ['tenga', 'tengas', 'tenga', 'tengamos', 'tengáis', 'tengan'],
      futuroStem: 'tendr',
      participio: 'tenido',
      gerundio: 'teniendo'
    },
    hacer: {
      presente: ['hago', 'haces', 'hace', 'hacemos', 'hacéis', 'hacen'],
      preterito: ['hice', 'hiciste', 'hizo', 'hicimos', 'hicisteis', 'hicieron'],
      presenteSubj: ['haga', 'hagas', 'haga', 'hagamos', 'hagáis', 'hagan'],
      futuroStem: 'har',
      participio: 'hecho',
      gerundio: 'haciendo'
    },
    poder: {
      presente: ['puedo', 'puedes', 'puede', 'podemos', 'podéis', 'pueden'],
      preterito: ['pude', 'pudiste', 'pudo', 'pudimos', 'pudisteis', 'pudieron'],
      presenteSubj: ['pueda', 'puedas', 'pueda', 'podamos', 'podáis', 'puedan'],
      futuroStem: 'podr',
      participio: 'podido',
      gerundio: 'pudiendo'
    },
    poner: {
      presente: ['pongo', 'pones', 'pone', 'ponemos', 'ponéis', 'ponen'],
      preterito: ['puse', 'pusiste', 'puso', 'pusimos', 'pusisteis', 'pusieron'],
      presenteSubj: ['ponga', 'pongas', 'ponga', 'pongamos', 'pongáis', 'pongan'],
      futuroStem: 'pondr',
      participio: 'puesto',
      gerundio: 'poniendo'
    },
    querer: {
      presente: ['quiero', 'quieres', 'quiere', 'queremos', 'queréis', 'quieren'],
      preterito: ['quise', 'quisiste', 'quiso', 'quisimos', 'quisisteis', 'quisieron'],
      presenteSubj: ['quiera', 'quieras', 'quiera', 'queramos', 'queráis', 'quieran'],
      futuroStem: 'querr',
      participio: 'querido',
      gerundio: 'queriendo'
    },
    saber: {
      presente: ['sé', 'sabes', 'sabe', 'sabemos', 'sabéis', 'saben'],
      preterito: ['supe', 'supiste', 'supo', 'supimos', 'supisteis', 'supieron'],
      presenteSubj: ['sepa', 'sepas', 'sepa', 'sepamos', 'sepáis', 'sepan'],
      futuroStem: 'sabr',
      participio: 'sabido',
      gerundio: 'sabiendo'
    },
    salir: {
      presente: ['salgo', 'sales', 'sale', 'salimos', 'salís', 'salen'],
      preterito: ['salí', 'saliste', 'salió', 'salimos', 'salisteis', 'salieron'],
      presenteSubj: ['salga', 'salgas', 'salga', 'salgamos', 'salgáis', 'salgan'],
      futuroStem: 'saldr',
      participio: 'salido',
      gerundio: 'saliendo'
    },
    traer: {
      presente: ['traigo', 'traes', 'trae', 'traemos', 'traéis', 'traen'],
      preterito: ['traje', 'trajiste', 'trajo', 'trajimos', 'trajisteis', 'trajeron'],
      presenteSubj: ['traiga', 'traigas', 'traiga', 'traigamos', 'traigáis', 'traigan'],
      futuroStem: 'traer',
      participio: 'traído',
      gerundio: 'trayendo'
    },
    venir: {
      presente: ['vengo', 'vienes', 'viene', 'venimos', 'venís', 'vienen'],
      preterito: ['vine', 'viniste', 'vino', 'vinimos', 'vinisteis', 'vinieron'],
      presenteSubj: ['venga', 'vengas', 'venga', 'vengamos', 'vengáis', 'vengan'],
      futuroStem: 'vendr',
      participio: 'venido',
      gerundio: 'viniendo'
    },
    ver: {
      presente: ['veo', 'ves', 've', 'vemos', 'veis', 'ven'],
      imperfecto: ['veía', 'veías', 'veía', 'veíamos', 'veíais', 'veían'],
      preterito: ['vi', 'viste', 'vio', 'vimos', 'visteis', 'vieron'],
      presenteSubj: ['vea', 'veas', 'vea', 'veamos', 'veáis', 'vean'],
      futuroStem: 'ver',
      participio: 'visto',
      gerundio: 'viendo'
    },
    dar: {
      presente: ['doy', 'das', 'da', 'damos', 'dais', 'dan'],
      preterito: ['di', 'diste', 'dio', 'dimos', 'disteis', 'dieron'],
      presenteSubj: ['dé', 'des', 'dé', 'demos', 'deis', 'den'],
      futuroStem: 'dar',
      participio: 'dado',
      gerundio: 'dando'
    },
    decir: {
      presente: ['digo', 'dices', 'dice', 'decimos', 'decís', 'dicen'],
      preterito: ['dije', 'dijiste', 'dijo', 'dijimos', 'dijisteis', 'dijeron'],
      presenteSubj: ['diga', 'digas', 'diga', 'digamos', 'digáis', 'digan'],
      futuroStem: 'dir',
      participio: 'dicho',
      gerundio: 'diciendo'
    },
    oír: {
      presente: ['oigo', 'oyes', 'oye', 'oímos', 'oís', 'oyen'],
      preterito: ['oí', 'oíste', 'oyó', 'oímos', 'oísteis', 'oyeron'],
      presenteSubj: ['oiga', 'oigas', 'oiga', 'oigamos', 'oigáis', 'oigan'],
      futuroStem: 'oir',
      participio: 'oído',
      gerundio: 'oyendo'
    },
    caer: {
      presente: ['caigo', 'caes', 'cae', 'caemos', 'caéis', 'caen'],
      preterito: ['caí', 'caíste', 'cayó', 'caímos', 'caísteis', 'cayeron'],
      presenteSubj: ['caiga', 'caigas', 'caiga', 'caigamos', 'caigáis', 'caigan'],
      futuroStem: 'caer',
      participio: 'caído',
      gerundio: 'cayendo'
    },
    valer: {
      presente: ['valgo', 'vales', 'vale', 'valemos', 'valéis', 'valen'],
      preterito: ['valí', 'valiste', 'valió', 'valimos', 'valisteis', 'valieron'],
      presenteSubj: ['valga', 'valgas', 'valga', 'valgamos', 'valgáis', 'valgan'],
      futuroStem: 'valdr',
      participio: 'valido',
      gerundio: 'valiendo'
    },
    caber: {
      presente: ['quepo', 'cabes', 'cabe', 'cabemos', 'cabéis', 'caben'],
      preterito: ['cupe', 'cupiste', 'cupo', 'cupimos', 'cupisteis', 'cupieron'],
      presenteSubj: ['quepa', 'quepas', 'quepa', 'quepamos', 'quepáis', 'quepan'],
      futuroStem: 'cabr',
      participio: 'cabido',
      gerundio: 'cabiendo'
    },
    andar: {
      presente: ['ando', 'andas', 'anda', 'andamos', 'andáis', 'andan'],
      preterito: ['anduve', 'anduviste', 'anduvo', 'anduvimos', 'anduvisteis', 'anduvieron'],
      presenteSubj: ['ande', 'andes', 'ande', 'andemos', 'andéis', 'anden'],
      futuroStem: 'andar',
      participio: 'andado',
      gerundio: 'andando'
    },
    conducir: {
      presente: ['conduzco', 'conduces', 'conduce', 'conducimos', 'conducís', 'conducen'],
      preterito: ['conduje', 'condujiste', 'condujo', 'condujimos', 'condujisteis', 'condujeron'],
      presenteSubj: ['conduzca', 'conduzcas', 'conduzca', 'conduzcamos', 'conduzcáis', 'conduzcan'],
      futuroStem: 'conducir',
      participio: 'conducido',
      gerundio: 'conduciendo'
    },
    traducir: {
      presente: ['traduzco', 'traduces', 'traduce', 'traducimos', 'traducís', 'traducen'],
      preterito: ['traduje', 'tradujiste', 'tradujo', 'tradujimos', 'tradujisteis', 'tradujeron'],
      presenteSubj: ['traduzca', 'traduzcas', 'traduzca', 'traduzcamos', 'traduzcáis', 'traduzcan'],
      futuroStem: 'traducir',
      participio: 'traducido',
      gerundio: 'traduciendo'
    },
    producir: {
      presente: ['produzco', 'produces', 'produce', 'producimos', 'producís', 'producen'],
      preterito: ['produje', 'produjiste', 'produjo', 'produjimos', 'produjisteis', 'produjeron'],
      presenteSubj: ['produzca', 'produzcas', 'produzca', 'produzcamos', 'produzcáis', 'produzcan'],
      futuroStem: 'producir',
      participio: 'producido',
      gerundio: 'produciendo'
    },
    reducir: {
      presente: ['reduzco', 'reduces', 'reduce', 'reducimos', 'reducís', 'reducen'],
      preterito: ['reduje', 'redujiste', 'redujo', 'redujimos', 'redujisteis', 'redujeron'],
      presenteSubj: ['reduzca', 'reduzcas', 'reduzca', 'reduzcamos', 'reduzcáis', 'reduzcan'],
      futuroStem: 'reducir',
      participio: 'reducido',
      gerundio: 'reduciendo'
    },
    satisfacer: {
      presente: ['satisfago', 'satisfaces', 'satisface', 'satisfacemos', 'satisfacéis', 'satisfacen'],
      preterito: ['satisfice', 'satisficiste', 'satisfizo', 'satisficimos', 'satisficisteis', 'satisficieron'],
      presenteSubj: ['satisfaga', 'satisfagas', 'satisfaga', 'satisfagamos', 'satisfagáis', 'satisfagan'],
      futuroStem: 'satisfar',
      participio: 'satisfecho',
      gerundio: 'satisfaciendo'
    },
    reír: {
      presente: ['río', 'ríes', 'ríe', 'reímos', 'reís', 'ríen'],
      preterito: ['reí', 'reíste', 'rio', 'reímos', 'reísteis', 'rieron'],
      presenteSubj: ['ría', 'rías', 'ría', 'riamos', 'riáis', 'rían'],
      futuroStem: 'reir',
      participio: 'reído',
      gerundio: 'riendo'
    },
    freír: {
      presente: ['frío', 'fríes', 'fríe', 'freímos', 'freís', 'fríen'],
      preterito: ['freí', 'freíste', 'frio', 'freímos', 'freísteis', 'frieron'],
      presenteSubj: ['fría', 'frías', 'fría', 'friamos', 'friáis', 'frían'],
      futuroStem: 'freir',
      participio: 'frito',
      gerundio: 'friendo'
    },
    oler: {
      presente: ['huelo', 'hueles', 'huele', 'olemos', 'oléis', 'huelen'],
      preterito: ['olí', 'oliste', 'olió', 'olimos', 'olisteis', 'olieron'],
      presenteSubj: ['huela', 'huelas', 'huela', 'olamos', 'oláis', 'huelan'],
      futuroStem: 'oler',
      participio: 'olido',
      gerundio: 'oliendo'
    }
  },

  // Verbos que solo necesitan la regla c->z (NO c->zc) en las formas donde
  // la ortografía general aplicaría zc.
  orthoSkip: ['cocer', 'escocer'],

  // Verbos con diptongación / cambio de raíz. "type" define qué reglas
  // aplican (ver conjugator.js -> STEM_RULES).
  stemChange: {
    // e -> ie (solo en el radical acentuado)
    pensar: 'ie', cerrar: 'ie', empezar: 'ie', comenzar: 'ie', sentar: 'ie',
    despertar: 'ie', negar: 'ie', regar: 'ie', quebrar: 'ie', temblar: 'ie',
    calentar: 'ie', helar: 'ie', nevar: 'ie', apretar: 'ie', atravesar: 'ie',
    confesar: 'ie', gobernar: 'ie', encender: 'ie', entender: 'ie',
    defender: 'ie', perder: 'ie', tender: 'ie', ascender: 'ie',
    descender: 'ie', extender: 'ie', fregar: 'ie', plegar: 'ie',
    segar: 'ie', cegar: 'ie', renegar: 'ie', denegar: 'ie', sosegar: 'ie',
    acertar: 'ie', alentar: 'ie', concertar: 'ie', desconcertar: 'ie',
    tentar: 'ie', reventar: 'ie', merendar: 'ie', recomendar: 'ie',
    encomendar: 'ie', arrendar: 'ie', remendar: 'ie', encerrar: 'ie',
    manifestar: 'ie',

    // o -> ue
    volver: 'ue', contar: 'ue', mostrar: 'ue', recordar: 'ue',
    encontrar: 'ue', soñar: 'ue', probar: 'ue', costar: 'ue', colgar: 'ue',
    rogar: 'ue', sonar: 'ue', tronar: 'ue', volar: 'ue', mover: 'ue',
    doler: 'ue', resolver: 'ue', envolver: 'ue', devolver: 'ue',
    demostrar: 'ue', tostar: 'ue', renovar: 'ue',
    aprobar: 'ue', torcer: 'ue', cocer: 'ue', escocer: 'ue',
    morder: 'ue', soltar: 'ue', revolver: 'ue', acordar: 'ue',
    acostar: 'ue', rodar: 'ue', forzar: 'ue', almorzar: 'ue',
    esforzar: 'ue', soler: 'ue', moler: 'ue',

    // u -> ue (único caso: jugar)
    jugar: 'u_ue',

    // i -> ie (adquirir, inquirir)
    adquirir: 'i_ie', inquirir: 'i_ie',

    // e -> i (verbos -ir, cambio simple sin diptongo intermedio)
    pedir: 'i_i', servir: 'i_i', vestir: 'i_i', medir: 'i_i',
    repetir: 'i_i', competir: 'i_i', despedir: 'i_i', impedir: 'i_i',
    rendir: 'i_i', seguir: 'i_i', conseguir: 'i_i', perseguir: 'i_i',
    corregir: 'i_i', elegir: 'i_i', reñir: 'i_i',
    teñir: 'i_i', ceñir: 'i_i', concebir: 'i_i', gemir: 'i_i',
    henchir: 'i_i', revestir: 'i_i', investir: 'i_i', regir: 'i_i',
    proseguir: 'i_i', derretir: 'i_i',

    // e -> ie (presente) / e -> i (pretérito 3ª, gerundio, subjuntivo)
    sentir: 'ie_i', mentir: 'ie_i', preferir: 'ie_i', herir: 'ie_i',
    sugerir: 'ie_i', convertir: 'ie_i', divertir: 'ie_i',
    advertir: 'ie_i', hervir: 'ie_i', digerir: 'ie_i', invertir: 'ie_i',
    referir: 'ie_i', requerir: 'ie_i', consentir: 'ie_i', disentir: 'ie_i',
    resentir: 'ie_i', presentir: 'ie_i', diferir: 'ie_i', inferir: 'ie_i',
    conferir: 'ie_i', transferir: 'ie_i', adherir: 'ie_i',

    // o -> ue (presente) / o -> u (pretérito 3ª, gerundio, subjuntivo)
    dormir: 'ue_u', morir: 'ue_u',

    // hiato: la "i" o la "u" del radical lleva tilde cuando recibe el
    // acento (envío, actúo...), pero no en nosotros/vosotros
    enviar: 'i_acento', confiar: 'i_acento', fiar: 'i_acento',
    criar: 'i_acento', guiar: 'i_acento', liar: 'i_acento',
    variar: 'i_acento', aliar: 'i_acento', espiar: 'i_acento',
    vaciar: 'i_acento', enfriar: 'i_acento', desviar: 'i_acento',
    extraviar: 'i_acento', desconfiar: 'i_acento', ansiar: 'i_acento',
    rociar: 'i_acento', piar: 'i_acento', expiar: 'i_acento',
    actuar: 'u_acento', continuar: 'u_acento', evaluar: 'u_acento',
    situar: 'u_acento', graduar: 'u_acento', acentuar: 'u_acento',
    efectuar: 'u_acento', puntuar: 'u_acento', insinuar: 'u_acento',
    atenuar: 'u_acento', habituar: 'u_acento', fluctuar: 'u_acento'
  },

  // Listado general para el buscador / menú desplegable.
  list: [
    'ser', 'estar', 'tener', 'hacer', 'poder', 'decir', 'ir', 'ver', 'dar',
    'saber', 'querer', 'llegar', 'pasar', 'deber', 'poner', 'parecer',
    'quedar', 'creer', 'hablar', 'llevar', 'dejar', 'seguir', 'encontrar',
    'llamar', 'venir', 'pensar', 'salir', 'volver', 'tomar', 'conocer',
    'vivir', 'sentir', 'tratar', 'mirar', 'contar', 'empezar', 'esperar',
    'buscar', 'existir', 'entrar', 'trabajar', 'escribir', 'perder',
    'producir', 'ocurrir', 'entender', 'pedir', 'recibir', 'recordar',
    'terminar', 'permitir', 'aparecer', 'conseguir', 'comenzar',
    'servir', 'sacar', 'necesitar', 'mantener', 'resultar', 'leer',
    'caer', 'cambiar', 'presentar', 'crear', 'abrir', 'considerar',
    'oír', 'acabar', 'convertir', 'ganar', 'formar', 'traer', 'partir',
    'morir', 'aceptar', 'realizar', 'suponer', 'comprender', 'lograr',
    'explicar', 'preguntar', 'tocar', 'reconocer', 'estudiar',
    'alcanzar', 'nacer', 'dirigir', 'correr', 'utilizar', 'pagar',
    'ayudar', 'gustar', 'jugar', 'escuchar', 'cumplir', 'ofrecer',
    'descubrir', 'levantar', 'intentar', 'usar', 'decidir', 'repetir',
    'olvidar', 'aparecer2', 'incluir', 'continuar', 'imaginar',
    'sonreír', 'reír', 'vender', 'defender', 'romper', 'escoger',
    'establecer', 'obtener', 'representar', 'señalar', 'perseguir',
    'construir', 'destruir', 'huir', 'reducir', 'traducir', 'conducir',
    'adquirir', 'elegir', 'corregir', 'medir', 'vestir', 'competir',
    'despedir', 'impedir', 'rendir', 'colgar', 'contar2', 'costar',
    'soñar', 'probar', 'volar', 'mover', 'doler', 'resolver', 'envolver',
    'devolver', 'demostrar', 'tostar', 'renovar', 'aprobar', 'rogar',
    'negar', 'regar', 'apretar', 'confesar', 'gobernar', 'calentar',
    'helar', 'nevar', 'despertar', 'sentar', 'cerrar', 'empezar2',
    'temblar', 'quebrar', 'ascender', 'descender', 'extender', 'tender',
    'encender', 'mentir', 'preferir', 'herir', 'sugerir', 'convertir2',
    'divertir', 'advertir', 'hervir', 'digerir', 'invertir', 'referir',
    'requerir', 'dormir', 'morir2', 'oler', 'cocer', 'torcer', 'vencer',
    'conocer', 'merecer', 'crecer', 'obedecer', 'agradecer',
    'pertenecer', 'aparecer3', 'desaparecer', 'lucir', 'relucir',
    'freír', 'sonreír2', 'reñir', 'teñir', 'ceñir', 'seguir2',
    'conseguir2', 'proseguir', 'satisfacer', 'andar', 'caber', 'valer',
    'oír2', 'salir2', 'venir2', 'poner2', 'tener2', 'nacer2', 'comer',
    'beber', 'subir', 'bajar', 'entregar', 'enviar', 'invitar',
    'preparar', 'cocinar', 'limpiar', 'lavar', 'comprar', 'vender2',
    'viajar', 'caminar', 'correr2', 'nadar', 'bailar', 'cantar',
    'dibujar', 'pintar', 'construir2', 'reparar', 'cuidar', 'amar',
    'odiar', 'soñar2', 'desear', 'necesitar2', 'permitir2', 'prohibir',
    'insistir', 'discutir', 'resolver2', 'proponer', 'suponer2',
    'disponer', 'exponer', 'imponer', 'oponer', 'componer', 'reponer',
    'mantener2', 'contener', 'obtener2', 'sostener', 'detener',
    'entretener', 'retener', 'atraer', 'contraer', 'distraer', 'extraer',

    // --- ampliación: más verbos con cambio de raíz ---
    'morder', 'soltar', 'revolver', 'acordar', 'acostar', 'rodar',
    'forzar', 'almorzar', 'esforzar', 'soler', 'moler', 'fregar',
    'plegar', 'segar', 'cegar', 'renegar', 'denegar', 'sosegar',
    'acertar', 'alentar', 'concertar', 'desconcertar', 'tentar',
    'reventar', 'merendar', 'recomendar', 'encomendar', 'arrendar',
    'remendar', 'encerrar', 'manifestar', 'concebir', 'gemir',
    'henchir', 'revestir', 'investir', 'regir', 'consentir', 'disentir',
    'resentir', 'presentir', 'diferir', 'inferir', 'conferir',
    'transferir', 'adherir', 'confiar', 'fiar', 'criar',
    'guiar', 'liar', 'variar', 'aliar', 'espiar', 'vaciar', 'enfriar',
    'desviar', 'extraviar', 'desconfiar', 'ansiar', 'rociar', 'piar',
    'expiar', 'actuar', 'continuar', 'evaluar', 'situar', 'graduar',
    'acentuar', 'efectuar', 'puntuar', 'insinuar', 'atenuar',
    'habituar', 'fluctuar',

    // --- ampliación: más compuestos de tener/venir/traer/poner/hacer ---
    'convenir', 'prevenir', 'intervenir', 'provenir', 'retraer',
    'deshacer', 'rehacer', 'contradecir', 'predecir', 'bendecir',
    'maldecir',

    // --- ampliación: familia -scribir y otros con participio irregular ---
    'describir', 'inscribir', 'suscribir', 'transcribir', 'prescribir',
    'circunscribir', 'adscribir',

    // --- ampliación: comunicación y vida diaria ---
    'comunicar', 'informar', 'anunciar', 'declarar', 'afirmar',
    'confirmar', 'aclarar', 'mencionar', 'comentar', 'murmurar',
    'susurrar', 'gritar', 'avisar', 'notificar', 'contestar',
    'responder', 'consultar', 'insistir2', 'discutir2', 'debatir',
    'felicitar', 'agradecer2', 'disculpar', 'perdonar', 'saludar',
    'reclamar',

    // --- ampliación: movimiento ---
    'saltar', 'brincar', 'trotar', 'marchar', 'retroceder', 'rodear',
    'deslizar', 'resbalar', 'trepar', 'escalar', 'flotar', 'hundir',
    'sumergir', 'emerger', 'aterrizar', 'despegar', 'manejar',
    'pilotar', 'navegar', 'remar', 'pedalear', 'arrastrar', 'empujar',
    'tirar', 'lanzar', 'atrapar', 'perseguir2', 'esconder', 'ocultar',
    'aparcar', 'estacionar', 'circular', 'transitar', 'vagar',
    'deambular', 'errar', 'huir2', 'escapar', 'regresar', 'retornar',

    // --- ampliación: cocina y comida ---
    'hornear', 'asar', 'picar', 'cortar', 'rebanar', 'mezclar',
    'batir', 'amasar', 'sazonar', 'condimentar', 'saborear',
    'degustar', 'masticar', 'tragar', 'pelar', 'rallar', 'triturar',
    'colar', 'escurrir', 'marinar', 'macerar', 'gratinar', 'hervir2',
    'rehogar', 'saltear', 'espolvorear', 'endulzar', 'salar',

    // --- ampliación: casa y rutina ---
    'ordenar', 'organizar', 'guardar', 'colocar', 'acomodar',
    'decorar', 'renovar2', 'reparar2', 'construir3', 'demoler',
    'derribar', 'pintar2', 'barrer', 'trapear', 'aspirar', 'planchar',
    'doblar', 'colgar2', 'desconectar', 'conectar', 'enchufar',
    'encender2', 'apagar', 'regar2', 'podar', 'sembrar', 'plantar',
    'cosechar', 'cultivar', 'abonar',

    // --- ampliación: trabajo y estudio ---
    'planificar', 'programar', 'diseñar', 'desarrollar', 'implementar',
    'ejecutar', 'gestionar', 'administrar', 'coordinar', 'supervisar',
    'delegar', 'contratar', 'despedir2', 'entrevistar', 'capacitar',
    'entrenar', 'evaluar2', 'calificar', 'aprobar2', 'reprobar',
    'matricular', 'inscribir2', 'investigar', 'analizar',
    'calcular', 'medir2', 'resolver3', 'comprobar', 'verificar',
    'revisar', 'corregir3', 'redactar', 'traducir2', 'imprimir2',
    'archivar', 'clasificar', 'catalogar', 'digitalizar',

    // --- ampliación: tecnología ---
    'instalar', 'descargar', 'actualizar', 'guardar2',
    'compartir', 'publicar', 'subir2', 'grabar', 'editar', 'filmar',
    'fotografiar', 'escanear', 'imprimir3', 'conectar2', 'navegar2',

    // --- ampliación: emociones y relaciones ---
    'amar2', 'odiar2', 'extrañar', 'añorar', 'emocionar',
    'sorprender', 'asustar', 'preocupar', 'aliviar', 'consolar',
    'animar', 'desanimar', 'motivar', 'inspirar', 'admirar',
    'respetar', 'confiar2', 'dudar', 'sospechar', 'envidiar',
    'perdonar2', 'reconciliar', 'abrazar', 'besar', 'acariciar', 'consentir2',

    // --- ampliación: cuerpo y salud ---
    'respirar', 'toser', 'estornudar', 'sanar', 'curar', 'enfermar',
    'descansar', 'ejercitar',
    'entrenar2', 'sudar', 'vendar', 'operar', 'inyectar',
    'recetar', 'medicar', 'diagnosticar',

    // --- ampliación: negocios y dinero ---
    'invertir2', 'ahorrar', 'gastar', 'cobrar', 'facturar', 'financiar',
    'presupuestar', 'exportar', 'importar', 'fabricar',
    'distribuir', 'comercializar', 'promocionar', 'anunciar2',
    'patrocinar', 'auditar', 'declarar2', 'tributar',

    // --- ampliación: naturaleza y clima ---
    'llover', 'lloviznar', 'relampaguear', 'tronar2', 'soplar',
    'brillar', 'oscurecer', 'amanecer', 'anochecer', 'atardecer',
    'congelar', 'derretir', 'evaporar', 'secar', 'mojar', 'empapar',

    // --- ampliación: arte y expresión ---
    'componer2', 'interpretar', 'actuar2', 'ensayar', 'improvisar',
    'esculpir', 'tallar', 'bordar', 'tejer', 'coser', 'diseñar2',
    'ilustrar', 'narrar', 'relatar', 'inventar', 'crear2',

    // --- ampliación: verbos comunes varios ---
    'aceptar2', 'rechazar', 'permitir3', 'prohibir2', 'exigir',
    'obligar', 'forzar2', 'convencer', 'persuadir', 'engañar',
    'mentir3', 'confesar2', 'admitir', 'negar3', 'afirmar2', 'suponer3',
    'imaginar2', 'soñar4', 'planear', 'organizar2', 'preparar3',
    'improvisar2', 'terminar2', 'finalizar', 'iniciar', 'comenzar3',
    'continuar2', 'seguir4', 'detener3', 'parar', 'frenar', 'acelerar',
    'reducir3', 'aumentar', 'disminuir', 'crecer3', 'multiplicar',
    'dividir', 'restar', 'sumar', 'igualar', 'comparar', 'diferenciar',
    'combinar', 'unir', 'separar', 'juntar', 'reunir',
    'agrupar', 'clasificar3', 'seleccionar', 'elegir3', 'escoger2',
    'decidir2', 'determinar', 'establecer2', 'fijar', 'definir',
    'concluir', 'deducir', 'inducir', 'asumir'
  ].filter((v, i, arr) => arr.indexOf(v) === i) // sin duplicados por si acaso
   .map(v => v.replace(/\d+$/, '')) // quita sufijos numéricos usados para evitar duplicados de clave
   .filter((v, i, arr) => arr.indexOf(v) === i)
};

// Nombres "limpios" para infinitivos que llevan tilde real (oír, reír...)
VERBS_DB.list = VERBS_DB.list.map(v => {
  if (v === 'oir') return 'oír';
  if (v === 'rei' + 'r') return 'reír'; // evita el propio linter de tildes en editores
  return v;
});
