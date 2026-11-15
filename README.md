# 🎵 Bingo Musical

## 1. Descripción del proyecto

Bingo Musical es una aplicación web interactiva desarrollada con Vue 3 en la que los jugadores deben reconocer canciones a partir de pequeños fragmentos de audio.

El objetivo del juego es escuchar cada canción y seleccionar la respuesta correcta entre cuatro opciones.

La partida consta de 10 preguntas. Al finalizar, se muestra el resultado del jugador y se guarda su puntuación en un ranking.

El proyecto está desarrollado como una SPA (*Single Page Application*), es decir, una aplicación que permite navegar entre diferentes pantallas sin tener que recargar toda la página.

## 2. Tecnologías utilizadas

- **HTML5:** estructura de la aplicación.
- **CSS3:** diseño y estilos visuales.
- **JavaScript:** funcionamiento y lógica del juego.
- **Vue 3:** framework utilizado para crear la interfaz.
- **Vue Router:** permite navegar entre las diferentes páginas.
- **Pinia:** gestiona los datos compartidos del juego.
- **Howler.js:** permite reproducir y controlar los archivos de audio.
- **LocalStorage:** permite guardar el ranking en el navegador.

## 3. Instalación del proyecto

### Requisitos previos

Es necesario tener instalado:

- Node.js
- npm

### Instalar las dependencias

Una vez descargado o clonado el proyecto, abrir una terminal en la carpeta principal y ejecutar:

```bash
npm install
```

Este comando instala las dependencias necesarias que aparecen en el archivo `package.json`.

### Instalar Howler.js

Para instalar la librería de audio Howler.js, ejecutar:

```bash
npm install howler
```

### Ejecutar el proyecto

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Después, abrir en el navegador la dirección local que aparece en la terminal.

### Crear una versión de producción

Para generar la versión final del proyecto:

```bash
npm run build
```

## 4. Estructura del proyecto

La aplicación está organizada en diferentes carpetas para separar las páginas, los componentes, los datos y la lógica del juego.

```text
src/
│
├── assets/
│   └── estilos y recursos visuales
│
├── components/
│   ├── NavBar.vue
│   ├── PlayerForm.vue
│   ├── MusicCard.vue
│   ├── BingoCard.vue
│   ├── GameFeedback.vue
│   ├── RankingTable.vue
│   └── SongPlayer.vue
│
├── data/
│   └── songs.js
│
├── router/
│   └── index.js
│
├── stores/
│   └── game.js
│
├── views/
│   ├── HomeView.vue
│   ├── GameView.vue
│   ├── PlayView.vue
│   ├── ResultView.vue
│   └── RankingView.vue
│
├── App.vue
└── main.js
```

## 5. Componentes de Vue

Vue permite dividir una aplicación en componentes. Cada componente tiene una función concreta y permite organizar y reutilizar mejor el código.

### 5.1. App.vue

Es el componente principal o raíz de la aplicación.

Contiene la barra de navegación (`NavBar`) y el `RouterView`, que muestra la página correspondiente según la ruta seleccionada.

### 5.2. NavBar.vue

Es el componente encargado de mostrar la barra de navegación principal.

Permite acceder a las diferentes secciones de la aplicación, como la página de inicio, el concurso y el ranking.

Es un componente hijo de `App.vue`.

### 5.3. PlayerForm.vue

Es el componente encargado de mostrar el formulario donde el jugador introduce su nombre.

- Utiliza `defineEmits()` para enviar el nombre al componente padre.
- Cuando el usuario envía el formulario, emite el evento `iniciar`.
- `HomeView.vue` recibe el nombre y comienza la partida.

### 5.4. MusicCard.vue

Es el componente encargado de mostrar las preguntas y las cuatro respuestas posibles.

Recibe información de `PlayView.vue` mediante `props`:

- `song`: contiene la información de la canción y sus respuestas.
- `questionNumber`: indica el número de pregunta.
- `selectedAnswer`: indica la respuesta seleccionada.
- `answered`: indica si la pregunta ya ha sido contestada.

También utiliza `defineEmits(['select-answer'])` para comunicar al componente padre qué respuesta ha seleccionado el jugador.

Cuando se pulsa una respuesta, ejecuta `seleccionarRespuesta(index)` y envía el evento `select-answer`.

El componente padre recibe ese evento y ejecuta `comprobarRespuesta(index)`.

También utiliza:

- `v-for`: para recorrer las cuatro respuestas.
- `:class`: para cambiar los estilos según el estado de la respuesta.
- `:disabled`: para desactivar los botones cuando ya se ha contestado.
- `v-if` y `v-else-if`: para mostrar los símbolos de respuesta correcta o incorrecta.

### 5.5. BingoCard.vue

Es el componente encargado de mostrar el cartón del bingo musical.

Recibe mediante `props` el estado de las casillas (`bingoCards`), que permite representar visualmente las respuestas correctas, incorrectas o pendientes.

### 5.6. GameFeedback.vue

Muestra los mensajes de información al jugador después de responder.

Recibe mediante `props`:

- `type`: indica el tipo de mensaje.
- `message`: contiene el texto que se quiere mostrar.

### 5.7. SongPlayer.vue

Es el componente encargado exclusivamente de la reproducción de música mediante Howler.js.

Es un componente hijo de `PlayView.vue`.

Recibe la canción actual mediante `props` y permite controlar su reproducción.

Utiliza `defineExpose()` para permitir que el componente padre pueda llamar a sus funciones:

- `reproducirCancion()`: inicia la reproducción de un fragmento musical.
- `detenerCancion()`: detiene la canción y limpia el temporizador.

También utiliza `defineEmits()` para comunicar al padre cuándo termina la reproducción (`finished`) o si se produce un error (`error`).

De esta manera, `PlayView.vue` no necesita gestionar directamente Howler, ya que esa responsabilidad está separada en `SongPlayer.vue`.

### 5.8. RankingTable.vue

Es el componente encargado de mostrar los resultados guardados en el ranking.

Muestra la información de los jugadores y sus puntuaciones de forma organizada.

## 6. Relación entre componentes padre e hijo

En Vue, un componente padre puede incluir otros componentes dentro de su plantilla. Estos componentes se conocen como hijos.

La información puede pasar del padre al hijo mediante `props`, mientras que el hijo puede comunicar acciones al padre mediante eventos (`emit`).

### Relaciones del proyecto

```text
App.vue
│
├── NavBar.vue
│
└── RouterView
    │
    ├── HomeView.vue
    │   └── PlayerForm.vue
    │
    ├── GameView.vue
    │
    ├── PlayView.vue
    │   ├── MusicCard.vue
    │   ├── BingoCard.vue
    │   ├── GameFeedback.vue
    │   └── SongPlayer.vue
    │
    ├── ResultView.vue
    │
    └── RankingView.vue
        └── RankingTable.vue
```

`RouterView` muestra una de las vistas según la ruta actual, no todas las páginas al mismo tiempo.

### Comunicación entre PlayView y SongPlayer

La comunicación entre estos dos componentes funciona de la siguiente manera:

**Del padre al hijo:**

- `PlayView.vue` envía la canción actual mediante `props`.
- Utiliza `ref` para acceder a las funciones de `SongPlayer.vue`.
- `defineExpose()` permite que el padre pueda ejecutar las funciones `reproducirCancion()` y `detenerCancion()` del hijo.

**Del hijo al padre:**

- `SongPlayer.vue` emite el evento `finished` cuando termina el fragmento musical.
- `PlayView.vue` recibe el evento y ejecuta `iniciarTiempo()`.
- Si ocurre un error al cargar el audio, el hijo emite `error`.

## 7. Gestión de datos con Pinia

Pinia se utiliza para compartir y gestionar información entre diferentes componentes de la aplicación.

En este proyecto se utiliza para guardar los datos principales de la partida, como:

- `playerName`: nombre del jugador.
- `score`: puntuación actual.
- `currentQuestion`: pregunta actual.
- `songs`: canciones seleccionadas para la partida.
- `correctAnswers`: número de respuestas correctas.
- `incorrectAnswers`: número de respuestas incorrectas.

También dispone de funciones para iniciar y reiniciar la partida.

De esta manera, diferentes componentes pueden acceder a los mismos datos sin tener que pasarlos continuamente mediante `props`.

## 8. Navegación con Vue Router

Vue Router permite navegar entre las diferentes vistas de la aplicación sin recargar la página.

Las rutas principales del proyecto son:

| Ruta | Vista | Función |
|---|---|---|
| `/` | HomeView | Página de inicio |
| `/concurso` | GameView | Página del concurso |
| `/play` | PlayView | Desarrollo de la partida |
| `/resultado` | ResultView | Resultado final |
| `/ranking` | RankingView | Clasificación de jugadores |

Para navegar entre páginas se utiliza `useRouter()` y su método `router.push()`.

Por ejemplo:

```javascript
router.push('/play')
```

Este código permite navegar hasta la pantalla de juego.

## 9. Reproducción de audio con Howler.js

Howler.js es una librería de JavaScript que permite reproducir y controlar archivos de audio de una manera sencilla.

En este proyecto, la reproducción se gestiona desde el componente `SongPlayer.vue`, mientras que `PlayView.vue` controla cuándo debe comenzar y detenerse.

Primero se importa la librería:

```javascript
import { Howl } from "howler";
```

Después se crea un objeto `Howl` indicando la ruta del archivo de audio:

```javascript
const sonido = new Howl({
  src: [props.song.file],
  html5: true
});
```

### Métodos principales utilizados

- `play()`: inicia la reproducción del audio.
- `pause()`: pausa la reproducción.
- `stop()`: detiene la reproducción.
- `seek()`: permite indicar desde qué segundo empieza la canción.
- `duration()`: devuelve la duración total del audio.
- `unload()`: libera los recursos del audio.

### Fragmentos aleatorios

El juego reproduce solamente 5 segundos de cada canción.

Para ello:

1. Se obtiene la duración total de la canción con `duration()`.
2. Se calcula un segundo de inicio aleatorio.
3. Se utiliza `seek()` para comenzar desde ese punto.
4. Se reproduce el fragmento durante 5 segundos.
5. Al terminar, se detiene el audio y se emite el evento `finished`.

En el componente `SongPlayer.vue` se intenta evitar los primeros 20 segundos y los últimos 30 segundos de cada canción.

Si la canción no tiene suficiente duración para cumplir estas condiciones, se utiliza el segundo 0 como alternativa.

## 10. Temporizadores

El juego utiliza temporizadores de JavaScript para controlar la reproducción y el tiempo disponible para responder.

- `setTimeout()`: ejecuta una acción después de un tiempo determinado. Se utiliza en `SongPlayer.vue` para detener el fragmento musical después de 5 segundos.
- `setInterval()`: ejecuta una acción repetidamente cada cierto tiempo. Se utiliza en `PlayView.vue` para la cuenta atrás de 10 segundos.
- `clearTimeout()`: cancela un temporizador creado con `setTimeout()`.
- `clearInterval()`: cancela un temporizador creado con `setInterval()`.

Los temporizadores se limpian cuando el jugador responde, cambia de pregunta o abandona la partida, para evitar que sigan ejecutándose innecesariamente.

## 11. Funcionamiento del juego

El funcionamiento general del juego es el siguiente:

1. El jugador entra en la página principal.
2. Introduce su nombre.
3. Comienza una partida con 10 canciones seleccionadas aleatoriamente.
4. `PlayView.vue` envía la canción actual a `SongPlayer.vue`.
5. `SongPlayer.vue` reproduce un fragmento de 5 segundos.
6. Cuando termina la música, comienza una cuenta atrás de 10 segundos.
7. El jugador selecciona una de las cuatro respuestas posibles.
8. Si responde correctamente, obtiene 10 puntos.
9. Si responde incorrectamente, pierde 5 puntos.
10. Si se agota el tiempo, obtiene 0 puntos en esa pregunta.
11. Se actualiza el cartón del bingo según el resultado.
12. Al finalizar las 10 preguntas, se muestra el resultado y se guarda la puntuación en el ranking.

## 12. Ranking con LocalStorage

El ranking permite guardar las puntuaciones de los jugadores en el navegador.

Se utiliza `localStorage`, que permite almacenar información aunque se cierre o actualice la página.

Los resultados se guardan con la clave `ranking`.

Se utilizan los siguientes métodos:

- `localStorage.getItem()`: obtiene los datos guardados.
- `localStorage.setItem()`: guarda los datos.
- `JSON.parse()`: convierte los datos JSON en un objeto JavaScript.
- `JSON.stringify()`: convierte un objeto JavaScript en texto JSON.

El ranking se ordena de mayor a menor puntuación y se conservan los 10 mejores resultados.

## 13. Objetivo del proyecto

El objetivo de Bingo Musical es desarrollar una aplicación web interactiva utilizando Vue 3 y diferentes herramientas de JavaScript.

A través de este proyecto se trabajan conceptos como:

- Creación y reutilización de componentes.
- Comunicación entre componentes mediante `props` y `emit`.
- Referencias a componentes mediante `ref` y `defineExpose`.
- Gestión de datos compartidos con Pinia.
- Navegación entre páginas con Vue Router.
- Reproducción y control de audio con Howler.js.
- Uso de temporizadores.
- Manipulación de arrays y objetos.
- Almacenamiento de información con LocalStorage.

El proyecto permite aplicar los conocimientos aprendidos durante el curso en una aplicación práctica.
