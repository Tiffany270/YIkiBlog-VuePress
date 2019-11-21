<template>
  <div id="vuexDemo">{{$store.state.count}}

    <div class="test">x</div>
  </div>
</template>

<script>
export default {
  name: "vuex",

  methods: {},

  computed: {}
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



