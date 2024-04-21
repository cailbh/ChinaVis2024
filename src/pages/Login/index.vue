<template>
  <div id="root">
    <div id="Container">
      <!-- <div id="Container-back"></div> -->
      <div id="head">
        <Head></Head>
      </div>
      <div id="allBody">
        <div id="tools">
          <div class="login-container">
            <h2 class="tools-title">用户登入</h2>
            <div class="login-form">
                <input v-model="userName" type="text" placeholder="用户名">
                <input v-model="passWord" type="password" placeholder="密码">
                <button class="btn" @click="loginClick">登入</button>
                <button class="btn">注册</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '@/components/Header/index.vue'
export default {
  components: {Head},
  /* eslint-disable no-unused-vars */
  data() {
    return {
      userName:'',
      passWord:'',
    };
  },
  watch: {

  },
  methods: {
    getData() {
      const _this = this;
      let data = [];
      this.$http
        .post("/api/ent/getData", {}, {})
        .then((response) => {
          _this.entData = response.body;
          _this.$bus.$emit("entData", _this.entData);
        });
      this.$http
        .post("/api/rel/getData", {}, {})
        .then((response) => {
          _this.relData = response.body;
          _this.$bus.$emit("relData", _this.relData);
        });
    },
    loginClick() {
      const _this = this;
      this.$router.push({path:'/home',query:{role:"admin"}})
      console.log(this.passWord,this.userName)
    },
  },
  created: function () {
    var _this = this;
  },
  mounted() {
    const _this = this;
    this.$el.style.setProperty("--heightStyle", document.documentElement.clientHeight + "px");

  },
  beforeDestroy() {
    clearTimeout(this.timer);
  }
};
</script>

<style>
@import './index.css';
@import '../../assets/style/home.css';
</style>