<template>
  <nav class="navbar">
    <div class="logo">
      <span class="logo-dot"></span>
      Bingo Musical
    </div>
    <div class="links">
      <RouterLink to="/">Inicio</RouterLink>
      <RouterLink to="/concurso">Concurso</RouterLink>
      <RouterLink to="/ranking">Ranking</RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.navbar {
  position: relative;
  z-index: 20;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.25rem 5%;
  box-sizing: border-box;
  background: transparent;
border-bottom: 2px solid #ffffff; 
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 700;
  font-size: 1.5rem;
  color: #ffffff;
}

.logo-dot {
  width: 20px;
  height: 20px;
  background: #00f2fe;
  border-radius: 50%;
  box-shadow: 0 0 10px #00f2fe, 0 0 20px #00f2fe;
}

.links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.links a {
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 0.9rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.links a:hover {
  color: #ffffff;
  text-decoration: underline;
  text-decoration-thickness: 2px;       
  text-underline-offset: 5px;            
}

@media (max-width: 600px) {
  .navbar {
    padding: 1rem 5%;
  }
  .links {
    gap: 0.5rem;
  }
  .links a {
    font-size: 0.85rem;
    padding: 0.4rem 0.6rem;
  }
}
</style>
