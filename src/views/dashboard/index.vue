<template>
  <div class="dashboard">
    <el-card class="filter" shadow="none">
      <!-- 查询框 -->
      <el-form ref="form" :model="form" label-width="80px">

        <el-form-item class="item" label="查询类型">
          <el-select v-model="form.type" placeholder="请选择查询类型">
            <el-option label="日期查询" :value="0" />
            <el-option label="月份查询" :value="1" />
          </el-select>
        </el-form-item>

        <el-form-item v-if="form.type === 0" class="item" label="时间">
          <el-date-picker v-model="form.day" placeholder="选择日期" type="date" style="width: 100%;" value-format="yyyy-MM-dd" @change="changeDate" />
        </el-form-item>

        <el-form-item v-if="form.type === 1" class="item" label="时间">
          <el-date-picker v-model="form.month" placeholder="选择日期" type="month" style="width: 100%;" value-format="yyyy-MM" @change="changeDate" />
        </el-form-item>

        <el-form-item class="item">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>

      </el-form>

    </el-card>
    <el-card shadow="none">
      <div ref="chart" style="width: 100%; height: 500px" />
    </el-card>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { dayCount, monCount } from '@/api/user'
let Echarts = require('echarts/lib/echarts') // 基础实例 注意不要使用import
require('echarts/lib/chart/bar') // 按需引入 bar = 柱状图
export default {
  name: 'Dashboard',
  data() {
    return {
      name: 'xxxxxx',
      dayData: null,
      form: {
        type: 0,
        day: new Date().Format(0),
        month: new Date().Format(1)
      },
      chart: null
    }
  },
  mounted() {
    this.getList(this.form.type)
    this.echartsInit()
  },
  methods: {
    getList(type) {
      if (type === 0) {
        let day = this.form.day
        dayCount(day).then(res => {
          console.log('res', res.data)
          this.dayData = res.data
        }).catch(e => {
          console.log('error', e)
        })
      } else {
        let month = this.form.month
        monCount(month).then(res => {
          console.log('res', res.data)
          this.dayData = res.data
        }).catch(e => {
          console.log('error', e)
        })
      }
    },
    onSubmit() {
      this.getList(this.form.type)
    },
    echartsInit() {
      this.chart = Echarts.init(this.$refs.chart)
      let option = {
        xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }, // X轴
        yAxis: { type: 'value' }, // Y轴
        series: [{ data: [120, 200, 150, 80, 70, 110, 130], type: 'bar' }] // 配置项
      }
      this.chart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
   margin: 30px;
   .filter{
     margin-bottom: 30px;
   }
   ::v-deep .item{
     display: inline-block;
   }
}
</style>
