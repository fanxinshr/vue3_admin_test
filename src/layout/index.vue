<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{fold:LayOutSettingStore.fold?true:false}" >
      <Logo></Logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu :collapse="LayOutSettingStore.fold?true:false" background-color="#262b40" text-color="white"
          :default-active="$route.path" collapse-transition unique-opened active-text-color="yellowgreen">
          <!-- 折叠菜单 -->
          <!-- <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <location />
              </el-icon>
              <span>首页</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">用户管理</el-menu-item>
              <el-menu-item index="1-2">角色管理</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>数据大屏</span>
          </el-menu-item> -->

          <Menu :menuList="userStore.menuRoutes"></Menu>

        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{fold:LayOutSettingStore.fold?true:false}">
      <!-- layout组件的顶部导航tabbar -->
      <Tabbar></Tabbar>

    </div>
    <!-- 内容展示区 -->
    <div class="layout_main" :class="{fold:LayOutSettingStore.fold?true:false}">
      <!-- <p style="height: 100px; background-color: blue">我是一个段落</p> -->
       <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts" name="Layout">
import { ref, reactive } from "vue"

// 引入左侧菜单logo子组件
import Logo from './logo/index.vue'
// 引入菜单组件
import Menu from './menu/index.vue'
// 右侧内容的展示区
import Main from './main/index.vue'
// 引入顶部导航tabbar
import Tabbar from './tabbar/index.vue'
// 获取路由对象
import { useRoute } from "vue-router"
// 获取用户相关的小仓库
import useUserStroe from "@/store/modules/user";
import useLayOutSettingStore from "@/store/modules/setting"
// 获取layout配置仓库

let LayOutSettingStore = useLayOutSettingStore();

let userStore = useUserStroe();

// 获取路由相关的对象
let $route = useRoute()
// console.log($route.path);

</script>
<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  color: #262b40;
  // background-color: rebeccapurple;

  .layout_slider {
    // width: $base-menu-width;
    width: 260px;
    height: 100vh;
    background-color: #262b40;
    transition: all 0.3s; //添加过渡动画

    // background-color ;
    .scrollbar {
      width: 100%;
      height: calc(100vh - 60px);
      .el-menu{
        border-right: none;
      }
    }

    &.fold{
      width: 50px;
    }

  }

  .layout_tabbar {
    // 固定定位
    position: fixed;
    top: 0px;
    left: 260px;
    width: calc(100% - 260px);
    height: 60px;
    transition: all 0.3s; //添加过渡动画
    // background-color: rgb(206, 171, 234);
    &.fold{
      width: calc( 100vw - 50px );
      left: 50px;
    }
  }

  .layout_main {
    position: fixed;
    width: calc(100% - 260px);
    height: calc(100vh - 60px);
    left: 260px;
    top: 60px;
    background-color: f2f4f6;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s; //添加过渡动画

    &.fold{
      width: calc(100vw - 50px);
      left: 50px;
    }

  }

}
</style>
