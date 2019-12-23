<template>
  <div>
    <div class="foot">
      <div class="foot-left">
        <div style="display:inline-block;text-align:center;">
          <p style="padding-top:36px;">友情链接</p>
          <p style="padding-top:13px;">
            <a target="_block" href="http://www.yindantech.com">我有伴</a>
          </p>
          <p>
            <!-- <a target="_block" href="http://www.yindantech.com">银弹科技</a> -->
          </p>
        </div>
      </div>
      <div class="foot-right">
        <p style="padding-top:36px;">客服电话</p>
        <p style="padding-top:13px;font-size:14px;color:rgba(198,255,230,1);">0755-86705865</p>
      </div>
    </div>
    <div class="foot-bottom">
      <a target="_block" href="http://www.beian.miit.gov.cn/">粤ICP备19157164号</a>
    </div>
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
        color: #000;
        text-decoration: underline;
      }
.foot {
  width: 100%;
  height: 179px;
  color: #ffffff;
  background: rgba(0, 160, 90, 1);
  .foot-left,
  .foot-right {
    float: left;
    width: 50%;
    height: 100%;
    p {
      font-size: 16px;
      a {
        font-size: 14px;
        color: rgba(198, 255, 230, 1);
      }
      a:hover {
        color: #000;
        text-decoration: underline;
      }
    }
  }
  .foot-left {
    text-align: right;
    padding-right: 110px;
  }
  .foot-right {
    text-align: left;
    padding-left: 110px;
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
</style>