/* =========================================================================
   IDIOMA DE LA INTERFAZ (i18n) — Español / 中文
   -------------------------------------------------------------------------
   Solo se traducen las indicaciones de la interfaz (títulos, botones,
   mensajes, nombres y explicación de cada tiempo). Los verbos, las
   conjugaciones y las oraciones del ejercicio siguen en español, porque
   eso es lo que se practica.
   ========================================================================= */

const IDIOMAS_DISPONIBLES = ['es', 'zh'];

const TEXTOS = {
  es: {
    htmlLang: 'es',
    tituloPagina: 'Conjugador · practica verbos en español',
    marca: 'cuaderno de verbos',
    titulo: 'Conjugador de español',
    subtitulo: 'Elige un verbo, un modo y un tiempo. El resto se conjuga solo.',
    ayudaResumen: '¿Cómo se usa?',
    ayudaPasos: [
      'Escribe un verbo en infinitivo (por ejemplo <b>hablar</b>) o elígelo de la lista con la flecha ▾. También puedes pulsar «Al azar».',
      'Elige el modo: <b>indicativo</b> (hechos, lo que es) o <b>subjuntivo</b> (deseos, dudas, hipótesis). La tercera pestaña, <b>pronombres de objeto</b>, sirve para practicar frases como «yo te quiero» o «tú me llamas».',
      'Elige el tiempo verbal. La tabla muestra la conjugación para cada persona.',
      'Abajo, escribe la forma correcta del verbo para completar la oración y pulsa «Comprobar» (o Enter).'
    ],
    etiquetaVerbo: 'Verbo a practicar',
    placeholderVerbo: 'Escribe o elige un verbo (hablar, comer, tener...)',
    ariaDesplegar: 'Mostrar lista de verbos',
    btnAzar: '🎲 Al azar',
    tituloAzar: 'Elegir un verbo al azar',
    verboSeleccionado: 'Verbo seleccionado:',
    contadorVerbos: n => `${n} verbos disponibles`,
    panelContador: n => `${n} verbo${n === 1 ? '' : 's'}`,
    panelVacio: 'No hay verbos que coincidan.',
    avisoVerboInvalido: 'Escribe un verbo terminado en -ar, -er o -ir, o elígelo de la lista.',
    ariaModo: 'Modo verbal',
    ariaTiempo: 'Tiempo verbal',
    modos: { indicativo: 'Modo indicativo', subjuntivo: 'Modo subjuntivo', pronombres: 'Pronombres de objeto' },
    tiempos: {},            // en español se usan los nombres originales
    usos: {},               // sin explicación extra en español
    pronombres: null,       // se usan los pronombres originales
    noConjugable: 'No se pudo conjugar ese verbo.',
    pronExplica: 'El verbo se conjuga igual que siempre, según el sujeto. El pronombre de objeto va delante del verbo y no cambia con el tiempo: yo te quiero, yo te quería, yo te he querido.',
    pronElige: 'Elige el pronombre (quién recibe la acción):',
    pronGlosas: { me: 'a mí', te: 'a ti', lo: 'a él', la: 'a ella', le: 'a él / a ella', nos: 'a nosotros', os: 'a vosotros', los: 'a ellos', las: 'a ellas', les: 'a ellos / a ellas' },
    pronTipos: { ambos: 'objeto directo e indirecto', directo: 'objeto directo', indirecto: 'objeto indirecto' },
    pronReflexivo: 'reflexivo',
    pronReflexivoTitulo: 'El sujeto y el objeto son la misma persona (a sí mismo)',
    pronNoSeUsa: 'no se usa',
    pronSinObjeto: v => `«${v}» normalmente no lleva pronombre de objeto. Prueba con uno de estos verbos:`,
    pronPegado: 'Con infinitivo y gerundio, el pronombre también puede ir pegado al final:',
    pistaPronombre: 'Escribe el pronombre y el verbo juntos, por ejemplo: te quiero.',
    tituloNoPersonales: 'Formas no personales',
    introNoPersonales: 'No cambian según la persona: son iguales para yo, tú, él...',
    npInfinitivo: 'Infinitivo',
    npGerundio: 'Gerundio',
    npParticipio: 'Participio',
    npTerminaciones: { infinitivo: '-ar / -er / -ir', gerundio: '-ando / -iendo', participio: '-ado / -ido' },
    npUsoInfinitivo: 'La forma base del verbo, la que aparece en el diccionario.',
    npUsoGerundio: 'Acción en curso. Se usa con «estar»:',
    npUsoParticipio: 'Con «haber» forma los tiempos compuestos:',
    npEjInfinitivo: v => `Quiero ${v}.`,
    npEjGerundio: g => `Estoy ${g}.`,
    npEjParticipio: p => `He ${p}.`,
    npIrregular: 'irregular',
    npIrregularTitulo: 'No sigue la terminación habitual',
    tituloEjercicio: 'Completa la oración',
    placeholderEjercicio: 'Escribe la forma correcta...',
    btnComprobar: 'Comprobar',
    btnOtra: 'Otra oración',
    correcto: '¡Correcto!',
    incorrecto: r => `No es correcto. La forma esperada es: "${r}".`,
    pistaEjercicio: '',
    pie: 'Cobertura amplia de verbos regulares, irregulares y con cambio de raíz. Algún verbo muy poco común podría tener una excepción no contemplada.'
  },

  zh: {
    htmlLang: 'zh-CN',
    tituloPagina: '西班牙语动词变位练习 · Conjugador',
    marca: '动词练习本 · cuaderno de verbos',
    titulo: '西班牙语动词变位',
    subtitulo: '选择一个动词、一个语式和一个时态，系统会自动完成变位。',
    ayudaResumen: '使用说明',
    ayudaPasos: [
      '输入一个动词原形（例如 <b>hablar</b>“说话”），或点击箭头 ▾ 从列表中选择；列表中括号里是动词的中文意思。也可以直接输入中文（例如“吃”）来查找动词，或点击“随机”。',
      '选择语式：<b>陈述式</b>（indicativo，表达事实）或<b>虚拟式</b>（subjuntivo，表达愿望、怀疑、假设）。第三个标签<b>宾格代词</b>用来练习 yo te quiero、tú me llamas 这样的句子。',
      '选择时态。下方表格会显示每个人称的变位形式。',
      '在练习区写出动词的正确形式来完成句子，然后点击“检查”（或按 Enter 键）。'
    ],
    etiquetaVerbo: '要练习的动词',
    placeholderVerbo: '输入西语动词或中文意思（hablar、吃、去……）',
    ariaDesplegar: '显示动词列表',
    btnAzar: '🎲 随机',
    tituloAzar: '随机选择一个动词',
    verboSeleccionado: '当前动词：',
    contadorVerbos: n => `共 ${n} 个动词`,
    panelContador: n => `${n} 个动词`,
    panelVacio: '没有匹配的动词。',
    avisoVerboInvalido: '请输入以 -ar、-er 或 -ir 结尾的动词原形，或从列表中选择。',
    ariaModo: '语式',
    ariaTiempo: '时态',
    modos: { indicativo: '陈述式 · Indicativo', subjuntivo: '虚拟式 · Subjuntivo', pronombres: '宾格代词 · Pronombres' },
    tiempos: {
      ind_presente: '现在时',
      ind_imperfecto: '过去未完成时',
      ind_preterito: '简单过去时',
      ind_futuro: '简单将来时',
      ind_condicional: '简单条件式',
      ind_pretPerfecto: '现在完成时',
      ind_pluscuamperfecto: '过去完成时',
      ind_futuroPerfecto: '将来完成时',
      ind_condicionalPerfecto: '条件完成时',
      subj_presente: '虚拟现在时',
      subj_imperfecto: '虚拟过去未完成时',
      subj_futuro: '虚拟将来时（几乎不用）',
      subj_pretPerfecto: '虚拟现在完成时',
      subj_pluscuamperfecto: '虚拟过去完成时'
    },
    usos: {
      ind_presente: '用于现在的动作、习惯和普遍事实。例：Yo hablo español.（我说西班牙语。）',
      ind_imperfecto: '用于描述过去的背景、习惯或持续的动作（“以前常常……”）。例：Antes vivía en Pekín.（我以前住在北京。）',
      ind_preterito: '用于过去某个时间已经完成的动作。例：Ayer comí paella.（我昨天吃了海鲜饭。）',
      ind_futuro: '用于将来的动作，也可表示对现在的推测。例：Mañana viajaré.（我明天去旅行。）',
      ind_condicional: '表示“会……”“可能会……”，用于假设、礼貌请求或建议。例：Yo iría contigo.（我会跟你去。）',
      ind_pretPerfecto: '用于与现在仍有关系的过去动作（今天、这周、至今）。由 haber + 过去分词构成。例：Hoy he trabajado mucho.（我今天工作了很多。）',
      ind_pluscuamperfecto: '表示在过去另一动作之前已经完成的动作（“已经……了”）。例：Cuando llegué, ya habían salido.（我到的时候，他们已经走了。）',
      ind_futuroPerfecto: '表示将来某个时间之前会完成的动作。例：Para las cinco habré terminado.（五点前我会做完。）',
      ind_condicionalPerfecto: '表示过去没有发生的假设结果（“本来会……”）。例：Yo lo habría hecho.（我本来会做的。）',
      subj_presente: '用于表达愿望、情感、怀疑或必要性，常在 que 之后。例：Espero que vengas.（我希望你来。）',
      subj_imperfecto: '用于过去的愿望或与现在事实相反的假设，常与 si 连用。例：Si tuviera tiempo…（如果我有时间……）',
      subj_futuro: '现代西班牙语几乎不用，主要出现在法律文本和固定说法中。了解即可。',
      subj_pretPerfecto: '与虚拟现在时的用法相同，但指已经完成的动作。例：Espero que hayas comido.（希望你已经吃过了。）',
      subj_pluscuamperfecto: '表示与过去事实相反的假设（“要是当时……就好了”）。例：Si hubiera estudiado, habría aprobado.（要是我当时学习了，就会及格了。）'
    },
    pronombres: ['yo（我）', 'tú（你）', 'él/ella/usted（他/她/您）', 'nosotros/as（我们）', 'vosotros/as（你们）', 'ellos/ellas/ustedes（他们/她们/诸位）'],
    noConjugable: '无法对这个动词进行变位。',
    pronExplica: '动词照常按主语变位。宾格代词放在动词前面，不随时态变化：yo te quiero、yo te quería、yo te he querido。注意语序：中文说“我爱你”，西班牙语说 Yo te quiero（我—你—爱）。',
    pronElige: '选择代词（动作的对象）：',
    pronGlosas: { me: '我', te: '你', lo: '他／它', la: '她／它', le: '（给）他／她', nos: '我们', os: '你们', los: '他们', las: '她们', les: '（给）他们／她们' },
    pronTipos: { ambos: '直接宾语和间接宾语', directo: '直接宾语', indirecto: '间接宾语' },
    pronReflexivo: '自反',
    pronReflexivoTitulo: '主语和宾语是同一个人（自己）',
    pronNoSeUsa: '不使用',
    pronSinObjeto: v => `“${v}”通常不带宾格代词。请试试下面这些动词：`,
    pronPegado: '与不定式或副动词连用时，代词也可以接在词尾：',
    pistaPronombre: '提示：把代词和动词一起写出来，例如 te quiero。',
    tituloNoPersonales: '无人称形式 · Formas no personales',
    introNoPersonales: '这些形式不随人称变化：对 yo、tú、él……都一样。',
    npInfinitivo: '不定式（原形）',
    npGerundio: '副动词',
    npParticipio: '过去分词',
    npTerminaciones: { infinitivo: '-ar / -er / -ir', gerundio: '-ando / -iendo', participio: '-ado / -ido' },
    npUsoInfinitivo: '动词的基本形式，也就是词典里的形式。',
    npUsoGerundio: '表示“正在……”，与 estar 连用：',
    npUsoParticipio: '与 haber 构成完成时（表示“已经……了”）：',
    npEjInfinitivo: v => `Quiero ${v}.（我想……）`,
    npEjGerundio: g => `Estoy ${g}.（我正在……）`,
    npEjParticipio: p => `He ${p}.（我已经……了）`,
    npIrregular: '不规则',
    npIrregularTitulo: '不符合常规词尾',
    tituloEjercicio: '完成句子',
    placeholderEjercicio: '写出正确的动词形式……',
    btnComprobar: '检查',
    btnOtra: '换一句',
    correcto: '正确！¡Correcto!',
    incorrecto: r => `不正确。正确形式是：“${r}”。`,
    pistaEjercicio: '提示：括号里是动词原形，请根据句子的主语写出正确的变位形式。',
    pie: '本工具涵盖大多数规则动词、不规则动词和词根变化动词。极少数罕见动词可能存在未收录的例外。'
  }
};

/* -------------------------------------------------------------------------
   Idioma inicial: ?lang=zh en la URL > preferencia guardada > idioma del
   navegador > español.
   ------------------------------------------------------------------------- */
function detectarIdiomaInicial() {
  try {
    const param = new URLSearchParams(location.search).get('lang');
    if (param && IDIOMAS_DISPONIBLES.includes(param)) return param;
  } catch (e) { /* sin URL válida: seguir */ }
  try {
    const guardado = localStorage.getItem('conjugador-idioma');
    if (guardado && IDIOMAS_DISPONIBLES.includes(guardado)) return guardado;
  } catch (e) { /* almacenamiento bloqueado: seguir */ }
  const nav = (navigator.language || '').toLowerCase();
  if (nav.startsWith('zh')) return 'zh';
  return 'es';
}

function guardarIdioma(idioma) {
  try { localStorage.setItem('conjugador-idioma', idioma); } catch (e) { /* no importa */ }
}

let idiomaActual = detectarIdiomaInicial();

/** Devuelve el texto de la clave en el idioma actual (con respaldo en español). */
function t(clave) {
  const valor = TEXTOS[idiomaActual][clave];
  return (valor === undefined || valor === null) ? TEXTOS.es[clave] : valor;
}
