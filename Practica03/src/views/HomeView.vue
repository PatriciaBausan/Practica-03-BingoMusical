<script setup>
import { RouterLink } from "vue-router";
import { useGameStore } from "../stores/game";

const game = useGameStore();
</script>

<template>
  <section class="home">
    <div class="home-content">
      <div class="music-icon">🎧</div>

      <h1>Bingo Musical</h1>

      <h2>¿Cuánto sabes de música?</h2>

      <p class="subtitle">
        Pon a prueba tu oído musical, escucha canciones y demuestra que eres capaz de reconocerlas.
        ¡Completa tu cartón y consigue la máxima puntuación!
      </p>

      <div class="buttons">
        <RouterLink to="/concurso" class="play" @click="game.reset()">
          ¡Comenzar a jugar!
        </RouterLink>

        <RouterLink to="/ranking" class="ranking"> Ver ranking </RouterLink>
      </div>
    </div>

    <div class="home-image">
      <img src="/images/Fondo.jpg" alt="Bingo Musical" />
    </div>
  </section>
</template>

<style scoped>

.home {
  width: 100%;
  min-height: 75vh;
  box-sizing: border-box;
  padding: 3rem 7%;

  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 3rem;

  color: white;
  background: linear-gradient(135deg, #090914, #17102c, #090914);
}

.home-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
}

.music-icon {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 3.5rem;
  background: linear-gradient(135deg, #9333ea, #2563eb);
  box-shadow: 0 0 35px rgba(168, 85, 247, 0.5);
}

.home h1 {
  font-size: 3.5rem;
  font-weight: 800;
  color: #c084fc;
  text-shadow: 0 0 15px #a855f7;
  margin: 0;
}

.home h2 {
  font-size: 1.8rem;
  color: #93c5fd;
  margin: 0;
}

.subtitle {
  max-width: 580px;
  color: #c4b5fd;
  font-size: 1.1rem;
  line-height: 1.7;
}

.buttons {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.play,
.ranking {
  padding: 1rem 2rem;
  border-radius: 14px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  color: white;
  transition: all 0.25s ease;
}

.play {
  background: linear-gradient(90deg, #9333ea, #2563eb);
  box-shadow: 0 0 15px rgba(147, 51, 234, 0.4);
}

.ranking {
  background: #171627;
  border: 1px solid #a855f7;
}

.play:hover,
.ranking:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 25px #a855f7;
}

.home-image {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-image img {
  width: 100%;
  max-width: 550px;
  height: 430px;
  object-fit: cover;
  border-radius: 25px;
  border: 1px solid rgba(168, 85, 247, 0.6);
  box-shadow: 0 0 30px rgba(168, 85, 247, 0.25);
  transition: all 0.3s ease;
}

.home-image img:hover {
  transform: scale(1.02);
  box-shadow: 0 0 40px rgba(168, 85, 247, 0.45);
}

@media (max-width: 800px) {
  .home {
    grid-template-columns: 1fr;
    padding: 2rem 5%;
    gap: 2rem;
  }

  .home-content {
    align-items: center;
    text-align: center;
  }

  .home h1 {
    font-size: 2.5rem;
  }

  .home h2 {
    font-size: 1.4rem;
  }

  .home-image img {
    height: 250px;
  }

  .buttons {
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .buttons {
    flex-direction: column;
    width: 100%;
  }

  .play,
  .ranking {
    width: 80%;
    text-align: center;
  }

  .music-icon {
    width: 80px;
    height: 80px;
    font-size: 2.8rem;
  }
}

</style>
