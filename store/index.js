export const getters = {
  isAuthenticated (state) {
    return state.auth.loggedIn // auth object as default will be added in vuex state, when you initialize nuxt auth
  },
  getUserInfo (state) {
    return state.auth.user
  }
}

export const state = () => ({
  chord: {},
  chordPack: [],
  sio: {
    connected: null
  },
  udp: {
    register: null,
    connected: null,
    game: null
  }
})

export const mutations = {
  // Socket.io connect
  SET_CONNECT (state) {
    state.connected = true
  },
  // Socket.io disconnect
  SET_DISCONNECT (state) {
    state.connected = false
  },
  // Socket.io sending chord pack
  SET_CHORDPACK (state, msg) {
    state.chordPack = msg
  },
  // Socket.io sending UDP register
  SET_UDPREGISTER (state, msg) {
    state.udp.register = msg
  },
  // Socket.io sending UDP disconnect just use udpconnect with false?
  SET_UDPDISCONNECT (state) {
    state.udp.connected = true
  },
  // Socket.io sending UDP connect
  SET_UDPCONNECT (state, msg) {
    state.udp.game = msg
    state.udp.connected = true
    if (msg) {
      state.udpGame = msg
    }
  }
}

export const actions = {

  CONNECT ({ commit }) {
    commit('SET_CONNECT')
  },
  DISCONNECT ({ commit }) {
    commit('SET_DISCONNECT')
  },
  FORMAT_CHORDPACK ({ commit }, msg) {
    commit('SET_CHORDPACK', msg)
  },
  UDPDISCONNECT ({ commit }) {
    commit('SET_UDPDISCONNECT')
  },
  UDPCONNECT ({ commit }, msg) {
    commit('SET_UDPCONNECT', msg)
  },
  UDPREGISTER ({ commit }, msg) {
    commit('SET_UDPREGISTER', msg)
  }

}

// function toBuffer (ab) {
//   const buf = Buffer.alloc(ab.byteLength)
//   const view = new Uint8Array(ab)
//   for (let i = 0; i < buf.length; ++i) {
//     buf[i] = view[i]
//   }
//   return buf
// }
