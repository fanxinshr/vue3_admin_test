<template>
  <el-card>
    <el-form :inline="true">
      <!-- 一级分类 -->
      <el-form-item label="一级分类">
        <el-select v-model="category1Id" placeholder="请选择" style="width: 250px;">
          <el-option v-for="item in category1List" :key="item.id" :label="item.name" :value="item.id"></el-option>
          <el-option label="北京" value=""></el-option>
          <el-option label="上海" value=""></el-option>
        </el-select>
      </el-form-item>
      <!-- 二级分类 -->
      <el-form-item label="二级分类">
        <el-select v-model="category2Id" placeholder="请选择" style="width: 250px;">
          <el-option v-for="item in category2List" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 三级分类 -->
      <el-form-item label="三级分类">
        <el-select v-model="category3Id" placeholder="请选择" style="width: 250px;">
          <el-option v-for="item in category3List" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script setup lang="ts" name="Category">

</script>