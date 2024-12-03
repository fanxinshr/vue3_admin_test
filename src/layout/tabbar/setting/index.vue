<template>
    <el-button size="default" :icon="Refresh" circle @click="updateRefresh"></el-button>
    <el-button size="default" :icon="FullScreen" circle @click="fullscreen"></el-button>
    <el-button size="default" :icon="Setting" circle></el-button>
    <!-- <img src="../../../../public/pngtree-man-avatar-image-for-profile-png-image_9197911.png" style="width: 58px;height: 58px; margin: 0px 10px "> -->
    <img :src="userStore.avatar" style="width: 38px;height: 38px; margin: 0px 10px; border-radius: 50%; ">
    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            {{userStore.username}}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>我的主页</el-dropdown-item>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts" name="Setting">
import { ref, reactive } from "vue"
import { ArrowRight, Expand, FullScreen, Refresh, Setting, User } from "@element-plus/icons-vue";

// 获取骨架的小仓库
import useLayOutSettingStore from "@/store/modules/setting";

// 获取用户相关的小仓库
import useUserStroe from "@/store/modules/user";

let LayoutSettingStrore = useLayOutSettingStore();

let userStore = useUserStroe();

// 引入路由对象
import { useRouter,useRoute } from "vue-router";

// console.log(userStore.username);

// 获取路由器对象
let $router = useRouter();
// 获取路由对象
let $route = useRoute();

// 刷新按钮点击的回调函数
const updateRefresh = () => {
    LayoutSettingStrore.refresh = !LayoutSettingStrore.refresh
}

// 全屏按钮点击的回调
const fullscreen = () => {
    console.log(document.fullscreenElement);
    // DOM对象的一个属性，可以用来判断当前是不是全屏模式，如果不是全屏，则返回false
    let full = document.fullscreenElement;
    // 切换为全屏模式
    if(!full){
        // 利用document根节点的requestFullscreen方法来实现全屏模式
        document.documentElement.requestFullscreen();
    } else {
        // 退出全屏模式
        document.exitFullscreen();
    }
}

// 退出登录点击回调
const logout =async () => {
    // 向服务器发送请求，退出登录接口
    // 仓库当中关于相关的数据清空
    await userStore.useLogout()
    // 跳转到登录页面
    $router.push({path:'/login',query:{ redirect:$route.path }})

}
</script>

<style lang="scss" scoped></style>
