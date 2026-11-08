
<script setup>
defineProps(['ranking'])
</script>

<template>
  <div class="ranking-card">
    <table>
      <thead>
        <tr>
          <th>Posición</th>
          <th>Jugador</th>
          <th>Puntos</th>
          <th>Aciertos</th>
          <th>Fecha</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(jugador, index) in ranking"
          :key="index"
        >
          <td>
            <span v-if="index === 0">👑</span>
            <span v-else-if="index === 1">🥈</span>
            <span v-else-if="index === 2">🥉</span>
            <span v-else>{{ index + 1 }}</span>
          </td>

          <td>{{ jugador.name }}</td>
          <td>{{ jugador.score }}</td>
          <td>{{ jugador.percentage }}%</td>
          <td>{{ jugador.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.ranking-card {
  overflow-x: auto;
  background: #171627;
  border: 1px solid #a855f7;
  border-radius: 15px;
  padding: 15px;
}

table {
  width: 100%;
  border-collapse: collapse;
  color: white;
}

th,
td {
  padding: 15px 10px;
  border-bottom: 1px solid #39304d;
}

th {
  color: #c084fc;
}

tbody tr:hover {
  background: rgba(168, 85, 247, 0.15);
}
</style>
