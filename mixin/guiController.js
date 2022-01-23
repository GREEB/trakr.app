export default {
  beforeDestroy () {
    document.getElementsByClassName('guicontainer')[0].classList.add('hide')
  },
  mounted () {
    const gui = this.$cookies.get('gui')
    if (gui === true) {
      document.getElementsByClassName('guicontainer')[0].classList.remove('hide')
    }
  }
}
