<template>
  <div>
    <svg-icon
      icon-class="fullscreen"
      style="color:#fff; width: 20px; height: 20px"
      @click="changeScreen"
    />
  </div>
</template>

<script>
import Screenfull from 'screenfull'
export default {
  data() {
    return {
      isFull: false
    }
  },
  methods: {
    changeScreen() {
      // 原生方法
      // if (!this.isFull) {
      //   document.documentElement.requestFullscreen()
      //   this.isFull = true
      // } else {
      //   document.exitFullscreen()
      //   this.isFull = false
      // }
      if (!Screenfull.isEnabled) {
        this.$message.warning('全屏不可用')
        return
      }
      Screenfull.toggle()
    }
  }
}
</script>

<style scoped></style>
