<template>
  <div class="theme-container" id="guiderLink">
    <div class="content">
      <div class="width-wrapper">
        <div class="popular-grid">
          <div class="single-pen">
            <span>FlexBoxDemo</span>
            <div class="iframe-wrap">
              <iframe src="/vuepress/FlexBox/index.html"></iframe>
            </div>
            <div class="meta">
              纯css的hover特效
              <a href="/PJwrapper/Roo/">查看</a>
            </div>
          </div>
          <div class="single-pen">
            <span>TT</span>
            <div class="iframe-wrap">
              <iframe src="FlexBox/index.html"></iframe>
            </div>
            <div class="meta">
              Flex布局例子
              <a href="PJwrapper/flexBox/">查看</a>
            </div>
          </div>
          <div class="single-pen">
            <span>TT</span>
            <div class="iframe-wrap"></div>
            <div class="meta">XXXXXXXX</div>
          </div>
          <div class="single-pen">
            <div class="iframe-wrap"></div>
            <div class="meta">XXXXXXXX</div>
          </div>
          <div class="single-pen">
            <div class="iframe-wrap"></div>
            <div class="meta">XXXXXXXX</div>
          </div>
          <div class="single-pen">
            <div class="iframe-wrap"></div>
            <div class="meta">XXXXXXXX</div>
          </div>
          <div class="single-pen">
            <div class="iframe-wrap"></div>
            <div class="meta">XXXXXXXX</div>
          </div>
          <div class="single-pen">
            <div class="iframe-wrap"></div>
            <div class="meta">XXXXXXXX</div>
          </div>
          <div class="single-pen">
            <div class="iframe-wrap"></div>
            <div class="meta">XXXXXXXX</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuiderLink',

  data: function () {
    return {
      errors: [],
      name: null,
      age: null
    }
  },
  mounted () {
    // this.$http
    //   .get(this.$servePath + 'security/name1')
    //   .then(response => console.log(response))
  },
  methods: {
    checkForm: function (e) {
      if (this.name && this.age) {
        return true
      }
      this.errors = []

      if (!this.name) {
        this.errors.push('Name required.')
      }
      if (!this.age) {
        this.errors.push('Age required.')
      }

      e.preventDefault()
    }
  }
}
</script>

<style lang="stylus">
#guiderLink {
  .width-wrapper {
    /* width: 100%;
    height: 1200px;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    padding: 0 20px; */
  }

  .single-pen {
    width: 300px;
    border-radius: 6px;
    margin: 5px;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.28);
    cursor: pointer;
    flex: 30%;
  }

  .popular-grid {
    position: absolute;
    display: flex;
    max-width: 950px;
    display: flex;
    flex-wrap: wrap;
  }

  .iframe-wrap {
    position: relative;
    height: 0;
    overflow: hidden;
    width: 300px;
    height: 150px;
  }

  iframe {
    html {
      display: none;
    }
  }

  .meta {
    background: #32333b;
    position: relative;
    white-space: nowrap;
    padding: 2rem 1rem 0.5rem;
    color: white;
  }

  a {
    text-decoration: none;
    color: white;
  }

  iframe {
    position: absolute;
    height: 100%;
  }
}
</style>
