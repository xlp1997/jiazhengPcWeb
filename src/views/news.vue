<template>
  <div class="contain paddTop">
    <div v-for="(item,index) in rows" :key="index" class="list">
      <p>{{item.establishTime|format('yyyy-MM-dd')}}</p>
      <h2>{{item.informationTitle}}</h2>
      <div v-for="(item,index) in item.contentList" :key="index" class="list-bottom">
        <div v-if="item.photoList.length>0" class="wapper">
          <img :src="item.photoList[0].photoUrl" alt="资讯" />
        </div>
        <div class="content">{{item.fragmentTextDescribe}}</div>
      </div>
      <div style="clear:both;"></div>
    </div>
    <div style="padding:30px 0;">
      <Spin v-if="loadingState==3">
        <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
        <div>努力加载中...</div>
      </Spin>
      <div
        style="cursor: pointer;"
        @click="pageDataList(page,pageSize);"
        v-if="loadingState==2"
      >加载失败，点击重试</div>
      <div style="color: #909090;" v-if="total==0&&loadingState==1">没有更多了</div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import env from "../../static/utils/env";
export default {
  components: {}, // 这个是配置head信息，vue-meta-info插进提供的功能
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
      loadingState: 1, //1成功2失败3加载中
      pageSize: 10,
      page: 1,
      total: 0,
      rows: [],
      zongPage: 0,
      list: [
        {
          time: "2019年12月5日",
          img:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575899278632&di=9c7820ebb6667a1ca6765a2164eadd53&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2019-03-09%2F5c8337c29434e_270_185.jpg",
          title: "官方动态-深圳家政行业人才联盟大会圆满成功",
          content:
            "2019年9月10日，由葆康丽家政培训机构和52家政平台联合发起的深圳市第一届家政行业人才联盟大会在葆康丽家政培训机构位于宝安中心的总部圆满落下帷幕。近百位家政公司负责人及业内人士出席了本次大会，大家积极探讨了“家政36条”对行业的影响，展望了行业未来，同时也认真总结了目前家政行业的“三大痛点”，即获客成本高、优质阿姨少、经营管理难，并提出了部分解决方案。"
        },
        {
          time: "2019年12月15日",
          img:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575899278632&di=9c7820ebb6667a1ca6765a2164eadd53&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2019-03-09%2F5c8337c29434e_270_185.jpg",
          title: "产品更新-如何将52家政小程序添加到手机桌面",
          content:
            "2019年9月10日，由葆康丽家政培训机构和52家政平台联合发起的深圳市第一届家政行业人才联盟大会在葆康丽家政培训机构位于宝安中心的总部圆满落下帷幕。近百位家政公司负责人及业内人士出席了本次大会，大家积极探讨了“家政36条”对行业的影响，展望了行业未来，同时也认真总结了目前家政行业的“三大痛点”，即获客成本高、优质阿姨少、经营管理难，并提出了部分解决方案。"
        }
      ]
    };
  },
  methods: {
    getScrollTop() {
      var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop =
        bodyScrollTop - documentScrollTop > 0
          ? bodyScrollTop
          : documentScrollTop;
      return scrollTop;
    },
    getScrollHeight() {
      var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
      }
      scrollHeight =
        bodyScrollHeight - documentScrollHeight > 0
          ? bodyScrollHeight
          : documentScrollHeight;
      return scrollHeight;
    },
    getWindowHeight() {
      var windowHeight = 0;
      if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
      } else {
        windowHeight = document.body.clientHeight;
      }
      return windowHeight;
    },

    pageDataList(page, pageSize) {
      var data = {
        page: page,
        pageSize: pageSize
      };

      this.loadingState = 3; //加载中
      const _this = this;
      axios.post(env.newsList, data).then(_ => {
        let res = _.data;
        if (res.reCode == 100) {
          if (res.data) {
            if (res.data.dateCode == 200) {
              if (res.data.total || res.data.total == 0) {
                _this.total = res.data.total;
              }
              var zongPage = Math.ceil(res.data.total / _this.pageSize); //总条数/每页条数=总需几页
              _this.zongPage = zongPage;
              if (_this.page >= zongPage) {
                if (zongPage > 0) {
                  _this.page = zongPage;
                }
              }

              if (res.data.rows && res.data.rows.length > 0) {
                res.data.rows.forEach((item, index) => {
                  if (item.isHide == 1) {
                    _this.rows.push(item);
                  }
                });
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
    this.pageDataList(this.page, this.pageSize);
    const _this = this;
    window.onscroll = function() {
      if (
        _this.getScrollTop() + _this.getWindowHeight() ==
        _this.getScrollHeight()
      ) {
        if (_this.page < _this.zongPage) {
          _this.page++;
          _this.pageDataList(_this.page, _this.pageSize);
        }
      }
    };
  }
};
</script>
<style lang="less" scoped>
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.list {
  margin-top: 30px;
  p {
    text-align: left;
    font-size: 14px;
    font-weight: 400;
    color: rgba(144, 144, 144, 1);
    line-height: 20px;
  }
  h2 {
    text-align: left;
    font-size: 18px;
    font-weight: 500;
    color: rgba(42, 42, 42, 1);
    line-height: 25px;
    margin: 6px 0 12px 0;
    font-weight: bold;
  }
  .list-bottom {
    display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box; /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox; /* TWEENER - IE 10 */
    display: -webkit-flex; /* NEW - Chrome */
    display: flex;
    align-items: center;
    width: 684px;
    height: 150px;
    background: rgba(250, 250, 250, 1);
    padding: 10px;
    .wapper {
      width: 130px;
      height: 130px;
      float: left;
      margin-right: 15px;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
    .content {
      width: 500px;
      float: left;
      font-size: 12px;
      font-weight: 400;
      color: rgba(144, 144, 144, 1);
      line-height: 22px;
      text-align: justify;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
      overflow: hidden;
    }
  }
}
</style>