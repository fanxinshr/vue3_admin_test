<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" size="default" icon="Plus" @click="AddTrademark">添加品牌</el-button>
      <!-- 表格组件，用于展示已有的品牌数据 -->
      <!-- table 
        border 可以设置表格纵向的分割线 
        widht 可以设置表格列宽 
        align 可以设置对齐方式 
      -->
      <el-table style="margin: 10px 0px;" border :data="trademarkArr">
        <el-table-column label="序号" width="50px" align="center" type="selection"></el-table-column>
        <!-- table-column 默认展示数据用div -->
        <el-table-column label="品牌名称" align="center" prop="tmName"></el-table-column>
        <el-table-column label="品牌描述" align="center">
          <template #="{ row, $index }">
            <span>{{ $index }}-</span>
            <span>{{ row.tmName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="品牌特征" align="center">
          <template #="{ row, $index }">
            <pre style="color: peru; border-left: 1px;">{{ row.tmName }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="品牌故事" align="center" prop="tmName">
          <template #="{ row }">
            <h1 style="color: rebeccapurple;">{{ row.tmName }}</h1>
          </template>
        </el-table-column>
        <el-table-column label="品牌logo" align="center" prop="logoUrl">
          <template #="{ row, $index }">
            <img :src="row.logoUrl" alt="" style="height: 30px;">
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" icon="Edit" @click="UpdateTrademark"></el-button>
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
      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
        :disabled="false" :background="true" pager-count:10 layout="jumper, prev, pager, next, sizes, total"
        :total=total @prev-click="click" @current-change="changePageNo" @size-change="sizeChange" />




      <!-- Card头部的具名插槽
    <template #header>
      <div class="card-header">
        <span>Card name</span>
      </div>
    </template> -->
      <!-- <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p> -->
      <!-- <template #footer>Footer content</template> -->
    </el-card>
    <!-- 对话框组件 在添加品牌和修改已有品牌的时候使用 -->
    <!-- v-model用户控制对话框的显示与隐藏 true显示 false隐藏， titile设置对话框左上角标题 -->
    <el-dialog v-model="dialogFormVisible" title="添加品牌" width="800">
      <el-form style="width: 60%;">
        <el-form-item label="品牌名称" label-width="80">
          <el-input placeholder="请输入品牌名称" label-width="80"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO">
          <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 具名插槽 :footer -->
      <template #footer>
        <el-button type="primary" size="default" @click="confirm">确定</el-button>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>

      </template>

    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="Name">
import { ref, onMounted } from "vue"
import { reqHasTrademark } from "@/api/product/trademark";
import { Records, TradeMakrResponseData } from "@/api/product/trademark/type";

// 分页器当前页面
let pageNo = ref<number>(1)
// 每一页展示多少条数据
let pageSize = ref<number>(5)

// 存储已有品牌数据总量
let total = ref<number>(0)
// 存储已有品牌的数据
let trademarkArr = ref<Records>([])

// 控制对话框显示与隐藏
let dialogFormVisible = ref<boolean>(false)

// 获取已有品牌的接口封装为一个函数
// 在任何情况下获取数据，调用此函数即可
const getHasTrademarkdown = async () => {
  let result: TradeMakrResponseData = await reqHasTrademark(pageNo.value, pageSize.value);
  console.log(result);
  if (result.code == 200) {
    // 存储已有品牌的总个数
    total.value = result.data.total;
    trademarkArr.value = result.data.records;
  }

}

// 组件挂载完毕的钩子，发一次请求，获取第一页，一页三个已有品牌数据
onMounted(() => {
  getHasTrademarkdown();
})

function click() {
  console.log("click one time");

}

// 分页器当前页码发生变化的时候会触发
// 对于当前页码发生变化自定义事件，组件pagination父组件回传了数据
// 回传了当前页码
const changePageNo = (a: number) => {
  console.log("a is ", a);

  // 当前页码发生变化的时候再次发请求获取对应已有品牌数据展示
  getHasTrademarkdown();
}

// 当下拉菜单发生变化的时候，会触发此方法
// 这个自定义事件，分页器组件会将下拉菜单选中数据返回
const sizeChange = (pagesize: number) => {
  console.log(pagesize);
  // 当前每一页的数据量发生变化的时候，当前页码归1
  pageNo.value = 1
  getHasTrademarkdown();


}

// 添加品牌按钮的回调
const AddTrademark = () => {
  // 对话框显示
  dialogFormVisible.value = true;
}

const UpdateTrademark = () => {
  // 对话框显示
  dialogFormVisible.value = true;
}

import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const cancel = () => {
  // 对话框隐藏
  dialogFormVisible.value = false
}

const confirm = () => {
  // 对话框隐藏
  dialogFormVisible.value = false
}



</script>
<style lang="scss" scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
