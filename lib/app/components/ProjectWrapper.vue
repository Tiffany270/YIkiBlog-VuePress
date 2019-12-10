<template>
  <div>
    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar"></Navbar>

    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "../../default-theme/Navbar";

export default {
  components: { Navbar },

  name: "ProjectWrapper",
  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
    },
    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    }
  },
  computed: {
    pageClasses() {
      return [
        {
          "no-navbar": !this.shouldShowNavbar
        }
      ];
    },
    shouldShowNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      );
    }
  },
  mounted() {},
  beforeDestroy() {
    // this.$router.push("/");
  },
  destroyed(){
    // this.$router.push("/");
  },
  created() {
    // this.$router.push("/");

    // const cur = this;
    // window.onbeforeunload = function(e) {
    //   let dialogText = "Dialog text here";
    //    e.returnValue = dialogText;
    //   return e.returnValue;
    //   cur.$router.push("/");
    // };
  }
};
</script>

<style lang="stylus">
#flexbox {
  background: white;

  iframe {
    position: relative;
    margin: auto;
    bottom: 0;
    top: 85px;
    height: 500px;
    left: 5%;
    width: 90%;
  }
}
</style>
