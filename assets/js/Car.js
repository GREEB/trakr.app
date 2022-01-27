import { Vector3, Quaternion, MeshPhysicalMaterial, BoxGeometry, MeshBasicMaterial, Mesh } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export function addCar () {
  const loader = new GLTFLoader()
  const self = this
  loader.load(
  // resource URL
    '../models/race.glb',
    function (gltf) { self.carLoaded(gltf) }
  )
}
export function carLoaded (gltf) {
  gltf.scene.children[0].scale.set(0.1, 0.1, 0.1) // getting right scale would help
  gltf.scene.children[0].rotation.x = Math.PI / 2
  gltf.scene.traverse((child) => {
    if (child.material) { child.material.metalness = 0 }
  })
  this.car = gltf.scene
  this.car.getObjectByName('Mesh_body').material = new MeshPhysicalMaterial({
    color: 0x4D4D4D, metalness: 1.0, roughness: 0.7, clearcoat: 0.05, clearcoatRoughness: 0.05
  })
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({ color: 0xFF0000 })
  this.breakLight = new Mesh(geometry, material)
  this.breakLight.scale.set(0.02, 0.005, 0.002)
  this.breakLight.position.set(0, -0.128, 0.025)
  this.car.add(this.breakLight)

  this.goalCam.position.set(0, -0.5, 0.299)
  this.car.add(this.goalCam)

  this.carCam.position.set(0, -0, 0.4)
  this.car.add(this.carCam)

  this.scene.add(gltf.scene)
  this.controls.target.copy(this.car.position)

  this.initCarGui()
  // this.car.position = new THREE.Vector3(val.alluserPos[i].x / 20, val.alluserPos[i].z / 20, val.alluserPos[i].y / 20)
}
// fh5 steering is from -127+127
export function animateCar (val) {
  if (val[0] + val[1] + val[2] === 0) { return }
  if (this.car !== undefined) {
    this.packOffset = this.packClock.getDelta()
    this.fromPosition = this.car.position
    this.toPosition = new Vector3(val[0], val[1], val[2])
    this.isBreaking = val[7]
    console.log(this.isBreaking)
    this.fromRotation = new Quaternion()
    this.fromRotation.copy(this.car.quaternion)

    this.toRotation = new Quaternion()
    this.toRotationZ = new Quaternion()
    this.toRotationY = new Quaternion()
    this.toRotationX = new Quaternion()
    this.steerFl = new Quaternion()
    this.steerFr = new Quaternion()
    // const a = new THREE.Euler( 0, 1, 1.57,
    this.toRotationZ.setFromAxisAngle(new Vector3(0, 0, 1), val[3] - (val[3] * 2))
    this.toRotationY.setFromAxisAngle(new Vector3(0, 1, 0), val[5] * -1)
    this.toRotationX.setFromAxisAngle(new Vector3(1, 0, 0), val[4] * -1)
    this.steerFl.setFromAxisAngle(new Vector3(0, 1, 0), (val[6] / 127 * -1) - Math.PI)
    this.steerFr.setFromAxisAngle(new Vector3(0, 1, 0), (val[6] / 127 * -1))

    this.toRotation.multiply(this.toRotationZ)
    this.toRotation.multiply(this.toRotationY)
    this.toRotation.multiply(this.toRotationX)

    // const toRotationEuler = new Euler(val[4] * -1, val[5] * -1, val[3] * -1, 'XYZ')
    // this is really bad breaks when driving backwards i guess a quaternion would fix that
    // const toRotationEuler = new Euler(val[4] * -1, val[5] * -1, val[3] * -1, 'XYZ')
    // this.toRotation = new Quaternion()
    // this.toRotation.set(
    //   val[4] / Math.PI,
    //   val[5] / Math.PI,
    //   val[3] / Math.PI,
    //   0.1)
    // const toRotationEuler = new Euler(val[4], val[5], val[3])
    // this.toRotation.setFromEuler(toRotationEuler)
    // this.toRotation.set(val[5] - (val[5] * 2), val[4] - (val[4] * 2), val[3] - (val[3] * 2), 0)
  }
}
/**
 * TODO: Do actual smoothing between packets
 * category=threejs
 * For now this works but real lerping should lerp between packets so its actually always smooth
 */

/**
 * TODO: Implement car pitch&roll
 * category=threejs
 * For now we only animate yaw of car or z axis we should implement the rest
 */
export function smoothCar () {
  // this.packOffset // we have ms of last packet
  // this.stats //may have fps
  // now we know our last pack was lets say 250 ms ago
  // our client does 144 fps thats 0.144 frames every ms
  // so 0.144 * 250 = 36 we could have done 36 steps of animation in this time
  // 1 / 36 = 0.027
  // console.log(this.stats.fps, this.packOffset * 1000, 1 / ((this.stats.fps / 1000) * (this.packOffset * 1000)))
  // we would need to add 0.027 to the slerp every frame to get full animation
  if (this.isBreaking === 0) {
    this.breakLight.material.color.setHex(0x000000)
  } else {
    this.breakLight.material.color.setHex(0xFF0000)
  }
  // Frist try
  this.lerpAlpha += 1 / ((this.stats.fps / 1000) * (this.packOffset * 1000))
  this.slerpTime = this.lerpSmoothing * (1 / ((this.stats.fps / 1000) * (this.packOffset * 1000)))
  if (this.slerpTime >= 1) {
    this.slerpTime = 0.01
  }
  this.car.position.lerp(this.toPosition, this.slerpTime)
  this.car.quaternion.slerp(this.toRotation, this.slerpTime)
  this.car.getObjectByName('wheel_frontLeft').quaternion.slerp(this.steerFl, this.slerpTime)
  this.car.getObjectByName('wheel_frontRight').quaternion.slerp(this.steerFr, this.slerpTime)

  // this.car.children[0].children[3].quaternion.slerp(this.wheelRotation)
  // this.car.children[0].children[4].quaternion.slerp(this.wheelRotation)
  // this.car.quaternion.slerp(this.toRotationPitch, this.slerpTime)
  // this.car.quaternion.slerp(this.toRotationRoll, this.slerpTime)

  // this.car.quaternion.slerpQuaternions(this.fromRotation, this.toRotation, 0.1)
}
