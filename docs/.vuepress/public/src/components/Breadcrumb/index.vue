<template>
  <div class="bread-crumb">
    <span class="product-name" v-if="isIndex">{{ serviceProviderInfo.productName }}</span>
    <el-breadcrumb v-else separator="/">
      <el-breadcrumb-item
        v-for="breadcrumb in breadcrumbList"
        :class="breadcrumb.isCur ? 'current-route' : 'other-route'"
        :key="breadcrumb.name"
        @click.native="goto(breadcrumb)"
        >{{ breadcrumb.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      breadcrumbList: [],
      isIndex: true
    }
  },
  computed: {
    ...mapGetters(['serviceProviderInfo'])
  },
  watch: {
    $route: {
      handler(newRoute) {
        if (newRoute.name === 'Dashboard') {
          this.isIndex = true
        } else {
          this.isIndex = false
          this.breadcrumbList = newRoute.matched.map(route => {
            return {
              title: route.meta.title,
              name: route.name,
              params: route.params,
              query: route.query,
              isCur: newRoute.name === route.name
            }
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    goto({ name, params, query }) {
      if (name === this.$route.name) return
      this.$router.push({ name, params, query })
    }
  }
}
</script>
<style lang="scss" scoped>
.bread-crumb {
  margin-left: 20px;
  font-size: 14px;
  .product-name {
    font-size: 16px;
  }
  .other-route {
    /deep/.el-breadcrumb__inner {
      color: #999;
      cursor: pointer;
    }
  }
  .current-route {
    /deep/.el-breadcrumb__inner {
      color: #cc3333;
    }
  }
  /deep/.el-breadcrumb__separator {
    font-weight: 400;
  }
}
</style>
