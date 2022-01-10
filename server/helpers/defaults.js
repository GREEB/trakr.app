import path from 'path'

const dirname = path.resolve()
export { path, dirname }

export const age = obj => ((Date.now() - obj.lastSeen) / 1000)
