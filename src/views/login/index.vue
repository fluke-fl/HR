<template>
  <div class="video-container">
    <div class="homepage-hero-module">
      <div :style="fixStyle" class="filter">
        <div class="login-container">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
            label-position="left"
          >
            <div class="title-container">
              <h3 class="title">
                <img src="@/assets/common/login-logo.png" alt="">
              </h3>
            </div>

            <el-form-item prop="mobile">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="username"
                v-model="loginForm.mobile"
                placeholder="请输入手机号"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>

            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="请输入密码"
                name="password"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </el-form-item>

            <el-button
              v-ripple.mouseover.500="'rgba(245, 235, 235, 0.2)'"
              :loading="loading"
              type="primary"
              class="loginBtn"
              style="width:100%;margin-bottom:30px;"
              @click.native.prevent="handleLogin"
            >登录</el-button>

            <div class="tips">
              <span style="margin-right:20px;">账号: 13800000002</span>
              <span> 密码: 123456</span>
            </div>
          </el-form>
        </div>
      </div>
      <video
        :style="fixStyle"
        autoplay
        loop
        class="fillWidth"
        @canplay="canplay"
      >
        <source src="@/assets/flag2.mp4" type="video/mp4">
        浏览器不支持 video 标签，建议升级浏览器。
        <source src="PATH_TO_WEBM" type="video/webm">
        浏览器不支持 video 标签，建议升级浏览器。
      </video>
      <div v-if="!vedioCanPlay" class="poster hidden">
        <img :style="fixStyle" src="PATH_TO_JPEG" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { validMobile } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateMobile = (rule, value, callback) => {
      if (!validMobile(value)) {
        callback(new Error('请输入正确格式的手机号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6 && value.length < 16) {
        callback(new Error('密码长度在6-16位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        mobile: '13800000002',
        password: '123456'
      },
      loginRules: {
        mobile: [
          { required: true, trigger: 'blur', message: '手机号不能为空' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' },
          { validator: validatePassword, trigger: 'blur' }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      vedioCanPlay: false,
      fixStyle: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted: function() {
    window.onresize = () => {
      const windowWidth = document.body.clientWidth
      const windowHeight = document.body.clientHeight
      const windowAspectRatio = windowHeight / windowWidth
      let videoWidth
      let videoHeight
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth
        videoHeight = videoWidth * 0.5625
        this.fixStyle = {
          height: windowWidth * 0.5625 + 'px',
          width: windowWidth + 'px',
          'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
          'margin-left': 'initial'
        }
      } else {
        videoHeight = windowHeight
        videoWidth = videoHeight / 0.5625
        this.fixStyle = {
          height: windowHeight + 'px',
          width: windowHeight / 0.5625 + 'px',
          'margin-left': (windowWidth - videoWidth) / 2 + 'px',
          'margin-bottom': 'initial'
        }
      }
    }
    window.onresize()
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    canplay() {
      this.vedioCanPlay = true
    },
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            this.loading = true
            await this.$store.dispatch('user/login', this.loginForm)
            this.$router.push('/')
          } catch (error) {
            console.log(error)
          } finally {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #68b0fe;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  // background-image: url('~@/assets/common/login.jpg');
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 4px;
      padding: 12px 5px 12px 15px;
      color: #000;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .loginBtn {
    background: #407ffe;
    height: 54px;
    line-height: 32px;
    font-size: 24px;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
  }
  .el-form-item__error {
    color: #fff;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
// .vue-particle-line {
//   background-image: url('~@/assets/common/adminBG.jpg');
//   background-size: cover;
//   background-position: 50%;
// }
.homepage-hero-module,
.video-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.video-container .poster img,
.video-container video {
  z-index: 0;
  position: absolute;
}

.video-container .filter {
  z-index: 1;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
}
.el-form {
  z-index: 2;
  margin: -10px 58% !important;
}
.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
