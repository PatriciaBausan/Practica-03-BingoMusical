
<script setup>
import { Howl } from 'howler'

const props = defineProps(['song'])

const emit = defineEmits(['finished', 'error'])

let audio = null
let stopTimer = null

function reproducirCancion() {
  detenerCancion()

  if (!props.song) return

  audio = new Howl({
    src: [props.song.file],
    html5: true,

    onload: () => {
      const duracion = audio.duration()

      const inicioMinimo = 20
      const inicioMaximo = Math.max(0, duracion - 30 - 5)

      const inicio =
        inicioMaximo > inicioMinimo
          ? inicioMinimo + Math.random() * (inicioMaximo - inicioMinimo)
          : 0

      const id = audio.play()

      audio.seek(inicio, id)

      stopTimer = setTimeout(() => {
        if (audio) {
          audio.stop(id)
        }

        stopTimer = null
        emit('finished')
      }, 5000)
    },

    onloaderror: () => {
      emit('error')
    }
  })
}

function detenerCancion() {
  if (stopTimer) {
    clearTimeout(stopTimer)
    stopTimer = null
  }

  if (audio) {
    audio.stop()
    audio.unload()
    audio = null
  }
}

defineExpose({
  reproducirCancion,
  detenerCancion
})
</script>

<template>
  <div class="song-player">
    <p>Escucha atentamente el fragmento musical.</p>
  </div>
</template>

<style scoped>
.song-player {
  text-align: center;
  color: #d1d5db;
  margin: 15px 0;
}
</style>
