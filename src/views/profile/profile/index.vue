<template>
  <div class="profile-container">
    <!-- 渐变背景 -->
    <div class="gradient-background"></div>
    <!-- 内容布局 -->
    <div class="profile-layout">
      <!-- 左侧信息栏 -->
      <div class="left-sidebar">
        <div class="avatar-section">
          <div class="avatar-wrapper">
            <el-avatar :size="200" src="https://randomuser.me/api/portraits/men/19.jpg" />
            <div class="status-badge online"></div>
          </div>
          <h2 class="user-name">张三元</h2>
          <p class="user-role">高级软件测试工程师</p>
          <div class="user-stats">
            <div class="stat-item">
              <span class="number">12</span>
              <span class="label">项目</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="number">25</span>
              <span class="label">加班时长</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="number">A3</span>
              <span class="label">职级</span>
            </div>
          </div>
        </div>

        <div class="menu-list">
          <div class="menu-item active">
            <el-icon><User /></el-icon>
            <span>个人信息</span>
          </div>
          <div class="menu-item">
            <el-icon><List /></el-icon>
            <span>我的任务</span>
            <el-badge :value="2" class="menu-badge" type="primary" />
          </div>
          <div class="menu-item">
            <el-icon><Document /></el-icon>
            <span>工作计划</span>
          </div>
          <div class="menu-item">
            <el-icon><Warning /></el-icon>
            <span>问题反馈</span>
          </div>
        </div>
      </div>

      <!-- 右侧内容区 -->
      <div class="right-content">
        <div class="content-header">
          <div class="header-title">
            <h2>个人信息</h2>
            <span class="subtitle">管理您的个人信息和账户设置</span>
          </div>
          <div>
          <el-button type="primary" class="edit-button" @click="editInfo">
            <el-icon><Edit /></el-icon>
            编辑资料
          </el-button>
          <el-button type="primary" class="edit-button" @click="getUserInfo">
            <el-icon><User /></el-icon>
            获取用户信息
          </el-button>
        </div>
        </div>

        <el-card class="info-card">
          <template #header>
            <div class="card-header">
              <span>基本信息</span>
            </div>
          </template>
          <div class="info-section">
            <div class="info-group">
              <div class="info-label">
                <el-icon><User /></el-icon>
                姓名
              </div>
              <div class="info-value">张三元</div>
            </div>

            <div class="info-group">
              <div class="info-label">
                <el-icon><Calendar /></el-icon>
                入职日期
              </div>
              <div class="info-value">2024-01-15</div>
            </div>

            <div class="info-group">
              <div class="info-label">
                <el-icon><Phone /></el-icon>
                联系电话
              </div>
              <div class="info-value">138 8888 8888</div>
            </div>

            <div class="info-group">
              <div class="info-label">
                <el-icon><Location /></el-icon>
                工作地点
              </div>
              <div class="info-value">深圳市南山区科技园</div>
            </div>
          </div>
        </el-card>

        <el-card class="info-card">
          <template #header style="background-color: #4f5e6c;border-radius: 16px;">
            <div class="card-header">
              <span>部门信息</span>
            </div>
          </template>
          <div class="info-section">
            <div class="info-group">
              <div class="info-label">
                <el-icon><Location /></el-icon>
                所属部门
              </div>
              <div class="info-value">研发中心</div>
            </div>

            <div class="info-group">
              <div class="info-label">
                <el-icon><OfficeBuilding /></el-icon>
                直属主管
              </div>
              <div class="info-value">李建国</div>
            </div>
          </div>
        </el-card>

        <el-card class="info-card">
          <template #header>
            <div class="card-header">
              <span>用户一览</span>
            </div>
          </template>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="username" label="用户名" />
            <el-table-column prop="password" label="密码" />
            <el-table-column prop="remark" label="备注" />
          </el-table>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User, List, Document, Warning, Calendar, Phone, Location, OfficeBuilding } from '@element-plus/icons-vue'
import httpService from '../../../utils/request2'

// 编辑个人信息按钮的点击事件响应函数
const editInfo = async () => {
  console.log('编辑个人信息');

  // 获取用户信息
  const res = await httpService.get('user/jwttest')
  console.log(res);

  // let data = res.token
  // console.log(data);  

  if(res.code === 200){
    const token = res.token
    // 将token存储到sessionStorage中
    sessionStorage.setItem('token', token)
    console.log('登录成功');
  }else{
    console.log('登录失败');
  }

}

const tableData = ref()

const getUserInfo = async () => {
  const res = await httpService.get('user/test')
  console.log(res);

  if(res.code === 200){
    console.log('获取用户信息成功');
    const UserInfoData = res.data
    console.log(UserInfoData);
    tableData.value = UserInfoData
  }else{
    console.log('获取用户信息失败');
  }

}



</script>

<style lang="scss" scoped>
.profile-container {
  padding: 24px;
  // background-color: #f8fafc;
  min-height: 80vh;
  position: relative; // 添加相对定位
  overflow: hidden;  // 防止渐变背景溢出
  border-radius: 24px;  // 添加圆角
  margin: 16px;        // 添加外边距，让圆角更明显
  // background: white;   // 添加背景色，确保圆角可见

  // 渐变背景层
  .gradient-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      // #f0f7ff 0%,     // 浅蓝色
      // #fff1f9 50%,    // 浅粉色
      // #f0f7ff 100%    // 浅蓝色
      // #EEF2FF 0%,     // 淡紫蓝色
      // #F5F3FF 50%,    // 淡紫色
      // #EFF6FF 100%    // 淡蓝色
      #E2E8F0 0%,     // 更深的灰蓝色
      #E9E8FF 50%,    // 更深的紫色
      #DBEAFE 100%    // 更深的蓝色
    );
    z-index: -1;      // 确保背景在内容之下
    border-radius: 24px;  // 渐变背景也需要圆角
  }

  .profile-layout {
    position: relative; // 确保内容在渐变背景之上
    display: flex;
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .left-sidebar {
    width: 280px;
    background: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);

    .avatar-section {
      text-align: center;
      padding-bottom: 24px;
      border-bottom: 1px solid #eef2f6;

      .avatar-wrapper {
        position: relative;
        display: inline-block;
        margin-bottom: 16px;

        .status-badge {
          position: absolute;
          bottom: 5px;
          right: 5px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid white;

          &.online {
            background-color: #10b981;
          }
        }
      }

      .user-name {
        margin: 16px 0 8px;
        font-size: 20px;
        color: #1e293b;
        font-weight: 600;
      }

      .user-role {
        color: #64748b;
        font-size: 14px;
        margin-bottom: 20px;
      }

      .user-stats {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px 0;

        .stat-item {
          text-align: center;
          flex: 1;

          .number {
            display: block;
            font-size: 20px;
            font-weight: 600;
            color: #1e293b;
          }

          .label {
            font-size: 12px;
            color: #64748b;
          }
        }

        .stat-divider {
          width: 1px;
          height: 24px;
          background-color: #eef2f6;
        }
      }
    }

    .menu-list {
      margin-top: 24px;

      .menu-item {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        margin: 4px 0;
        border-radius: 8px;
        cursor: pointer;
        color: #64748b;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(79, 70, 229, 0.08);  // 更深的悬浮背景
        }

        &.active {
          background: rgba(79, 70, 229, 0.15);  // 更深的激活背景
          color: #4F46E5;  // 更深的主题色
        }

        .el-icon {
          margin-right: 12px;
        }
      }
    }
  }

  .right-content {
    flex: 1;

    .content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;

      .header-title {
        h2 {
          margin: 0;
          color: #1e293b;
          font-size: 24px;
          font-weight: 600;
        }

        .subtitle {
          color: #64748b;
          font-size: 14px;
          margin-top: 4px;
          display: block;
        }
      }

      .edit-button {
        border-radius: 8px;
        padding: 8px 16px;
      }
    }

    .info-card {
      background: rgba(255, 255, 255, 0.95);  // 更不透明的背景
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      box-shadow: 0 4px 20px 0 rgba(71, 85, 105, 0.08);

      margin-bottom: 24px;
      border-radius: 16px;
      // box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);

      // :deep(.el-card__header) {
      //   padding: 16px 20px;
      //   border-bottom: 1px solid #eef2f6;
      // }

      // .card-header {
      //   font-size: 16px;
      //   font-weight: 600;
      //   color: #0d0d0d;
      //   // background-color: #4f5e6c;
      //   // border-radius: 16px;
      // }
      :deep(.el-card__header) {
        padding: 0;  // 移除默认内边距
        border-bottom: none;  // 移除默认边框
        
        .card-header {
          background-color: #4e5467;
          color: white;
          border-radius: 5px;
          padding: 12px 20px;
        }
      }

      .info-section {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 24px;
        padding: 20px;

        .info-group {
          .info-label {
            display: flex;
            align-items: center;
            color: #64748b;
            margin-bottom: 8px;
            font-size: 14px;

            .el-icon {
              margin-right: 8px;
              font-size: 16px;
            }
          }

          .info-value {
            color: #1e293b;
            font-size: 15px;
            font-weight: 500;
          }
        }
      }
    }
  }
}



// 响应式布局
@media screen and (max-width: 768px) {
  .profile-layout {
    flex-direction: column;

    .left-sidebar {
      width: 100%;
    }
  }
}
</style>