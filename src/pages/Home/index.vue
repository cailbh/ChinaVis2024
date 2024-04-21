<template>
  <div id="root">
    <div id="Container">
      <!-- <div id="Container-back"></div> -->
      <div id="head">

        <Head></Head>
      </div>
      <div id="allBody">
        <div id="menu">
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="select"
            background-color="rgb(84, 92, 100)" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-location"></i>
              <span slot="title">标签管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-folder-opened"></i>
              <span slot="title">文档管理</span>
            </el-menu-item>
            <!-- <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span slot="title" style="font-size: 20px;">文档管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">文档导入</el-menu-item>
                <el-menu-item index="3-2">文档列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu> -->
          </el-menu>
        </div>
        <div id="contentBody">
          <component :is="currentView"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '@/components/Header/index.vue'
import TagManager from'@/components/TagManager/index.vue'
import FileManager from'@/components/FileManager/index.vue'
import { select } from 'd3';
export default {
  components: { Head,TagManager,FileManager},
  /* eslint-disable no-unused-vars */
  data() {
    return {
      userName: '',
      passWord: '',
      pageState:0,
      currentView:"",
      currentTagData:[]
    };
  },
  watch: {
    pageState(val){
      if(val==0){

      }
    }
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
    handleOpen(key, keyPath) {
    },
    select(key,keyPath){
      const _this =this;
        _this.currentView = ""
      if(key=='2'){
        _this.currentView = "TagManager"
      }
      if(key=='3'){
        _this.currentView = "FileManager"
      }
    },  
    handleClose(key, keyPath) {
    }
  },
  created: function () {
    var _this = this;
  },
  mounted() {
    const _this = this;
    this.$el.style.setProperty("--heightStyle", document.documentElement.clientHeight + "px");
    this.$bus.$on('currentTagData', (val) => {
      _this.currentTagData  = val;
    });
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  }
};
</script>

<style>
@import './index.css';
</style>