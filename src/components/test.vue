<template>
  <div>
    陈
    <Button type="primary">Primary</Button>
    <Row>
      <Col span="12">col-12</Col>
      <Col span="12">col-12</Col>
    </Row>
    <h3>这是page1</h3>
    <p>state里面的静态数据：{{staticData}}</p>
    <p>计算属性里的静态数据：{{staticComputed}}</p>
    <p>axios请求的数据list的长度为：{{listLength}}</p>
    <div v-for="(item, index) in list" :key="index">
      <h4>{{item.address}}</h4>
      <img :src="item.image" />
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
  data() {
    return {
      staticData: "这是data里的静态数据",
      forComputed: 10,
      list: []
    };
  },
  mounted() {
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
 