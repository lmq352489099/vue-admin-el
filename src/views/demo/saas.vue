<template>
  <div v-bind="$attrs" v-on="$listeners" class="children">{{message}} <span @click="$listeners.upDate('data')">{{$attrs.type}}</span></div>
</template>

<script>
export default {
  props: {
    message: String
  },
  mounted() {
      console.log(1231);
      
    console.log(this.$attrs);
    console.log(this.$listeners);
    setTimeout(() => {
      this.$emit("input", "children");
      this.$emit('upDate', 'add')
    }, 1500);
  }
};
</script>
