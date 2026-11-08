<template>
  <div class="feedback" :class="type">
    <p>{{ message }}</p>
  </div>
</template>
<script setup>
defineProps({
  type: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.feedback {
  padding: 15px;
  margin: 20px auto;
  border-radius: 12px;
  text-align: center;
  font-weight: bold;
}

.feedback.correct {
  background: rgba(22, 163, 74, 0.2);
  border: 1px solid #16a34a;
  color: #4ade80;
}

.feedback.incorrect {
  background: rgba(220, 38, 38, 0.2);
  border: 1px solid #dc2626;
  color: #f87171;
}

.feedback.timeout {
  background: rgba(156, 163, 175, 0.2);
  border: 1px solid #9ca3af;
  color: #d1d5db;
}
</style>
