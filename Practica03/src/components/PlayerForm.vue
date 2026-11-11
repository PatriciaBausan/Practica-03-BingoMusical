<script setup>
import { ref } from 'vue'

const name = ref('')

const emit = defineEmits(['iniciar'])

function iniciarJuego() {
  emit('iniciar', name.value)
}
</script>

<template>
  <form class="player-form" @submit.prevent="iniciarJuego">

    <label for="name">¿Cómo te llamas?</label>

    <input
      id="name"
      v-model="name"
      maxlength="20"
      placeholder="Tu nombre"
      required
    />

    <button type="submit" class="play">
      ¡Jugar!
    </button>

  </form>
</template>

<style scoped>

.player-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  max-width: 420px;
  margin-top: 0.5rem;
  z-index: 1;
}

.player-form label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #e9d5ff;
}

.player-form input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.95rem 1.25rem;
  font-size: 1.1rem;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(168, 85, 247, 0.7);
  border-radius: 12px;
  backdrop-filter: blur(12px);
  outline: none;
  transition: all 0.25s ease;
  box-shadow: 0 0 15px rgba(147, 51, 234, 0.1);
}

.player-form input::placeholder {
  color: rgba(233, 213, 255, 0.4);
}

.player-form input:focus {
  border-color: #00f2fe;
  box-shadow: 0 0 20px rgba(0, 242, 254, 0.35);
  background: rgba(255, 255, 255, 0.1);
}

.play {
  padding: 1rem 3rem;
  font-size: 1.3rem;
  font-weight: 800;
  color: #ffffff;
  background: linear-gradient(90deg, #9333ea, #2563eb);
  border-radius: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 0 15px rgba(147, 51, 234, 0.4);
  margin-top: 0.5rem;
}

.play:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px #a855f7;
}

@media (max-width: 600px) {
  .player-form {
    max-width: 100%;
  }

  .play {
    width: 100%;
    padding: 1rem;
    font-size: 1.1rem;
  }
}

</style>
