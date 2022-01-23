import path from 'path'

const dirname = path.resolve()

const age = (obj) => {
  if (obj.udp.lastSeen === null) {
    return 20
  } else {
    return (Date.now() - obj.udp.lastSeen) / 1000
  }
}
export { path, dirname, age }
