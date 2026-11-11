
<script setup>
import { useGameStore } from '../stores/game'
import PlayerForm from '../components/PlayerForm.vue'
import { useRouter } from 'vue-router'

const game = useGameStore()
const router = useRouter()

function comenzarJuego(nombre) {
  game.startGame(nombre)
  router.push('/play')
}
</script>

<template>
  <section class="home">
    <h1>Bingo Musical</h1>

    <p class="subtitle">
      Escucha 5 segundos de una canción y adivina cuál es. ¡Completa tu cartón!
    </p>

    <div class="rules">
      <h2>Cómo se juega</h2>

      <ul>
        <li>Cada partida tiene <strong>10 canciones</strong> elegidas aleatoriamente.</li>
        <li>Suena un fragmento de <strong>5 segundos</strong> y tienes 4 respuestas.</li>
        <li>Acierto: <strong>+10 puntos</strong> y casilla verde en tu cartón.</li>
        <li>Fallo: <strong>−5 puntos</strong> y casilla roja.</li>
        <li>Si no contestas a tiempo: <strong>0 puntos</strong> y casilla gris.</li>
        <li>Completa una fila para cantar <strong>¡LÍNEA!</strong> o las 10 para <strong>¡BINGO!</strong></li>
        <li>Los 10 mejores jugadores entran en el ranking.</li>
      </ul>
    </div>

    <div class="player-card">
      <h2>¡Prepárate para jugar!</h2>

      <p class="description">
        Escribe tu nombre para poderte unir a este bingo musical.
      </p>

      <PlayerForm @iniciar="comenzarJuego" />
    </div>

  </section>
</template>

<style scoped>

.home {
  position: relative;
  width: 100%;
  flex: 1;
  background: linear-gradient(135deg, #090914, #17102c, #090914);
  color: #fff;
  padding: 2.5rem 5%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto 1fr;
  align-content: stretch;
  align-items: stretch;
  gap: 1.25rem 3rem;
  text-align: left;
  overflow: hidden;
}

.home::before {
  content: "";
  position: absolute;
  width: 500px;
  height: 500px;
  background: #9333ea;
  filter: blur(180px);
  opacity: 0.18;
  top: 10%;
  left: 10%;
  pointer-events: none;
}

.home h1 {
  grid-column: 1 / -1;
  font-size: 3.2rem;
  font-weight: 800;
  color: #c084fc;
  text-shadow: 0 0 10px #a855f7, 0 0 25px #7e22ce;
  margin: 0;
  z-index: 1;
}

.subtitle {
  grid-column: 1 / -1;
  font-size: 1.15rem;
  color: #c4b5fd;
  line-height: 1.6;
  max-width: 580px;
  z-index: 1;
  margin: 0;
}

.rules,
.player-card {
  width: 100%;
  height: 100%;
  min-height: 350px;
  box-sizing: border-box;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(168, 85, 247, 0.7);
  border-radius: 18px;
  backdrop-filter: blur(12px);
  box-shadow: 0 0 25px rgba(147, 51, 234, 0.15);
  z-index: 1;
}

.rules {
  grid-column: 1;
  grid-row: 3;
  margin-bottom: 0;
}

.rules h2 {
  margin-top: 0;
  margin-bottom: 0.8rem;
  text-align: left;
  color: #c084fc;
  font-size: 1.4rem;
}

.rules ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.8rem;
}

.rules li {
  color: #e9d5ff;
  line-height: 1.5;
  font-size: 0.95rem;
}

.rules strong {
  color: #2e7ddf;
}

.player-card {
  grid-column: 2;
  grid-row: 3;
}

.player-card h2 {
  color: #c084fc;
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 0.8rem;
}

.description {
  color: #c4b5fd;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.play {
  padding: 1rem 3rem;
  font-size: 1.3rem;
  font-weight: 800;
  color: #fff;
  background: linear-gradient(90deg, #9333ea, #2563eb);
  border-radius: 14px;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 0 15px rgba(147, 51, 234, 0.4);
  z-index: 1;
  cursor: pointer;
}

.play:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px #a855f7;
}
@media (max-width: 700px) {
  .home {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 1.5rem 5%;
  }

  .home h1 {
    font-size: 2.3rem;
  }

  .rules,
  .player-card {
    width: 100%;
    height: auto;
    min-height: 350px;
    padding: 1.5rem;
  }
}
</style>
