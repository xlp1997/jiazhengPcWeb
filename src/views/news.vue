<template>
  <div class="contain paddTop">
    <div style="width:10px;height:30px;"></div>
    <div v-for="(item,index) in rows" :key="index" class="list">
      <div class="timee">
        <div class="timee-dd">{{item.establishTime|format('dd')}}</div>
        <div class="timee-mm">{{item.establishTime|format('yyyy/MM')}}</div>
      </div>

      <div class="right-list">
        <div class="quan1"></div>
        <div class="quan2"></div>

        <h2>
          <div class="tag-box" v-if="item.informationType==1">官方动态</div>
          <div class="tag-box" v-if="item.informationType==2">产品更新</div>
          <span @click="itemClick(item,index)" class="sapn-h2">{{item.informationTitle}}</span>
        </h2>
        <div @click="itemClick(item,index)" v-for="(item2,index2) in item.contentList" :key="index2" class="list-bottom">
          <div v-if="item2.photoList.length>0" class="wapper">
            <img :src="item2.photoList[0].photoUrl" alt="资讯" />
          </div>
          <div class="content">{{item2.fragmentTextDescribe}}</div>
        </div>
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
                    var arr = [];
                    var text = {};
                    if (item.contentList.length > 0) {
                      // text.fragmentTextDescribe =
                      //   item.contentList[0].fragmentTextDescribe;

                      // for (var i = 0; i < item.contentList.length; i++) {
                      //   if (item.contentList[i].photoList.length > 0) {
                      //     for (
                      //       var j = 0;
                      //       j < item.contentList[i].photoList.length;
                      //       j++
                      //     ) {
                      //       if (item.contentList[i].photoList[j].photoUrl) {
                      //         text.photoUrl =
                      //           item.contentList[i].photoList[j].photoUrl;
                      //         break;
                      //       }
                      //     }
                      //   }
                      // }
                      arr.push(item.contentList[0]);
                      // console.log(arr);
                      item.contentList = arr;
                      // console.log(item.contentList);
                    }
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
    },
    itemClick(item, index) {
      this.$router.push("/newsDetail/" + item.webInformationId);
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
.right-list {
  cursor: pointer;
  float: left;
  padding: 0px 0 50px 70px;
  border-left: 1px solid #e5e5e5;
  position: relative;
}
.right-list:hover {
  // background: #e5e5e5;
}
.list {
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
  .sapn-h2:hover {
    text-decoration: underline;
  }
  .list-bottom {
    display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box; /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox; /* TWEENER - IE 10 */
    display: -webkit-flex; /* NEW - Chrome */
    display: flex;
    align-items: center;
    width: 866px;
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
      width: 694px;
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
  .list-bottom:hover .content {
    text-decoration: underline;
  }
}
.tag-box {
  background: rgba(0, 160, 90, 1);
  border-radius: 4px;
  display: inline-block;
  padding: 4px 12px;
  color: #ffffff;
  margin-right: 17px;
}
.quan1 {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  left: -6.5px;
  top: 10px;
  position: absolute;
  background: rgba(229, 229, 229, 1);
}
.quan2 {
  border-radius: 50%;
  left: -3.5px;
  top: 13px;
  position: absolute;
  width: 7px;
  height: 7px;
  background: rgba(0, 160, 90, 1);
}

.timee {
  float: left;
  width: 190px;
  color: rgba(42, 42, 42, 1);
  font-weight: bold;
  .timee-dd {
    font-size: 24px;
  }
  .timee-mm {
    font-size: 18px;
  }
}
</style>