<template>
  <div class="app-layout">
    <NavBar />

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  background-color: #090514;
  color: #ffffff;
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  overflow-x: hidden;
}

#app {
  width: 100%;
  min-height: 100vh;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background: radial-gradient(circle at 50% 30%, #1a0b2e 0%, #090514 100%);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>