import { Color } from 'three'

export function setBackgroundColor (hex) {
  this.lastBgColor = hex
  this.renderer.setClearColor(new Color(hex))
  // this.renderer.clear(true, true, true)
}
