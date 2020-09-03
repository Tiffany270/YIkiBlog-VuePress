<template>
  <div class="theme-container">
    <div class="content">
      <div id="vuexDemo">
        {{$store.state.count}}
        <button class="test" @click="addCount()">ADD</button>
      </div>
      <hr />
      <div>{{prints}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Vuex",
  data: function () {
    return {
      prints: [],
    };
  },
  methods: {
    addCount() {
      this.$store.commit("addCount");
    },
  },
  beforeCreate: function () {
    console.group("beforeCreate 创建前状态===============》");
    var state = {
      el: this.$el,
      data: this.$data,
      message: this.message,
    };
    console.log(state);
  },
  created: function () {
    console.group("created 创建完毕状态===============》");
    var state = {
      el: this.$el,
      data: this.$data,
      message: this.message,
    };
    console.log(state);
  },
  beforeMount: function () {
    console.group("beforeMount 挂载前状态===============》");
    var state = {
      el: this.$el,
      data: this.$data,
      message: this.message,
    };
    console.log(this.$el);
    console.log(state);
  },
  mounted: function () {
    console.group("mounted 挂载结束状态===============》");
    var state = {
      el: this.$el,
      data: this.$data,
      message: this.message,
    };
    console.log(this.$el);
    console.log(state);
  },
  beforeUpdate: function () {
    console.group("beforeUpdate 更新前状态===============》");
    var state = {
      el: this.$el,
      data: this.$data,
      message: this.message,
    };
    console.log(this.$el);
    console.log(state);
    console.log(
      "beforeUpdate == " + document.getElementsByTagName("p")[0].innerHTML
    );
  },
  updated: function () {
    console.group("updated 更新完成状态===============》");
    var state = {
      el: this.$el,
      data: this.$data,
      message: this.message,
    };
    console.log(this.$el);
    console.log(state);
    console.log(
      "updated == " + document.getElementsByTagName("p")[0].innerHTML
    );
  },
  beforeDestroy: function () {
    console.group("beforeDestroy 销毁前状态===============》");
    var state = {
      el: this.$el,
      data: this.$data,
      message: this.message,
    };
    console.log(this.$el);
    console.log(state);
  },
  destroyed: function () {
    console.group("destroyed 销毁完成状态===============》");
    var state = {
      el: this.$el,
      data: this.$data,
      message: this.message,
    };
    console.log(this.$el);
    console.log(state);
  },
};
</script>

<style lang="stylus">
#vuexDemo {
  color: red;

  .test {
    color: blue;
  }
}
</style>
