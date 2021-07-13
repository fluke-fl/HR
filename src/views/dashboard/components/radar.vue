<template>
  <v-chart id="container" :option="option" class="radar-echart" />
</template>

<script>
// import * as echarts from 'echarts'
// import { Radar } from '@antv/g2plot'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
use([CanvasRenderer, RadarChart, TooltipComponent, LegendComponent])

export default {
  name: 'HelloWorld',
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: ''
  },
  data() {
    return {
      option: {
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: '工作效率', max: 100 },
            { name: '考勤', max: 100 },
            { name: '积极性', max: 100 },
            { name: '帮助同事', max: 100 },
            { name: '自主学习', max: 100 },
            { name: '正确率', max: 100 }
          ]
        },
        series: [
          {
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            data: [
              {
                value: [10, 1, 100, 5, 100, 0],
                name: '张三'
              },
              {
                value: [50, 50, 50, 50, 50, 10],
                name: '李四'
              }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.radar-echart {
  width: 500px;
  height: 400px;
}
</style>

// echart雷达图 // data() { // return { // option: { // title: { // text:
'绩效考核图' // }, // radar: { // // shape: 'circle', // center: ['40%', '50%'],
// raduis: '65%', // name: { // backgroundColor: '#888', // color: '#fff', //
padding: [3, 4], // borderRadius: 4, // fontSize: 14 // }, // indicator: [ // {
name: '工作效率', max: 100 }, // { name: '考勤', max: 100 }, // { name:
'积极性', max: 100 }, // { name: '帮助同事', max: 100 }, // { name: '自主学习',
max: 100 }, // { name: '正确率', max: 100 } // ] // }, // series: [ // { //
type: 'radar', // data: [ // { // value: [10, 1, 100, 5, 100, 0], // name:
'张三' // }, // { // value: [50, 50, 50, 50, 50, 10], // name: '李四' // } // ]
// } // ] // } // } // }, // mounted() { // const myChart =
echarts.init(this.$refs.myEchart) // myChart.setOption(this.option) // } //
AntV雷达图 // mounted() { // const data = [ // { name: '工作效率', value: 10,
user: 'jack' }, // { name: '工作效率', value: 50, user: 'rose' }, // { name:
'考勤', value: 1, user: 'jack' }, // { name: '考勤', value: 50, user: 'rose' },
// { name: '积极性', value: 100, user: 'jack' }, // { name: '积极性', value: 50,
user: 'rose' }, // { name: '帮助同事', value: 5, user: 'jack' }, // { name:
'帮助同事', value: 54, user: 'rose' }, // { name: '自主学习', value: 100, user:
'jack' }, // { name: '自主学习', value: 54, user: 'rose' }, // { name: '正确率',
value: 0, user: 'jack' }, // { name: '正确率', value: 19, user: 'rose' } // ] //
const radarPlot = new Radar('container', { // data, // xField: 'name', //
yField: 'value', // seriesField: 'user', // meta: { // value: { // alias:
'分数', // max: 100, // min: 0 // } // }, // xAxis: { // line: null, //
tickLine: null, // grid: { // line: { // style: { // lineDash: null // } // } //
} // }, // yAxis: { // line: null, // tickLine: null, // grid: { // line: { //
type: 'line', // style: { // lineDash: null // } // }, // alternateColor:
['rgba(0, 0, 0, 0.04)', null] // } // }, // legend: {}, // area: {}, // point:
{} // }) // radarPlot.render() // }
