<template>
  <div class="plans-container">
    <div class="plans-header">
      <h1>选择适合您的会员计划</h1>
      <p class="subtitle">解锁所有高级功能，提升您的学习体验</p>
    </div>
    
    <div class="plans-wrapper">
      <!-- 免费计划 -->
      <el-card class="plan-card" :body-style="{ padding: '0px' }">
        <div class="card-header free">
          <h2>免费版</h2>
          <div class="price-block">
            <span class="currency">¥</span>
            <span class="price">0</span>
            <span class="period">/永久</span>
          </div>
        </div>
        <div class="card-content">
          <div class="features">
            <div class="feature-item">
              <el-icon><Check /></el-icon>
              <span>访问基础课程</span>
            </div>
            <div class="feature-item">
              <el-icon><Check /></el-icon>
              <span>Vue.js 入门教程</span>
            </div>
            <div class="feature-item">
              <el-icon><Check /></el-icon>
              <span>社区支持</span>
            </div>
          </div>
          <el-button class="action-button" type="primary" plain>开始使用</el-button>
        </div>
      </el-card>

      <!-- 月度会员 -->
      <el-card class="plan-card featured" :body-style="{ padding: '0px' }">
        <div class="popular-badge">最受欢迎</div>
        <div class="card-header pro">
          <h2>月度会员</h2>
          <div class="price-block">
            <span class="currency">¥</span>
            <span class="price">99</span>
            <span class="period">/月</span>
          </div>
        </div>
        <div class="card-content">
          <div class="features">
            <div class="feature-item">
              <el-icon><Check /></el-icon>
              <span>所有课程无限制访问</span>
            </div>
            <div class="feature-item">
              <el-icon><Check /></el-icon>
              <span>下载课程源码</span>
            </div>
            <div class="feature-item">
              <el-icon><Check /></el-icon>
              <span>专属交流群</span>
            </div>
            <div class="feature-item">
              <el-icon><Check /></el-icon>
              <span>每周更新内容</span>
            </div>
          </div>
          <el-button class="action-button" type="primary">立即订阅</el-button>
        </div>
      </el-card>

      <!-- 终身会员 -->
      <el-card class="plan-card" :body-style="{ padding: '0px' }">
        <div class="card-header premium">
          <h2>终身会员</h2>
          <div class="price-block">
            <span class="currency">¥</span>
            <span class="price">2999</span>
            <span class="period">/永久</span>
          </div>
        </div>
        <div class="card-content">
          <div class="features">
            <div class="feature-item">
              <el-icon><Check /></el-icon>
              <span>终身无限制访问</span>
            </div>
            <div class="feature-item">
              <el-icon><Check /></el-icon>
              <span>所有月度会员特权</span>
            </div>
            <div class="feature-item">
              <el-icon><Check /></el-icon>
              <span>优先体验新功能</span>
            </div>
            <div class="feature-item">
              <el-icon><Check /></el-icon>
              <span>专属技术支持</span>
            </div>
          </div>
          <el-button class="action-button" type="primary">立即购买</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts" name="Profile">
import { Check } from '@element-plus/icons-vue'

</script>

<style lang="scss" scoped>
.plans-container {
  padding: 40px 20px;
  // background: #f5f7fa;
  min-height: 100vh;

  .plans-header {
    text-align: center;
    margin-bottom: 60px;

    h1 {
      font-size: 36px;
      color: #2c3e50;
      margin-bottom: 16px;
    }

    .subtitle {
      font-size: 18px;
      color: #606266;
    }
  }

  .plans-wrapper {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
  }

  .plan-card {
    width: 320px;
    border-radius: 12px;
    transition: all 0.3s ease;
    position: relative;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    }

    .card-header {
      padding: 30px 20px;
      text-align: center;
      border-radius: 12px 12px 0 0;
      color: white;

      &.free {
        background: linear-gradient(135deg, #34495e, #2c3e50);
      }

      &.pro {
        background: linear-gradient(135deg, #409EFF, #2980b9);
      }

      &.premium {
        background: linear-gradient(135deg, #f39c12, #d35400);
      }

      h2 {
        margin: 0 0 20px;
        font-size: 24px;
      }
    }

    .price-block {
      .currency {
        font-size: 24px;
        vertical-align: top;
      }

      .price {
        font-size: 48px;
        font-weight: bold;
      }

      .period {
        font-size: 16px;
        opacity: 0.8;
      }
    }

    .card-content {
      padding: 30px 20px;
    }

    .features {
      margin-bottom: 30px;

      .feature-item {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        color: #606266;

        .el-icon {
          color: #67C23A;
          margin-right: 10px;
        }
      }
    }

    .action-button {
      width: 100%;
      height: 44px;
      font-size: 16px;
      border-radius: 22px;
    }

    &.featured {
      transform: scale(1.05);

      &:hover {
        transform: scale(1.05) translateY(-5px);
      }

      .popular-badge {
        position: absolute;
        top: -12px;
        right: 20px;
        background: #E6A23C;
        color: white;
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: bold;
        z-index: 1;
      }
    }
  }
}

// 响应式适配
@media screen and (max-width: 768px) {
  .plans-container {
    padding: 20px 10px;

    .plans-header {
      h1 {
        font-size: 28px;
      }

      .subtitle {
        font-size: 16px;
      }
    }

    .plan-card {
      width: 100%;
      max-width: 320px;

      &.featured {
        transform: none;

        &:hover {
          transform: translateY(-5px);
        }
      }
    }
  }
}
</style> 