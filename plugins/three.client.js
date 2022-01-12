import { EventBus } from '~/assets/js/utils/event'
import Stage from '~/assets/js/Three'
const position = require('touch-position')()

export default ({ store, app, route }, inject) => {
  const doc = document.documentElement

  let size, stage
  const onResize = () => {
    size = {
      w:
        window.innerWidth ||
        document.body.clientWidth ||
        document.documentElement.offsetWidth,
      h:
        window.innerHeight ||
        document.body.clientHeight ||
        document.documentElement.offsetHeight
    }

    const ratio = size.h / size.w

    EventBus.$emit('ON_RESIZE', {
      ...size,
      ratio
    })
    doc.style.setProperty('--app-height', `${size.h}px`)
  }

  const mouse = {
    x: 0,
    y: 0
  }

  const onStartTick = () => {
    requestAnimationFrame(onTick)
  }

  const onTick = () => {
    mouse.x = (position[0] / size.w) * 2 - 1
    mouse.y = -(position[1] / size.h) * 2 + 1

    EventBus.$emit('ON_TICK', { mouse })
    requestAnimationFrame(onTick)
  }

  const addListeners = () => {
    window.addEventListener('resize', onResize)
  }

  const initStage = () => {
    // eslint-disable-next-line no-unused-vars
    // DO NOT INJECT ON THESE SITES
    console.log('init Stage')
    stage = new Stage({
      container: document.querySelector('.stage'),
      guiContainer: document.querySelector('.gui')
    })

    inject('stage', stage)
  }

  const init = () => {
    initStage()

    onResize()
    onStartTick()

    addListeners()
  }

  init()
}
