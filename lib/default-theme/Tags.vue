<template>
  <div>
<ul class="colors">
  <span style="font-family: sans-serif; color:#777">Tag Color:</span>
     <li
     v-for="item in colorPiker"
     :key="item"
     @click="changeColor(item)"
     :style={background:item}>
  </li>
</ul>

<label for="tag-typer">
<div id="tags">
  <span
  v-for="item in tagDatas"
  :key="item.title"
  class="tag" :style={background:fontColor}>
      <a
      v-if="item.path"
      :href="`/vuepress/`+ item.path">{{  item.title }}</a>
      <span v-else style="cursor:not-allowed" >{{  item.title }}</span>
  </span>

</div>
</label>
  </div>
</template>

<script>
export default {
  data () {
    return {
      colorPiker: ['#E77', '#F95', '#4f718d', '#a1c6e6', '#AAA'],
      fontColor: '#4f718d',
      tagDatas: [
        {
          title: 'Algorithms'
        }, {
          title: 'Leetcode',
          path: 'Leetcode/'
        }, {
          title: 'Redis',
          path: 'Redis/'
        }, {
          title: 'Nginx',
          path: 'Nginx/'
        }, {
          title: 'Git',
          path: 'Git/'
        }, {
          title: 'React',
          path: 'React/'
        }, {
          title: 'SpringBoot',
          path: 'SpringBoot/'
        }, {
          title: 'Mysql',
          path: 'Mysql/'
        }, {
          title: 'JavaScript',
          path: 'JavaScript/'
        }, {
          title: 'Webpack',
          path: 'Webpack/'
        }, {
          title: 'TypeScript',
          path: 'TypeScript/'
        }, {
          title: 'csapp',
          path: 'csapp/'
        }, {
          title: 'Vue',
          path: 'Vue/'
        }, {
          title: 'Vue3',
          path: 'Vue3/'
        }
      ]
    }
  },
  methods: {
    changeColor (color) {
      this.fontColor = color
    }
  },
  mounted () {
  }

}
</script>

<style lang="stylus">

#tags{
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  padding: 10px;
  width: 70%;
  margin: auto;
  cursor: pointer;

}

#tag-typer{
  outline: none;
  border: none;
  padding: 6px;
  margin: 3px;
  margin-right: -25px;
  width: 100px;
  background-color: transparent;
  font-size: 14px;
  color: #333;
}

.tag{
  display: inline-block;
  background: #4f718d;
  color: #FFF;
  padding: 5px 10px;
  margin:8px 2px 2px 20px;
  font: normal 16px sans-serif;
  position: relative;
  -webkit-transform-origin:0% 50%;
  -webkit-animation: swing 1s;
  -o-animation: swing 1s;
  animation: swing 1s ;
  box-shadow:1px 1px 0 rgba(0,0,0,.2);
  a {
    color: white
  }
}

.tag:before{
  content: "";
  position: absolute;
  width: 0;
  background: inherit;
  height: 10px;
  border: 10px solid white;
  border-right-color: transparent;
  -webkit-border-radius: 10px 0 0 10px;
  -moz-border-radius:10px 0 0 10px;
  border-radius:10px 0 0 10px;
  left: -20px;
  top: 0;
}

.tag:after{
  content: "";
  width: 6px;
  height: 6px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background: #FFF;
  position: absolute;
  left: -3px;
  top: 12px;
  box-shadow:inset 1px 1px 0 #CCC;
}

.colors {
  list-style:none;
  cursor: pointer;

}
.colors li{
  display: inline-block;
  width:15px;
  height: 15px;
  margin: 2px;
}

/* Chrome, Safari, Opera */
@-webkit-keyframes swing
{
  0%   {-webkit-transform: rotate(100deg)}
  25%  {-webkit-transform: rotate(-25deg)}
  50%  {-webkit-transform: rotate(15deg)}
  100% {-webkit-transform: rotate(0deg)}
}

@keyframes swing
{
  0%   {-webkit-transform: rotate(-200)}
  25%  {-webkit-transform: rotate(-70)}
  50%  {-webkit-transform: rotate(-185)}
  100% {-webkit-transform: rotate(-180)}
}
</style>
