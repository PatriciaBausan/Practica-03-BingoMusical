
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    playerName: '',
    score: 0,
    songs: [],
    currentQuestion: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    finished: false
  }),

  actions: {
    startGame(name) {
      this.playerName = name
      this.score = 0
      this.songs = []
      this.currentQuestion = 0
      this.correctAnswers = 0
      this.incorrectAnswers = 0
      this.finished = false
    },

    reset() {
      this.playerName = ''
      this.score = 0
      this.songs = []
      this.currentQuestion = 0
      this.correctAnswers = 0
      this.incorrectAnswers = 0
      this.finished = false
    }
  }
})
