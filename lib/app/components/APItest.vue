<template>
  <div class="theme-container">
    <div class="content">
      <div class="block">
        <h3>Redis相关API测试</h3>
        <div class="container-flex">
          <div class="flex-item item-1">API</div>
          <div class="flex-item item-2"><button>test</button></div>
          <div class="flex-item item-3">res</div>
        </div>
        <div class="link">文章链接：<a href="">link</a></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'APItest',

  methods: {}
}
</script>

<style>
.flex-item {
  color: white;
  font-size: 1.5rem;
  padding: 0.5rem;
  text-align: center;
}

.item-1 {
  background-color: #ff8080;
}

.item-2 {
  background-color: #ffff80;
}

.item-3 {
  background-color: #00ff80;
}

.item-4 {
  background-color: #0080ff;
}

.item-5 {
  background-color: #ff80c0;
}

.item-6 {
  background-color: #800040;
}

.item-7 {
  background-color: #ff8000;
}

.item-8 {
  background-color: #400000;
}

.item-9 {
  background-color: #808000;
}

.container-flex {
  border: 6px solid black;
  display: inline-flex;
}
</style>
