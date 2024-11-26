<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="">
    <p v-if="LayOutSettingStore.fold?false:true">{{setting.title}}</p>
  </div>
</template>
<script setup lang="ts" name="Logo">
import {ref,reactive} from "vue"
// 引入设置标题与logo的配置文件
import setting from "@/setting";

import useLayOutSettingStore from "@/store/modules/setting"
// 获取layout配置仓库

let LayOutSettingStore = useLayOutSettingStore();

</script>
<style lang="scss" scoped>
.logo{
  width: 100%;
  height: 50px;
  color: white;
  display: flex;
  align-items: center;
  padding: 20px;
  padding-top: 40px;

  img{
    width:30px;
    height:30px;
    
  }
  p{
    font-size: 18px;
    margin-left: 10px;
   
  }
}

</style>
