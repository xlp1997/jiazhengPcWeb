<template>
  <div>
    <saixuan @saiData="saiData" type="最新招聘"></saixuan>

    <div class="flex-h flex-hw gg">
      <div
        @click="itemJobClick(item,index)"
        class="list"
        :style="{}"
        v-for="(item,index) in rows"
        :key="index"
      >
        <div class="name-money flex-h">
          <div class="name flex1">
            {{item.serviceName}}
            <span v-if="item.serviceName=='钟点工'">| {{item.isHome==2?"临时":"包月"}}</span>
            <span v-else>{{item.isHome==2?"| 住家":item.isHome==1?"| 不住家":""}}</span>
          </div>
          <!-- <div class="money">{{item.salary}}/月</div> -->

          <div v-if="item.serviceName=='钟点工'" class="money">
            <span v-if="item.isHome==2">￥{{item.salary}}/小时/人</span>
            <span v-if="item.isHome==1">￥{{item.salary}}/人</span>
          </div>

          <div v-else class="money">
            <span>{{"￥"+item.salary+"左右/月"}}</span>
          </div>
        </div>
        <div class="xiuxi">{{item.restDays}}</div>
        <div v-if="item.serviceName=='钟点工'&&item.isHome==2" class="item-box">
          <div
            class="item-tag"
            v-for="(item4,index4) in item.serviceContent"
            :key="index4"
          >{{item4}}</div>
        </div>
        <div v-else class="item-box">
          <div
            class="item-tag"
            v-for="(item4,index4) in item.serviceContent"
            :key="index4"
          >{{item4.serviceContentName}}{{item4.text?"("+item4.text+")":""}}</div>
        </div>

        <div class="city flex-h flex-vc">
          <img
            style="margin-right:10px;"
            width="12px"
            height="14px"
            src="../assets/cityicon.png"
            alt
          />
          {{item.workAddressDetails}}
        </div>
      </div>
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
      <!-- <div v-if="loadingState==1">没有更多了</div> -->
      <!-- {{loadingState+"--"+total}} -->
      <div style="color: #909090;" v-if="total==0&&loadingState==1">没有更多了</div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import saixuan from "../components/saixuan";
import env from "../../static/utils/env";

export default {
  components: { saixuan },
  data() {
    return {
      loadingState: 1, //1成功2失败3加载中
      pageSize: 12,
      page: 1,
      total: 0,
      rows: [],
      zongPage: 0,
      salary: "",
      experience: "",
      workAddress: "",
      serviceIdStr: ""
    };
  },
  methods: {
    itemJobClick(item, index) {
      this.$emit("itemJobClick", "job", item, index);
    },
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
    saiData(e) {
      console.log(e);
      this.salary = e.salary;
      this.experience = e.experience;
      this.workAddress = e.workAddress;
      this.serviceIdStr = e.serviceIdStr;
      this.rows = [];
      this.page = 1;

      this.pageDataList(this.page, this.pageSize);
    },

    pageDataList(page, pageSize) {
      // serviceId: "", //服务id
      //         salary: "", //薪资 传名称
      //         experience: "", //经验/要求 传名称
      //         workAddress: "" //地区
      var data = {
        page: page,
        pageSize: pageSize,
        salary: this.salary,
        experience: this.experience,
        workAddress: this.workAddress,
        serviceIdStr: this.serviceIdStr
      };

      this.loadingState = 3; //加载中
      const _this = this;
      axios.post(env.orderList, data).then(_ => {
        let res = _.data;
        if (res.reCode == 100) {
          if (res.data) {
            if (res.data.dateCode == 200) {
              if (res.data.total||res.data.total==0) {
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
                  if (item.serviceContent) {
                    item.serviceContent = _this.serviceContentFormat(item);
                  }
                  _this.rows.push(item);
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
    serviceContentFormat(item) {
      if (item.serviceName == "钟点工" && item.isHome == 2) {
        if (item.serviceContent) {
          return item.serviceContent.split(",");
        }
      } else {
        var aa = [];
        item.serviceContent = JSON.parse(item.serviceContent);
        item.serviceContent.forEach((item2, index2) => {
          aa.push({
            serviceContentName: item2.serviceContentName,
            text: ""
          });
          var a = [];
          item2.childrenList.forEach((item3, index3) => {
            if (item3.serviceContenType == 4) {
              item3.childrenList.forEach((item4, index4) => {
                if (
                  item4.serviceContentName ||
                  item4.serviceContentName == "0"
                ) {
                  a.push(item4.serviceContentName);
                }
              });
            }
            if (item3.serviceContenType == 3) {
              if (item3.serviceContentName == "打扫卫生的住所面积") {
                if (item3.text || item3.text == "0") {
                  a.push(item3.text + "平米");
                }
              } else {
                if (item3.text || item3.text == "0") {
                  a.push(item3.text);
                }
              }
            }
            if (item3.serviceContenType == 5) {
              if (item3.text || item3.text == "0") {
                a.push(item3.text);
              }
            }
            if (item3.serviceContenType == 1) {
              item3.childrenList.forEach((item4, index4) => {
                if (item4.text || item4.text == "0") {
                  a.push(item4.serviceContentName + item4.text);
                }
              });
            }
            // console.log(a);
            aa[index2].text = a.join("|");
          });
        });
        // console.log(aa);
        return aa;
      }
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
        if (_this.page < _this.zongPage&&_this.page<=5) {
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
.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
.gg {
  /* 09版 */
  -webkit-box-pack: space-between;
  /* 12版 */
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  -ms-justify-content: space-between;
  -o-justify-content: space-between;
  justify-content: space-between;
}
.list {
  cursor: pointer;

  width: 384px;
  background: rgba(255, 255, 255, 1);
  padding: 25px;
  margin-bottom: 24px;
  //   float: left;
  .name-money {
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
    letter-spacing: 1px;
    .name {
      color: rgba(42, 42, 42, 1);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: left;
    }
    .money {
      color: #ff3131;
      margin-left: 10px;
    }
  }
  .xiuxi {
    text-align: left;
    margin: 25px 0;
    color: #626262;
    font-size: 16px;
  }
  .item-box {
    width: 100%;
    overflow: hidden;
    height: 80px;
    .item-tag {
      font-size: 14px;
      font-weight: 400;
      padding: 3px 10px;
      background: #f8f8f8;
      border-radius: 2px;
      color: rgba(144, 144, 144, 1);
      line-height: 20px;
      letter-spacing: 1px;
      float: left;
      margin-right: 16px;
      margin-bottom: 16px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      max-width: 100%;
    }
  }
  .city {
    clear: both;
    vertical-align: middle;
    color: #626262;
    font-size: 16px;
    text-align: left;
    margin-top: 14px;
  }
}
.list:hover {
  transition-duration: 500ms;
  -webkit-box-shadow: #ccc 0px 10px 10px;
  -moz-box-shadow: #ccc 0px 10px 10px;
  box-shadow: #ccc 0px 10px 10px;
}

/* 子元素-平均分栏 */
.flex1 {
  -webkit-box-flex: 1; /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-flex: 1; /* OLD - Firefox 19- */
  width: 20%; /* For old syntax, otherwise collapses. */
  -webkit-flex: 1; /* Chrome */
  -ms-flex: 1; /* IE 10 */
  flex: 1; /* NEW, Spec - Opera 12.1, Firefox 20+ */
}
/* 父元素-横向排列（主轴） */
.flex-h {
  display: box; /* OLD - Android 4.4- */

  display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6 */
  display: -moz-box; /* OLD - Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox; /* TWEENER - IE 10 */
  display: -webkit-flex; /* NEW - Chrome */
  display: flex; /* NEW, Spec - Opera 12.1, Firefox 20+ */

  /* 09版 */
  -webkit-box-orient: horizontal;
  /* 12版 */
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  -o-flex-direction: row;
  flex-direction: row;
}
/* 父元素-横向换行 */
.flex-hw {
  /* 09版 */
  /*-webkit-box-lines: multiple;*/
  /* 12版 */
  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  -o-flex-wrap: wrap;
  flex-wrap: wrap;
}
/* 父元素-水平居中（主轴是横向才生效） */
.flex-hc {
  /* 09版 */
  -webkit-box-pack: center;
  /* 12版 */
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  -o-justify-content: center;
  justify-content: center;
  /* 其它取值如下：
        align-items     主轴原点方向对齐
        flex-end        主轴延伸方向对齐
        space-between   等间距排列，首尾不留白
        space-around    等间距排列，首尾留白
     */
}

/* 父元素-纵向排列（主轴） */
.flex-v {
  display: box; /* OLD - Android 4.4- */

  display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6 */
  display: -moz-box; /* OLD - Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox; /* TWEENER - IE 10 */
  display: -webkit-flex; /* NEW - Chrome */
  display: flex; /* NEW, Spec - Opera 12.1, Firefox 20+ */

  /* 09版 */
  -webkit-box-orient: vertical;
  /* 12版 */
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  -o-flex-direction: column;
  flex-direction: column;
}
/* 父元素-纵向换行 */
.flex-vw {
  /* 09版 */
  /*-webkit-box-lines: multiple;*/
  /* 12版 */
  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  -o-flex-wrap: wrap;
  flex-wrap: wrap;
}
/* 父元素-竖直居中（主轴是横向才生效） */
.flex-vc {
  /* 09版 */
  -webkit-box-align: center;
  /* 12版 */
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  -o-align-items: center;
  align-items: center;
}
/* 子元素-显示在从左向右（从上向下）第1个位置，用于改变源文档顺序显示 */
.flex-1 {
  -webkit-box-ordinal-group: 1; /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-ordinal-group: 1; /* OLD - Firefox 19- */
  -ms-flex-order: 1; /* TWEENER - IE 10 */
  -webkit-order: 1; /* NEW - Chrome */
  order: 1; /* NEW, Spec - Opera 12.1, Firefox 20+ */
}
/* 子元素-显示在从左向右（从上向下）第2个位置，用于改变源文档顺序显示 */
.flex-2 {
  -webkit-box-ordinal-group: 2; /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-ordinal-group: 2; /* OLD - Firefox 19- */
  -ms-flex-order: 2; /* TWEENER - IE 10 */
  -webkit-order: 2; /* NEW - Chrome */
  order: 2; /* NEW, Spec - Opera 12.1, Firefox 20+ */
}
</style>