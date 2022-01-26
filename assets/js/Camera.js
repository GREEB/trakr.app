import {
  Vector3
} from 'three'
export function orbit (set) {
  if (arguments.length === 1) {
    this.controls.autoRotate = set
  } else {
    this.controls.autoRotate = !this.controls.autoRotate
  }
}

export function setOrbitCam () {
  this.cameraSettings.type = 0
}
export function setFollowCam () {
  this.cameraSettings.type = 1
}
export function setSmoothCam () {
  this.cameraSettings.type = 2
}
export function setFirstPerson () {
  this.cameraSettings.type = 3
}
export function fpc () {
  this.tempCarCam.setFromMatrixPosition(this.carCam.matrixWorld)

  this.camera.position.copy(this.tempCarCam)
  // this.camera.lookAt(this.car.position.x + 1)
}
export function cam2Car () {
  this.controls.enabled = true
  this.camera.lookAt(this.car.position)
  this.camera.position.set(this.car.position.x + 0.5, this.car.position.y + 0.5, this.car.position.z + 0.5)
}
export function simpleFollow () {
  this.controls.target.copy(this.car.position)
  this.camera.lookAt(this.car.position)
  this.car.needsUpdate = true
  this.controls.target.copy(this.car.position)
}
export function secondaryFollow () {
  this.tempCam.setFromMatrixPosition(this.goalCam.matrixWorld)

  this.camera.position.lerp(this.tempCam, this.slerpTime * this.packOffset)
  this.camera.lookAt(this.car.position)
}
export function smoothFollow () {
  this.sco.aCamera.lerp(this.car.position, this.slerpTime)
  this.sco.bCamera.copy(this.sco.goalCamera.position)

  this.sco.directionCamera.copy(this.sco.aCamera).sub(this.sco.bCamera).normalize()

  const dis = this.sco.aCamera.distanceTo(this.sco.bCamera) - 2.5

  this.sco.goalCamera.position.addScaledVector(this.sco.directionCamera, dis)

  this.sco.goalCamera.position.lerp(this.sco.tempCamera, this.slerpTime)
  this.sco.tempCamera.setFromMatrixPosition(this.sco.followCamera.matrixWorld)

  this.camera.lookAt(this.car.position)
  // this.controls.target.copy(this.car.position)

  this.camera.position.lerp(new Vector3(this.camera.position.x, this.camera.position.y, this.car.position.z - 5.5), this.slerpTime)
  this.camera.needsUpdate = true
}
