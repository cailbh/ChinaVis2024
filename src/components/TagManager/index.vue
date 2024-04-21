<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
  <div class="TagManagerPanel">
    <div class="panelHead">TagManager
      <el-button class="returnHomeBut" v-show="editShow" size="mini" @click="returnHome()">返回</el-button>
    </div>
    <div id="TagManagerPanelDiv" class="panelBody" ref="TagManagerPanelDiv">
      <el-table v-show="tableShow" :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column label="序号" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.sort }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标签体系">
          <template slot-scope="scope">
            <!-- <el-popover trigger="hover" placement="top"> -->
            <!-- <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p> -->
            <div slot="reference" class="name-wrapper">
              <el-tag class="tagClass" v-for="(item, index) in scope.row.name" size="medium" :color="mcolor[index]">{{
        item }}</el-tag>
            </div>
            <!-- </el-popover> -->
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="300">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleChoose(scope.$index, scope.row)">选中</el-button>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="editShow" class="tagEditDiv">

      </div>
      <div class="chartTooltip">
        <p>
          <br /><strong class="name"></strong>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import { onMounted, ref } from 'vue';
import domtoimage from 'dom-to-image';
import tools from "@/utils/tools.js";
import { color } from 'd3';
import { _ } from 'core-js';

export default {
  props: ["videoTime"],
  data() {
    return {
      colorMap: {},
      mcolor: [
        "rgb(255,60,60)",
        "rgb(155,20,100)",
        "rgb(255,83,255)",
        "rgb(200,100,50)",
        "rgb(235,135,162)",
        "rgb(200,200,102)",
        "rgb(255,178,101)",
        "rgb(63,151,134)",
        "rgb(83,155,255)",
        "rgb(50,200,120)",
        "rgb(2,50,200)",
        "rgb(0,122,244)",
        "rgb(150,122,244)",
        "rgb(168,168,255)",
        "rgb(200,200,200)",
      ],
      tableShow:true,
      editShow:false,
      chooseTagsId:'',
      tagsData: [],
      tableData: [],
      currentTagData:[]
    };
  },
  watch: {
    type(val) {
    },
    currentTagData(val){
      this.$bus.$emit("currentTagData",val);
    },
    tagsData(val) {
      const _this = this;
      let tableData = []
      val.forEach((element,index)=> {
        let temp = {
          id: element['id'],
          sort: index+1,
          name: element['fields'],
          num: element['fields'].length,
          isChoose: element['isChoose'],
        }
        if(element['isChoose']){
          _this.chooseTagsId = element['id'];
          this.currentTagData = element;
        }
        tableData.push(temp)
      });
      this.tableData = tableData;
    }
  },
  methods: {
    click_Ent(time) {
      this.$emit("timeDur", time);
    },
    returnHome(){
      this.tableShow = true;
      this.editShow = false;
    },
    ModifyChooseTag(cId){
      const _this = this;
      this.$http
        .post("/api/tag/modifyChooseState", {
          params: {
            cId: cId
          }
        }, {})
        .then((response) => {
          _this.$message({
            message: '设置成功',
            type: 'success',
            duration: 1000
          });
          _this.getTagData();
        });
    },
    handleChoose(index, row) {
      let cId = row['id'];
      this.currentTagData = this.tagsData.find((d)=>{return d['id'] = cId;});
      this.ModifyChooseTag(cId);
    },
    handleEdit(index, row) {
      this.tableShow = false;
      this.editShow = true;
    },
    handleDelete(index, row) {
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.isChoose) {
        return 'choose-row';
      }
      return '';
    },
    getTagData: function () {
      const _this = this;
      this.$http
        .get("/api/tag/getData", { params: {} }, {})
        .then((response) => {
          var tags = response.body;
          _this.tagsData = tags;
          // }
        });
    },
  },
  created() {



    const _this = this;
    this.getTagData()
    this.$nextTick(() => {
    });
  },
  mounted() {
    const _this = this

  },
  // beforeDestroy() {
  //   clearInterval(this.moveTimer);
  // },
} 
</script>

<style>
@import './index.css';
</style>
