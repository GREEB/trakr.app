// Import librarys
import {
  AxesHelper,
  BufferGeometry,
  Color,
  Object3D,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer
} from 'three'
import { bindAll } from 'lodash-es'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { initGui } from './Gui'
import { EventBus } from '~/assets/js/utils/event.js'

// import local
import { createEmptyPoints, addPoint, parsePoint, parseChordPack, perlin2Points } from '~/assets/js/Points.js'
import { setBackgroundColor } from '~/assets/js/Helpers'
import { orbit } from '~/assets/js/Camera'
export default class Stage {
  constructor (opts = {}) {
    this.geometry = new BufferGeometry()
    this.maxParticle = 1000000 // This gets 3x later performance depends on this maybe fixable
    this.pointsCount = null
    this.points = null
    this.PointsMaterial = null
    this.container = opts.container || document.body
    this.guiContainer = opts.guiContainer || document.body
    this.controls = null
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
    const pixelRatio = window.devicePixelRatio
    const AA = pixelRatio <= 1
    /* Init renderer and canvas */
    this.renderer = new WebGLRenderer({
      antialias: AA,
      alpha: true
    })
    this.renderer.setPixelRatio(pixelRatio)
    this.renderer.setClearColor(new Color(0x121212))

    this.renderer.powerPreference = 'high-performance'

    this.container.style.overflow = 'hidden'
    this.container.style.margin = 0
    this.container.appendChild(this.renderer.domElement)

    /* Main scene and camera */
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(
      32,
      window.innerWidth / window.innerHeight,
      1,
      20000
    )
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.camera.position.y = 5
    this.camera.position.z = 200

    this.camera.lookAt(new Vector3(0, 0, 0))

    // this.controls = new OrbitControls(this.camera, this.container);
    //
    this.scene.add(new AxesHelper(100))
    this.createEmptyPoints()
    this.initGui()
    // this.perlin2Points()
  }

  onResize () {
    const newHeight = window.innerHeight - 48
    this.camera.aspect = window.innerWidth / newHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, newHeight)
  }

  render ({ mouse }) {
    this.controls.update()
    this.stats.update()

    if (this.currentTarget) {
      this.currentTarget.rotation.x += 0.01
      this.currentTarget.rotation.y += 0.01
    }

    this.renderer.clear()
    this.renderer.render(this.scene, this.camera)
  }
}
Stage.prototype.createEmptyPoints = createEmptyPoints
Stage.prototype.addPoint = addPoint
Stage.prototype.parsePoint = parsePoint
Stage.prototype.parseChordPack = parseChordPack
Stage.prototype.initGui = initGui
Stage.prototype.perlin2Points = perlin2Points
Stage.prototype.setBackgroundColor = setBackgroundColor
Stage.prototype.orbit = orbit
