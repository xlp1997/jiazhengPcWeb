<template>
  <div style="width:100%;  background: #272727;">
    <div class="foot">
      <div class="foot-left">
        <div style="display:inline-block;text-align:center;">
          <p style="padding:24px 0 10px 0;" class="color1">联系我们 Contact us</p>
          <p class="color2">总部地址：深圳市南山区明亮科技园2栋201</p>
          <p class="color2">上户·深圳阿姨之家地址：深圳市福田区车公庙泰然工贸园213栋7D712</p>
          <p class="color2">客服电话：0755-86705865</p>
          <p class="color2">商务合作：13689533595 fup@yindantech.com</p>
          <p class="color2">
            友情链接：
            <a target="_block" href="http://www.yindantech.com">我有伴</a>
          </p>
          <p class="color2">
            <a target="_block" href="http://www.beian.miit.gov.cn/">粤ICP备19157164号</a>
          </p>
        </div>
      </div>
      <div class="foot-right color1">
        <div class="erwei" style="text-align:center;">
          <img src="../assets/shanghugongsi.jpg" alt />
          <div>上户家政助手</div>
          <div>（家政公司）</div>
        </div>
        <div class="erwei" style="text-align:center;margin:0 64px;">
          <img src="../assets/shanghujiaz.jpg" alt />
          <div>上户无忧</div>
          <div>（家政人员）</div>
        </div>
        <div class="erwei" style="text-align:center;">
          <img src="../assets/gongzhonghao.jpg" alt />
          <div>关注上户公众号</div>
          <div>即可直达小程序</div>
        </div>
      </div>
    </div>
    <!-- <div class="foot-bottom"></div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  // 这个是配置head信息，vue-meta-info插进提供的功能

  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {}
};
</script>
 <style lang="less" scoped>
a {
  color: rgba(198, 255, 230, 1);
}
a:hover {
  color: #00a05a;
  text-decoration: underline;
}
.foot {
  width: 1200px;
  height: 228px;
  margin: 0 auto;
  color: #ffffff;
  background: #272727;
  .foot-left,
  .foot-right {
    float: left;
    width: 50%;
    height: 100%;
    p {
      text-align: left;
      margin-top: 5px;
      a {
        font-size: 14px;
        color: rgba(136, 136, 136, 1);
      }
      a:hover {
        color: #000;
        text-decoration: underline;
      }
    }
  }
  .foot-left {
    text-align: left;
    padding-right: 110px;
  }
  .foot-right {
    padding-top: 40px;
    text-align: right;
    .erwei {
      float: right;
      text-align: center;

      img {
        width: 100px;
        margin-bottom: 15px;
            border-radius: 6px;
      }
    }
  }
}
.foot-bottom {
  width: 100%;
  height: 49px;
  line-height: 49px;
  background: rgba(3, 148, 84, 1);
  font-size: 14px;
  font-weight: 400;
  color: rgba(198, 255, 230, 1);
}
.color1 {
  font-size: 16px;
  font-weight: bold;
  color: rgba(211, 211, 211, 1);
}
.color2 {
  font-size: 14px;
  color: rgba(136, 136, 136, 1);
}
</style>