
<script setup>
import { RouterLink } from 'vue-router'
import { useGameStore } from '../stores/game'

const game = useGameStore()

const porcentaje = game.correctAnswers * 10

function mensajeFinal() {
  if (porcentaje === 100) {
    return '¡Increíble! ¡Has conseguido todas las respuestas!'
  } else if (porcentaje >= 70) {
    return '¡Muy bien! Tienes un gran oído musical.'
  } else if (porcentaje >= 40) {
    return '¡Buen intento! Sigue practicando.'
  } else {
    return '¡No te rindas! La próxima partida será mejor.'
  }
}
</script>

<template>
  <section class="result">
    <h1>¡Partida terminada!</h1>

    <p class="subtitle">
      {{ mensajeFinal() }}
    </p>

    <div class="result-card">
      <h2>{{ game.playerName }}</h2>

      <div class="score">
        {{ game.score }} puntos
      </div>

      <div class="statistics">
        <p>Respuestas correctas: {{ game.correctAnswers }} de 10</p>
        <p>Respuestas incorrectas: {{ game.incorrectAnswers }}</p>
        <p>Porcentaje de aciertos: {{ porcentaje }}%</p>
      </div>
    </div>

    <div class="actions">
      <RouterLink to="/concurso" class="play">
        Volver a jugar
      </RouterLink>

      <RouterLink to="/ranking" class="ranking">
        Ver ranking
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.result {
  width: 90%;
  max-width: 650px;
  margin: 50px auto;
  text-align: center;
}

.result h1 {
  color: #c084fc;
  text-shadow: 0 0 15px #a855f7;
}

.subtitle {
  color: #d1d5db;
}

.result-card {
  margin: 30px 0;
  padding: 30px;
  background: #171627;
  border: 1px solid #a855f7;
  border-radius: 18px;
}

.result-card h2 {
  color: #c084fc;
}

.score {
  font-size: 35px;
  font-weight: bold;
  color: #4ade80;
  margin: 20px;
}

.statistics p {
  color: white;
  margin: 12px;
}

.actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
}

.play,
.ranking {
  padding: 12px 25px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: bold;
}

.play {
  background: #a855f7;
  color: white;
}

.ranking {
  background: #2563eb;
  color: white;
}
</style>
