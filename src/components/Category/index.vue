<template>
  <el-card>
    <el-form :inline="true">
      <!-- 一级分类 -->
      <el-form-item label="一级分类">
        <el-select :disabled="scene == 0?false:true" v-model="categoryStore.category1Id" @change="getC2CategoryHandler" placeholder="请选择"
          style="width: 250px;">
          <!-- option:label 显示的文本, value:value 为下拉框的值 -->
          <el-option v-for="item in categoryStore.category1List" :key="item.id" :label="item.name"
            :value="item.id"></el-option>
          <!-- <el-option label="北京" value=""></el-option>
          <el-option label="上海" value=""></el-option> -->
        </el-select>
      </el-form-item>
      <!-- 二级分类 -->
      <el-form-item label="二级分类">
        <el-select :disabled="scene == 0?false:true" v-model="categoryStore.category2Id" @change="getC3CategoryHandler" placeholder="请选择"
          style="width: 250px;">
          <el-option v-for="item in categoryStore.category2List" :key="item.id" :label="item.name"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 三级分类 -->
      <el-form-item label="三级分类">
        <el-select :disabled="scene == 0?false:true" v-model="categoryStore.category3Id" placeholder="请选择" style="width: 250px;">
          <el-option v-for="item in categoryStore.category3List" :key="item.id" :label="item.name"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script setup lang="ts" name="Category">
// 引入属性管理模块的接口
// import { reqAttrList, reqAttrList2, reqC1Category, reqC2Category, reqC3Category } from "@/api/product/attr";
import { onMounted } from "vue";
// import { ElMessage } from "element-plus";
import { useCategoryStore } from "../../store/modules/category";


// 获取分类仓库
let categoryStore = useCategoryStore();

// 获取属性列表,存储一级分类的数据
// const category1List = ref<any>([])
// const category2List = ref<any>([])
// const category3List = ref<any>([])

// let category1Id = ref<number>(0)
// let category2Id = ref<number>(0)
// let category3Id = ref<number>(0)


// 组件挂载完毕后，获取属性列表
onMounted(async () => {
  // 获取一级分类的数据
  // getC1Category();
  await categoryStore.getCategory1List()
  // getCategory1List()
})

// 监听一级分类数据的变化
// const getCategory1List = () => {
//   // 通知仓库获取一级分类的数据
//   // await categoryStore.getCategory1List()

// }


// 获取分类数据的方法写在store中

// // 获取一级分类的方法
// const getC1Category = async () => {
//   const result: any = await reqC1Category()
//   if (result.code == 200) {
//     category1List.value = result.data
//   } else {
//     ElMessage.error(result.message)
//   }
// }

// // 获取二级分类的方法
// const getC2Category = async (category1Id:number)=>{
//   const result:any = await reqC2Category(category1Id) 
//   if(result.code == 200){
//     category2List.value = result.data
//   } else {
//     ElMessage.error(result.message)
//   }
// }

// // 获取三级分类的方法
// const getC3Category = async (category2Id:number)=>{
//   const result:any = await reqC3Category(category2Id)
//   if(result.code == 200){
//     category3List.value = result.data
//   } else {
//     ElMessage.error(result.message)
//   }
// }

// 监听一级分类数据的变化,一级分类下来菜单的change事件
// 选中值的时候会触发
const getC2CategoryHandler = async () => {

  // console.log(categoryStore.category1Id);
  // 清空二级和三级分类的ID和数据
  categoryStore.category2Id = ''
  // categoryStore.category2List = []
  categoryStore.category3Id = ''
  categoryStore.category3List = []

  

  // 使用store中的方法，获取二级分类的数据
  await categoryStore.getCategory2List(Number(categoryStore.category1Id));

  
}

// 监听二级分类数据的变化,二级分类下来菜单的change事件
const getC3CategoryHandler = async () => {
  // 清空三级分类的ID和数据
  categoryStore.category3Id = ''
  categoryStore.category3List = []
  // 使用store中的方法，获取三级分类的数据
  await categoryStore.getCategory3List(Number(categoryStore.category2Id))
}

// 定义一个props，接收父组件传递过来的scene数值
defineProps<{
  scene: number
}>()


</script>