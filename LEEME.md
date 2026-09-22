# Conjugador de español — LEEME

## ¿Qué es esto?

Una página web para practicar la conjugación de verbos en español: modo
indicativo y modo subjuntivo, con todos sus tiempos. Se elige (o se escribe)
un verbo, se elige un modo y un tiempo, y la aplicación arma sola:

1. La tabla de conjugación completa (las 6 personas).
2. Un ejercicio de completar una oración con la forma correcta.

Es un sitio 100 % estático: solo HTML, CSS y JavaScript, sin frameworks,
sin backend, sin base de datos. Pensado para vivir en GitHub Pages y que
cualquiera lo use desde un enlace, en computadora o celular.

## ¿Para quién es?

Para cualquiera que esté aprendiendo o repasando la conjugación en español:
estudiantes, profesores que quieran un pizarrón de apoyo, o cualquiera que
quiera practicar sin depender de una app de terceros.

## ¿Qué incluye?

- **Modo indicativo** (9 tiempos): presente, pretérito imperfecto,
  pretérito perfecto simple, futuro simple, condicional simple, pretérito
  perfecto compuesto, pluscuamperfecto, futuro compuesto y condicional
  compuesto.
- **Modo subjuntivo** (5 tiempos): presente, pretérito imperfecto, futuro
  simple (poco usado hoy, pero existe), pretérito perfecto y
  pluscuamperfecto.
- **Casi 600 verbos** listados en un buscador con desplegable propio
  (filtra mientras escribís, funciona con teclado, clic o tap), más la
  posibilidad de escribir cualquier verbo terminado en *-ar*, *-er* o
  *-ir* que no esté en la lista.
- Un **motor de conjugación propio**, escrito desde cero, que sabe aplicar:
  - Las terminaciones regulares de cada tiempo.
  - Cambios ortográficos automáticos (sacar→saqué, llegar→llegué,
    coger→cojo, conocer→conozco, construir→construyo...).
  - Cambios de raíz / diptongación (pensar→pienso, volver→vuelvo,
    pedir→pido, sentir→siento/sintió, dormir→duermo/durmió...).
  - Acentos por hiato en verbos como enviar→envío o actuar→actúo.
  - Los verbos totalmente irregulares más comunes (ser, estar, ir, tener,
    hacer, poder, decir, querer...) y sus compuestos (proponer, mantener,
    atraer, sonreír...) mediante una regla de "verbo base + prefijo".
- Un **ejercicio de completar** con oraciones genéricas por tiempo verbal
  (con distintas variantes para no repetir siempre lo mismo), corrección
  automática y botón para generar otro ejemplo.

## Cómo está armado (estructura)

```
conjugador/
├── index.html          página principal
├── css/
│   └── style.css        estilos (tema "pizarra de aula")
├── js/
│   ├── verbs-data.js     listado de verbos + tabla de irregulares +
│   │                      verbos con cambio de raíz
│   ├── conjugator.js      el motor: reglas y armado de los 14 tiempos
│   ├── sentences.js       plantillas de oraciones del ejercicio
│   └── app.js              conecta todo con la interfaz (menús, buscador,
│                            tabla, ejercicio)
├── README.md             instrucciones para subirlo a GitHub Pages
├── LEEME.md              este archivo
└── BITACORA.md           historial de versiones, cambios y bugs resueltos
```

## Decisiones de diseño

- **Sin frameworks ni build.** Con abrir `index.html` alcanza. Esto lo hace
  fácil de alojar en GitHub Pages sin configurar nada.
- **Motor de conjugación propio en vez de una API o diccionario externo.**
  Así funciona sin conexión y sin depender de servicios de terceros.
- **Tema visual "pizarra de aula"** (verde pizarrón, tiza blanca/amarilla,
  acentos color coral) en vez de un estilo genérico de app, para que se
  sienta como un cuaderno de clase de español.

## Alcance y límites conocidos

- No conjuga verbos reflexivos con su pronombre (me/te/se...) todavía.
- No incluye el modo imperativo (se puede agregar más adelante).
- Puede haber alguna excepción rarísima no cubierta en verbos poco
  frecuentes; el motor está pensado para cubrir el uso real del idioma,
  no cada caso dialectal.

Los detalles de qué se probó, qué se rompió y cómo se arregló están en
**BITACORA.md**.
