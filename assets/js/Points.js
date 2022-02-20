import {
  Float32BufferAttribute,
  ShaderMaterial,
  Points,
  BufferGeometry
} from 'three'

import { defaultFragment, defaultVertex } from '~/assets/js/Shaders'

export function createEmptyPoints () {
  this.pointsCount = 0
  const positions = new Float32Array(this.maxParticle * 3)
  const sizes = new Float32Array(this.maxParticle)
  this.geometry = new BufferGeometry()

  if (this.scene.getObjectByName('points') !== undefined) { // remove old points could be done better
    this.scene.remove(this.scene.getObjectByName('points'))
  }
  this.geometry.setAttribute('size', new Float32BufferAttribute(sizes, 1))
  this.geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  this.geometry.frustumCulled = false // this helps with not needing to calcualte a bounding box but may be problematic later

  if (this.material === null) { // this helps with shader edits needs to be redone
    this.material = new ShaderMaterial({
      vertexShader: defaultVertex,
      fragmentShader: defaultFragment,
      vertexColors: true,
      depthWrite: true
    })
  }
  this.material.needsUpdate = true

  // this.material = new PointsMaterial({ color: 0x888888, size: 1 }) // Don't delete handy to debug/disable shaders

  this.points = new Points(this.geometry, this.material)
  this.points.frustumCulled = false
  this.points.name = 'points'

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

  const size = this.points.geometry.attributes.size.array
  size[this.pointsCount] = 1.00

  positions[this.pointsCount] = xyz[0]
  positions[this.pointsCount + 1] = xyz[1]
  positions[this.pointsCount + 2] = xyz[2]

  this.points.geometry.attributes.position.needsUpdate = true
  this.geometry.setDrawRange(0, this.pointsCount / 3)
  this.pointsCount += 3
  this.guiLet.pointsCount = this.pointsCount
  this.points.needsUpdate = true
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

export function parseChordPack (val, name) {
  // console.log(val)
  const now = new Date()
  for (let i = 0; i < val.alluserPos.length; i++) {
    this.parsePoint([val.alluserPos[i][0] / 20, val.alluserPos[i][1] / 20, val.alluserPos[i][2] / 20])

    if ((val.alluserPos.length - 1) === i) {
      if (name === 'home') {
        this.car.position.set(val.alluserPos[i][0] / 20, val.alluserPos[i][1] / 20, val.alluserPos[i][2] / 20)
        this.cam2Car()
        // this.camera.position.set(val.alluserPos[i].x / 20, val.alluserPos[i].y / 20, (val.alluserPos[i].z / 20) + 1)

        this.controls.target.copy(this.car.position)

        this.camera.lookAt(this.car.position)
      }

      // this.car.needsUpdate = true
      // this.geometry.computeBoundingSphere()
      // this.geometry.computeBoundingBox()
      this.app.$toast.info(`${val.alluserPos.length} points drawn in ${(new Date() - now)} ms`)
      this.chordPackCache[name] = this.points.geometry.attributes.position.array
    }
  }
}
