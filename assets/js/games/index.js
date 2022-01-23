// Every game has to be imported here as well so we can get this file to get all or specific
import fh5 from './fh5'
import fh4 from './fh4'

const games = { ...fh5, ...fh4 } // reducing so we have an object with keys of ids to port - 1024 will get gameID

export { games }
