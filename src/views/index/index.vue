<template>
  <div>
    <!-- 数据统计 -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in counts" :key="index">
        <el-card class="box-card">
          <div class="box-card" shadow="hover">
            <div class="d-flex align-items-center">
              <i
                :class="[item.icon, item.color]"
                class="text-center   h4 mb-0 bg-primary text-white mr-3" 
                style="width:40px;height:40px;line-height:40px;"
              ></i>
              <div>
                <h4 class="mb-1">{{ item.num }}</h4>
                <small class="text-muted">{{ item.desc }} </small>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 店铺 、 订单提示 | 统计图 -->
    <el-row :gutter="20" class="mt-3">
      <!-- 店铺 -->
      <el-col
        :span="12"
        class="d-flex flex-column"
        style="height:370px;justify-content:space-between"
      >
        <el-card
          class="box-card "
          shadow="never"
          v-for="(tip, ti) in tips"
          :key="ti"
        >
          <div slot="header" class="clearfix">
            <span>{{ tip.title }}</span>
            <el-button style="float: right; padding: 3px 0" type="text">{{
              tip.desc
            }}</el-button>
          </div>
          <div class="text item row">
            <div
              :class="tip.list.length | getCol"
              v-for="(tlist, listi) in tip.list"
              :key="listi"
            >
              <button class="btn btn-light w-100">
                <h4 class="mb-1">{{ tlist.value }}</h4>
                <small class="text-muted">{{ tlist.name }}</small>
              </button>
            </div>
          </div>
        </el-card>
      </el-col>
      <!-- 统计图  -->
      <el-col :span="12">
        <el-card style="height:370px" class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              操作按钮</el-button
            >
          </div>
          <div class="text item">
            <!-- 统计图容器 -->
            <div
              id="main"
              ref="myChart"
              style="width: 600px;height:270px;"
            ></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 销售情况统计 | 单品销售排名 -->
    <el-row :gutter="20" class="my-3">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              操作按钮</el-button
            >
          </div>

          <div class="text item d-flex flex-column" style="height:200px">
            <div class="media align-items-center border mb-auto">
              <span class="border-right py-4 px-3 bg-light ">昨天销量</span>
              <div class="media-body">
                <div class="border-bottom pl-3 pb-1 mb-1">
                  <span>订单量(件) 12 </span>
                </div>
                <div class=" pl-3 ">
                  <span>订单量(件) 12 </span>
                </div>
              </div>
            </div>
            <div class="media align-items-center border mt-3 ">
              <span class="border-right py-4 px-3 bg-light ">昨天销量</span>
              <div class="media-body">
                <div class="border-bottom pl-3 pb-1 mb-1">
                  <span>订单量(件) 12 </span>
                </div>
                <div class=" pl-3">
                  <span>订单量(件) 12 </span>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>单品销售名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              操作按钮</el-button
            >
          </div>
          <div class="text item">
            <el-table :data="tableData" height="200" border style="width: 100%">
              <el-table-column type="index" label="#" width="50">
              </el-table-column>
              <el-table-column prop="name" label="商品信息"> </el-table-column>
              <el-table-column prop="num" width="50" label="销量">
              </el-table-column>
              <el-table-column prop="aa" label="啊啊"> </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      tableData: [
        { name: "小天鹅(LittleSwan) 滚筒洗衣机", num: "9", aa: "啊啊" },
        { name: "小天鹅(LittleSwan) 滚筒洗衣机", num: "9", aa: "啊啊" },
        { name: "小天鹅(LittleSwan) 滚筒洗衣机", num: "9", aa: "啊啊" },
        { name: "小天鹅(LittleSwan) 滚筒洗衣机", num: "9", aa: "啊啊" },
      ],
      counts: [
        { icon: "el-icon-user-solid", desc: "关注人数(个)", num: "30", color: "bg-primary" },
        { icon: "el-icon-s-finance", desc: "订单总数(笔)", num: "120", color: "bg-success" },
        { icon: "el-icon-s-order", desc: "今日订单总金额(元)", num: "4183.80", color: "bg-danger" },
        { icon: "el-icon-s-data", desc: "本月销量(笔)", num: "100", color: "bg-warning" },
      ],
      tips: [
        {
          title: "店铺及商品提示",
          desc: "您需要关注的店铺信息及待处理事项",
          list: [
            { name: "出售中", value: "64" },
            { name: "出售中", value: "64" },
            { name: "出售中", value: "64" },
            { name: "出售中", value: "64" },
          ]
        },
        {
          title: "店铺及商品提示",
          desc: "您需要关注的店铺信息及待处理事项",
          list: [
            { name: "出售中", value: "64" },
            { name: "出售中", value: "64" },
            { name: "出售中", value: "64" },
            { name: "出售中", value: "64" },
            { name: "出售中", value: "64" },
            { name: "出售中", value: "64" },
          ]
        },

      ]
    }
  },
  filters: {
    getCol: function (total) {
      return `col-${12 / total}`;
    }
  },
  // dom渲染完毕
  mounted() {
    // 放统计图
    this.drawLine()
  },
  methods: {
    drawLine() {
      console.log(this.$refs.myChart);
      let myChart = echarts.init(this.$refs.myChart)
      // 指定图表的配置项和数据
      var option = {
        title: {

        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };;

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
}
</script>

<style>
</style>
