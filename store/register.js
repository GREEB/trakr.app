export const state = () => ({
  game: {}
})

export const mutations = {
  game (state, sel) {
    state.game = sel
  }
}
