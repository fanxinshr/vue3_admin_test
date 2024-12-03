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
            <el-button type="primary" size="small" icon="Edit" @click="UpdateTrademark(row)"></el-button>
            <el-popconfirm :title="`您确认要删除${row.tmName}?`" width="250px" icon="Delete" icon-color="black" @confirm="removeTradeMark(row.id)">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
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
    <!-- 用formRef获取到组件的实例 -->
    <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'" width="800">
      <el-form style="width: 60%;" :model="trademarkParams" :rules="rules" ref="formRef">
        <el-form-item label="品牌名称" label-width="100" prop="tmName">
          <el-input placeholder="请输入品牌名称" label-width="100" v-model="trademarkParams.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <!-- 
            upload组件的属性
              action 请求URL, action图片上传路径，需要带上api
              show-file-list 是否显示上传的文件列表
              before-upload 上传文件之前的钩子，约束文件类型和文件大小
              on-success 文件上传成功的钩子
          -->
          <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <!-- v-if v-else 图像和图标2选1 -->
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
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
import { ref, onMounted, reactive } from "vue"
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from "@/api/product/trademark";
import { Records, TradeMakrResponseData, TradeMark } from "@/api/product/trademark/type";
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps, FormInstance } from 'element-plus'

// 分页器当前页面
let pageNo = ref<number>(1)

// 每一页展示多少条数据
let pageSize = ref<number>(10)

// 存储已有品牌数据总量
let total = ref<number>(0)

// 存储已有品牌的数据
let trademarkArr = ref<Records>([])

// 控制对话框显示与隐藏
let dialogFormVisible = ref<boolean>(false)

// 定义收集新增品牌的数据
// 基本类型用ref，引用类型用reactive
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: ''
})

// 获取到el-form组件的实例
const formRef = ref<FormInstance>()

// 品牌校验自定义校验规则的方法
const validatorTmName = (rule: any, value: any, callback: any) => {
  // 
  console.log(222);
  // 表单元素触发blur的时候，会触发此方法
  // 自定义的校验规则
  // value是表单的内容
  // callback是放行函数
  if (value.trim().length >= 2) {
    callback();
  } else {
    // 校验未通过，返回的错误的提示信息
    callback(new Error("品牌名称位数大于等于两位"))
  }

}

// 品牌logo图片的自定义校验规则
const validatorLogoUrl = (rule: any, value: any, callback: any) => {
  // console.log("validatorLogoUrl");
  // 如果图片上传
  if (value) {
    callback();
  } else {
    callback(new Error("LOGO图片务必上传"))
  }


}

// 表单规则校验对象
const rules = {
  tmName: [
    {
      // required 这个字段务必校验，表单项前面出现五角星
      // trigger 代表触发校验规则的时机 blur change
      required: true,
      trigger: 'blur',
      validator: validatorTmName
    },
  ],
  logoUrl: [
    {
      required: true,
      validator: validatorLogoUrl

    }
  ]
}

// 获取已有品牌的接口封装为一个函数
// 在任何情况下获取数据，调用此函数即可
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
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
  getHasTrademark();
})

// 
function click() {
  console.log("click one time");
}

// 分页器当前页码发生变化的时候会触发
// 对于当前页码发生变化自定义事件，组件pagination父组件回传了数据
// 回传了当前页码
const changePageNo = (a: number) => {
  console.log("a is ", a);
  // 当前页码发生变化的时候再次发请求获取对应已有品牌数据展示
  getHasTrademark(a);
}

// 当下拉菜单发生变化的时候，会触发此方法
// 这个自定义事件，分页器组件会将下拉菜单选中数据返回
const sizeChange = (pagesize: number) => {
  console.log(pagesize);
  // 当前每一页的数据量发生变化的时候，当前页码归1
  pageNo.value = 1
  getHasTrademark();
}

// 添加品牌按钮的回调
const AddTrademark = () => {
  // 对话框显示
  dialogFormVisible.value = true;
  // 清空收集数据情况
  trademarkParams.tmName = "";
  trademarkParams.logoUrl = "";
  trademarkParams.id = 0;


  // 清除警告信息
  formRef.value?.clearValidate('logoUrl')
  formRef.value?.clearValidate('tmName')

}

// 修改已有品牌的按钮的回调函数
// 传递参数row，row就是当前已有品牌
const UpdateTrademark = (row: TradeMark) => {

  // 清除警告信息
  formRef.value?.clearValidate('logoUrl')
  formRef.value?.clearValidate('tmName')


  console.log('row in UpdateTrademark is ', row);

  // 对话框显示
  dialogFormVisible.value = true;
  trademarkParams.id = row.id;
  // 展示已有品牌的数据
  trademarkParams.tmName = row.tmName;
  trademarkParams.logoUrl = row.logoUrl;
}

const imageUrl = ref('')

// 图片上传成功钩子
// 文件上传的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  // response 当前这次上传图片post请求服务器返回的数据
  // uploadFile 服务器返回的响应
  trademarkParams.logoUrl = response.data;
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  // 图片上传成功，应该清除掉对应图片校验结果
  formRef.value?.clearValidate('logoUrl')
}

// 上传图片
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log("rawFile is ", rawFile);

  if (rawFile.type !== 'image/png') {
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
  dialogFormVisible.value = false;
  // 清空收集数据情况
  trademarkParams.tmName = "";
  trademarkParams.logoUrl = "";
}

const confirm = async () => {
  // 在发送请求之前，对于整个表单进行校验
  // 调用这个方法进行全部表单项的校验，如果校验全部通过
  await formRef.value.validate();

  let result: any = await reqAddOrUpdateTrademark(trademarkParams);
  console.log("result is ", result);
  // 添加品牌或修改品牌
  if (result.code == 200) {
    // 对话框隐藏
    dialogFormVisible.value = false;
    // 弹出提示信息
    ElMessage({
      type: "success",
      message: trademarkParams.id ? "修改品牌成功" : "添加品牌成功"
    });
    // 再次发送请求获取已有全部品牌数据
    getHasTrademark(trademarkParams.id ? pageNo.value : 1);

  } else {
    // 添加品牌失败
    ElMessage({
      type: "error",
      message: trademarkParams.id ? "修改品牌失败" : "添加品牌失败"
    });
    // 对话框隐藏
    dialogFormVisible.value = false;
    // 清空收集数据情况
    trademarkParams.tmName = "";
    trademarkParams.logoUrl = "";

  }

}

// 气泡确认框确定按钮的回调函数
const removeTradeMark = async (id:number) => {
  // console.log("removeTradeMark");
  // console.log(id);
  let result = await reqDeleteTrademark(id)
  console.log(result);
  
  if(result.code == 200){
    // 删除成功提示信息
    ElMessage({
      type:'success',
      message:'删除品牌成功'
    });
    // 再次获取已有品牌的数据
    getHasTrademark(trademarkArr.value.length>1?pageNo.value:pageNo.value-1);
  }else{
    ElMessage({
      type:'error',
      message:'删除品牌失败'
    })
  }

  
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
