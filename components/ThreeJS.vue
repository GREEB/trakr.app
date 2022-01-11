<template>
  <div>
    <div class="GUI" />
    <div class="STATS" />
    <div class="THREE" />

    <script id="vertexshader" type="x-shader/x-vertex">
      attribute float size;
      varying vec3 vColor;
      varying vec3 vPos;
      void main() {
      vColor = color;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      vPos = position;
      gl_PointSize = color.r * 5.0;
      }
    </script>

    <script id="fragmentshader" type="x-shader/x-fragment">
      varying vec3 vColor;
      varying vec3 vPos;
      void main() {
      gl_FragColor = vec4((vPos.z / 50.0) * 3.0,0.51,0.51, 1.0);
      //gl_FragColor = vec4((vPos.z / 255.0) * 3.0 ,(vPos.x / 255.0) * 6.0),(vPos.y / 255.0) * 6.0 ), 1.0);
      }
    </script>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { unpack } from 'msgpackr'

export default {
  data () {
    return {
      aCamera: new THREE.Vector3(),
      bCamera: new THREE.Vector3(),
      box: null,
      camera: null,
      car: null,
      clock: new THREE.Clock(),
      colors: {},
      controls: null,
      cube: null,
      directionCamera: new THREE.Vector3(),
      firstChord: true,
      geometry: new THREE.BufferGeometry(),
      goalCamera: new THREE.Object3D(),
      gui: null,
      guiLet: {},
      intersection: null,
      keepingTrackOfTweens: [],
      lastBgColor: [50, 50, 50],
      material: null,
      mouse: new THREE.Vector2(),
      points: null,
      pointsCount: null,
      maxParticle: 500000,
      raycaster: new THREE.Raycaster(),
      renderer: new THREE.WebGLRenderer({ preserveDrawingBuffer: false, antialias: true }),
      scene: new THREE.Scene(),
      spheres: [],
      spheresIndex: 0,
      stats: new Stats(),
      tempCamera: new THREE.Vector3(),
      toggle: 0,
      //
      followCamera: new THREE.Object3D(),
      updateFollowCam: false,
      animecount: 0,
      lastPos: null,
      //
      fromPostion: null,
      fromRotation: null,
      toPosition: null,
      toRotation: null
    }
  },
  // Get Store
  computed: {
    chordPack () { return this.$store.state.chordPack }
  },
  // Watch for change Store and do stuff
  watch: {
    chordPack (val) {
      if (val.length === 0) { return }
      this.parseChordPack(val)
    }

  },
  // init Three when mounted
  mounted () {
    // Init socket here so we can on 'chord' in here running this a lot over vuex is not cool could be fixed by freezing but didnt work
    this.socket = this.$nuxtSocket({
      withCredentials: true,
      teardown: false,
      extraHeaders: {
        path: this.$nuxt.$route.path
      }
    })
    this.socket
      .on('chord', (msg, cb) => {
        const buffer = unpack(this.toBuffer(msg))
        this.parsePoint(buffer.obj2Send)
        this.animateCar(buffer.obj2Send)
        this.followCam(buffer.obj2Send)
      /* Handle event */
      })
      //
    THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1)

    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
    this.goalCamera.add(this.camera)
    // this.followCamera.position.z = -10

    const positions = new Float32Array(this.maxParticle * 3)
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

    this.material = new THREE.ShaderMaterial({
      vertexShader: document.getElementById('vertexshader').textContent,
      fragmentShader: document.getElementById('fragmentshader').textContent,
      vertexColors: true,
      depthWrite: false
    })

    this.points = new THREE.Points(this.geometry, this.material)
    this.scene.add(this.points)

    this.box = new THREE.BoxHelper(this.points, 0xFFFFFF)
    this.box.visible = true

    this.scene.add(this.box)

    this.geometry.setDrawRange(0, 0)

    this.renderer.setClearColor(new THREE.Color(0x0D0D0D))
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    document.getElementsByClassName('THREE')[0].appendChild(this.renderer.domElement)
    this.stats.dom.style.cssText = ''
    this.stats.dom.classList.add('statsjs')
    document.getElementsByClassName('STATS')[0].appendChild(this.stats.dom)
    window.addEventListener('resize', this.onWindowResize)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.geometry.computeBoundingBox()
    this.camera.position.z = 500

    const bBox = this.geometry.boundingBox
    const center = new THREE.Vector3()
    bBox.getCenter(center)
    this.controls.target.copy(center)

    const axes2 = new THREE.AxesHelper(100)
    axes2.position.x = -520
    axes2.position.y = -300
    this.scene.add(axes2)

    const light = new THREE.PointLight(0xFFFFFF, 1)
    light.position.set(0, 0, 500)
    this.scene.add(light)

    this.addCar()
    // window.addEventListener('mousemove', this.onMouseMove, false)
    // window.addEventListener('mousedown', this.onMouseDown, true)
    this.initGui()
    this.animate()
  },
  methods: {
    initQuadGui () {
      const cubeFolder = this.gui.addFolder('Scene')
      cubeFolder.add(this.cube.quaternion, 'x', 0, Math.PI).listen()
      cubeFolder.add(this.cube.quaternion, 'y', 0, Math.PI).listen()
      cubeFolder.add(this.cube.quaternion, 'z', 0, Math.PI).listen()
      const cameraFolder = this.gui.addFolder('Camera')
      cameraFolder.add(this.cube.position, 'z', 0, 1000).listen()
      cameraFolder.add(this.cube.position, 'x', 0, 1000).listen()
      cameraFolder.add(this.cube.position, 'y', 0, 1000).listen()
    },
    parseChordPack (val) {
      const now = new Date()
      for (let i = 0; i < val.alluserPos.length; i++) {
        this.parsePoint(val.alluserPos[i], 'pack')

        if ((val.alluserPos.length - 1) === i) {
          this.car.position = new THREE.Vector3(val.alluserPos[i].x / 20, val.alluserPos[i].z / 20, val.alluserPos[i].y / 20)
          this.controls.target.copy(this.car.position)

          this.camera.lookAt(this.car.position)
          this.car.needsUpdate = true
          this.geometry.computeBoundingSphere()
          this.geometry.computeBoundingBox()
          this.$toast.info(`${val.alluserPos.length} points drawn in ${(new Date() - now)} ms`)
        }
      }
    },
    addCar () {
      const loader = new GLTFLoader()
      const self = this
      loader.load(
      // resource URL
        'models/race.glb',
        function (gltf) {
          self.car = gltf.scene

          gltf.scene.children[0].rotation.x = Math.PI / 2
          self.car.add(self.followCamera)
          self.car.scale = new THREE.Vector3(0.25, 0.25, 0.25)

          self.scene.add(gltf.scene)
        }
      )
    },
    animateCar (val) {
      this.fromPostion = this.car.position
      this.toPosition = new THREE.Vector3(parseFloat(val.x) / 20, parseFloat(val.z) / 20, parseFloat(val.y) / 20)

      this.fromRotation = new THREE.Quaternion()
      this.toRotation = new THREE.Quaternion()
      this.fromRotation.copy(this.car.quaternion)
      this.toRotation.setFromAxisAngle(new THREE.Vector3(0, 0, 1), val.yaw - (val.yaw * 2))
    },
    followCam (val) {

    },

    setBackgroundColor (arrayRGB) {
      this.lastBgColor = arrayRGB
      this.renderer.setClearColor(new THREE.Color().setRGB(arrayRGB[0], arrayRGB[1], arrayRGB[2]))
      // this.renderer.clear(true, true, true)
    },
    changeColor (color) {
      const sel = color.toLowerCase()
      this.points.geometry.attributes.color.array = this.colors[sel]
      this.points.geometry.attributes.color.needsUpdate = true
    },
    onWindowResize () {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    animate () {
      requestAnimationFrame(this.animate)
      if (this.fromPostion && this.fromRotation && this.toPosition && this.toRotation && this.lastPos) {
        this.car.position.lerpVectors(this.fromPostion, this.toPosition, 0.1)
        this.car.quaternion.slerpQuaternions(this.fromRotation, this.toRotation, 0.1)

        this.car.needsUpdate = true
        // this.camera.position.z = 5
        this.aCamera.lerp(this.car.position, 0.4)
        this.bCamera.copy(this.goalCamera.position)

        this.directionCamera.copy(this.aCamera).sub(this.bCamera).normalize()

        const dis = this.aCamera.distanceTo(this.bCamera) - 2.5

        this.goalCamera.position.addScaledVector(this.directionCamera, dis)

        this.goalCamera.position.lerp(this.tempCamera, 0.02)
        this.tempCamera.setFromMatrixPosition(this.followCamera.matrixWorld)

        this.camera.lookAt(this.car.position)
        // this.controls.target.copy(this.car.position)

        this.camera.position.lerp(new THREE.Vector3(this.camera.position.x, this.camera.position.y, this.car.position.z - 5.5), 0.01)
        this.camera.needsUpdate = true
      }
      this.lastPos = this.fromPostion

      this.controls.update()
      // TWEEN.update()
      this.render()
      this.stats.update()
    },
    render () {
      this.renderer.render(this.scene, this.camera)
    },
    onMouseMove (event) {
      const canvas = this.renderer.domElement

      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      this.mouse.x = (x / canvas.clientWidth) * 2 - 1
      this.mouse.y = (y / canvas.clientHeight) * -2 + 1
    },
    onMouseDown (event) {

      // if (intersects.length) {
      //   this.controls.target.copy(intersects[0].point.clone())
      // }
    },
    addPoint (xyz) {
      const positions = this.points.geometry.attributes.position.array

      positions[this.pointsCount] = xyz[0]
      positions[this.pointsCount + 1] = xyz[1]
      positions[this.pointsCount + 2] = xyz[2]

      this.points.geometry.attributes.position.needsUpdate = true
      this.geometry.setDrawRange(0, this.pointsCount / 3)
      this.pointsCount += 3
      this.guiLet.pointsCount = this.pointsCount
    },
    parsePoint (posData) {
      if (!this.points) { return }
      // each point must be 3D
      const xyz = [
        parseFloat(posData.x / 20),
        parseFloat(posData.z / 20),
        parseFloat(posData.y / 20)
      ]

      this.addPoint(xyz)
    },
    initGui () {
      const self = this
      this.guiLet = {
        boxVisible: false,
        colorSchema: 'Height',
        backgroundColor: this.lastBgColor,
        pointsCount: 0,
        pps: 0
      }
      this.gui = new GUI()

      const optionFolder = this.gui.addFolder('Options')
      optionFolder.add(this.guiLet, 'pointsCount').listen()
      optionFolder.add({ add () { } }, 'add')
      optionFolder.add(this.guiLet, 'colorSchema', ['Height', 'Terrain']).onChange(function (v) { self.changeColor(v) })
      optionFolder.add(this.material, 'opacity', 0, 1).listen()
      // optionFolder.add(this.material, 'size', 0.1, 10).listen()
      optionFolder.addColor(this.guiLet, 'backgroundColor').name('Background').onChange(function (value) { self.setBackgroundColor(value) })
      optionFolder.add(this.guiLet, 'boxVisible').name('Bounding box').onChange(function (value) { this.box.visible = value })
      const cameraFolder = this.gui.addFolder('Camera')
      cameraFolder.add(this.camera.position, 'z', 0, 100).listen()
      cameraFolder.add(this.camera.position, 'x', 0, 100).listen()
      cameraFolder.add(this.camera.position, 'y', 0, 100).listen()
      this.gui.close()
      document.getElementsByClassName('GUI')[0].appendChild(this.gui.domElement)
      document.getElementsByClassName('lil-gui')[0].children[1].appendChild(this.stats.dom)

      // document.body.appendChild()
    },
    toBuffer (ab) {
      const buf = Buffer.alloc(ab.byteLength)
      const view = new Uint8Array(ab)
      for (let i = 0; i < buf.length; ++i) {
        buf[i] = view[i]
      }
      return buf
    }
  }

}
</script>
<style lang="sass" scoped>
html
  overflow: hidden
.lil-gui.root
    top: 47px
    right: 0
.lil-gui .title
  font-size: 12px !important
  line-height: 19px
</style>
