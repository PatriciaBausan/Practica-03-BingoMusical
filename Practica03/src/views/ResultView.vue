
<template>
  <section class="result">
    <h1>Partida terminada</h1>

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

<script setup>
import { RouterLink } from 'vue-router'
import { useGameStore } from '../stores/game'

const game = useGameStore()

const porcentaje = game.correctAnswers * 10

function mensajeFinal() {
  if (porcentaje === 100) {
    return 'ENHORABUENA! Has acertado todas las canciones'
  } else if (porcentaje >= 70) {
    return 'MUY BIEN! Tienes una gran base musical sobre estas canciones'
  } else if (porcentaje >= 40) {
    return 'BUEN INTENTO! Sigue practicando, para poder acertar todas las canciones'
  } else {
    return 'UPSS, LA PRÓXIMA IRÁ MEJOR! vuelve a intentarlo'
  }
}
</script>

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
  color: white;
  background: linear-gradient(90deg, #9333ea, #2563eb);
  box-shadow: 0 0 15px rgba(147, 51, 234, 0.4);
  transition: all 0.25s ease;
}

.play:hover,
.ranking:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 25px #a855f7;
}
</style>
