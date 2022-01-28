export const state = () => ({
  join: null,
  leave: null,
  home: null
})

export const mutations = {
  join (state, sel) {
    state.join = sel
  },
  leave (state, sel) {
    state.leave = sel
  },
  home (state, sel) {
    state.home = sel
  }
}
