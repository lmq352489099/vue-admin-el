<template>
  <div class="parent">
    <Children
      :message="message"
      @upDate="upDate"
      type="type"
      @input="
        event => {
          message = event;
        }
      "
    />
  </div>
</template>

<script>
import Children from "./Children";
export default {
  components: {
    Children
  },
  data() {
    return {
      message: "parent",
      type: "del"
    };
  },
  methods: {
    upDate(event) {
      console.log(event);
      this.type = event;
    }
  },
  watch: {
    message: function () {
      console.log("更新message值为" + this.message);
    }
  }
};
</script>
