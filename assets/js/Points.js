import {
  Float32BufferAttribute,
  ShaderMaterial,
  Points,
  Vector3
} from 'three'
import { Perlin } from 'three-noise'

import { defaultFragment, defaultVertex } from '~/assets/js/Shaders'

export function createEmptyPoints () {
  const positions = new Float32Array(this.maxParticle * 3)
  this.geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))

  this.material = new ShaderMaterial({
    vertexShader: defaultVertex,
    fragmentShader: defaultFragment,
    vertexColors: true,
    depthWrite: false
  })
  // this.material = new PointsMaterial({ color: 0x888888, size: 10 })
  this.points = new Points(this.geometry, this.material)
  this.scene.add(this.points)
  this.geometry.setDrawRange(0, 0)
}

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
  if (!this.points) { return }
  // each point must be 3D
  const xyz = [
    parseFloat(posData.x / 20),
    parseFloat(posData.z / 20),
    parseFloat(posData.y / 20)
  ]

  this.addPoint(xyz)
}
export function perlin2Points () {
  const perlin = new Perlin(Math.random())
  for (let a = 0; a < 100; a++) {
    for (let b = 0; b < 100; b++) {
      this.parsePoint({ x: a * 100, z: b * 100, y: 200 + perlin.get3(new Vector3(a / 100, b / 100, 0)) * 100 })
    }
  }
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
