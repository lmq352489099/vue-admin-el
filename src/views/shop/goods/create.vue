<template>
  <div
    class="bg-white px-3 goods_create"
    style="margin: -20px;margin-top: -1rem;margin-bottom:10px;"
  >
    <router-link
      style="position:absolute;top:12px;left:200px"
      :to="{ name: 'shop_goods_list' }"
    >
      <el-button size="mini">
        回到商品列表
      </el-button>
    </router-link>

    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane label="基础属性">
        <div style="height:1000px">
          <div
            class="border p-3 h2"
            v-for="(item, index) in colors"
            :key="index"
            v-dragging="{ item: item, list: colors, group: 'color' }"
          >
            {{ item.text }}
          </div>
        </div>

        <baseCreate></baseCreate>
      </el-tab-pane>

      <el-tab-pane label="商品规格">
        <!-- 规格选项 -->
        <el-form ref="form" label-width="80px">
          <el-form-item label="商品规格">
            <el-radio-group
              :value="skus_type"
              @input="vModel('skus_type', $event)"
              size="medium"
            >
              <el-radio-button :label="0" border> 单规格 </el-radio-button>
              <el-radio-button :label="1" border> 多规格 </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>

        <!-- 单规格 -->
        <template v-if="skus_type == 0">
          <singleAttrs></singleAttrs>
        </template>

        <!-- 多规格 -->
        <template v-else>
          <!-- 规格卡片 -->
          <el-form ref="form" label-width="80px">
            <el-form-item label="添加规格">
              <skuCard
                v-for="(item, index) in sku_card"
                :total="sku_cardTotal"
                :key="index"
                :item="item"
                :index="index"
              ></skuCard>
            </el-form-item>
          </el-form>
          <!-- 规格 -->
          <el-button @click="addSkuCard" type="success" size="mini">
            添加规格
          </el-button>

          <el-form ref="form" label-width="80px">
            <el-form-item label="批量设置">
              <el-button type="text"> 销售价</el-button>
              <el-button type="text"> 市场价</el-button>
              <el-button type="text"> 成本价</el-button>
              <el-button type="text"> 销售价</el-button>
              <el-button type="text"> 库存体积</el-button>
              <el-button type="text"> 重量</el-button>
            </el-form-item>
            <!-- 规格设置 -->
            <el-form-item label="规格设置">
            <skuTable></skuTable>
            </el-form-item>
          </el-form>
        </template>
      </el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="媒体设置">媒体设置</el-tab-pane>
      <el-tab-pane label="商品详情">商品详情</el-tab-pane>
      <el-tab-pane label="折扣设置">折扣设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import skuTable from '../../../components/shop/create/sku-table';
import baseCreate from '../../../components/shop/create/base-create'
import singleAttrs from '../../../components/shop/create/single-attrs.vue'
import skuCard from '../../../components/shop/create/sku/sku-card.vue'
export default {
  components: {
    baseCreate,
    singleAttrs,
    skuCard,
    skuTable
  },
  data() {
    return {
      tabIndex: 0,
      colors: [{
        text: "Aquamarine"
      }, {
        text: "Hotpink"
      }, {
        text: "Gold"
      }, {
        text: "Crimson"
      }, {
        text: "Blueviolet"
      }, {
        text: "Lightblue"
      }, {
        text: "Cornflowerblue"
      }, {
        text: "Skyblue"
      }, {
        text: "Burlywood"
      }]

    }
  },
  computed: {
    ...mapState({
      skus_type: state => state.goods_create.skus_type,
      sku_card: state => state.goods_create.sku_card,
    }),
    // 规格卡片总数
    sku_cardTotal() {
      return this.sku_card.length
    }
  },

  methods: {
    ...mapMutations(['addSkuCard', 'vModelState']),
    // 修改表单的值
    vModel(key, value) {
      this.vModelState({ key, value })
    },
    // 加载数据
    handleClick(tab, event) {
      console.log(tab.index);
    },
  },
}
</script>

<style lang="scss" >
.goods_create .e-form {
  margin-bottom: 15px;
}
</style>