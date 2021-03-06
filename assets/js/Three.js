// Import librarys
import { Vector2, Raycaster, BufferGeometry, Color, PerspectiveCamera, Scene, Vector3, WebGLRenderer, Object3D, Clock } from 'three'
import { bindAll } from 'lodash-es'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { initGui, initCarGui, onDownload } from '~/assets/js/Gui'
import { EventBus } from '~/assets/js/utils/event.js'

// import local

import { createEmptyPoints, addPoint, parsePoint, parseChordPack, updateMaterial, parsePointStress } from '~/assets/js/Points.js'
import { addCar, animateCar, carLoaded, smoothCar } from '~/assets/js/Car'
import { setBackgroundColor } from '~/assets/js/Helpers'
import { orbit, setFollowCam, setOrbitCam, simpleFollow, smoothFollow, setSmoothCam, cam2Car, secondaryFollow, setFirstPerson, fpc } from '~/assets/js/Camera'
export default class Stage {
  constructor (opts = {}) {
    // oh no redo this
    this.chordPackCache = {}
    this.app = opts.app
    this.geometry = new BufferGeometry()
    this.scene = new Scene()
    this.maxParticle = 1000000 // This gets 3x later performance depends on this maybe fixable
    this.pointsCount = null
    this.points = null
    this.material = null
    this.carCam = new Object3D()
    this.tempCarCam = new Vector3()
    this.raycaster = new Raycaster()
    this.PointsMaterial = null
    this.container = opts.container || document.body
    this.guiContainer = opts.guiContainer || document.body
    this.controls = null
    this.packOffset = null
    this.packClock = new Clock()
    this.pointer = new Vector2()
    this.frameRate = 0
    this.intersection = 0
    this.car = null
    this.positions = 0
    this.isBreaking = null
    this.cameraSettings = { type: 2 }
    this.currentPoint = { x: 0, y: 0, z: 0 }
    this.lastCompute = null
    this.stats = null
    this.breakLight = null
    this.lerpSmoothing = 0.18 // reduce slerp steps to smooth even more this could be auto scaled to packOffset
    this.slerpTime = 0
    this.fromPosition = 0
    this.steerFl = 0
    this.steerFr = 0
    this.toPosition = 0
    this.fromRotation = 0
    this.toRotation = 0
    this.lastPos = 0
    this.goalCam = new Object3D()
    this.tempCam = new Vector3()
    this.lastCarPos = 0
    this.sco = { // smooth cam object
      aCamera: new Vector3(),
      bCamera: new Vector3(),
      directionCamera: new Vector3(),
      goalCamera: new Object3D(),
      followCamera: new Object3D(),
      tempCamera: new Vector3()
    }

    this.addListeners()
    this.init()
    this.onResize()
  }

  addListeners () {
    bindAll(this, ['onResize', 'render']) // I want to get rid of lodash pls
    EventBus.$on('ON_RESIZE', this.onResize)
    EventBus.$on('ON_TICK', this.render)
  }

  removeListeners () {
    EventBus.$off('ON_RESIZE', this.onResize)
    EventBus.$off('ON_TICK', this.render)
  }

  init () {
    Object3D.DefaultUp = new Vector3(0, 0, 1)

    this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10000)
    this.sco.goalCamera.add(this.camera)

    this.createEmptyPoints()
    // this.setBoundingBox()
    const pixelRatio = window.devicePixelRatio
    const AA = pixelRatio <= 1
    /* Init renderer and canvas */
    this.renderer = new WebGLRenderer({ preserveDrawingBuffer: false, antialias: AA })
    this.renderer.setPixelRatio(pixelRatio)
    this.renderer.setClearColor(new Color(0x121212))

    this.renderer.powerPreference = 'high-performance'

    // this.container.style.overflow = 'hidden'
    // this.container.style.margin = 0
    this.container.appendChild(this.renderer.domElement)

    /* Main scene and camera */
    this.controls = new OrbitControls(this.camera, this.container)
    this.camera.position.set(-0.16198904908582307, 0.3551316000009279, 0.22134693608538228)
    // const light = new PointLight(0xFFFFFF, 1)
    // light.position.set(0, 1000, 10000)
    // this.scene.add(light)
    // const light2 = new PointLight(0xFFFFFF, 1)
    // light2.position.set(0, 0, 500)
    // this.scene.add(light2)
    // const light3 = new PointLight(0xFFFFFF, 1)
    // light3.position.set(0, 0, 1000)
    // this.scene.add(light3)
    // const ambient = new AmbientLight(0xFFFFFF, 0.51) // soft white light
    // this.scene.add(ambient)
    // this.scene.add(new AxesHelper(100))
    this.initGui()
    this.addCar()
  }

  onResize () {
    const newHeight = window.innerHeight - 48
    this.camera.aspect = window.innerWidth / newHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, newHeight)
  }

  animatePoint (el) {
    this.points.geometry.attributes.size.array[el.index] = 10.0
  }

  render ({ mouse }) {
    // this.pointer.x = (mouse.x / window.innerWidth) * 2 - 1
    // this.pointer.y = (mouse.y / window.innerWidth) * 2 - 1

    // this.raycaster.setFromCamera(this.pointer, this.camera)
    // const intersects = this.raycaster.intersectObject(this.points)
    // // this.intersection = (intersects.length) > 0 ? intersects[0] : null
    // for (let i = 0; i < intersects.length; i++) {
    //   this.currentPoint.x = intersects[i].point.x
    //   this.currentPoint.y = intersects[i].point.y
    //   this.currentPoint.z = intersects[i].point.z
    //   this.animatePoint(intersects[i])
    // }
    // Car animation
    if (this.car !== undefined && this.fromPosition && this.toPosition && this.toRotation) {
      this.smoothCar()
      if (this.cameraSettings.type === 1) {
        // Simple follow
        this.controls.enabled = true

        this.simpleFollow()
      } else if (this.cameraSettings.type === 2) {
        // First try at a smooth 3rd person game like follow cam you know what i mean
        this.secondaryFollow()
        this.controls.enabled = false
      } else if (this.cameraSettings.type === 3) {
        this.fpc()
      } else {
        this.controls.enabled = true
      }
    }
    this.lastPos = this.fromPosition

    // raycasting

    // this.raycaster.setFromCamera(this.mouse, this.camera)
    // const intersects = this.raycaster.intersectObject(this.points)
    // this.intersection = (intersects.length) > 0 ? intersects[0] : null
    // for (let i = 0; i < intersects.length; i++) {
    //   console.log(intersects[i].point)
    //   this.currentPoint = Object.values(intersects[i].point).toString()
    //   console.log(this.currentPoint)
    //   // intersects[i].object.material.color.set(0xFF0000)
    // }

    this.controls.update() // OrbitControls
    this.stats.update() // lil gui update
    this.renderer.render(this.scene, this.camera)
  }
}
// Point functions
Stage.prototype.createEmptyPoints = createEmptyPoints
Stage.prototype.addPoint = addPoint
Stage.prototype.parsePoint = parsePoint
Stage.prototype.parseChordPack = parseChordPack
Stage.prototype.updateMaterial = updateMaterial
Stage.prototype.parsePointStress = parsePointStress
Stage.prototype.onDownload = onDownload
// Misc
Stage.prototype.setBackgroundColor = setBackgroundColor

// init functions
Stage.prototype.initGui = initGui
Stage.prototype.initCarGui = initCarGui

// Car functions
Stage.prototype.animateCar = animateCar
Stage.prototype.carLoaded = carLoaded
Stage.prototype.addCar = addCar

// Set camera functions
Stage.prototype.setFollowCam = setFollowCam
Stage.prototype.setOrbitCam = setOrbitCam
Stage.prototype.setSmoothCam = setSmoothCam
Stage.prototype.setFirstPerson = setFirstPerson
Stage.prototype.cam2Car = cam2Car

// Camera render functions
Stage.prototype.smoothCar = smoothCar
Stage.prototype.simpleFollow = simpleFollow
Stage.prototype.smoothFollow = smoothFollow
Stage.prototype.secondaryFollow = secondaryFollow
Stage.prototype.fpc = fpc

// Camera do functions
Stage.prototype.orbit = orbit
