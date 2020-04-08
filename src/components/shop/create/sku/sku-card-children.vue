<template>
  <div
    class="position-relative border py-1 px-2 mr-2 rounded d-flex align-items-center"
  >
    <div v-if="type != 0">
      <!-- 颜色选择 -->
      <el-color-picker v-if="type == 1" size="mini"></el-color-picker>

      <!-- 图片选择 -->
      <span v-else class="btn bg-light border">
        <i class="el-icon-plus"></i>
      </span>
    </div>
    <input
      :value="item.name"
      @input="vModel('name', $event)"
      style="width:80px;font-size:15px;"
      class="form-control text-center p-0 border-0"
    />
    <span
      class="position-absolute btn btn-light p-0"
      style="line-height:1;right:-10px;top:-10px"
      @click="delSkuValue({ cardIndex, index })"
    >
      <i class="el-icon-circle-close"></i>
    </span>
    {{ index }}
  </div>
</template>

<script>
import { mapMutations } from "vuex"
export default {
  props: {
    type: {
      type: Number,
      default: 0
    },
    item: Object,
    index: Number,
    cardIndex: Number

  },
  methods: {
    ...mapMutations(['delSkuValue', 'updateSkuValue']),

    vModel(key, e) {
      console.log(key, e.target.value);

     this.updateSkuValue({
        cardIndex: this.cardIndex,
        valueIndex: this.index,
        key,
        value: e.target.value
      })
    }
  },
}
</script>

<style lang="scss" scoped>
</style>