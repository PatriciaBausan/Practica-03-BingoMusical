<template>
  <div class="song-player"></div>
</template>

<script setup>
import { Howl } from "howler";

const props = defineProps({
  song: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["finished", "error"]);

let audio = null;
let stopTimer = null;

function reproducirCancion() {
  detenerCancion();

  if (!props.song) return;

  const sonido = new Howl({
    src: [props.song.file],
    html5: true,

    onload: () => {
      const duracion = sonido.duration();

      const inicioMinimo = 20;
      const inicioMaximo = Math.max(0, duracion - 30 - 5);

      let inicio = 0;

      if (inicioMaximo > inicioMinimo) {
        inicio = inicioMinimo + Math.random() * (inicioMaximo - inicioMinimo);
      }

      const id = sonido.play();

      sonido.seek(inicio, id);

      stopTimer = setTimeout(() => {
        if (audio === sonido) {
          sonido.stop(id);
          audio = null;
          sonido.unload();
        }

        stopTimer = null;
        emit("finished");
      }, 5000);
    },

    onloaderror: () => {
      emit("error");
    },
  });

  audio = sonido;
}

function detenerCancion() {
  if (stopTimer) {
    clearTimeout(stopTimer);
    stopTimer = null;
  }

  if (audio) {
    audio.stop();
    audio.unload();
    audio = null;
  }
}

defineExpose({
  reproducirCancion,
  detenerCancion,
});
</script>

<style scoped>
.song-player {
  display: none;
}
</style>
