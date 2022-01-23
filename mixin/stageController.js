export default {
  beforeDestroy () {
    document.getElementsByClassName('stage')[0].style.display = 'none'
  },
  mounted () {
    document.getElementsByClassName('stage')[0].style.display = 'block'
  }
}
