<template>
  <div>
    <li
      class="list-group-item list-group-item-action d-flex align-items-center"
      @click.stop="$emit('change', index)"
      :class="{ 'avtive sum-avtive': active }"
      style=""
    >
      {{ item.name }}
      <el-dropdown class="ml-auto">
        <span class="btn btn-light btn-sm border">
          {{ item.num }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.stop.native="$emit('edit', { item, index })"
            >修改</el-dropdown-item
          >
          <el-dropdown-item @click.stop.native="$emit('del', { item, index })"
            >删除</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </li>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    item: Object,
    index: Number
  },
  //   methods: {
  //     openAlbumModel(e) {
  //       this.$emit('change', e)
  //     },
  //     albumChangde(index) {
  //       this.$emit('change', index)
  //     },
  //     albumDel(index) {
  //       this.$emit('openAlbumModel', index)
  //     }
  //   },
}
</script>

<style lang="scss" scoped>
</style>