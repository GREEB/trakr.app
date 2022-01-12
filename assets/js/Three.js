/* eslint-disable unicorn/number-literal-case */
import { AxesHelper, Object3D, WebGLRenderer, Scene, PerspectiveCamera, PCFSoftShadowMap, AmbientLight, sRGBEncoding, ACESFilmicToneMapping, Color, Vector3, BufferGeometry } from 'three'
import { bindAll } from 'lodash-es'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { initGui } from './Gui'
import { EventBus } from '~/assets/js/utils/event.js'
import { createEmptyPoints, addPoint, parsePoint, parseChordPack, perlin2Points } from '~/assets/js/Points.js'

export default class Stage {
  constructor (opts = {}) {
    this.geometry = new BufferGeometry()
    this.maxParticle = 1000000 // This gets 3x later performance depends on this maybe fixable
    this.pointsCount = null
    this.points = null
    this.PointsMaterial = null
    this.container = opts.container || document.body
    this.guiContainer = opts.guiContainer || document.body
    this.addListeners()
    this.init()
    this.onResize()
  }

  // WARNING: This is not a drop in replacement solution and
  // it might not work for some edge cases. Test your code!
  addListeners () {
    bindAll(this, ['onResize', 'render'])

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
    this.renderer.setClearColor(new Color(0x0D0D0D))

    this.renderer.toneMappingExposure = 0.6
    this.renderer.outputEncoding = sRGBEncoding
    this.renderer.toneMapping = ACESFilmicToneMapping
    this.renderer.powerPreference = 'high-performance'

    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = PCFSoftShadowMap

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
    // this.controls.update();

    const ambientLight = new AmbientLight(0xdbdbdb)
    this.scene.add(ambientLight)
    this.scene.add(new AxesHelper(100))
    this.createEmptyPoints()
    this.initGui()
    // this.perlin2Points()
  }

  onResize () {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  render ({ mouse }) {
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
