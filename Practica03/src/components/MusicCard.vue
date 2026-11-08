
<template>
  <section class="music-card">

    <div class="question-header">
      <span>PREGUNTA {{ questionNumber }} DE 10</span>
    </div>

    <h2>{{ song.question }}</h2>

    <p class="instruction">
      Escucha la canción y selecciona la respuesta correcta.
    </p>

    <div class="answers">
      <button
        v-for="(answer, index) in song.answers"
        :key="index"
        class="answer"
        :class="[
          estadoRespuesta(index),
          { selected: selectedAnswer === index && !answered }
        ]"
        :disabled="answered"
        @click="seleccionarRespuesta(index)"
      >
        <span class="letter">
          {{ String.fromCharCode(65 + index) }}
        </span>

        <span class="answer-text">
          {{ answer }}
        </span>

        <span v-if="answered && index === song.correct">
          ✓
        </span>

        <span v-else-if="answered && index === selectedAnswer">
          ✕
        </span>
      </button>
    </div>

  </section>
</template>

<script setup>

// Recibimos los datos del componente padre
const props = defineProps({
  song: {
    type: Object,
    required: true
  },

  questionNumber: {
    type: Number,
    required: true
  },

  selectedAnswer: {
    type: Number,
    default: null
  },

  answered: {
    type: Boolean,
    default: false
  }
})

// Creamos el evento para enviar la respuesta al padre
const emit = defineEmits(['select-answer'])

// Enviamos la respuesta seleccionada
function seleccionarRespuesta(index) {
  if (props.answered) {
    return
  }

  emit('select-answer', index)
}

// Comprobamos qué color debe tener cada respuesta
function estadoRespuesta(index) {

  if (!props.answered) {
    return ''
  }

  if (index === props.song.correct) {
    return 'correct'
  }

  if (index === props.selectedAnswer) {
    return 'incorrect'
  }

  return ''
}

</script>

<style scoped>


.music-card {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 2rem;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(168, 85, 247, 0.6);
  border-radius: 20px;
  backdrop-filter: blur(12px);
  box-shadow: 0 0 25px rgba(147, 51, 234, 0.15);
  color: white;
}

.question-header {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.question-header span {
  color: #00f2fe;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 2px;
}

.music-card h2 {
  color: #c084fc;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 0.5rem;
}

.instruction {
  color: #c4b5fd;
  text-align: center;
  margin-bottom: 2rem;
}

/* RESPUESTAS UNA DEBAJO DE OTRA */
.answers {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
}

.answer {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(168, 85, 247, 0.4);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
}

.answer:hover:not(:disabled) {
  background: rgba(168, 85, 247, 0.2);
  border-color: #a855f7;
  transform: translateY(-3px);
}

.letter {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 30px;
  background: rgba(168, 85, 247, 0.2);
  border-radius: 8px;
  color: #c084fc;
  font-weight: 800;
}

.answer.selected {
  border-color: #00f2fe;
  background: rgba(0, 242, 254, 0.12);
}

.answer.correct {
  background: rgba(34, 197, 94, 0.2);
  border-color: #22c55e;
  color: #86efac;
}

.answer.incorrect {
  background: rgba(239, 68, 68, 0.2);
  border-color: #ef4444;
  color: #fca5a5;
}

.answer:disabled {
  cursor: default;
}

@media (max-width: 600px) {
  .music-card {
    padding: 1.2rem;
  }

  .music-card h2 {
    font-size: 1.5rem;
  }
}

</style>
