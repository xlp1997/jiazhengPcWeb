<template>
  <div id="app">
    <navbar :tabState="$route.meta.navbar"></navbar>
    <keep-alive>
    <router-view /></keep-alive>
    <foot v-if="$route.meta.foot"></foot>
  </div>
</template>

<script>
import navbar from "@/components/navbar";
import foot from "@/components/foot";

export default {
  name: "App",
  components: {
    navbar,
    foot
  }
};
</script>

<style>
.swiper-pagination-bullet-active {
  background: #00a05a !important;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
