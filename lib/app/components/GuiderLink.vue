<template>
  <div class='theme-container' id='guiderLink'>
    <div class='content'>
      <div class='width-wrapper'>
        <div class='popular-grid'>

         <div
         v-for="item in demoArrays"
        :key="item.title"
         class='single-pen'>
            <span>{{item.title}}</span>
            <div class='iframe-wrap'>
              <iframe :src='item.frame_path'
              v-if="item.type==='link'"
           scrolling="no"
              ></iframe>
              <div v-else-if="item.type==='component'">
                  <component :is="item.component_"></component>
                </div>
                <div v-else-if="item.type==='template'">
                  <div v-html="item.template"></div>
                </div>
              <div v-else>{{item.frame_path}}</div>
            </div>
            <div class='meta'>
              <a :href='item.href_path' target='blank'>CLICK IT</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Rooling from '@app/components/Rooling'

export default {
  name: 'GuiderLink',

  data: function () {
    return {
      demoArrays: [
        {
          title: 'FlexBoxDemo',
          frame_path: '/vuepress/FlexBox/index.html',
          href_path: '/vuepress/FlexBox/index.html',
          component_: ``,
          type: 'link'
        }, {
          title: 'Vuex & Life Hooks',
          frame_path: 'Vuex',
          href_path: '/vuepress/PJwrapper/VuexDemo/',
          component_: ``,
          type: 'html'

        }, {
          title: `Rooling`,
          frame_path: '/vuepress/FlexBox/index.html',
          href_path: '#',
          component_: `Rooling`,
          type: 'component'
        }, {
          title: 'ICON-FONT',
          frame_path: '',
          href_path: '/vuepress/PJwrapper/iconfont/',
          template: `
                  unicode:
                  <i class='iconfont'>&#xe614;</i>
                  class :
                  <span class='icon iconfont icon-shezhi'></span>
                  svg:
                  <svg class='icon' aria-hidden='true'>
                    <use xlink:href='#icon-shezhi' />
                  </svg>`,
          type: 'template'
        },
        {
          title: `hree-svg-3Dmap`,
          frame_path: 'http://www.yiki.site/three-svg-3Dmap/index.html',
          href_path: 'http://www.yiki.site/three-svg-3Dmap/index.html',
          type: 'link'
        },
        {
          title: `CSS`,
          frame_path: 'http://www.yiki.site/CatWalking/',
          href_path: 'http://www.yiki.site/CatWalking/',
          type: 'link'
        }

      ]
    }
  },
  mounted () {
    import('@asset/iconfont/iconfont.js').then((icon) => {})
  },
  components: { Rooling }
}
</script>

<style lang='stylus'>
@import '../../asset/iconfont/iconfont.css';

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
    overflow: auto;
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
    top:0;
    left:0;
    width:100%;
    height:100%;
    html {
      display: none;
    }
  }

  .meta {
    background: #32333b;
    position: relative;
    white-space: nowrap;
    padding: 1rem 1rem 0.5rem;
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

  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>
