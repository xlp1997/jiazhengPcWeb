<template>
  <div>
    <Modal @on-visible-change="aa" style="text-align:center" footer-hide="true" v-model="show">
      <p
        style="font-size: 18px;
  font-weight: bold;
  margin:50px 0 20px 0;
  color: rgba(42, 42, 42, 1);
  line-height: 25px;"
        class="title"
      >大量优质阿姨尽在上户助手</p>
      <p>
        <img width="278px" src="../assets/gongzhonghao.jpg" alt />
      </p>
      <p
        style="font-size:18px;
        margin-top:20px;
        padding-bottom:50px;
font-family:PingFangSC-Regular,PingFang SC;
 color:rgba(144,144,144,1);
line-height:25px;"
      >体验小程序，迅速发单更快找到优质阿姨</p>

      <!-- closable	是否显示右上角的关闭按钮，关闭后 Esc 按键也将关闭	Boolean	true
mask-closable	是否允许点击遮罩层关闭	Boolean	true
 	页面是否可以滚动	Boolean	false
fullscreen	是否全屏显示	Boolean	false
      draggable-->
    </Modal>
  </div>
</template>
<script>
export default {
  props: ["show", "title"],
  data() {
    return {
      modal3: true
    };
  },
  methods: {
    
  }
};
</script>
<style lang="less" scoped>
.title {
}
</style>