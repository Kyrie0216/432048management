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
      <div class="dashboard-text">dayData: {{ dayData }}</div>
    </el-card>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { dayCount, monCount } from '@/api/user'
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
      }
    }
  },
  mounted() {
    this.getList(this.form.type)
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
