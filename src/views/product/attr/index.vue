<template>
  <div>
    <!-- 三级分类全局组件 -->
    <Category />

    <el-card style="margin-top: 20px;">
      <el-button type="primary" icon="Plus" size="default">添加属性</el-button>
      <el-table :data="attrList" style="width: 100%; margin-top: 20px;">
        <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
        <el-table-column label="属性名称" width="320" prop="attrName"></el-table-column>
        <el-table-column label="属性值名称" prop="attrValueList"></el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button type="primary" size="small" icon="Edit" text @click="updateAttr(scope.row)">编辑</el-button>
          </template>
          <!-- <template>
          <el-button type="primary" size="small" icon="Delete" text @click="deleteAttr(scope.row)">删除</el-button>
        </template> -->
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup lang="ts" name="Name">



</script>
<style lang="scss" scoped></style>
