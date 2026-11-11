
<template>
  <section class="ranking-page">
    <h1>🏆 Ranking Musical</h1>

    <p class="subtitle">
      Los 10 mejores jugadores de Bingo Musical.
    </p>

    <RankingTable
      v-if="ranking.length > 0"
      :ranking="ranking"
    />

    <p v-else class="empty">
      Todavía no hay jugadores en el ranking. ¡Sé el primero!
    </p>

    <RouterLink to="/" class="home-link">
      Volver al inicio
    </RouterLink>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import RankingTable from '../components/RankingTable.vue'

const ranking = ref([])

onMounted(() => {
  const datosGuardados = localStorage.getItem('ranking')

  if (datosGuardados) {
    ranking.value = JSON.parse(datosGuardados)
  }
})
</script>

<style scoped>
.ranking-page {
  width: 95%;
  max-width: 1000px;
  margin: 40px auto;
  text-align: center;
}

.ranking-page h1 {
  color: #c084fc;
  text-shadow: 0 0 15px #a855f7;
}

.subtitle {
  color: #d1d5db;
  margin-bottom: 30px;
}

.empty {
  color: #d1d5db;
  margin: 40px;
}

.home-link {
  display: inline-block;
  margin-top: 25px;
  padding: 12px 25px;
  background: #a855f7;
  border-radius: 10px;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.home-link:hover {
  background: #7e22ce;
  box-shadow: 0 0 15px #a855f7;
}
</style>
