<template>
  <!-- 头部 -->
  <div class="header">
      <div class="logo">
      </div>
      <div id="headTxt">
        科研战略管理系统
      </div>
      <!-- MOOC2Graph -->
      <div class="navs">
      <el-menu class="el-menu-demo navs" mode="horizontal">
      <el-menu-item index="1">About</el-menu-item>
      <el-menu-item index="2">Contact</el-menu-item>
      <el-menu-item index="3">?Help</el-menu-item>
      </el-menu></div>
      <!-- <b-nav class="navs" tabs fill>
        <b-nav-item>About |</b-nav-item>
        <b-nav-item>Contact |</b-nav-item>
        <b-nav-item>?Help</b-nav-item>
        <b-nav-item disabled>Disabled</b-nav-item>
      </b-nav> -->
    </div>
</template>

<script>  
export default {
  data() {
    return {
      date:null,
      cityName:'',
    }
  },
  methods: {
    getDate(){},
    // 获取天气
  },
  mounted() {
    
    // let _this = this; 
    // this.timer = setInterval(() => {
    //   let date= new Date();   
    //   let hours =  ''+date.getHours();        //时
    //   let minutes = ''+date.getMinutes();    //分
    //   let seconds = ''+date.getSeconds();    //秒
    //   let time =  hours.padStart(2, '0') + ":" + minutes.padStart(2, '0') + ":" + seconds.padStart(2, '0') + "" ;
    //   _this.date = time
    //   // _this.getTheWeather()
    // }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      // clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }
};
</script>
<style>
  @import './index.css';
</style>