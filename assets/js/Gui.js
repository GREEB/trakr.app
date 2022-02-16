import { GUI } from 'lil-gui'
import { Color } from 'three'
import Stats from '~/assets/js/utils/stats'

// TODO: Gui on mobile is broken/too big
//  category=lilgui
// Fix gui on mobile and style for mobile

// TODO: Gui fps sometimes show fps,ms,mem, and somethimes only fps,ms
// category=lilgui
// FPS section in gui can have 2 or 3 elements depending on browser account for that

export function initGui () {
  this.guiLet = {
    boxVisible: false,
    colorSchema: 'Height',
    backgroundColor: this.lastBgColor,
    pointsCount: 0,
    pps: 0,
    camMode: false,
    slerpSmooth: this.lerpSmoothing
  }
  this.gui = new GUI({ autoPlace: false })
  this.stats = new Stats()
  this.stats.dom.style.cssText = ''
  this.stats.dom.classList.add('statsjs')
  const self = this
  // console.log(document)
  // document.getElementsByClassName('stats')[0].appendChild(this.stats.dom)
  const optionFolder = this.gui.addFolder('Options')
  optionFolder.add(this.guiLet, 'pointsCount').listen()
  optionFolder.add({
    download () {
      onDownload(self)
    }
  }, 'download')
  // optionFolder.add(this.guiLet, 'colorSchema', ['Height', 'Terrain']).onChange(function (v) { changeColor(v) })
  // optionFolder.add(this.material, 'opacity', 0, 1).listen()
  // optionFolder.add(this.material, 'size', 0.1, 10).listen()
  // optionFolder.addColor(this.guiLet, 'backgroundColor').name('Background').onChange(function (value) { setBackgroundColor(value) })
  // optionFolder.add(this.guiLet, 'boxVisible').name('Bounding box').onChange(function (value) { this.box.visible = value })
  const shaderFolder = this.gui.addFolder('Shaders')
  shaderFolder.add(this.material, 'vertexShader').listen()
  shaderFolder.close()
  const pointer = this.gui.addFolder('pointer')
  pointer.add(this.pointer, 'x').listen()
  pointer.add(this.pointer, 'y').listen()
  pointer.close()
  const raycasting = this.gui.addFolder('raycasting')
  raycasting.add(this.currentPoint, 'x').listen()
  raycasting.add(this.currentPoint, 'y').listen()
  raycasting.add(this.currentPoint, 'z').listen()
  raycasting.close()
  const cameraFolder = this.gui.addFolder('Camera')

  cameraFolder.add(this.camera.position, 'x').listen()
  cameraFolder.add(this.camera.position, 'y').listen()
  cameraFolder.add(this.camera.position, 'z').listen()
  cameraFolder.add(this.cameraSettings, 'type').listen()
  cameraFolder.close()

  const statsFolder = this.gui.addFolder('FPS')
  statsFolder.domElement.children[1].appendChild(this.stats.dom)
  // this.gui.domElement.childNodes[0].appendChild(this.stats.dom)
  // statsFolder.appendChild(this.stats.dom)

  this.guiContainer.appendChild(this.gui.domElement)

  // this.guiContainer.appendChild(this.stats.dom)
  // document.getElementsByClassName('gui')[0].appendChild(this.gui.domElement)
  // this.guiContainer.getElementsByClassName('lil-gui')[0].children[1].children[0].appendChild(this.stats.dom)

  // document.body.appendChild()
}
function download (content, fileName, contentType) {
  const a = document.createElement('a')
  const file = new Blob([content], { type: contentType })
  a.href = URL.createObjectURL(file)
  a.download = fileName
  a.click()
}

export function onDownload (self) {
  download(JSON.stringify(self.lastChordPack.alluserPos), 'positions.json', 'text/plain')
}
export function cameraSettings () {

}
export function initCarGui () {
  const wheels = this.gui.addFolder('wheels')
  wheels.close()
  wheels.add(this.car.children[0].children[3].rotation, 'y', -10, 10).listen()

  const goalCamera = this.gui.addFolder('GoalCam')
  goalCamera.close()

  goalCamera.add(this.goalCam.position, 'x', -10, 10).listen()
  goalCamera.add(this.goalCam.position, 'y', -10, 10).listen()
  goalCamera.add(this.goalCam.position, 'z', -10, 10).listen()
  const carFolder = this.gui.addFolder('Car')
  carFolder.close()

  carFolder.add(this, 'lerpSmoothing', 0.00000001, 0.5).listen()
  carFolder.add(this, 'slerpTime').listen()

  carFolder.add(this.car.rotation, 'x', -10, 10).listen()
  carFolder.add(this.car.rotation, 'y', -10, 10).listen()
  carFolder.add(this.car.rotation, 'z', -10, 10).listen()
  // carFolder.add(this.car.quaternion, 'x').listen()
  // carFolder.add(this.car.quaternion, 'y').listen()
  // carFolder.add(this.car.quaternion, 'z').listen()
  // carFolder.add(this.car.quaternion, 'w').listen()

  // const carAnimation = this.gui.addFolder('Car animate to')
  // carAnimation.add(this.toRotation, '_x').listen()
  // carAnimation.add(this.toRotation, '_y').listen()
  // carAnimation.add(this.toRotation, '_z').listen()
  // carAnimation.add(this.toRotation, '_w').listen()
}

// export function initQuadGui () {
//   const cubeFolder = this.gui.addFolder('Scene')
//   cubeFolder.add(this.cube.quaternion, 'x', 0, Math.PI).listen()
//   cubeFolder.add(this.cube.quaternion, 'y', 0, Math.PI).listen()
//   cubeFolder.add(this.cube.quaternion, 'z', 0, Math.PI).listen()
//   const cameraFolder = this.gui.addFolder('Camera')
//   cameraFolder.add(this.cube.position, 'z', 0, 1000).listen()
//   cameraFolder.add(this.cube.position, 'x', 0, 1000).listen()
//   cameraFolder.add(this.cube.position, 'y', 0, 1000).listen()

// }
export function setBackgroundColor (arrayRGB) {
  this.lastBgColor = arrayRGB
  this.renderer.setClearColor(new Color().setRGB(arrayRGB[0], arrayRGB[1], arrayRGB[2]))
  // this.renderer.clear(true, true, true)
}
export function changeColor (color) {
  const sel = color.toLowerCase()
  this.points.geometry.attributes.color.array = this.colors[sel]
  this.points.geometry.attributes.color.needsUpdate = true
}
