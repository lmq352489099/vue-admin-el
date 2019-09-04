<template>
  <div>
    <!-- 数据统计 -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in counts" :key="index">
        <el-card class="box-card">
          <div class="box-card" shadow="hover">
            <div class="d-flex align-items-center">
              <i
                :class="[item.icon,item.color]"
                class="  h4 mb-0 bg-primary text-white mr-3"
                style="width:40pxlheight:40px;text-align:centent;line-height:40px;"
              ></i>
              <div>
                <h4 class="mb-1">{{ item.num }}</h4>
                <small class="text-muted">{{ item.desc }} </small>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
     	counts: [
					{ icon:"el-icon-user-solid",desc:"关注人数(个)",num:"30",color:"bg-primary" },
					{ icon:"el-icon-s-finance",desc:"订单总数(笔)",num:"120",color:"bg-success" },
					{ icon:"el-icon-s-order",desc:"今日订单总金额(元)",num:"4183.80" ,color:"bg-danger"},
					{ icon:"el-icon-s-data",desc:"本月销量(笔)",num:"100",color:"bg-warning" },
				]
    }
  },
}
</script>

<style>
</style>
