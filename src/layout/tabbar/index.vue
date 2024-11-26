<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <Breadcrumb></Breadcrumb>
      
    </div>
    <div class="tabbar_right">
      <setting></setting>
    </div>

  </div>
</template>
<script setup lang="ts" name="Tabbar">
import { ArrowRight, Expand, FullScreen, Refresh, Setting, User } from "@element-plus/icons-vue";
import { ref, reactive } from "vue"
import Breadcrumb from "./breadcrumb/index.vue"
import setting from "./setting/index.vue"




</script>
<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 100%;
  background-color: #f2f4f6;
  // background-image: linear-gradient(to right, white,rgb(176, 167, 176),white);
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  padding-right: 15px;
  padding-left: 15px;

  .tabbar_left {
    display: flex;
    // background-color: cadetblue;
    align-items: center;
    margin-left: 20px;
  }

  .tabbar_right {
    display: flex;
    // background-color: skyblue;
    align-items: center;
  }

}
</style>
