
export function orbit (set) {
  if (arguments.length === 1) {
    this.controls.autoRotate = set
  } else {
    this.controls.autoRotate = !this.controls.autoRotate
  }
}
