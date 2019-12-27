<template>
  <div class="paddTop">
    <div class="tu-box-all">

   
    <div class="tu-box">
      <swiper :options="swiperList.length>1?swiperOption:''" ref="mySwiper">
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
    </div> </div>
    <div class="contain">
      <h2>家政公司的好帮手</h2>
      <h4>让订单配人不再困难，生意更好做</h4>

      <div class="content-1">
        <div class="content-1-left">
          <img src="../assets/company.png" alt />
        </div>
        <div class="content-1-right">
          <div class="content-1-right-box" v-for="(item,index) in datalist2" :key="index">
            <div class="img-box">
              <img width="24px" height="20px" :src="item.img" alt />
            </div>
            <div>{{item.text}}</div>
          </div>
        </div>
      </div>
      <div style="clear:both;"></div>
      <h2>已有3000+家政公司在线发布招聘信息</h2>
      <h4>家政行业垂直招聘始创者</h4>
      <div class="card-box">
        <ul>
          <li
            :style="{marginRight:(cardData.length-1)==index?'':'40px'}"
            v-for="(item,index) in cardData"
            :key="index"
            class="card-list"
          >
            <div class="text">{{item.text}}</div>
            <div v-if="index==2" class="wrapper" style="width:120px;">
              <img :src="item.img" alt="家政公司" />
            </div>
            <div v-else class="wrapper">
              <img :src="item.img" alt="家政公司" />
            </div>
            <div class="name">{{item.name}}</div>
          </li>
        </ul>
      </div>
      <div style="clear:both;"></div>

      <h2>家政人员求职好帮手</h2>
      <h4>让订单配人不再困难，生意更好做</h4>
      <div class="content-2">
        <div class="img-box">
          <img src="../assets/aunt.png" alt="阿姨" />
        </div>
        <div class="content-right">
          <div class="top">
            <div class="card">
              <div class="wrapper">
                <img src="../assets/yuan1.png" alt />
              </div>
              <div class="text">海量工作机会，等你来挑选</div>
            </div>
            <div class="card" style="margin-left:50px;">
              <div class="wrapper">
                <img src="../assets/yuan2.png" alt />
              </div>
              <div class="text">介绍姐妹注册还有红包哟</div>
            </div>
          </div>
          <div style="clear:both;"></div>
          <div class="top" style="margin-top:50px;">
            <div class="card">
              <div class="wrapper">
                <img src="../assets/yuan3.png" alt />
              </div>
              <div class="text">在线管理简历，方便快捷</div>
            </div>
            <div class="card" style="margin-left:50px;">
              <div class="wrapper">
                <img src="../assets/yuan4.png" alt />
              </div>
              <div class="text">对接专职培训，先人一步</div>
            </div>
          </div>
        </div>
      </div>
      <div style="clear:both;"></div>

      <h2>已有100000+家政阿姨正在使用上户无忧</h2>
      <h4>家政好工作，高薪上户快</h4>

      <div class="card-box">
        <ul>
          <li
            style="margin-bottom: 40px;"
            :style="{marginRight:(cardData.length-1)==index?'':'40px'}"
            v-for="(item,index) in carsAuntList"
            :key="index"
            class="card-list"
          >
            <div class="text">{{item.text}}</div>
            <div class="wrapper">
              <img :src="item.img" alt="家政阿姨" />
            </div>

            <div class="name">{{item.name}}</div>
          </li>
        </ul>
      </div>
      <div style=" clear: both;"></div>
      <h2>合作伙伴</h2>
      <h4>与您携手，共创家政美好明天</h4>
      <div class="tu-box2">
        <swiper :options="swiperOption2" ref="mySwiper2" @someSwiperEvent="callback2">
          <!-- slides -->
          <swiper-slide
            style="background:#ffffff;overflow: hidden;cursor: pointer;"
            class="swiper-item"
            v-for="(item,index) of hezuoList"
            :key="index"
          >
            <img
              style="object-fit: contain;"
              width="100%"
              height="100%"
              class="hezuo-img"
              :src="item"
              alt="合作伙伴"
            />
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div style=" clear: both;"></div>
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
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  data() {
    return {
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
        slidesPerView: 4,
        spaceBetween: 40

        // delay:1000
      },
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
      swiperList: [
        {
          id: "001",
          imgUrl: require("../assets/index-banan1.png")
        }
      ],
      staticData: "这是data里的静态数据",
      forComputed: 10,
      list: [],
      hezuoList: [
        require("../assets/com-1.jpg"),
        require("../assets/com-5.png"),
        require("../assets/com-2.png"),
        require("../assets/com-6.png"),
        require("../assets/com-3.png"),
        require("../assets/com-9.jpg"),
        require("../assets/com-8.png"),
        require("../assets/com-7.png"),
        require("../assets/com-4.png")
      ],
      datalist2: [
        {
          img: require("../assets/icon1.png"),
          text: "阿姨简历管理"
        },
        {
          img: require("../assets/icon4.png"),
          text: "10万+阿姨随时对接需求"
        },
        {
          img: require("../assets/icon2.png"),
          text: "3万+同行随时在线协作"
        },
        {
          img: require("../assets/icon5.png"),
          text: "公众号、小程序、APP全平面覆盖提升效率"
        },
        {
          img: require("../assets/icon3.png"),
          text: "培训、保险、信用查询全方位服务"
        },
        {
          img: require("../assets/icon6.png"),
          text: "同行在线合单，畅享家政生活"
        }
      ],
      cardData: [
        {
          img: require("../assets/com-1.jpg"),
          text:
            "“平台帮我解决了阿姨资源不足的困难，发布需求后，马上有很多阿姨报名，再也不用像之前一样天天发朋友圈和微信群了。”",
          name: "哈哈福家政"
        },

        {
          img: require("../assets/com-5.png"),
          text:
            "同行协作，为我解决了超出服务范围和服务区域的订单，提高了资源利用率，减少了客户流失！",
          name: "喜鹊家政"
        },
        {
          img: require("../assets/com-2.png"),
          text:
            "“在线管理阿姨简历非常好用，能直接分享给雇主查看。提升了工作效率和成单机率。”",
          name: "君和母婴家政"
        },
        {
          img: require("../assets/com-4.png"),
          text:
            "“平台不仅为我提供了更多优秀的阿姨，也给我提供了更多的业务机会，是个实用便捷的好平台，而且还不收费。”",
          name: "傻大姐"
        }
      ],
      carsAuntList: [
        {
          img: require("../assets/aunt.png"),
          text:
            "“通过姐妹的介绍，上了上户无忧家政平台，看到合适的机会就报名了，结果真的上工了。以后再也不会只坐等着老师来安排工作了，感谢平台的帮助。”",
          name: "王*"
        },
        {
          img: require("../assets/aunt.png"),
          text:
            "“上了平台，感受最大就是，上工机会很多，每天都有不同岗位的上工机会，报名也非常方便，收到不少的面试通知”",
          name: "高*"
        },
        {
          img: require("../assets/aunt.png"),
          text:
            "“平台很实用，帮我找到了当前的工作，以后还会继续用上户无忧家政这个平台！”",
          name: "曾*珍"
        },
        {
          img: require("../assets/aunt.png"),
          text:
            "“使用上户无忧家政后，收到了很多工作机会，也结识了更多的老师，平台的通知提醒很及时，我已经通过面试，准备上工了，感谢上户无忧家政。”",
          name: "肖*喜"
        }
      ]
    };
  },
  mounted() {
    // this.getList();
    console.log("this is current swiper instance object", this.swiper);
    // this.swiper.slideTo(3, 1000, false);
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
    callback2() {},
    getList() {
      axios
        .post(
          "http://192.168.3.56:8080/jz-pc-web/sysDictController/findOrderInfo.do",
          {
            params: {}
          }
        )
        .then(_ => {
          let res = _.data;
          // this.list = res.data;
        });
    }
  }
};
</script>

 <style lang="less" scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}
h2 {
  font-size: 22px;
  font-weight: 500;
  color: rgba(42, 42, 42, 1);
  line-height: 30px;
  letter-spacing: 2px;
  margin-top: 70px;
}
h4 {
  font-size: 14px;
  font-weight: 400;
  color: rgba(144, 144, 144, 1);
  line-height: 20px;
  letter-spacing: 1px;
  margin-top: 10px;
}
.swiper-button-next {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%2300a05a'%2F%3E%3C%2Fsvg%3E");
}
.swiper-button-prev {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%2300a05a'%2F%3E%3C%2Fsvg%3E");
}
.tu-box-all {
    width: 100%;
background: #F9F9F9;
}
.tu-box {margin: 0 auto;
  width: 1200px;
  height: 390px;
  text-align: right;
}
.content-1 {
  margin-top: 38px;

  .content-1-left {
    float: left;
    text-align: left;
    width: 450px;
    height: 358px;
    img {
      width: 395px;
      height: 389px;
    }
  }
  .content-1-right {
    margin-top: 30px;
    float: left;
    width: 742px;
    height: 358px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 27px 0px rgba(0, 0, 0, 0.07);
    border-radius: 6px;
    font-size: 18px;
    font-weight: 400;
    color: rgba(98, 98, 98, 1);
    letter-spacing: 1px;
    padding: 0px 30px;
    .content-1-right-box {
      margin-top: 60px;
      padding-left: 30px;
      width: 50%;
      text-align: left;
      float: left;
      display: flex;

      .img-box {
        display: inline-block;
        margin-right: 26px;
      }
    }
    div {
      float: left;
    }
    img {
      vertical-align: middle;
    }
  }
}
.card-box {
  margin-top: 100px;
  .card-list {
    width: 250px;
    // height: 288px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 24px 18px 0px rgba(127, 127, 127, 0.08);
    border-radius: 6px;
    list-style: none;
    float: left;
    padding: 25px;
    .text {
      font-size: 14px;
      font-weight: 400;
      color: rgba(98, 98, 98, 1);
      line-height: 26px;
      text-align: center;
      min-height: 130px;
      max-height: 130px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
      overflow: hidden;
    }
    .wrapper {
      height: 90px;
      width: 90px;
      // border-radius: 50%;
      overflow: hidden;
      margin: 10px auto 0 auto;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    .name {
      font-size: 12px;
      font-weight: 600;
      color: rgba(42, 42, 42, 1);
      line-height: 17px;
      margin-top: 12px;
    }
  }
}
.content-2 {
  height: 388px;
  width: 100%;
  margin-top: 69px;
  .img-box {
    float: left;
    width: 450px;
    height: 100%;
    text-align: left;
    img {
      width: 363px;
      height: 392px;
    }
  }
  .content-right {
    margin-top: 34px;
    float: left;
    height: 100%;
    width: 750px;
    .top {
      .card {
        float: left;
        width: 346px;
        height: 154px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 27px 0px rgba(0, 0, 0, 0.07);
        border-radius: 6px;
        padding: 26px;
        .wrapper {
          height: 50px;
          width: 50px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 19px auto;
          img {
            height: 50px;
            width: 50px;
            object-fit: cover;
          }
        }
        .text {
          font-size: 18px;
          font-weight: 400;
          color: rgba(98, 98, 98, 1);
          line-height: 25px;
          letter-spacing: 1px;
        }
      }
    }
  }
}
.tu-box2 {
  margin-top: 56px;
  width: 100%;
  height: 197px;
  margin-bottom: 76px;
}
.hezuo-img {
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -o-transform: scale(1);
  transform: scale(1);
  -webkit-transition: all 2s ease;
  -moz-transition: all 2s ease;
  -o-transition: all 2s ease;
  transition: all 2s ease;
}
.hezuo-img:hover {
  -moz-transform: scale(1.2);
  -o-transform: scale(1.2);
  transform: scale(1.2);
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  transition: all 1s ease;
}
</style>