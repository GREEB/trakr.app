import {
  Float32BufferAttribute,
  ShaderMaterial,
  Points,
  Vector3
} from 'three'
import { defaultFragment, defaultVertex } from '~/assets/js/Shaders'

export function createEmptyPoints () {
  this.pointsCount = 0
  const positions = new Float32Array(this.maxParticle * 3)
  this.geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  this.geometry.frustumCulled = false
  this.material = new ShaderMaterial({
    vertexShader: defaultVertex,
    fragmentShader: defaultFragment,
    vertexColors: true,
    depthWrite: false
  })
  this.material.needsUpdate = true
  // this.material = new PointsMaterial({ color: 0x888888, size: 1 }) // Don't delete handy to debug/disable shaders
  this.points = new Points(this.geometry, this.material)
  this.points.frustumCulled = false

  this.scene.add(this.points)
  this.geometry.setDrawRange(0, 0)
}

export function updateMaterial () {
  this.material.needsUpdate = true
}
// FIXME: Adding points doesn't work on mobile, three js works fine
// category=threejs
// Not sure why this happens yet but chrome->device simulation-> pixel 5 doesn't add points
export function addPoint (xyz) {
  const positions = this.points.geometry.attributes.position.array

  positions[this.pointsCount] = xyz[0]
  positions[this.pointsCount + 1] = xyz[1]
  positions[this.pointsCount + 2] = xyz[2]

  this.points.geometry.attributes.position.needsUpdate = true
  this.geometry.setDrawRange(0, this.pointsCount / 3)
  this.pointsCount += 3
  this.guiLet.pointsCount = this.pointsCount
}

export function parsePoint (posData) {
  if (JSON.stringify(this.lastCarPos) === JSON.stringify(posData)) { return }
  if (posData[0] + posData[1] + posData[2] === 0) { return }
  if (!this.points) { return }
  const xyz = [
    parseFloat(posData[0]),
    parseFloat(posData[1]),
    parseFloat(posData[2])
  ]
  this.lastCarPos = posData
  this.addPoint(xyz)
}
export function parsePointStress (posData) {
  if (posData[0] + posData[1] + posData[2] === 0) { return }
  if (!this.points) { return }
  const xyz = [
    parseFloat(posData[0]),
    parseFloat(posData[1]),
    parseFloat(posData[2])
  ]
  this.addPoint(xyz)
}
// Not sure about this, but to stop the need to calulate bounding boxes we could load min max from file/db for each game
export function setBoundingBox () {
  this.geometry.computeBoundingBox()

  const min = new Vector3(-5000, 5000, 500)
  const max = new Vector3(5000, -5000, -500)

  this.geometry.boundingBox.set(min, max)
  this.geometry.computeBoundingSphere()
  // const box = new Box3(min, max)
}

/**
 * FIXME: Bounding boxes are calculated every 100 points for now
 * category=threejs
 * This can't be optimal this should only be done when necessary idk how to check for that tho
 */
export function computeBoundings () {
  if (this.pointsCount - this.lastCompute > 1000) {
    this.app.$toast.info('computeBoundingSphere, may lag')
    // this.geometry.computeBoundingBox()
    this.geometry.computeBoundingSphere()

    this.lastCompute = this.pointsCount
  }
}
export function perlin2Points () {
  // const perlin = new Perlin(Math.random())
  // for (let a = 0; a < 100; a++) {
  //   for (let b = 0; b < 100; b++) {
  //     this.parsePoint({ x: a * 100, z: b * 100, y: 200 + perlin.get3(new Vector3(a / 100, b / 100, 0)) * 100 })
  //   }
  // }
}
export function parseChordPack (val) {
  // const now = new Date()
  for (let i = 0; i < val.alluserPos.length; i++) {
    this.parsePoint(val.alluserPos[i], 'pack')

    if ((val.alluserPos.length - 1) === i) {
      // this.car.position = new Vector3(val.alluserPos[i].x / 20, val.alluserPos[i].z / 20, val.alluserPos[i].y / 20)
      // this.controls.target.copy(this.car.position)

      // this.camera.lookAt(this.car.position)
      // this.car.needsUpdate = true
      this.geometry.computeBoundingSphere()
      this.geometry.computeBoundingBox()
      // this.$toast.info(`${val.alluserPos.length} points drawn in ${(new Date() - now)} ms`)
    }
  }
}
