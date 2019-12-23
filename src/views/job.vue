<template>
  <div class="yemian paddTop">
    <div class="contain contain-page">
      <div class="tabs">
        <div
          @click="itemClick(item,index)"
          v-for="(item,index) in tabs"
          :key="index"
          class="tabs-item"
        >
          <div class="tabs-text">{{item.name}}</div>
          <div class="tabbar" v-if="tabState==index"></div>
        </div>
      </div>

      <keep-alive>
        <component
          @itemAuntClick="itemAuntClick"
          @itemJobClick="itemJobClick"
          v-bind:is="componentName"
        ></component>
      </keep-alive>
    </div>

    <div class="fixbody"></div>
    <Modal style="text-align:center" :footer-hide="true" v-model="boxShow">
      <p
        style="font-size: 18px;
  font-weight: bold;
  margin:50px 0 20px 0;
  color: rgba(42, 42, 42, 1);
  line-height: 25px;"
        class="title"
      >家政好工作，高薪上户快</p>
      <p>
        <!-- <img v-if="tabState==0" width="278px" src="../assets/shanghujiaz.jpg" alt /> -->
        <!-- <img v-if="tabState==1" width="278px" src="../assets/shanghugongsi.jpg" alt /> -->
        <img width="278px" src="../assets/gongzhonghao.jpg" alt />
      </p>
      <p
        style="font-size:18px;
        margin-top:20px;
        padding-bottom:50px;
font-family:PingFangSC-Regular,PingFang SC;
 color:rgba(144,144,144,1);
line-height:25px;"
      ></p>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
import aunt from "@/components/aunt";
import job from "@/components/job";

export default {
  components: {
    aunt
  },// 这个是配置head信息，vue-meta-info插进提供的功能
  metaInfo: {
    title: "上户", // set a title
    meta: [
        {
        // set meta
        name: "keyWords",
        content:
          "上户,家政,保姆,月嫂,育婴师,育儿嫂,钟点工,护工,招聘,求职,家政阿姨,家政招聘"
      },
      {
        name: "description",
        content:
          "上户家政招聘求职平台，为家政公司找家政阿姨，帮助家政阿姨快速上户"
      }
    ],
    link: [
      {
        // set link
        rel: "shortcut icon",
        href: "http://jiazheng52.com/jzPc/static/img/favicon.ico"
      }
    ]
  },
  data() {
    return {
      tabState: 0,
      boxShow: false,
      tabs: [
        { name: "最新招聘", component: job },
        { name: "阿姨推荐", component: aunt }
      ],
      componentName: job
    };
  },
  mounted() {
    this.winWidth =
      document.body.clientWidth || document.documentElement.clientWidth; //body宽度

    this.winHeight = window.screen.availHeight; //电脑宽度
  },
  computed: {},
  methods: {
    itemJobClick(title, item, index) {
      if (title == "job") {
        this.boxShow = true;
      }
    },
    itemAuntClick(title, item, index) {
      if (title == "aunt") {
        this.boxShow = true;
      }
    },
    itemClick(item, index) {
      this.tabState = index;
      this.componentName = item.component;
    }
  }
};
</script>
 <style lang="less" scoped>
.paddTop {
  padding-top: 184px;
}
.yemian {
  width: 100%;
  height: 100%;
  .fixbody {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: #f9f9f9;
  }
  .contain-page {
    position: relative;
    z-index: 1;
  }
}
.tabs {
  width: 1200px;
  margin: 24px 0;
  height: 56px;
  position: fixed;
  top: 80px;
  z-index: 1;
  background: rgba(255, 255, 255, 1);
  .tabs-item {
    float: left;
    height: 56px;
    line-height: 56px;
    padding: 0 40px;
    cursor: pointer;
    .tabs-text {
    }
    .tabbar {
      width: 30px;
      height: 2px;
      background: rgba(0, 160, 90, 1);
    }
  }
}
</style>