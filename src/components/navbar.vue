<template>
  <div>
    <div class="contain">
      <div class="navbar-box">
        <div class="navbar-left">
          <a href="/">
            <img width="88px" height="33px" src="../assets/logo.png" alt="上户" />
          </a>
        </div>
        <div class="navbar-right">
          <ul class="ul-box">
            <li @click="itemClick(item,index)" v-for="(item,index) in tabs" :key="index">
              {{item.txet}}
              <div class="nav-bot" v-if="tabState==index"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  // 这个是配置head信息，vue-meta-info插进提供的功能
  metaInfo: {
    title: "page1",
    meta: [
      {
        name: "keyWords",
        content: "这个页面是page1"
      }
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://unpkg.com/element-ui/lib/theme-chalk/index.css"
      }
    ]
  },
  props: ["tabState"],
  data() {
    return {
      tabState: 0,
      tabs: [
        { txet: "首页", goRoute: "/" },
        { txet: "资讯", goRoute: "/news" },
        { txet: "工作机会", goRoute: "/job" },
        { txet: "关于我们", goRoute: "/about" }
      ],
      staticData: "这是data里的静态数据",
      forComputed: 10,
      list: []
    };
  },
  mounted() {
    console.log("tabStatetabStatetabState", this.tabState);
    // this.getList();
  },
  computed: {
    staticComputed() {
      return "这是计算属性里的静态数据" + this.forComputed * 66;
    },
    listLength() {
      return this.list.length;
    }
  },
  methods: {
    itemClick(item, index) {
      this.tabState = index;
      this.$router.push(item.goRoute);
    },
    getList() {
      axios
        .get("http://rapapi.org/mockjsdata/35670/login/get", {
          params: { id: 11 }
        })
        .then(_ => {
          let res = _.data;
          this.list = res.data;
        });
    }
  }
};
</script>
 <style lang="less" scoped>
.contain {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
  height: 74px;
  box-shadow: 0px 3px 11px 0px rgba(240, 240, 240, 0.68);
}
.navbar-box {
  margin: 0 auto;
  height: 74px;
  line-height: 74px;

  width: 1200px;
  background: rgba(255, 255, 255, 1);
  .navbar-left {
    width: 50%;
    float: left;
    text-align: left;
    img {
      vertical-align: middle;
     }
  }
  .navbar-right {
    width: 50%;
    float: left;
    text-align: right;
  }
}
.ul-box {
  margin: 0 0 0 60px;
  padding: 0;
  font-size: 16px;
  display: inline-block;
  height: 74px;

  li {
    list-style: none;
    float: left;
    padding: 0 30px;
    position: relative;
    cursor: pointer;

    .nav-bot {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 18px;
      height: 3px;
      background: #00a05a;
      transform: translateX(-100%);
    }
  }
  li:hover {
    color: #00a05a;

    background: rgba(0, 0, 0, 0.1);
  }
}
</style>