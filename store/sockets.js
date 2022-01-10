export const state = () => ({
  count: 0,
  game: 0
})

export const mutations = {
  increment (state) {
    state.count++
  },
  set (state, number) {
    state.count = state
  },
  game (state, sel) {
    state.game = sel
  }
}
