/**
 * Forza Horizon 5 Config file
 *
 * For now we build a little object with a parser that the front and backend can use
 * Would be nice if this could be populated by a json file
 *
 */

import { Parser } from 'binary-parser'

// Basic Settings
export default {
  1: { // id helps to have it as obj key so we can port - 1024 to get game id and object
    gameName: 'Forza Horizon 4',
    slug: 'fh4',
    parser: new Parser()
      .endianess('little')
      .int32('IsRaceOn')
      .int32('TimeStampMs')
      .floatle('EngineMaxRpm')
      .floatle('EngineIdleRpm')
      .floatle('EngineCurrentRpm')
  }
}
