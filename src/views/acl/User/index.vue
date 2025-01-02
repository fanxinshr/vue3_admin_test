<template>
  <!-- 搜索功能区 -->
  <el-card style="margin-top: 10px; height: 75px; background-color: #f0f2f5;">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名">
        <el-input placeholder="请输入用户名" v-model="searchInput"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="handleSearch">搜索</el-button>
        <el-button type="primary" size="default" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <!-- 添加用户按钮,批量删除按钮,用户数据展示 -->
  <el-card style="margin-top: 10px; background-color: #f0f2f5;">
    <el-button type="primary" color="#626aef" size="default" style="margin-bottom: 10px; color: #fff;" @click="handleAddUser" icon="Plus">添加用户</el-button>
    <el-button type="primary" color="#000000" size="default" style="margin-left: 10px; 
      margin-bottom: 10px; color: #fff;" @click="handleDeleteBatch" icon="Minus" :disabled="selectedUserIdList.length === 0">批量删除</el-button>

    <!-- 表格 展示用户信息 -->
    <el-table :data="userArr" style="width: 100%; margin-top: 10px;" border stripe show-header @selection-change="handleSelectionChange" >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" label="序号" width="55" align="center" style="font-weight: bold;" />
      <el-table-column prop="id" label="ID" align="center" />
      <el-table-column prop="username" label="用户名字" align="center" show-overflow-tooltip />
      <el-table-column prop="name" label="用户名称" align="center" show-overflow-tooltip />
      <el-table-column prop="roleName" label="用户角色" align="center" show-overflow-tooltip />
      <!-- 格式化时间 -->
      <el-table-column prop="createTime" label="创建时间" align="center" show-overflow-tooltip>
        <template #default="scope">
          {{ formatDateTime(scope.row.createTime) }}
        </template>
      </el-table-column>
      <!-- 更新时间 -->
      <el-table-column prop="updateTime" label="更新时间" align="center" show-overflow-tooltip>
        <template #default="scope">
          {{ formatDateTime(scope.row.updateTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="action" label="操作" width="300px" align="center">
        <template #default="scope">
          <el-button type="success" size="small" icon="UserFilled" @click="handleRoleAssign(scope.row)">分配角色</el-button>
          <el-button type="primary" size="small" icon="Edit" @click="handleEdit(scope.row)">编辑</el-button>
          <!-- <el-button type="danger" size="small" icon="Delete" @click="handleDelete(scope.row)"> -->
          <!-- 弹出气泡确认框 -->
          <el-popconfirm title="确定要删除吗？" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button type="danger" size="small" icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
          <!-- </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination style="margin-top: 10px; text-align: right;"
      :current-page="page"
      :page-size="limit"
      :page-sizes="[1, 2, 3, 4]"
      :total="total"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total"
      @size-change="handleSizeChange"
      @current-change="getUserInfo"
    />
  </el-card>

  <!-- 添加用户对话框抽屉效果 -->
  <!-- 抽屉结构，完成添加新的用户账号和更新已有的用户信息 -->
  <el-drawer v-model="drawer" size="25%">
    <!-- 抽屉头部标题，将来文字内容应该是动态的 -->
    <template #header>
      <h4>{{ userParams.id ? '编辑用户' : '添加用户' }}</h4>
    </template>
    <!-- 抽屉内容 -->
     <!-- form表单的数据收集到了userParams中， 表单验证规则在rules中 -->
    <el-form :model="userParams" :rules="rules" ref="formRef">
      <el-form-item label="用户姓名" prop="username">
        <el-input v-model="userParams.username" placeholder="请输入用户姓名"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="name">
        <el-input v-model="userParams.name" placeholder="请输入用户昵称"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
        <el-input v-model="userParams.password" placeholder="请输入密码"></el-input>
      </el-form-item>
    </el-form>
    <!-- 抽屉底部按钮 -->
    <template #footer>
      <el-button type="primary" size="default" @click="handleCancel">取消</el-button>
      <el-button type="primary" size="default" @click="handleSave">确定</el-button>
    </template>
  </el-drawer>

  <!-- 分配角色对话框 -->
  <!-- 抽屉结构，用于某一个已有的账号完成分配角色 -->
  <el-drawer v-model="roleAssignDrawer" size="25%" direction="rtl">
    <template #header>
      <h4>分配用户角色</h4>
    </template>
    <el-form :model="userParams" ref="RoleAssignFormRef">
      <el-form-item label="用户姓名" prop="username">
        <el-input v-model="userParams.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="name">
        <el-input v-model="userParams.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户ID" prop="id">
        <el-input v-model="userParams.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色列表" prop="roleName">
        <!-- 复选框用于展示全部角色列表 -->
         <!-- isIndeterminate 是否半选，设置不确定的状态 -->
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <!-- userRoleList 是当前账号拥有的职位,双向绑定，也负责收集选中的职位 -->
        <el-checkbox-group v-model="userRoleList" @change="handleCheckBoxChange">
          <!-- 复选框用于展示全部角色列表 label为收集的数据 -->
          <el-checkbox v-for="(role, index) in allRoleList" :key="index" :label="role" :value="role">{{ role.roleName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" size="default" @click="roleAssignCancel">取消</el-button>
      <el-button type="primary" size="default" @click="roleAssignConfirm">确定</el-button>
    </template>
  </el-drawer>

</template>
<script setup lang="ts" name="Name">
import { ref, onMounted, reactive, nextTick } from 'vue';
import { reqGetUserInfo, reqAddOrUpdateUser, reqAllRole, reqAssignUserRole, reqDeleteUser, reqDeleteUserBatch } from '../../../api/acl/user';
import type { UserInfoListResponseData, UserInfoList, UserInfoData, AllRoleResponseData, AllRoleList, RoleData, 
  AssignUserRoleData } from '../../../api/acl/user/type';
import { ElMessage } from 'element-plus';     

// 分页器, 默认第一页, 每页10条, 总数0
const page = ref<number>(1);
// 分页器，每页条数
const limit = ref<number>(4);
// 用户总数，起始值为0
const total = ref<number>(0); 

// 表格数据，用于存储全部的用户信息
const userArr = ref<UserInfoList>([]); 

// 抽屉结构，完成添加新的用户账号和更新已有的用户信息
const drawer = ref<boolean>(false); 

// 控制分配校色抽屉显示与隐藏
// 分配角色抽屉
const roleAssignDrawer = ref<boolean>(false);

// 添加用户表单ref
const formRef = ref();

// 表单数据，用于存储添加或更新的用户信息
// 收集用户信息的响应式数据
let userParams = reactive<UserInfoData>({
  username: '',
  name: '',
  password: '',
  // roleName: [],
});

// 搜索条件
const searchInput = ref<string>('');

// 自定义校验规则
// 校验用户名字的回调函数
const validateUsername = (rule: any, value: any, callback: any) => {
  console.log(rule);
  if (!value) {
    return callback(new Error('请输入用户名'));
  }
  // // 判断用户名是否重复
  // const userInfo = userArr.value.find((item: UserInfoData) => item.username === value);
  // if(userInfo){
  //   return callback(new Error('用户名已存在'));
  // }
  // 判断用户名长度不小于5
  if(value.length < 5){
    return callback(new Error('用户名长度不小于5'));
  }
  callback();
};

// 校验用户昵称的回调函数
const validateName = (rule: any, value: any, callback: any) => {  
  console.log(rule);
  if (!value) {
    return callback(new Error('请输入用户昵称'));
  }
  callback();
};

// 校验用户密码的回调函数
const validatePassword = (rule: any, value: any, callback: any) => {  
  console.log(rule);
  if (!value) {
    return callback(new Error('请输入密码'));
  }
  callback();
};

// 表单验证规则，自定义校验规则
const rules = {
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  name: [{ required: true, trigger: 'blur', validator: validateName }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }],
};

// 组件挂载完毕,自动加载用户的数据
onMounted(() => {
  getUserInfo();
})

// 获取全部已有的用户信息
const getUserInfo = async ( pager=1) => {
  page.value = pager;
  console.log(page.value);
  console.log(limit.value);
  const res: UserInfoListResponseData = await reqGetUserInfo(pager, limit.value);
  console.log("getUserInfo res is:", res);
  if(res.code === 200){ 
    userArr.value = res.data.records;

    total.value = res.data.total;
  }
}

// 分页器, 下拉菜单的 自定义事件回调，每页条数改变
const handleSizeChange = (val: number) => {
  limit.value = val;
  getUserInfo();
}

// 添加用户按钮的响应函数
const handleAddUser = () => {
  console.log('添加用户');
  // 显示抽屉
  drawer.value = true;

  // 点击按钮后，清空之前的表单数据
  userParams = reactive<UserInfoData>({
    id: 0,
    username: '',
    name: '',
    password: '',
    // roleName: [],
  });

  // 清除上一次的错误提示信息
  nextTick(() => {
    // 清空表单验证
    // formRef.value?.resetFields(); 
    formRef.value.clearValidate('username');
    formRef.value.clearValidate('name');
    formRef.value.clearValidate('password');
  })

}

// 编辑用户,更新用户
// 编辑用户，需要将当前行的用户信息赋值给表单数据，然后显示抽屉
// row为当前行的用户信息
const handleEdit = (row: UserInfoData) => {
  console.log('编辑用户');
  // 获取到当前行的用户信息
  const userInfo = row;
  console.log('userInfo in handleEdit is:', userInfo);
  // 显示抽屉 
  drawer.value = true;
  // 将当前行的用户信息赋值给表单数据
  // form.value = userInfo;  
  Object.assign(userParams, userInfo);
  console.log('userParams in handleEdit is:', userParams);

  // 清除上一次的错误提示信息
  nextTick(() => {
    // 清空表单验证
    // formRef.value?.resetFields(); 
    formRef.value.clearValidate('username');
    formRef.value.clearValidate('name');
    formRef.value.clearValidate('password');
  })

}

// 抽屉效果的取消按钮响应函数
const handleCancel = () => {
  console.log('取消');
  // 关闭抽屉
  drawer.value = false;
  // 清空表单数据
  userParams = reactive<UserInfoData>({
    username: '',
    name: '',
    password: '',
  });
}

// 添加用户的确定按钮的响应函数
const handleSave = async () => {
  // 保存按钮，添加新的用户或者更新已有的用户账号信息
  console.log('确定');

  // 表单验证
  const validate = await formRef.value?.validate();
  console.log('validate is:', validate);


  // 调用接口，添加或更新用户
  let res = await reqAddOrUpdateUser(userParams);
  console.log(res);
  // 判断接口返回的状态码
  if(res.code === 200){
    // 添加或更新用户成功
    ElMessage.success({type: 'success', message: userParams.id ? '更新用户成功' : '添加用户成功'});
    // 关闭抽屉
    drawer.value = false;
    // 刷新表格, 如果更新用户，则刷新当前页，如果添加用户，则刷新第一页
    getUserInfo(userParams.id ? page.value : 1);

    // 浏览器刷新
    // window.location.reload();
    
  }else{
    ElMessage.error({type: 'error', message: userParams.id ? '更新用户失败' : '添加用户失败'});
  } 
  // 清空表单数据
  userParams = reactive<UserInfoData>({
      username: '',
      name: '',
      password: '',
    });
}

// 格式化时间
const formatDateTime = (dateTime: string) => {
  // console.log(dateTime);
  // return dateTime;

  if (!dateTime) return '';
  const date = new Date(dateTime);
  date.setHours(date.getHours() + 9);

  date.toLocaleString('ja-JP', { 
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  // return dateTime.split('T')[0];
}


// 角色分配部分
// 获取全部角色列表
// const roleList = ['超级管理员', '管理员', '用户','前台','后台'];
let allRoleList = ref<AllRoleList>([]);
// 当前账号拥有的职位
let userRoleList = ref<AllRoleList>([]);

// 分配角色按钮的回调函数
const handleRoleAssign = async (row: UserInfoData) => {
  // 存储已有的用户信息
  Object.assign(userParams, row);

  // 获取用户的id
  const userId = row.id;
  console.log('userId in handleRoleAssign is:', userId);

  // 获取用户的全部职位
  let res: AllRoleResponseData = await reqAllRole(Number(userId));
  console.log('res in handleRoleAssign is:', res);
  
  if(res.code === 200){
    // 存储全部职位 
    allRoleList.value = res.data.allRolesList;
    // 存储当前账号拥有的职位
    userRoleList.value = res.data.assignRoles;

    if(userRoleList.value.length > 0){
      // 如果当前账号有职位，则全选
      // checkAll.value = true;
      // 是否半选
      isIndeterminate.value = true;
    }
    else{
      // 如果当前账号没有职位，则不全选
      checkAll.value = false;
      // 是否半选
      isIndeterminate.value = false;
    }

    if(userRoleList.value.length === allRoleList.value.length){
      // 如果当前账号有职位，则全选
      checkAll.value = true;
    }

    // console.log('allRoleList in handleRoleAssign is:', allRoleList.value);
    // console.log('userRoleList in handleRoleAssign is:', userRoleList.value);

    // 弹出抽屉，分配角色
    roleAssignDrawer.value = true;

  }

}

// 全选复选框收集数据，默认为不全选 
const checkAll = ref<boolean>(false);
// 是否半选，设置不确定的状态，全选状态矿显示为横线，默认为flase
const isIndeterminate = ref<boolean>(false);

// 全选复选框的回调函数，参数为布尔值，true表示全选，false表示不全选
const handleCheckAllChange = (val: boolean) => {
  // console.log('全选的回调函数val is:', val);
  userRoleList.value = val? allRoleList.value:[];
  // 是否半选
  isIndeterminate.value = false;
}

// 单独复选框的回调函数，参数为数组，收集选中的角色
const handleCheckBoxChange = (val: string[]) => {
  console.log('复选框的回调函数val is:', val);
  // 是否半选
  isIndeterminate.value = val.length < allRoleList.value.length && val.length > 0;
  // 全选,通过判断两个数组的长度是否相等来决定是否给checkAll赋值
  checkAll.value = val.length === allRoleList.value.length;

}

// 分配角色确定按钮的回调函数
const roleAssignConfirm = async () => {
  console.log('分配角色确定');
  // 收集数据
  let data:AssignUserRoleData = {
    userId: Number(userParams.id),
    roleIdList: userRoleList.value.map((item: RoleData) => Number(item.id)),
  }
  // console.log('data in roleAssignConfirm is:', data);
  // 调用接口，给已有账号分配职位
  let res = await reqAssignUserRole(data);
  // console.log('res in roleAssignConfirm is:', res);
  if(res.code === 200){
    ElMessage.success({type: 'success', message: '分配角色成功'});
  }else{
    ElMessage.error({type: 'error', message: '分配角色失败'});
  } 
  // 关闭抽屉
  roleAssignDrawer.value = false;

  // 刷新表格,并留在当前页  
  getUserInfo(page.value);
  
  // 清空全选复选框
  checkAll.value = false;
  // 清空是否半选
  isIndeterminate.value = false;
}

// 分配角色取消
const roleAssignCancel = () => {
  // 关闭抽屉
  roleAssignDrawer.value = false;
  // 清空表单数据
  userRoleList.value = [];
  // 清空全选复选框
  checkAll.value = false;
  // 清空是否半选
  isIndeterminate.value = false;
}

// 删除单独一个用户
const handleDelete = async (userId: number) => {
  console.log('删除');
  // 调用接口，删除用户
  let res: any = await reqDeleteUser(userId);
  // console.log('res in handleDelete is:', res);
  if(res.code === 200){
    ElMessage.success({type: 'success', message: '删除用户成功'});
     // 刷新表格,并留在当前页    
    getUserInfo(userArr.value.length > 1 ? page.value : page.value - 1);
  
  }else{
    ElMessage.error({type: 'error', message: '删除用户失败'});
  }
 
}

// 准备一个数组来存储批量删除的用户的id
const selectedUserIdList = ref<number[]>([]);

// 复选框勾选时会触发的回调函数
const handleSelectionChange = (selection: any) => {
  console.log('选择表格的回调函数selection is:', selection);
  // 获取选中的用户id
  selectedUserIdList.value = selection.map((item: any) => item.id);
  console.log('selectedUserIdList in handleSelectionChange is:', selectedUserIdList.value);

}

// 批量删除按钮的回调函数
const handleDeleteBatch = async () => {
  console.log('批量删除');
  // 整理批量删除的参数
  let data:any = selectedUserIdList.value.map((item:any) => item);

  console.log('data in handleDeleteBatch is:', data);
  //  调用接口，批量删除用户
  let res:any = await reqDeleteUserBatch(data);
  console.log('res in handleDeleteBatch is:', res);

  if(res.code === 200){
    ElMessage.success({type: 'success', message: '批量删除用户成功'});
  }else{
    ElMessage.error({type: 'error', message: '批量删除用户失败'});
  }

  // 刷新表格,并留在当前页  
  getUserInfo(page.value);
  // 清空批量删除的数组
  selectedUserIdList.value = [];

}



// 搜索
const handleSearch = () => {
  console.log('搜索');
  getUserInfo();
  // 搜索条件
  const searchParams = {
    username: searchInput.value,
  }
  console.log(searchParams);
  // getUserInfo(searchParams);
}

// 重置
const handleReset = () => {
  console.log('重置');
  // getUserInfo();
  // 清空搜索条件
  searchInput.value = '';
  getUserInfo();
}

</script>
<style lang="scss" scoped>
.form{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

</style>
