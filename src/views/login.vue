<template>
  <div class="login-wrapper" v-show="isLoginShow">
    <div class="back" @click="$router.go(-1)">
      <i class="icon-back"></i>
    </div>
    <!-- <div class="switches-wrapper">
      <switches
        :items="['扫码登录', '手机登录', '验证码登录']"
        v-model="currentIndex"
      ></switches>
    </div> -->
    <div class="header">登录</div>
    <div class="form-wrapper">
      <input
        type="text"
        name="username"
        placeholder="手机号"
        class="input-item"
        v-model="phone"
      />
      <!-- <input
        type="password"
        name="password"
        placeholder="密码"
        class="input-item"
        v-model="password"
      /> -->
      <input
        type="password"
        name="password"
        placeholder="请输入验证码"
        class="input-item"
        v-model="code"
      />
      <van-button
        type="primary"
        size="mini"
        class="code"
        @click="send(this.phone)"
        >点此发送验证码</van-button
      >
      <div class="btn" @click="Login">开启网易云之旅</div>
      <div class="msg">密码和验证码大概率登不了,那只能进入我的主页啦</div>
      <div class="btn" @click="user">TimSpan的主页</div>

    </div>
    <div class="msg">账号是注册网易云的手机号</div>
  </div>



  <div class="user" v-show="!isLoginShow">
    <div class="back" @click="$router.go(-1)">
      <i class="icon-back"></i>
    </div>
    <h1>TimSpan的主页</h1>
    
  </div>
</template>

<script>
// import Switches from './switches.vue'
import { getLoginUser, getCode, getPhoneLogin } from '@/api/user'
export default {
  data() {
    return {
      phone: '',
      // password: '',
      code: '',
      isLoginShow:true
    }
  },
  // components: {
  //   Switches
  // },
  // async created() {
  //    await getCode(this.phone)
  // },
  methods: {
    async send(phone) {
      await getCode(phone)
      Toast.success('已发送')
    },

    Login() {

      // getPhoneLogin(this.phone, this.code)

      // await this.$store.dispatch('getLogin', {
      //   phone: this.phone,
      //   password: this.code,
      // })
    },
    user() {
      this.isLoginShow = false
    }
  },
}
</script>

<style lang="scss" scoped>

.user{


  h1{
    
  }
}
.back {
  position: absolute;
  top: 0;
  left: 6px;
  z-index: 50;
  .icon-back {
    display: block;
    padding: 10px;
    font-size: $font-size-large-x;
    color: $color-theme;
  }
}
.switches-wrapper {
  margin: 10px 0 30px 0;
}

.login-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  // background: $color-background;
  background-color: #333;
}
.form-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.header {
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
}
.input-item {
  display: block;
  margin-bottom: 20px;
  margin-left: 0.4rem;
  margin-right: 0.4rem;
  border: 0;
  padding: 10px;
  background-color: #333;
  border-bottom: 1px solid $color-text;
  font-size: 15px;
  outline: none;
}
.input-item:placeholder {
  text-transform: uppercase;
}
.code {
  margin-left: 0.4rem;
  width: 2rem;
  background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
  border: none;
}
.btn {
  text-align: center;
  margin-left: 0.4rem;
  margin-right: 0.4rem;
  padding: 10px;

  margin-top: 40px;
  background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
  color: #fff;
}
.msg {
  text-align: center;
  line-height: 88px;
}
</style>
