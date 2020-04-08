<template>
  <div
    class="bg-white px-3"
    style="margin: -20px;margin-top: -1rem;margin-bottom:10px;"
  >
    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane :label="tab.name" :key="tabI" v-for="(tab, tabI) in tabbars">
        <buttonSearch
          ref="buttonSearch"
          placeholder="要搜索的商品名称"
          @search="searchEvent"
        >
          <!-- 左边 -->
          <template #left>
            <router-link :to="{name:'shop_goods_create'}">
            <el-button type="success" size="mini">发布商品</el-button>
            </router-link>
            <el-button type="waining" size="mini">恢复商品</el-button>
            <el-button type="danger" size="mini">批量删除</el-button>
            <el-button size="mini">上架</el-button>
            <el-button size="mini">下架</el-button>
            <el-button size="mini">推荐</el-button>
          </template>
          <!-- 高级搜索表单 -->
          <template #form>
            <el-form inline ref="form" :model="form" label-width="80px">
              <el-form-item label="商品名称" class="mb-0">
                <el-input
                  v-model="form.name"
                  placeholder="商品名称"
                  size="mini"
                ></el-input>
              </el-form-item>
              <el-form-item label="商品编码" class="mb-0">
                <el-input
                  v-model="form.code"
                  placeholder="商品编码"
                  size="mini"
                ></el-input>
              </el-form-item>

              <el-form-item label="商品类型" class="mb-0">
                <el-select
                  v-model="form.type"
                  size="mini"
                  placeholder="请选择商品类型"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品分类" class="mb-0">
                <el-input
                  v-model="form.category"
                  placeholder="商品分类"
                  size="mini"
                ></el-input>
              </el-form-item>
              <el-form-item class="mb-0">
                <el-button type="info" size="mini" @click="searchEvent">
                  搜索</el-button
                >
                <el-button size="mini" @click="clearSearch"
                  >清空筛选条件</el-button
                >
              </el-form-item>
            </el-form>
          </template>
        </buttonSearch>
        <!-- 商品列表 -->
        <el-table
          @selection-change="handleSelectionChange"
          class="mt-3"
          border
          :data="tableData[tabIndex].list"
          style="width: 100%"
        >
          <el-table-column type="selection" width="45" align="center">
          </el-table-column>
          <el-table-column width="380" prop="title" label="商品">
            <template slot-scope="scope">
              <div class="media">
                <img
                  class="mr-3"
                  style="width:60px;height:60px"
                  :src="scope.row.cover"
                />
                <div class="media-body">
                  <h6 class="mt-0 font-weight">{{ scope.row.title }}</h6>
                  <p class="mb-1">分类:{{ scope.row.category }}</p>
                  <p class="mb-0">时间:{{ scope.row.create_time }}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="type" align="center" label="商品类型">
          </el-table-column>
          <el-table-column prop="sale_count" align="center" label="实际销量">
          </el-table-column>

          <el-table-column prop="order" align="center" label="商品排序">
          </el-table-column>
          <el-table-column prop="ischeck" align="center" label="商品状态">
            <template v-slot="scope">
              <el-button
                type="success"
                size="mini"
                plain
                @click="scope.row.ischeck = 1"
              >
                审核通过</el-button
              >
              <el-button
                type="danger"
                size="mini"
                class="ml-0 mt-2"
                plain
                @click="scope.row.ischeck = 2"
              >
                审核通过</el-button
              >
              <!-- <el-button
                :type="scope.row.status ? 'success' : 'danger'"
                size="mini"
                plain
                @click="changeStatus(scope.row)"
              >
                {{ scope.row.status ? " 上架" : "下架" }}</el-button
              > -->
            </template>
          </el-table-column>
          <el-table-column prop="stock" align="center" label="总库存">
          </el-table-column>
          <el-table-column prop="pprice" align="center" label="价格(元)">
          </el-table-column>
          <el-table-column prop="create_time" align="center" label="日期">
          </el-table-column>
          <el-table-column width="150" prop="id" align="center" label="操作">
            <template v-slot="scope">
              <el-button-group>
                <el-button type="primary" size="mini" plain>修改</el-button>
                <el-button
                  type="danger"
                  size="mini"
                  @click="deleteItem(scope.$index)"
                  plain
                  >删除</el-button
                >
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <!-- 底部 -->
        <div style="height:60px"></div>
        <el-footer class="border-top d-flex align-items-center px-0 position-fixed bg-white" style="bottom:0;left:200px;z-index:1200;right:0">
          <!-- 底部 -->
        
          <div class="px-2">
            <el-pagination
           
        
         
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
            >
            </el-pagination>
          </div>
        </el-footer>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import buttonSearch from '@/components/common/button-search.vue'
export default {
  components: {
    buttonSearch
  },
  data() {
    return {
      tabIndex: 0,
      tabbars: [
        { name: "审核中" },
        { name: "出售中" },
        { name: "已下架" },
        { name: "库存预警" },
        { name: "回收站" },
      ],
      superSearch: false,
      form: {
        name: "",
        code: "",
        type: "",
        category: ""
      },
      tableData: [],
      multipleSelection: []
    }
  },
  created() {
    this.__getData()
  },
  methods: {
    __getData() {
      for (let i = 0; i < this.tabbars.length; i++) {
        this.tableData.push({
          currentPage: 1,
          list: []
        })
        for (let j = 0; j < 20; j++) {
          this.tableData[i].list.push({
            id: j,
            title: '荣耀 V10全网通 标配版 ' + i + '-' + j,
            cover: 'http://static.yoshop.xany6.com/2018071718294208f086786.jpg',
            create_time: '2019-07-17 18:34:14',
            category: "手机",
            type: "普通商品",
            sale_count: 20,
            order: 100,
            status: 1,
            stock: 200,
            pprice: 1000,
            ischeck: 1
            // 0未审核，1通过，2不通过
          })
        }
      }
    },
    // 上下架
    changeStatus(item) {
      item.status = item.status === 1 ? 0 : 1
    },
    // 删除当前商品
    deleteItem(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData[this.tabIndex].list.splice(index, 1)
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    // 选中
    handleSelectionChange(val) {
      this.multipleSelection = val;

    },
    // 加载数据
    handleClick(tab, event) {
      console.log(tab.index);
    },
    // 清空筛选条件
    clearSearch() {
      this.form = {
        name: "",
        code: "",
        type: "",
        category: ""
      }
      this.$refs.buttonSearch[this.tabIndex].closeSuperSearch()
    },
    // 搜索事件

    searchEvent(e = false) {
      // 简单搜索
      if (typeof e === 'string') {
        return console.log("简单搜索", e);

      }

      //高级搜索
      console.log('高级搜索');
    }
  },
}
</script>

<style>
.el-scrollbar__wrap {
  /* overflow: hidden; */
  /* height: 0; */
}
</style>
