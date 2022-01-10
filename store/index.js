import { unpack } from 'msgpackr'

export const getters = {
  isAuthenticated (state) {
    return state.auth.loggedIn // auth object as default will be added in vuex state, when you initialize nuxt auth
  },
  getUserInfo (state) {
    return state.auth.user
  }
}

export const state = () => ({
  connected: false,
  udpNew: false,
  game: '',
  chord: {},
  chordPack: []
})

export const mutations = {
  SET_CONNECT (state) {
    state.connected = true
  },
  SET_DISCONNECT (state) {
    state.connected = false
  },
  SET_UDPREGISTER (state) {
    state.udpNew = true
  },
  SET_GAME (state, sel) {
    state.game = sel
  },
  SET_CHORDPACK (state, msg) {
    state.chordPack = msg
  }
}

export const actions = {
  FORMAT_CHORDPACK ({ commit }, msg) {
    const buffer = unpack(toBuffer(msg))
    commit('SET_CHORDPACK', buffer)
  },
  CONNECT ({ commit }) {
    commit('SET_CONNECT')
  },
  DISCONNECT ({ commit }) {
    commit('SET_DISCONNECT')
  },
  UDPREGISTER ({ commit }, msg) {
    commit('SET_UDPREGISTER')
  },
  UDPSETGAME ({ commit }, msg) {
    commit('SET_GAME', msg)
  }
}

function toBuffer (ab) {
  const buf = Buffer.alloc(ab.byteLength)
  const view = new Uint8Array(ab)
  for (let i = 0; i < buf.length; ++i) {
    buf[i] = view[i]
  }
  return buf
}
