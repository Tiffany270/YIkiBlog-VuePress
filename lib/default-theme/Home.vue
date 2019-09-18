<template>
  <div>
    <div class="Flex-home-wrapper">
      <div class="flex-item-home">1</div>
      <div class="flex-item-home">
        <div class="main-about-wrapper">
          <div class="flip-container" @click="flipItem(0)">
            <div class="flipper" :class="{ 'flip-ani' :flipBlocks[0].isFlip }">
              <div class="front">
                <img v-if="data.heroImage" :src="$withBase('/me.png')" alt="hero" />
              </div>
              <div class="back ani-1">
                <div class="container-clud">
                  <div class="cloud">
                    <div class="part one"></div>
                    <div class="part two"></div>
                    <div class="part three"></div>
                  </div>
                  <div class="shadow cloud">
                    <div class="part one"></div>
                    <div class="part two"></div>
                    <div class="part three"></div>
                  </div>
                  <p class="data">
                    <span v-for="(item,index) in rainData" v-bind:key="index">{{item}}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="flip-container" @click="flipItem(1)">
            <div class="flipper" :class="{ 'flip-ani' :flipBlocks[1].isFlip }">
              <div class="front">A</div>
              <div class="back back-long">1234</div>
            </div>
          </div>
          <div class="flip-container" @click="flipItem(2)">
            <div class="flipper" :class="{ 'flip-ani' :flipBlocks[2].isFlip }">
              <div class="front">B</div>
              <div class="back">
                <p>vkontakte</p>
              </div>
            </div>
          </div>
          <div class="flip-container" @click="flipItem(3)">
            <div class="flipper" :class="{ 'flip-ani' :flipBlocks[3].isFlip }">
              <div class="front">这个世界上只有一种英雄主义，就是看清生活的真相之后，依然热爱生活</div>
              <div class="back">
                <p>vkontakte</p>
              </div>
            </div>
          </div>
        </div>
        <div class="main-info-icon">
          <a id="github" href="https://github.com/Tiffany270"></a>
          <a id="csdn" href="http://blog.csdn.net/qq_38277033"></a>
        </div>
      </div>
      <div class="flex-item-home">3</div>
    </div>

    <div class="home">
      <!-- <Content custom /> -->

      <div class="footer" v-if="data.footer">{{ data.footer }}</div>
    </div>
  </div>
</template>

<script>
import NavLink from "./NavLink.vue";

export default {
  data() {
    return {
      istest: false,
      flipBlocks: [
        {
          id: 0,
          isFlip: false
        },
        {
          id: 1,
          isFlip: false
        },
        {
          id: 2,
          isFlip: false
        },
        {
          id: 3,
          isFlip: false
        }
      ],
      rainData: ["0"]
    };
  },
  methods: {
    flipItem: function(id) {
      if (id === 0) {
        if (this.flipBlocks[id].isFlip === false) {
          this.addRainng();
        } else {
          this.rainData = ["0"];
        }
      }
      this.flipBlocks[id].isFlip = !this.flipBlocks[id].isFlip;
    },
    addRainng() {
      const cur = this;
      let loopFunData = setInterval(function() {
        let lastChar;
        lastChar = cur.rainData[cur.rainData.length - 1];
        if (cur.flipBlocks[0].isFlip === false) {
          clearInterval(loopFunData);
        }
        if (lastChar === "0") {
          cur.rainData.push("1");
        } else {
          cur.rainData.push("0");
        }
        if (cur.rainData.length === 35) clearInterval(loopFunData);
      }, 300);
    }
  },
  components: { NavLink },
  mounted() {
    this.$http
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then(response => console.log(response));
  },

  computed: {
    data() {
      return this.$page.frontmatter;
    },
    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      };
    }
  }
};
</script>

<style lang="stylus">
@import './styles/config.styl';

.home {
  padding: $navbarHeight 2rem 0;
  max-width: 960px;
  margin: 0px auto;

  .hero {
    text-align: center;

    img {
      max-height: 280px;
      display: block;
      margin: 3rem auto 1.5rem;
    }

    h1 {
      font-size: 3rem;
    }

    h1, .description, .action {
      margin: 1.8rem auto;
    }

    .description {
      max-width: 35rem;
      font-size: 1.6rem;
      line-height: 1.3;
      color: lighten($textColor, 40%);
    }

    .action-button {
      display: inline-block;
      font-size: 1.2rem;
      color: #fff;
      background-color: $accentColor;
      padding: 0.8rem 1.6rem;
      border-radius: 4px;
      transition: background-color 0.1s ease;
      box-sizing: border-box;
      border-bottom: 1px solid darken($accentColor, 10%);

      &:hover {
        background-color: lighten($accentColor, 10%);
      }
    }
  }

  .features {
    border-top: 1px solid $borderColor;
    padding: 1.2rem 0;
    margin-top: 2.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;
  }

  .feature {
    flex-grow: 1;
    flex-basis: 30%;
    max-width: 30%;

    h2 {
      font-size: 1.4rem;
      font-weight: 500;
      border-bottom: none;
      padding-bottom: 0;
      color: lighten($textColor, 10%);
    }

    p {
      color: lighten($textColor, 25%);
    }
  }

  .footer {
    padding: 2.5rem;
    border-top: 1px solid $borderColor;
    text-align: center;
    color: lighten($textColor, 25%);
  }
}

@media (max-width: $MQMobile) {
  .home {
    .features {
      flex-direction: column;
    }

    .feature {
      max-width: 100%;
      padding: 0 2.5rem;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .hero {
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        font-size: 2rem;
      }

      h1, .description, .action {
        margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .feature {
      h2 {
        font-size: 1.25rem;
      }
    }
  }
}

.Flex-home-wrapper {
  display: flex;
  flex-wrap: wrap;
  min-height: 600px;

  .flex-item-home {
    width: 450px;
    height: 450px;
    position: relative;
    margin: auto;
    background: aliceblue;
  }
}

// 中间
.main-about-wrapper {
  width: 450px;
  height: 450px;
  position: relative;
  margin: auto;
  border-radius: 20px;
  background-color: #a1c6e6;
}

// reserval card
.flip-container {
  cursor: pointer;
  perspective: 1000;
  -webkit-perspective: 1000;
  width: 50%;
  height: 50%;
  float: left;
}

.flip-ani {
  transform: rotateY(180deg);
}

.flip-container, .front, .back {
  img {
    width: 100%;
    border-radius: 18px;
  }
}

/* flipping speed here */
.flipper {
  height: 100%;
  transition: 0.6s;
  transform-style: preserve-3d;
  position: relative;
}

/* making the the other side hidden while flipping */
.front, .back {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
}

/* front side is in front of a back side */
.front {
  z-index: 2;
  color: white;
}

/* back side */
.back {
  width: 100%;
  background-color: aliceblue;
  height: 100%;
  transform: rotateY(180deg);
  border-radius: 18px;
}

.back-long {
  width: 450px;
}

.main-info-icon {
  width: 450px;
  height: 450px;
  position: relative;
  margin: auto;

  a {
    background-color: #b8d6ec;
    width: 50px;
    height: 50px;
    transition: 1s;
    display: inline-block;
    margin-top: 10px;
    border-bottom: none;
    border-radius: 20px;
    opacity: 0.25;
    color: #ffffff;
  }

  a:hover {
    background-color: #6b94c0;
    opacity: 1;
    border-radius: 10px;
  }
}

#github {
  background: url('https://static.easyicon.net/preview/119/1196537.gif'); // static.easyicon.net/preview/119/1196537.gif);
  background-size: 100%;
}

#csdn {
  background: url('https://static.easyicon.net/preview/118/1188653.gif'); // static.easyicon.net/preview/118/1188653.gif);
  background-size: 110%;
}

// clud-animation
.ani-1 {
  background-color: #364b71;
}

.container-clud {
  position: absolute;
  top: 28%;
  left: 37%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;

  .cloud {
    width: 140px;
    height: 15px;
    background-color: #d1e1ff;
    border-radius: 25px;
    position: relative;
    z-index: 6;
    animation: movebig 5s infinite;
    transition: all 1s ease-in-out;
  }

  .cloud .part {
    border-radius: 50%;
    background-color: #d1e1ff;
    position: absolute;
  }

  .cloud .part.one {
    top: -33px;
    left: 20px;
    width: 40px;
    height: 40px;
  }

  .cloud .part.two {
    top: -40px;
    left: 50px;
    width: 50px;
    height: 50px;
  }

  .cloud .part.three {
    top: -23px;
    left: 91px;
    width: 30px;
    height: 30px;
  }

  .shadow.cloud {
    width: 140px;
    height: 15px;
    background-color: #96aeda;
    border-radius: 25px;
    position: absolute;
    transform: scale(0.7);
    top: -6px;
    left: 80px;
    z-index: 5;
    animation: movesmall 4s infinite;
    transition: all 1s ease-in-out;
  }

  .shadow.cloud .part {
    border-radius: 50%;
    background-color: #96aeda;
  }

  .data {
    color: #9ed7ff;
    font-size: 15px;
    width: 100px;
    text-align: center;
    overflow-wrap: break-word;
    margin: auto;
    font-family: 'Poppins', sans-serif;
    position: absolute;
    padding-top: 10px;
    animation: movebig 4s infinite;
    transition: all 1s ease-in-out;
    padding-left: 15px;
    letter-spacing: 5px;
  }

  @keyframes movebig {
    0%, 100% {
      left: 0px;
    }

    50% {
      left: -10px;
    }
  }

  @keyframes movesmall {
    0%, 100% {
      left: 50px;
    }

    50% {
      left: 40px;
    }
  }
}
</style>
