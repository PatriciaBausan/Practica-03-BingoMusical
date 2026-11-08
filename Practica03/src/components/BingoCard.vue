
<script setup>
defineProps(['bingoCards'])
</script>

<template>
  <div class="bingoCard">
    <h2>Mi cartón</h2>
    <p class="subtitle">BINGO MUSICAL</p>

    <div class="bingo-grid">
      <div
        v-for="(estado, index) in bingoCards"
        :key="index"
        class="bingo-cell"
        :class="estado"
      >
        {{ index + 1 }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.bingoCard {
  width: 100%;
  max-width: none;
  min-height: 550px;
  height: 100%;
  background: linear-gradient(145deg, #211638, #111020);
  border: 1px solid #a855f7;
  border-radius: 20px;
  padding: 45px;
  box-sizing: border-box;
  text-align: center;
  box-shadow: 0 0 25px rgba(168, 85, 247, 0.2);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.bingoCard h2 {
  color: #c084fc;
  font-size: 2rem;
  margin: 0;
  text-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
}

.subtitle {
  color: #a5b4fc;
  font-size: 0.9rem;
  letter-spacing: 4px;
  margin: 12px 0 35px;
}

.bingo-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 25px;
  justify-items: center;
  align-items: center;
}

.bingo-cell {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(145deg, #e9d5ff, #c4b5fd);
  color: #32145b;
  font-size: 1.6rem;
  font-weight: 900;
  border: 3px solid #a855f7;
  box-sizing: border-box;
  box-shadow:
    inset -3px -3px 6px rgba(0, 0, 0, 0.15),
    0 3px 10px rgba(168, 85, 247, 0.2);
  transition: all 0.3s ease;
}

/* Respuesta correcta */
.bingo-cell.correct {
  background: linear-gradient(145deg, #4ade80, #16a34a);
  color: white;
  border-color: #86efac;
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.5);
}

/* Respuesta incorrecta */
.bingo-cell.incorrect {
  background: linear-gradient(145deg, #f87171, #dc2626);
  color: white;
  border-color: #fca5a5;
  box-shadow: 0 0 15px rgba(220, 38, 38, 0.4);
}

/* Adaptación a móviles */
@media (max-width: 600px) {
  .bingoCard {
    min-height: 400px;
    padding: 20px;
  }

  .bingo-grid {
    gap: 12px;
  }

  .bingo-cell {
    width: 48px;
    height: 48px;
    font-size: 1.1rem;
  }
}
</style>
