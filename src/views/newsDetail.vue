<template>
  <div class="paddTop">
    <div class="contain">
      <div style="text-align:left;color:#909090;padding:30px 0;">首页 > 资讯 > 新闻详情</div>
      <div>
        <Spin v-if="loadingState==3">
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div>努力加载中...</div>
        </Spin>
        <div style="cursor: pointer;" @click="pageDataList();" v-if="loadingState==2">加载失败，点击重试</div>
      </div>
      <h2>
        <div class="tag-box" v-if="infoMap.informationType==1">官方动态</div>
        <div class="tag-box" v-if="infoMap.informationType==2">产品更新</div>
        <span class="sapn-h2">{{infoMap.informationTitle}}</span>
      </h2>
      <div class="timee-mm">{{infoMap.establishTime|format('yyyy/MM/dd')}}</div>
      <div v-for="(item,index) in infoMap.contentList" :key="index">
        <div
          style="text-align:left;margin-bottom:18px;"
          v-for="(item2,index2 ) in item.photoList"
          :key="index2"
        >
          <img v-if="item2.photoUrl" :src="item2.photoUrl" alt />
        </div>
        <p>{{item.fragmentTextDescribe}}</p>
      </div>
    </div>
    <foot v-if="footState"></foot>
  </div>
</template>

<script>
import env from "../../static/utils/env";
import axios from "axios";

import foot from "@/components/foot";

export default {
  metaInfo: {
    title: "上户-家政好工作，高薪上户快", // set a title
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
    return { loadingState: 1, infoMap: {}, footState: false };
  },
  components: { foot },
  methods: {
    pageDataList() {
      var data = {
        webInformationId: this.$route.params.id
      };

      this.loadingState = 3; //加载中
      const _this = this;
      axios.post(env.newsListDetail, data).then(_ => {
        let res = _.data;
        if (res.reCode == 100) {
          if (res.data) {
            if (res.data.dateCode == 200) {
              if (res.data.infoMap) {
                _this.infoMap = res.data.infoMap;
              }
              _this.loadingState = 1;
            } else {
              _this.$Message["error"]({
                background: true,
                content: res.data.dateMsg
              });
            }
          }
        } else {
          _this.loadingState = 2;

          _this.$Message["error"]({
            background: true,
            content: "加载失败 " + res.reMsg
          });
        }
      });
    }
  },
  mounted() {
    const _this = this;
    this.pageDataList();
    setTimeout(() => {
      _this.footState = true;
    }, 500);
  }
};
</script>
<style lang="less" scoped>
h2 {
  text-align: left;
  font-size: 18px;
  font-weight: 500;
  color: rgba(42, 42, 42, 1);
  line-height: 25px;
  margin: 6px 0 12px 0;
  font-weight: bold;
}
.tag-box {
  background: rgba(0, 160, 90, 1);
  border-radius: 4px;
  display: inline-block;
  padding: 4px 12px;
  color: #ffffff;
  margin-right: 17px;
}
.timee-mm {
  text-align: left;
  font-size: 14px;
  color: rgba(144, 144, 144, 1);
  line-height: 20px;
  padding: 17px 0;
}
p {
  text-align: left;
  font-size: 12px;
  color: #626262;
  line-height: 22px;
  margin-bottom: 30px;
}
</style>
