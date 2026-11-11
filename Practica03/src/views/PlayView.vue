
<template>
  <section class="play">

    <div class="playerInfo">
      <h2>¡Vamos a jugar, {{ game.playerName }}!</h2>

      <div class="player-stats">
        <p>Puntos: {{ game.score }}</p>
        <p>Pregunta {{ game.currentQuestion + 1 }} de 10</p>
        <p v-if="!answered && !finished">
          Tiempo: {{ tiempoRestante }} segundos
        </p>
      </div>
    </div>

    <div class="bingo-container">
      <BingoCard :bingo-cards="bingoCards" />
    </div>

    <div class="game-container">
      <MusicCard
        v-if="game.songs.length > 0 && !finished"
        :song="game.songs[game.currentQuestion]"
        :question-number="game.currentQuestion + 1"
        :selected-answer="selectedAnswer"
        :answered="answered"
        @select-answer="comprobarRespuesta"
      />
    </div>

    <div class="feedback-container">
      <GameFeedback
        v-if="feedbackMessage"
        :type="feedbackType"
        :message="feedbackMessage"
      />

      <button
        v-if="answered && !finished"
        class="nextButton"
        @click="siguientePregunta"
      >
        {{ game.currentQuestion === 9 ? 'Ver resultado' : 'Siguiente pregunta' }}
      </button>
    </div>

  </section>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { Howl } from 'howler'

import MusicCard from '../components/MusicCard.vue'
import BingoCard from '../components/BingoCard.vue'
import GameFeedback from '../components/GameFeedback.vue'

import { songs } from '../data/songs'
import { useGameStore } from '../stores/game'

const game = useGameStore()
const router = useRouter()

const selectedAnswer = ref(null)
const answered = ref(false)
const finished = ref(false)

const feedbackMessage = ref('')
const feedbackType = ref('')

const tiempoRestante = ref(10)

const bingoCards = ref([])

let audio = null
let stopTimer = null
let countdownTimer = null


onMounted(() => {
  const cancionesMezcladas = [...songs]

  cancionesMezcladas.sort(() => Math.random() - 0.5)

  game.songs = cancionesMezcladas.slice(0, 10)

  bingoCards.value = Array(10).fill('pending')

  reproducirCancion()
})


function reproducirCancion() {

  if (audio) {
    audio.stop()
    audio.unload()
    audio = null
  }

  limpiarTemporizadores()

  const cancionActual = game.songs[game.currentQuestion]

  if (!cancionActual) return

  audio = new Howl({
    src: [cancionActual.file],
    html5: true,

    onload: () => {

      const duracion = audio.duration()

      const inicioMinimo = duracion >= 25 ? 20 : Math.max(0, duracion - 5)

      const inicioMaximo = Math.max(inicioMinimo, duracion - 5)

      const inicio =
        inicioMinimo + Math.random() * (inicioMaximo - inicioMinimo)

      const id = audio.play()

      audio.seek(inicio, id)

      stopTimer = setTimeout(() => {

        if (audio) {
          audio.stop(id)
        }

        stopTimer = null

        iniciarTiempo()

      }, 5000)
    },

    onloaderror: () => {
      console.log('Error al cargar la canción:', cancionActual.file)
    }
  })
}


function iniciarTiempo() {

  tiempoRestante.value = 10

  countdownTimer = setInterval(() => {

    tiempoRestante.value--

    if (tiempoRestante.value <= 0) {
      limpiarTemporizadores()
      tiempoAgotado()
    }

  }, 1000)
}

function limpiarTemporizadores() {

  if (stopTimer) {
    clearTimeout(stopTimer)
    stopTimer = null
  }

  if (countdownTimer) {
    clearInterval(countdownTimer)
    countdownTimer = null
  }
}


function comprobarRespuesta(index) {

  if (answered.value || finished.value) return

  limpiarTemporizadores()

  if (audio) {
    audio.stop()
  }

  selectedAnswer.value = index
  answered.value = true

  const cancionActual = game.songs[game.currentQuestion]

  if (index === cancionActual.correct) {

    game.score += 10
    game.correctAnswers++

    bingoCards.value[game.currentQuestion] = 'correct'

    feedbackType.value = 'correct'
    feedbackMessage.value = '¡Correcto! Has conseguido 10 puntos.'

  } else {

    game.score -= 5
    game.incorrectAnswers++

    bingoCards.value[game.currentQuestion] = 'incorrect'

    feedbackType.value = 'incorrect'
    feedbackMessage.value = '¡Vaya! Has fallado. Has perdido 5 puntos.'

  }
}


function tiempoAgotado() {

  if (answered.value || finished.value) return

  answered.value = true

  const cancionActual = game.songs[game.currentQuestion]

  feedbackType.value = 'timeout'
  feedbackMessage.value =
    '¡Se ha acabado el tiempo! La respuesta correcta era: ' +
    cancionActual.answers[cancionActual.correct]
}


function guardarResultado() {

  const porcentaje = game.correctAnswers * 10

  const resultado = {
    name: game.playerName,
    score: game.score,
    correctAnswers: game.correctAnswers,
    incorrectAnswers: game.incorrectAnswers,
    percentage: porcentaje,
    date: new Date().toLocaleDateString()
  }

  let ranking = JSON.parse(localStorage.getItem('ranking')) || []

  ranking.push(resultado)

  ranking.sort((a, b) => {
    return b.score - a.score
  })

  ranking = ranking.slice(0, 10)

  localStorage.setItem('ranking', JSON.stringify(ranking))
}


function siguientePregunta() {

  if (game.currentQuestion === 9) {

    finished.value = true

    limpiarTemporizadores()

    if (audio) {
      audio.stop()
      audio.unload()
      audio = null
    }

    guardarResultado()

    router.push('/resultado')

    return
  }

  game.currentQuestion++

  selectedAnswer.value = null
  answered.value = false

  feedbackMessage.value = ''
  feedbackType.value = ''

  tiempoRestante.value = 10

  reproducirCancion()
}

onBeforeUnmount(() => {

  limpiarTemporizadores()

  if (audio) {
    audio.stop()
    audio.unload()
    audio = null
  }

})
</script>

<style scoped>


.play {
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  padding: 2rem 3%;
  background: linear-gradient(135deg, #090914, #17102c, #090914);

  display: grid;
  grid-template-columns: 55% 45%;
  grid-template-rows: auto 1fr auto;
  gap: 2rem;
  align-items: stretch;
}

.playerInfo {
  grid-column: 1 / -1;
  grid-row: 1;

  width: 100%;
  box-sizing: border-box;
  padding: 1.3rem 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(168, 85, 247, 0.7);
  border-radius: 18px;
  box-shadow: 0 0 20px rgba(147, 51, 234, 0.15);
}

.playerInfo h2 {
  color: #c084fc;
  font-size: 1.6rem;
  margin: 0;
}

.player-stats {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.player-stats p {
  color: #e9d5ff;
  margin: 0;
  font-weight: bold;
}

.bingo-container {
  grid-column: 1;
  grid-row: 2;

  width: 100%;
  min-width: 0;
  display: flex;
  align-items: stretch;
}

.bingo-container :deep(.bingoCard) {
  width: 100%;
  max-width: none;
  min-height: 550px;
}

.game-container {
  grid-column: 2;
  grid-row: 2;

  width: 100%;
  min-width: 0;
  display: flex;
  align-items: stretch;
}

.game-container :deep(.music-card) {
  width: 100%;
  max-width: none;
  margin: 0;
}

.feedback-container {
  grid-column: 1 / -1;
  grid-row: 3;

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.nextButton {
  padding: 12px 25px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(90deg, #9333ea, #2563eb);
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.3);
}

.nextButton:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 20px #a855f7;
}

@media (max-width: 800px) {
  .play {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
    padding: 1.5rem 5%;
    gap: 1.5rem;
  }

  .playerInfo {
    grid-column: 1;
    grid-row: 1;
    flex-direction: column;
    align-items: flex-start;
  }

  .player-stats {
    gap: 0.8rem;
    flex-direction: column;
    align-items: flex-start;
  }

  .bingo-container {
    grid-column: 1;
    grid-row: 2;
  }

  .game-container {
    grid-column: 1;
    grid-row: 3;
  }

  .feedback-container {
    grid-column: 1;
    grid-row: 4;
  }
}

</style>
