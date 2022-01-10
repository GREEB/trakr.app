export const state = () => ({
  count: 0
})

export const mutations = {
  increment (state) {
    state.count++
  },
  set (state, number) {
    state.count = state
  }
}
