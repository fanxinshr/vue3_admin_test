<template>
  <el-card class="box-card">
    <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
    <!-- 表格组件，用于展示已有的品牌数据 -->
     <!-- table 
        border 可以设置表格纵向的分割线 
        widht 可以设置表格列宽 
        align 可以设置对齐方式 
      -->
    <el-table style="margin: 10px 0px;" border :data="trademarkArr" >
      <el-table-column label="序号" width="50px" align="center" type="selection"></el-table-column>
      <!-- table-column 默认展示数据用div -->
      <el-table-column label="品牌名称" align="center" prop="tmName"></el-table-column>
      <el-table-column label="品牌描述" align="center">
        <template #="{row, $index}">
          <span>{{ $index }}-</span>
          <span>{{ row.tmName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="品牌特征" align="center">
        <template #="{row, $index}">
          <pre style="color: peru; border-left: 1px;">{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌故事" align="center" prop="tmName">
        <template #="{row}">
          <h1 style="color: rebeccapurple;">{{  row.tmName }}</h1>
        </template>
      </el-table-column>
      <el-table-column label="品牌logo" align="center" prop="logoUrl">
        <template #="{row, $index}">
          <img :src="row.logoUrl" alt="" style="height: 30px;">
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template  #="{row, $index}">
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="primary" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>

    </el-table>
    <!-- 分页器组件 
    v-model:current-page 设置分页器当前页码 
    v-model:page-size 每页显示条目个数
    :page-sizes 用于设置下拉菜单的数据
    background 是否为分页按钮添加背景色
    layout 设置分页器6个子组件的布局
    -->
          <!-- :size="small" -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :disabled="false"
      :background="true"
      layout="jumper, prev, pager, next, sizes, total"
      :total="100"
    />




    <!-- Card头部的具名插槽
    <template #header>
      <div class="card-header">
        <span>Card name</span>
      </div>
    </template> -->
    <!-- <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p> -->
    <!-- <template #footer>Footer content</template> -->
  </el-card>
</template>

<script setup lang="ts" name="Name">
import { ref, reactive, onMounted } from "vue"
import { reqHasTrademark } from "../../../api/product/trademark";
import { rowContextKey } from "element-plus";

// 分页器当前页面
let pageNo = ref<number>(1)
// 每一页展示多少条数据
let pageSize = ref<number>(3)

// 存储已有品牌数据总量
let total = ref<number>(0)
// 存储已有品牌的数据
let trademarkArr = ref<any>([])


// 获取已有品牌的接口封装为一个函数
// 在任何情况下获取数据，调用此函数即可
const getHasTrademarkdown = async () => {
  let result = await reqHasTrademark(pageNo.value,pageSize.value);
  console.log(result);
  if( result.code == 200){
    // 存储已有品牌的总个数
    total.value = result.data.total;
    trademarkArr.value = result.data.records;


  }
  
}

// 组件挂载完毕的钩子，发一次请求，获取第一页，一页三个已有品牌数据
onMounted(()=>{
  getHasTrademarkdown();
})



</script>
<style lang="scss" scoped></style>
