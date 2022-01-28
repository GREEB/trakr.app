export const state = () => ({
  game: 0
})

export const mutations = {
  game (state, sel) {
    state.game = sel
  }
}
