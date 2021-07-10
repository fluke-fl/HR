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
export default {
  data() {
    return {
      isFull: false
    }
  },
  methods: {
    changeScreen() {
      if (!this.isFull) {
        document.documentElement.requestFullscreen()
        this.isFull = true
      } else {
        document.exitFullscreen()
        this.isFull = false
      }
    }
  }
}
</script>

<style scoped></style>
