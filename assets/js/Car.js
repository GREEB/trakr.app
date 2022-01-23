import { Vector3, Quaternion } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export function addCar () {
  const loader = new GLTFLoader()
  const self = this
  loader.load(
  // resource URL
    'models/race.glb',
    function (gltf) {
      self.car = gltf.scene

      gltf.scene.children[0].rotation.x = Math.PI / 2
      self.car.add(self.followCamera)
      self.car.scale = new Vector3(0.25, 0.25, 0.25)

      self.scene.add(gltf.scene)
    }
  )
}

export function animateCar (val) {
  this.fromPostion = this.car.position
  this.toPosition = new Vector3(parseFloat(val.x) / 20, parseFloat(val.z) / 20, parseFloat(val.y) / 20)

  this.fromRotation = new Quaternion()
  this.toRotation = new Quaternion()
  this.fromRotation.copy(this.car.quaternion)
  this.toRotation.setFromAxisAngle(new Vector3(0, 0, 1), val.yaw - (val.yaw * 2))
}
