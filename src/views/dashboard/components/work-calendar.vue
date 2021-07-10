<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select
        v-model="year"
        size="small"
        style="width:120px;margin-right:5px"
        @change="dateChange"
      >
        <el-option v-for="item in yearList" :key="item" :value="item" />
      </el-select>
      <el-select
        v-model="month"
        size="small"
        style="width:120px"
        @change="dateChange"
      >
        <el-option v-for="item in 12" :key="item" :value="item" />
      </el-select>
    </el-row>
    <el-row>
      <el-calendar v-model="dates">
        <template slot="dateCell" slot-scope="{ date, data }">
          <div class="date-content">
            <span class="text"> {{ data.day | getDay }}</span>
            <span v-if="isWeek(date)" class="rest">休</span>
          </div>
        </template>
      </el-calendar>
    </el-row>
  </div>
</template>

<script>
export default {
  filters: {
    getDay(value) {
      const day = value.split('-')[2]
      return day.startsWith('0') ? day.substr(1) : day
    }
  },
  props: {
    nowDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      year: null,
      month: null,
      yearList: [],
      dates: null
    }
  },
  created() {
    this.year = this.nowDate.getFullYear()
    this.month = this.nowDate.getMonth() + 1
    this.yearList = Array.from(Array(11), (val, index) => this.year + index - 5)
  },
  methods: {
    dateChange() {
      this.dates = new Date(`${this.year}-${this.month}-1`)
    },
    isWeek(val) {
      return val.getDay() === 6 || val.getDay() === 0
    }
  }
}
</script>

<style scoped>
/deep/ .el-calendar-day {
  height: auto;
}
/deep/ .el-calendar-table__row td,
/deep/ .el-calendar-table tr td:first-child,
/deep/ .el-calendar-table__row td.prev {
  border: none;
}
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 5px;
}
.date-content .text {
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
}
/deep/ .el-calendar-table td.is-selected .text {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}
/deep/ .el-calendar__header {
  display: none;
}
</style>
