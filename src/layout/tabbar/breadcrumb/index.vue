<template>
    <!-- 顶部静态图标 -->
    <el-icon style="margin-right: 10px;" @click="changeIcon">
        <component :is="LayoutSettingStrore.fold?'Fold':'Expand'"></component>
        <!-- <Expand></Expand> -->
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
            <!-- 图标 -->
             <el-icon >
                <component :is="item.meta.icon"></component>
             </el-icon>
            <!-- 面包屑展示匹配路由的标题 -->
            <span style="margin: 0px 5px;">{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts" name="Breadcrumb">
import { ref, reactive } from "vue"
import { ArrowRight, Expand, FullScreen, Refresh, Setting, User } from "@element-plus/icons-vue";

// src\store\modules\setting.ts
import useLayOutSettingStore from '@/store/modules/setting.ts'

// 获取layout配置相关的仓库
let LayoutSettingStrore = useLayOutSettingStore();

import { useRoute } from "vue-router";
import { log } from "console";

// 获取路由对象
let $route = useRoute();

// 定义一个响应式数据控制图标的切换
// 用于控制菜单折叠还是打开图标切换的变量
// let fold = ref(false)

// 点击图标的方法
const changeIcon = () => {
    console.log("123");
    // 图标切换
    LayoutSettingStrore.fold = !LayoutSettingStrore.fold
}

</script>
<style lang="scss" scoped></style>
