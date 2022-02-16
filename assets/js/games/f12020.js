/**
 * F12020(2021)Config file
 *
 * 2020 and 2021 should be axactily the same structure
 * f1 actually sends some kind of headers with a pack Id
 * we use a choices key from https://www.npmjs.com/package/binary-parser this will use specific parser for different packids
 *
 */
// basically copy paste from here https://github.com/mrcodedev/f1-2021-telemetry-app/tree/main/src
//  ### Packet IDs

//  The packets IDs are as follows:

//  | Packet Name          | Value | Description                                                                      |
//  | -------------------- | ----- | -------------------------------------------------------------------------------- |
//  | Motion               | 0     | Contains all motion data for player’s car – only sent while player is in control |
//  | Session              | 1     | Data about the session – track, time left                                        |
//  | Lap Data             | 2     | Data about all the lap times of cars in the session                              |
//  | Event                | 3     | Various notable events that happen during a session                              |
//  | Participants         | 4     | List of participants in the session, mostly relevant for multiplayer             |
//  | Car Setups           | 5     | Packet detailing car setups for cars in the race                                 |
//  | Car Telemetry        | 6     | Telemetry data for all cars                                                      |
//  | Car Status           | 7     | Status data for all cars                                                         |
//  | Final Classification | 8     | Final classification confirmation at the end of a race                           |
//  | Lobby Info           | 9     | Information about players in a multiplayer lobby                                 |
//  | Car Damage           | 10    | Damage status for all cars                                                       |
//  | Session History      | 11    | Lap and tyre data for session                                                    |

import { Parser } from 'binary-parser'
const empty = {}
const motion = new Parser()
  .floatle('PositionX')
  .floatle('PositionY')
  .floatle('PositionZ')
  .floatle('m_worldVelocityX')
  .floatle('m_worldVelocityY')
  .floatle('m_worldVelocityZ')
  .uint16le('m_worldForwardDirX')
  .uint16le('m_worldForwardDirY')
  .uint16le('m_worldForwardDirZ')
  .uint16le('m_worldRightDirX')
  .uint16le('m_worldRightDirY')
  .uint16le('m_worldRightDirZ')
  .floatle('m_gForceLateral')
  .floatle('m_gForceLongitudinal')
  .floatle('m_gForceVertical')
  .floatle('m_yaw')
  .floatle('m_pitch')
  .floatle('m_roll')

// Basic Settings
export default {
  1: { // id helps to have it as obj key so we can port - 1024 to get game id and object
    gameName: 'F1 2020',
    slug: 'f12020',
    parsers: {
      xyz: new Parser()
        .endianess('little')
        .uint16le('m_packetFormat')
        .uint8('m_gameMajorVersion')
        .uint8('m_gameMinorVersion')
        .uint8('m_packetVersion')
        .uint8('m_packetId')
        .skip(8)
        .floatle('m_sessionTime')
        .uint32('m_frameIdentifier')
        .uint8('m_playerCarIndex')
        .uint8('m_secondaryPlayerCarIndex')
        .choice('data', {
          tag: 'm_packetId',
          choices: {
            0: motion
          },
          defaultChoice: empty

        })
    }
  }
}
