<template>
    <div class="home_container">
    <h1>我是一级路由--展示登录成功以后的数据</h1>
    <!-- <h2>欢迎你，{{ userStore.username }}</h2> -->
    </div>
  </template>
  <script setup lang="ts" name="Name">
  
  // // 引入组合式API函数的生命周期函数
  // import { onMounted } from "vue";
  // // 获取仓库对象
  // import useUserStroe from "@/store/modules/user";
  

  // let userStore = useUserStroe();
  // // 在页面挂载的时候获取用户信息
  // onMounted(() => {
  //   userStore.userInfo();
  // })

  </script>
  <style lang="scss" scoped>
  .home_container{
    width: 100%;
    height: 100%;
    background-color:#f2f4f6; 
    // background-color: burlywood;
    // background: url('@/assets/images/birds-perched-on-silhouette-branches-ba-2048x1152.jpg') repeat;
  }

  </style>
  