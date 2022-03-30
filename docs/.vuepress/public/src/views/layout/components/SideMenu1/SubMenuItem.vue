<template>
  <div class="menu-item">
    <i class="menu-item__right__top--radius"></i>
    <i class="menu-item__right__bottom--radius"></i>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
@import '@/styles/index';
@include b(menu-item) {
  position: relative;
  height: 44px;
  line-height: 44px;
  margin-bottom: 16px;
  cursor: pointer;
  padding-left: 10px;
  color: #fff;
  font-size: 15px;
  font-weight: 400px;
  display: flex;
  align-items: center;
}
.default-active {
  background-color: #fff;
  border-top-left-radius: 22px;
  border-bottom-left-radius: 22px;
  color: #cc3333;
  .menu-item__right__top--radius,
  .menu-item__right__bottom--radius {
    display: inline-block;
  }
}

.default-active::before {
  content: '';
  width: 23px;
  height: 23px;
  background-color: #cc3333;
  position: absolute;
  right: 0;
  top: -23px;
  border-radius: 10px;
  z-index: 20;
}
.default-active::after {
  content: '';
  width: 23px;
  height: 23px;
  background-color: #cc3333;
  position: absolute;
  right: 0;
  bottom: -23px;
  border-radius: 10px;
  z-index: 20;
}

.menu-item:hover {
  background-color: #fff;
  border-top-left-radius: 22px;
  border-bottom-left-radius: 22px;
  color: #cc3333;
  .menu-item__right__top--radius,
  .menu-item__right__bottom--radius {
    display: inline-block;
  }
}
.menu-item__right__top--radius {
  display: none;
  content: '';
  width: 16px;
  height: 16px;
  background-color: #fff;
  position: absolute;
  right: 0;
  top: -16px;
  z-index: 10;
}
.menu-item__right__bottom--radius {
  display: none;
  content: '';
  width: 16px;
  height: 16px;
  background-color: #fff;
  position: absolute;
  right: 0;
  bottom: -16px;
  z-index: 10;
}
.menu-item:hover::before {
  content: '';
  width: 23px;
  height: 23px;
  background-color: #cc3333;
  position: absolute;
  right: 0;
  top: -23px;
  border-radius: 10px;
  z-index: 20;
}
.menu-item:hover::after {
  content: '';
  width: 23px;
  height: 23px;
  background-color: #cc3333;
  position: absolute;
  right: 0;
  bottom: -23px;
  border-radius: 10px;
  z-index: 20;
}
</style>
