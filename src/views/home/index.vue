<!-- <template>
    <div class="home_container">
    <h1>我是一级路由--展示登录成功以后的数据</h1> -->
    

  <!-- </template> --> 


<template>
  <div class="home_container">
  <div class="dashboard-container">
    <div class="gradient-background"></div>
    
    <div class="dashboard-header">
      <h1>欢迎你，{{ userStore.username }}</h1>
      <el-avatar :size="100" src="https://randomuser.me/api/portraits/men/1.jpg" />
    </div>

    <!-- <el-card style="margin-top: 20px;" >
      <h2>今日天气</h2> 
      <el-image style="width: 100px; height: 100px;" src="https://th.bing.com/th/id/R.938b5eaa0a12f058bc15d4a223d4c992?rik=cwvnviAa%2bPVcFA&riu=http%3a%2f%2fbpic.588ku.com%2felement_pic%2f16%2f11%2f21%2fbdc79ee5629040de96f4e4721321609e.jpg&ehk=ROcu9TkoIHumQafvVFY2uVsO%2fCP%2beubc7lGQ9GBbz9o%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1" />
    </el-card> -->

    <el-card style="margin-top: 20px;">
      <!-- <h2>数据走势</h2> -->
      <el-image style="height: 750px;" src="https://xqimg.imedao.com/1761317b2f27f253faf734e2.png!800.jpg" />
    </el-card>

    <div class="dashboard-grid" style="margin-top: 20px;">
      <!-- 即将到来的事件 -->
      <div class="section upcoming-events">
        <h2>待办列表</h2>
        <div class="events-list">
          <el-card v-for="(event, index) in events" :key="index" class="event-card">
            <div class="event-content">
              <div class="event-info">
                <h3>{{ event.title }}</h3>
                <p class="event-time">{{ event.time }}</p>
                <div class="event-participants">
                  <el-avatar v-for="i in 3" :key="i" :size="24" :src="`https://randomuser.me/api/portraits/men/${i}.jpg`" />
                  <el-tag size="small" type="success">+{{ event.extraParticipants }}</el-tag>
                </div>
              </div>
              <el-image class="event-icon" :src="event.icon" fit="cover" />
            </div>
          </el-card>
        </div>
      </div>

      <!-- 成绩概览 -->
      <div class="section score-overview">
        <div class="score-card">
          <div class="score-number">68</div>
          <div class="score-label">Days in Academy</div>
        </div>
        <div class="exams-list">
          <h3>Exams</h3>
          <div class="exam-item" v-for="exam in exams" :key="exam.subject">
            <div class="exam-info">
              <span>{{ exam.subject }}</span>
              <span>{{ exam.score }}%</span>
            </div>
            <el-progress :percentage="exam.score" :color="exam.color" />
          </div>
        </div>
      </div>

      <!-- 课程日历 -->
      <div class="section calendar">
        <div class="calendar-header">
          <h3>日历</h3>
          <span>8 events today</span>
        </div>
        <div class="timeline">
          <div class="timeline-item" v-for="item in classes" :key="item.name">
            <div class="time">{{ item.time }}</div>
            <div class="class-info">
              <el-avatar :size="24" :src="item.icon" />
              <div class="class-details">
                <div class="class-name">{{ item.name }}</div>
                <div class="class-duration">{{ item.duration }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 课程统计 -->
      <div class="section statistics">
        <div class="stats-header">
          <h3>课程</h3>
          <el-select v-model="selectedPeriod" size="small">
            <el-option label="All marks" value="all" />
            <el-option label="This month" value="month" />
          </el-select>
        </div>
        <div class="stats-chart">
          <el-chart type="bar" :data="chartData" :height="200" />
        </div>
      </div>
    </div>
  </div>
  </div>
</template>


  <script setup lang="ts" name="Name">
  
  // 引入组合式API函数的生命周期函数
  import { onMounted } from "vue";
  // 获取仓库对象
  import useUserStroe from "../../store/modules/user";
  

  let userStore = useUserStroe();
  // 在页面挂载的时候获取用户信息
  onMounted(() => {
    userStore.userInfo();
  })

  import { ref } from 'vue'

const events = ref([
  {
    title: 'Roma Theatre',
    time: '9:00 AM - 11:00 AM',
    extraParticipants: 2,
    icon: 'path-to-icon'
  },
  // ... 更多事件
])

const exams = ref([
  { subject: 'Biology', score: 75, color: '#4CAF50' },
  { subject: 'History', score: 85, color: '#2196F3' },
  { subject: 'English', score: 90, color: '#9C27B0' }
])

const classes = ref([
  {
    time: '9:00',
    name: 'Biology',
    duration: '2h 30m',
    icon: 'path-to-icon'
  },
  {
    time: '9:00',
    name: 'Biology',
    duration: '2h 30m',
    icon: 'path-to-icon'
  },
  {
    time: '9:00',
    name: 'Biology',
    duration: '2h 30m',
    icon: 'path-to-icon'
  }
  // ... 更多课程
])

const selectedPeriod = ref('all')

const chartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Scores',
    data: [85, 92, 78, 95, 88, 90],
    backgroundColor: '#3b82f6'
  }]
})

</script>
  <style lang="scss" scoped>
  .home_container{
    width: 100%;
    height: 100%;
    // background-color:#f2f4f6; 
    // background-color: burlywood;
    // background: url('@/assets/images/birds-perched-on-silhouette-branches-ba-2048x1152.jpg') repeat;
  }

.dashboard-container {
  padding: 24px;
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 32px);
  margin: 16px;

  .gradient-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      #1e3a8a 0%,      // 深蓝色起始
      #3b82f6 90%,     // 中间过渡色
      #93c5fd 100%     // 浅蓝色结束
    );
    opacity: 0.9;      // 稍微调整透明度
    z-index: -1;
    border-radius: 24px;
  }

  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    color: white;
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    
    .section {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 20px;
    }
  }

  .event-card {
    margin-bottom: 16px;
    border-radius: 12px;
    
    .event-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .event-participants {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  .score-card {
    text-align: center;
    padding: 24px;
    
    .score-number {
      font-size: 48px;
      font-weight: bold;
      color: #2563eb;
    }
  }

  .timeline {
    .timeline-item {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      
      .time {
        width: 60px;
        color: #64748b;
      }

      .class-info {
        display: flex;
        align-items: center;
        gap: 12px;
      }
    }
  }

  .statistics {
    .stats-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
  }
}
</style>
  