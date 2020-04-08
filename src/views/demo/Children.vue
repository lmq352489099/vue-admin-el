<template>
  <div v-bind="$attrs" v-on="$listeners"  aaa="aaa" class="children">
    {{ message }}
    <span @click="$listeners.upDate('data')">{{ $attrs.type }}</span>

<saas></saas>

  </div>
</template>

<script>
import saas from "./saas.vue";
export default {
  components: {
    saas,
  },
  data() {
      return {
          aaa:"44465545"
      }
  },
  props: {
    message: String
  },
  mounted() {
    console.log(this.$attrs);
    console.log(this.$listeners);
    // setTimeout(() => {
    //   this.$emit("input", "children");
    //   this.$emit('upDate', 'add')
    // }, 1500);
  }
};
</script>
