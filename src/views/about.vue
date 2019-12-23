<template>
  <div class="contain paddTop">
    <div class="tu-box">
      <swiper
        :options="swiperList.length>1?swiperOption:''"
        ref="mySwiper"
        @someSwiperEvent="callback"
      >
        <!-- slides -->
        <swiper-slide class="swiper-item" v-for="item of swiperList" :key="item.id">
          <img
            style="object-fit: cover;"
            width="100%"
            height="100%"
            class="swiper-img"
            :src="item.imgUrl"
            alt="去哪儿门票"
          />
        </swiper-slide>
        <!-- Optional controls -->
        <div
          v-if="swiperList.length>1"
          class="swiper-pagination"
          id="swiper-pagination"
          slot="pagination"
        ></div>
        <div
          v-if="swiperList.length>1"
          class="swiper-button-prev"
          id="swiper-button-prev"
          slot="button-prev"
        ></div>
        <div
          v-if="swiperList.length>1"
          class="swiper-button-next"
          id="swiper-button-next"
          slot="button-next"
        ></div>
      </swiper>
    </div>
    <h2>公司简介</h2>
    <p>
      上户无忧家政平台由深圳市银弹科技有限公司运营，总部位于深圳。我们积极响应国务院关于家政行业提质扩容文件的号召，立志于打造中国家政行业信用平台，为中国家庭服务业的提质扩容保驾护航。公司创始团队来自于互联网行业和家政行业，我们坚信家政行业的美好未来，同时家政行业的现实痛点也让我们如鲠在喉，于是我们决定用科技的力量帮助中国70万家政企业转型升级。
      我们平均年龄不超过30岁，我们积极阳光、勇于创新，希望与您携手共创中国家政行业美好明天！
    </p>
    <h2>平台介绍</h2>
    <p>
      上户无忧家政平台是一个针对家政行业的招聘求职平台（目前运行在微信小程序，后期会有APP上线），目前对家政企业和家政服务人员均免费开放，注册认证即可使用。
      <br />其主要功能有发单找人、简历管理、阿姨信用、家政保险、同行协作，具体介绍如下：
      <br />发单找人：免费快速发单，全网匹配阿姨
      <br />家政公司通过认证后，可在平台上免费发布订单，订单可选择对阿姨可见，或对同行可见，亦或阿姨同行均可见，15万注册阿姨向您投递简历，3000家家政公司为您推荐阿姨，助您尽快找到合适阿姨，搞定订单。
      <br />简历管理：专业简历系统，提升公司形象
      <br />专业家政简历系统——告别传统手工简历，精细管理的同时向客户展示家政公司的专业性，树立公司良好形象，提高成单率。操作简单，5分钟完成阿姨简历制作，不管是阿姨自行接单还是同行推荐的阿姨，您分享给客户的简历均绑定您公司预设的联系方式，省去同行间重复制作简历的麻烦。
      <br />阿姨信用：背调征信查询，规避用人风险
      <br />一方面，平台通过联网全国公安数据中心和全国法院被执行人信息查询平台，核查服务人员身份真实性及是否有失信记录；另一方面通过家政公司和客户对服务人员的评价大数据，综合给出服务人员的信用分值，让家政公司择优推荐给客户。
      <br />家政保险：最全家政保险，护航家政行业
      <br />平台联合中国平安、中国人寿、中国人保推出多种家政保险，家政公司可以根据自己的需要灵活选择，保障内容包括：人身意外险、财产险、第三方人身伤害险，让客户省心、服务人员宽心，为家政公司保驾护航。
      <br />同行协作：无法签约客户，同行协作完成
      <br />本公司无法签约或者续约的客户，超出本公司服务区域或者服务范围的客户均可发布同行协作订单，约定好协作佣金，邀请同行一起来搞定订单，从而变废为宝，充分利用资源，赚取额外收益。
      <br />
    </p>
    <h2>开发团队</h2>
    <div class="tu-box2">
      <swiper :options="swiperOption2" ref="mySwiper2" @someSwiperEvent="callback2">
        <!-- slides -->
        <swiper-slide class="swiper-item" v-for="item of shenghuo" :key="item.id">
          <img
            style="object-fit: cover;"
            width="100%"
            height="100%"
            class="swiper-img"
            :src="item"
            alt="开发人员"
          />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  components: {
    swiper,
    swiperSlide
  },
  // 这个是配置head信息，vue-meta-info插进提供的功能
  metaInfo: {
    title: "上户",
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
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    swiper() {
      return this.$refs.mySwiper2.swiper;
    }
  },
  data() {
    return {
      shenghuo: [
        require("../assets/shenhuo1.png"),
        require("../assets/shenhuo3.png"),
        require("../assets/shenhuo2.png")
      ],
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        pagination: { el: ".swiper-pagination" },
        //循环
        loop: true,
        //每张播放时长3秒，自动播放
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        //滑动速度
        speed: 500,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
        // delay:1000
      },
      swiperOption2: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        //循环
        loop: false,
        //每张播放时长3秒，自动播放
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        //滑动速度
        speed: 500,
        slidesPerView: 3,
        spaceBetween: 40

        // delay:1000
      },
      swiperList: [
        {
          id: "001",
          imgUrl: require("../assets/about-banan1.png")
        }
      ]
    };
  },
  mounted() {},

  methods: {}
};
</script>

 <style lang="less" scoped>
.tu-box {
  width: 1200px;
  height: 319px;
}
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-button-next {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%2300a05a'%2F%3E%3C%2Fsvg%3E");
}
.swiper-button-prev {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%2300a05a'%2F%3E%3C%2Fsvg%3E");
}

h2 {
  margin: 30px 0 12px 0;
  font-size: 16px;
  font-weight: bold;
  color: rgba(42, 42, 42, 1);
  line-height: 22px;
  letter-spacing: 1px;
  text-align: left;
}
p {
  text-align: justify;
  font-size: 14px;
  font-weight: 500;
  color: rgba(98, 98, 98, 1);
  line-height: 26px;
}
.tu-box2 {
  width: 100%;
  height: 197px;
  margin-bottom: 76px;
}
</style>