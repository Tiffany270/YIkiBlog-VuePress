<template>
  <div>
    <div class="main-about-wrapper">
      <div class="flip-container" @click="flipItem(0)">
        <div class="flipper" :class="{ 'flip-ani' :flipBlocks[0].isFlip }">
          <div class="front">
            <img v-if="data.heroImage" :src="$withBase('/me.png')" alt="hero" />
          </div>
          <div class="back">{{flipBlocks[0]}}</div>
        </div>
      </div>
      <div class="flip-container">
        <div class="flipper flip-ani">
          <div class="front">A</div>
          <div class="back back-long">1234</div>
        </div>
      </div>
      <div class="flip-container">
        <div class="flipper flip-ani">
          <div class="front">B</div>
          <div class="back">
            <p>vkontakte</p>
          </div>
        </div>
      </div>
      <div class="flip-container">
        <div class="flipper flip-ani">
          <div class="front">C</div>
          <div class="back">
            <p>vkontakte</p>
          </div>
        </div>
      </div>
    </div>

    <div class="home">
      <div class="features" v-if="data.features && data.features.length">
        <div class="feature" v-for="feature in data.features">
          <h2>{{ feature.title }}</h2>
          <p>{{ feature.details }}</p>
        </div>
      </div>

      <Content custom />

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
          isFlip: true
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
      ]
    };
  },
  methods: {
    flipItem: function(id) {
      this.flipBlocks[id].isFlip = !this.flipBlocks[id].isFlip;
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

// 中间
.main-about-wrapper {
  width: 450px;
  height: 450px;
  position: relative;
  margin: auto;
  margin-top: 5%;
  border-radius: 20px;
  background-color: #a1c6e6;
}

// reserval card
.flip-container {
  cursor: pointer;
  perspective: 1000;
  width: 50%;
  height: 50%;
  perspective: 1000;
  float: left;
}

/* turning on hover */
.flip-container:hover .flipper {
  // transform: rotateY(180deg);
}

.flip-container:hover .flip-ani {
  transform: rotateY(180deg);
}

.flip-container, .front, .back {
  img {
    width: 100%;
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
}

.back-long {
  width: 450px;
}
</style>
