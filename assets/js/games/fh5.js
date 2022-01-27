/**
 * Forza Horizon 5 Config file
 *
 * For now we build a little object with a parser that the front and backend can use
 * Would be nice if this could be populated by a json file
 *
 * Optimal would be to have different parsers for different things,
 * Lightweight menu detection for backend
 * Position only parser
 * Full parse
 */

import { Parser } from 'binary-parser'

// Basic Settings
// arrays that are length 3 are xyz
// arrays that are 4 are Fl,Fr,Rl,Rr
export default {
  0: { // id helps to have it as obj key so we can port - 1024 to get game id and object
    gameName: 'Forza Horizon 5',
    slug: 'fh5',
    parsers: {
      xyz: new Parser().endianess('little')
        .seek(244)
        .floatle('PositionX')
        .floatle('PositionZ')
        .floatle('PositionY'),
      full: new Parser().endianess('little')
        .int32('IsRaceOn')
        .int32('TimeStampMs')
        .floatle('EngineMaxRpm')
        .floatle('EngineIdleRpm')
        .floatle('EngineCurrentRpm')
        .array('Acceleration', {
          type: 'floatle',
          length: 3
        })
        .array('Velocity', {
          type: 'floatle',
          length: 3
        })
        .array('AngularVelocity', {
          type: 'floatle',
          length: 3
        })
        .array('YawPitchRoll', {
          type: 'floatle',
          length: 3
        })
        .array('NormSuspensionTravel', {
          type: 'floatle',
          length: 4
        })
        .array('TireSlipRatio', {
          type: 'floatle',
          length: 4
        })
        .array('WheelRotationSpeed', {
          type: 'floatle',
          length: 4
        })
        .array('WheelOnRumbleStrip', {
          type: 'floatle',
          length: 4
        })
        .array('WheelInPuddle', {
          type: 'floatle',
          length: 4
        })
        .array('SurfaceRumble', {
          type: 'floatle',
          length: 4
        })
        .array('TireSlipAngle', {
          type: 'floatle',
          length: 4
        })
        .array('TireCombinedSlip', {
          type: 'floatle',
          length: 4
        })
        .array('SuspensionTravelMeters', {
          type: 'floatle',
          length: 4
        })
        .int8('CarOrdinal')
        .int8('CarClass')
        .int8('CarPerformanceIndex')
        .int8('DriveTrain')
        .int8('NumCylinders')
        .saveOffset('currentOffset')
        .seek(27) // 27?
        .floatle('PositionX')
        .floatle('PositionZ')
        .floatle('PositionY')
      // .array('Position', { // this somehow is xzy or yzx z is [1] in array idk y
      //   type: 'floatle',   // so implementing Position"X,Y,Z" so we can set right chords on parse i guess
      //   length: 3
      // })
        .floatle('Speed')
        .floatle('Power')
        .floatle('Torque')
        .array('TireTemp', {
          type: 'floatle',
          length: 4
        })
        .floatle('Boost')
        .floatle('Fuel')
        .floatle('Distance')
        .floatle('BestLapTime')
        .floatle('LastLapTime')
        .floatle('CurrentLapTime')
        .floatle('CurrentRaceTime')
        .int16('Lap')
        .int8('RacePosition')
        .int8('Accelerator')
        .int8('Brake')
        .int8('Clutch')
        .int8('Handbrake')
        .int8('Gear')
        .int8('Steer')
        .int8('NormalDrivingLine')
        .int8('NormalAiBrakeDifference')
    }

  }
}
