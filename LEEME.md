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
- **Interfaz en dos idiomas: Español / 中文 (chino).** Un selector arriba
  a la derecha cambia todas las indicaciones de la página (título, pasos
  de uso, botones, mensajes de corrección). En chino, además:
  - cada tiempo aparece con su nombre en chino y, debajo, su nombre en
    español (para aprender también cómo se llama);
  - bajo el título de cada tiempo hay una breve explicación en chino de
    **para qué se usa**, con un ejemplo traducido;
  - los pronombres llevan su equivalente (yo（我）, tú（你）...).

  Los verbos, las conjugaciones y las oraciones del ejercicio siguen en
  español, porque eso es lo que se practica. Para compartir el enlace
  directamente en chino se agrega `?lang=zh` al final de la dirección
  (por ejemplo `https://TU-USUARIO.github.io/conjugador/?lang=zh`). La
  página recuerda el idioma elegido en ese navegador, y si el navegador
  está configurado en chino, se abre en chino sola.

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
│   ├── i18n.js            textos de la interfaz en español y chino
│   ├── sentences.js       plantillas de oraciones del ejercicio
│   └── app.js              conecta todo con la interfaz (menús, buscador,
│                            tabla, ejercicio)
├── README.md             instrucciones para subirlo a GitHub Pages
├── LEEME.md              este archivo
├── BITACORA.md           historial de versiones, cambios y bugs resueltos
└── HISTORIAL-CONVERSACION.md  hilo de la conversación que dio forma al proyecto
```

## Cómo subir este proyecto a GitHub, paso a paso (desde cero)

Esta sección asume que nunca usaste GitHub. Hay dos caminos: **Opción A**
(sin terminal, todo desde el navegador) y **Opción B** (con Git, la forma
"profesional" pero con más pasos). Cualquiera de las dos termina en el
mismo lugar: tu sitio publicado con una URL pública.

### Paso 0 — Crear una cuenta en GitHub

1. Entra a [github.com](https://github.com).
2. Click en **Sign up** (arriba a la derecha).
3. Completa correo, contraseña y un nombre de usuario (ese nombre va a
   formar parte de la URL final, ej. `https://TU-USUARIO.github.io/...`).
4. Verifica tu correo cuando te llegue el mail de confirmación.

Con la cuenta creada, elige uno de los dos caminos:

---

### Opción A — Sin terminal, subiendo los archivos desde el navegador

**1. Crear el repositorio**
- Ya con la sesión iniciada, click en el botón **+** (arriba a la
  derecha) → **New repository**.
- En "Repository name" escribe algo como `conjugador-espanol`.
- Déjalo en **Public** (así puede verlo cualquiera).
- **No marques** la opción de crear un README automático (ya tenemos
  los nuestros).
- Click en **Create repository**.

**2. Subir los archivos**
- En la página del repositorio recién creado (todavía vacío), vas a ver
  un enlace que dice algo como *"uploading an existing file"*. Click ahí.
  (Si no lo ves, busca el botón **Add file → Upload files**.)
- Arrastra dentro del recuadro **toda la carpeta** `conjugador` completa
  (o selecciona todos sus archivos y subcarpetas: `index.html`, `css/`,
  `js/`, `README.md`, `LEEME.md`, `BITACORA.md`). GitHub conserva las
  subcarpetas si arrastras la carpeta entera.
- Abajo, en "Commit changes", escribe un mensaje corto (ej. "Primera
  versión") y click en **Commit changes**.

Con esto el código ya está en GitHub. Sigue en **"Activar GitHub
Pages"** más abajo.

---

### Opción B — Con Git, desde la terminal

**1. Instalar Git** (si no lo tienes)
- Descárgalo de [git-scm.com](https://git-scm.com/downloads) e instálalo
  con las opciones por defecto.

**2. Crear el repositorio en GitHub**
- Igual que en la Opción A, paso 1: **+ → New repository**, nómbralo,
  público, sin README automático, **Create repository**.
- En la página del repositorio vacío, copia la URL que aparece bajo
  "…or push an existing repository from the command line" (algo como
  `https://github.com/TU-USUARIO/conjugador-espanol.git`).

**3. Subir el proyecto desde la terminal**

```bash
cd ruta/a/la/carpeta/conjugador
git init
git add .
git commit -m "Primera versión"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/conjugador-espanol.git
git push -u origin main
```

(La primera vez, es posible que te pida iniciar sesión en GitHub desde la
terminal o el navegador; sigue las instrucciones que aparezcan en
pantalla.)

---

### Activar GitHub Pages (paso final, para ambas opciones)

1. En tu repositorio en GitHub, ve a la pestaña **Settings**.
2. En el menú de la izquierda, click en **Pages**.
3. En "Build and deployment" → "Source", elige **Deploy from a branch**.
4. En "Branch", elige **main** y la carpeta **/ (root)**. Click **Save**.
5. Espera 1 o 2 minutos. GitHub muestra un aviso verde con la URL cuando
   ya está publicado.

Tu sitio va a quedar en:

```
https://TU-USUARIO.github.io/conjugador-espanol/
```

Ábrelo, elige un verbo y confirma que todo funciona. A partir de ahí,
puedes compartir ese enlace con quien quieras.

### Actualizar el sitio más adelante

- **Opción A:** entra al repositorio → **Add file → Upload files** →
  sube de nuevo los archivos que cambiaron → **Commit changes**.
- **Opción B:**
  ```bash
  git add .
  git commit -m "Describe qué cambiaste"
  git push
  ```

GitHub Pages se actualiza sola, unos minutos después de cada cambio.



- **Sin frameworks ni build.** Con abrir `index.html` alcanza. Esto lo hace
  fácil de alojar en GitHub Pages sin configurar nada.
- **Motor de conjugación propio en vez de una API o diccionario externo.**
  Así funciona sin conexión y sin depender de servicios de terceros.
- **Tema visual "pizarra de aula"** (verde pizarrón, tiza blanca/amarilla,
  acentos color coral) en vez de un estilo genérico de app, para que se
  sienta como un cuaderno de clase de español.

## Cómo agregar otro idioma a la interfaz

Todos los textos de la interfaz están en `js/i18n.js`, en el objeto
`TEXTOS`. Para sumar, por ejemplo, inglés: copiar el bloque `zh`, cambiarle
la clave a `en`, traducir cada texto, agregar `'en'` a
`IDIOMAS_DISPONIBLES` y agregar un botón más en el selector de
`index.html` (`<button class="idioma-btn" data-idioma="en">English</button>`).

## Alcance y límites conocidos

- No conjuga verbos reflexivos con su pronombre (me/te/se...) todavía.
- No incluye el modo imperativo (se puede agregar más adelante).
- En chino se traducen las indicaciones, no el significado de cada verbo
  (sería otra mejora posible: mostrar "hablar = 说话" al elegirlo).
- Las traducciones al chino fueron escritas sin revisión de un hablante
  nativo; conviene que la persona que la use avise si algo suena raro.
- Puede haber alguna excepción rarísima no cubierta en verbos poco
  frecuentes; el motor está pensado para cubrir el uso real del idioma,
  no cada caso dialectal.

Los detalles de qué se probó, qué se rompió y cómo se arregló están en
**BITACORA.md**.
