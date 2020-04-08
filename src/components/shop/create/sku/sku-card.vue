<template>
  <div>
 
        <div
          class="card  mb-3"
          style="line-height:1.2"
     
         >
          <div class="card-header d-flex align-items-center ">
            规格项:
            <el-input
              :value="item.name"
              @input="vModel('name', index, $event)"
              style="width:200px"
              size="mini"
            >
              <el-button slot="append" icon="el-icon-more"></el-button>
            </el-input>
            <el-radio-group
              size="mini"
              :value="item.type"
              @input="vModel('type', index, $event)"
              style="margin-bottm:-10px"
              class="ml-2"
            >
              <el-radio :label="0">无</el-radio>
              <el-radio :label="1">颜色</el-radio>
              <el-radio :label="2">图片</el-radio>
            </el-radio-group>
            <!-- 上移 -->
            <el-button
              class="ml-auto"
              size="mini"
              icon="el-icon-top"
              @click="sortCard('moveUp', index)"
              :disabled="index === 0"
            ></el-button>
            <!-- 下移 -->
            <el-button
              size="mini"
              :disabled="total === index + 1"
              @click="sortCard('moveDown', index)"
              icon="el-icon-bottom"
            ></el-button>
            <el-button size="mini" @click="delSkuCard(index)" type="text"
              >删除
            </el-button>
          </div>
          <div class="card-body">
            <!-- 规格属性列表 -->
            <div class="d-flex align-items-center flex-wrap ">
              <skuCardChildren :cardIndex="index" v-for="(item2,index2) in list" :key="index2" :index="index2" :item="item2" :type="item.type"
              v-dragging="{ item: item2, list: list, group: `skuItem${index}` }"
              ></skuCardChildren>
            </div>
            <!-- 增加规格属性 -->
            <div class="mt-2">
              <el-button type="text" @click="addSkuValue(index)" size="mini" icon="el-icon-plus">
                增加规格值
              </el-button>
            </div>
          </div>
        </div>
   
  </div>
</template>

<script>

import skuCardChildren from './sku-card-children.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    skuCardChildren,
  },
  props: {
    item: Object,
    index: Number,
    total: Number
  },
  computed: {

  },
    mounted() {
    console.log(this.sku_card)
      this.$dragging.$on('dragged', ({ value }) => {
      // console.log(value.item)
      // console.log(value.list)
      // console.log(value.otherData)
    })
    this.$dragging.$on('dragend', (e) => {
  //  console.log(this.colors[0].text);
  console.log("拖拽结束");

console.log(e);

  if(e.group === 'skuItem' + this.index){
  this.sortSkuValue({
    index:this.index,
    value:this.list
  })
  }

  
   
    })
  },
  data() {
    return {
      list:this.item.list
    }
  },
  methods: {
    ...mapMutations([ 'delSkuCard', 'vMedelSkuCard', 'sortSkuCard','addSkuValue','sortSkuValue']),
    // 修改表单的值
    vModel(key, index, value) {
    
      
      this.vMedelSkuCard({ key, index, value })
    },
    // 加载数据
    handleClick(tab, event) {
      console.log(tab.index);
    },
    // 排序规格卡片
    sortCard(action, index) {
      this.sortSkuCard({ action, index })
    }
  },
}
</script>

<style lang="scss" scoped>
</style>