# Historial de la conversación

Este archivo es un registro de la conversación que dio origen y forma a
este proyecto: qué se pidió en cada momento y qué se entregó como
respuesta. Es un complemento de `BITACORA.md` (que registra los cambios
técnicos y bugs) — acá queda el hilo de la conversación en sí.

---

### 1. Pedido inicial

> *"creame un sistema para subirlo a github, para que alguien pueda
> acceder a este sistema desde cualquier lugar, es una pagina para
> practicar verbos y todos sus tiempos en español, modo indicativo y sus
> tiempos, modo subjuntivo y sus tiempos, una lista completa de todos los
> verbos en español, con un sub menu para indicar que tiempo verbal
> practicar, el usuario escribe un verbo o lo elije de un listado, y en
> cada menu se lista la conjugacion correspondiente + un relleno para
> armar una oración (...) principalmente como input el usuario elije o
> escribe un verbo y el resto lo hacemos nosotros automatico"*

Se planteó construir una app web estática (HTML/CSS/JS, sin backend) con
un motor de conjugación propio, para poder subirla a GitHub Pages.

### 2. Verificación de avance

El usuario preguntó *"listo?"* mientras se estaba construyendo el motor
de conjugación (justo después de crear `verbs-data.js`, el primer
archivo). Se explicó que todavía faltaban el motor, las plantillas de
oraciones, la interfaz y el README, y se continuó la construcción tras su
*"vale"*.

**Entregado:** la primera versión completa (ver v1.0 en `BITACORA.md`):
motor de conjugación, 241 verbos, interfaz con tema "pizarra de aula",
ejercicio de completar, y `README.md` con instrucciones de despliegue.

### 3. Mejora del buscador de verbos + ampliar la lista

> *"muy buena, me ayudas a un cambio por el momento, o mejora, en verbo a
> practicar, en el campo de texto sale una flecha para elegir verbos, es
> posible hacer funcionar eso? enlistar los verbos y aprovechar de
> agregar TODOS los verbos posibles que encuentres y hacerlo funcionar
> con el resto de la aplicación"*

El `<datalist>` nativo del navegador no era confiable (sobre todo en
celular). Se reemplazó por un desplegable propio (filtro en vivo,
teclado, clic/tap) y se amplió la lista de verbos de 241 a 599, agregando
categorías nuevas al motor (hiato en -iar/-uar, más verbos con cambio de
raíz, participios irregulares de la familia -scribir, verbos compuestos).

**Entregado:** ver v1.1 en `BITACORA.md`.

### 4. Reporte de un bug: el foco salta solo

> *"ok, lo otro, cuando coloco un verbo, se va directo al final para
> hacer el ejercicio, como el 'foco' o el 'cursor', esto es por diseño?
> es posible no hacer eso?"*

Se identificó que `renderEjercicio()` forzaba el foco en el campo de
respuesta cada vez que cambiaba el verbo o el tiempo. Se quitó ese
comportamiento y se dejó el foco automático solo para cuando el usuario
hace clic en "Otra oración".

**Entregado:** ver v1.2 en `BITACORA.md`.

### 5. Documentación del proyecto

> *"puedes agregar 3 archivos, un leeme.md con la descripcion de este
> proyecto, una bitacora.md para que indiques exactamente eso y pensba en
> un tercer documento de bugs, pero mejor anotalo en bitacora y un
> apartado de cambios y 'bugs' descubiertos y resueltos, este proyecto no
> es muy grande, pero es para mi para acostumbrarme a anotar el historial
> y llevar un control de cambio"*

En vez de tres documentos, se consolidó en dos: `LEEME.md` (descripción
del proyecto, estructura, decisiones de diseño y límites) y
`BITACORA.md` (historial por versión, cada una con su apartado de
**Cambios** y de **Bugs descubiertos y resueltos**), reconstruyendo ahí
retroactivamente lo ocurrido en las versiones v1.0, v1.1 y v1.2.

### 6. Guía de despliegue paso a paso

> *"en el leeme puedes agregar como subir esto a un github, paso a paso
> desde el paso 0"*

Se agregó a `LEEME.md` una guía completa desde cero: crear una cuenta en
GitHub (paso 0), dos caminos para subir el proyecto (sin terminal, desde
el navegador, o con Git desde la línea de comandos), cómo activar GitHub
Pages, y cómo actualizar el sitio más adelante.

**Entregado:** ver v1.3 en `BITACORA.md`.

### 7. Este archivo

> *"puedes agregar un .md con el historial de esta conversacion"*

Se agregó `HISTORIAL-CONVERSACION.md` (este archivo).

---

## Segunda conversación (2026-09-29)

Se continuó el proyecto en otra conversación, adjuntando el `.zip` del
proyecto y este historial.

### 8. Indicaciones en chino

> *"aunque actualmente ya esta muy bien, lo continuaria para una persona
> de china, que quiere saber las indicaciones en chino"*

Se agregó un selector de idioma **Español / 中文**. En chino se traducen
todas las indicaciones de la interfaz y se suma, para cada tiempo verbal,
una explicación breve de su uso con un ejemplo traducido; los verbos y
las oraciones del ejercicio se mantienen en español. Se puede compartir el
enlace con `?lang=zh` para que abra directo en chino. De paso se corrigió
un bug de mayúsculas en las oraciones del ejercicio.

**Entregado:** ver v1.5 en `BITACORA.md`.

Luego se aclaró que, además de `js/i18n.js` (nuevo), había archivos
modificados (`index.html`, `app.js`, `style.css`, `sentences.js`), así
que había que reemplazar todo; y se repasaron los comandos para
actualizar con Git (`git add .`, `git commit`, `git push`).

### 9. Significado de los verbos en chino

> *"el usuario va a ser una china, va aprender español con tal que de
> quie mas o menos el verbo sea el correcto en chino, esta bien (...) le
> agregas la version entre parentesis, pero solo en el dropbox, ya que los
> verbos en chino no se conjugan"*

Se conversó que un verbo puede tener varios significados en chino y se
optó por una traducción corta tipo diccionario de bolsillo. También se
pidió una opinión sobre si aprender las conjugaciones es esencial (sí,
pero conviene priorizar los verbos y tiempos más usados).

**Entregado:** ver v1.6 en `BITACORA.md`.

### 10. Gerundio y participio

> *"se que falta algo, el ado, edo, ido, y ando, endo, iendo, se que no
> funciona en todos los verbos y no es algo aparte, es posible ponerlo en
> la pagina como entremedio de modo indicativo y completa la oracion"*

Se agregó la sección "Formas no personales" entre la tabla y el
ejercicio, con marca de irregular. Al revisar las formas de todos los
verbos aparecieron y se corrigieron varios bugs del motor (participios
con tilde de más, proseguir/derretir, reñir/teñir/ceñir, revolver).

**Entregado:** ver v1.7 en `BITACORA.md`.

---

*Nota: este historial se escribió a partir de los pedidos reales de la
conversación, resumiendo las respuestas y remitiendo a `BITACORA.md` para
el detalle técnico de cada cambio. Si seguimos trabajando en el proyecto
en otra conversación, lo ideal es sumar una sección nueva acá con ese
hilo, igual que se hace con las versiones en la bitácora.*
