<template>
  <page-container>
    <div class="news-list">
      <div class="news-list-header">
        <span
          class="all-readed"
          @click="readAllNotification"
          v-if="newsList[activeName] && Array.isArray(newsList[activeName]) && newsList[activeName].length > 0"
        >
          {{ formatActiveName }}
        </span>
        <el-tabs v-model="activeName">
          <el-tab-pane v-for="tab in tabList" :name="tab.activeName" :key="tab.activeName">
            <template slot="label">
              <el-badge
                :value="unReadcount[tab.activeName]"
                :max="99"
                class="news-count"
                :hidden="unReadcount[tab.activeName] == 0"
              >
                <span>{{ tab.label }}</span>
              </el-badge>
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div
        class="news-list-container"
        v-if="newsList[activeName] && Array.isArray(newsList[activeName]) && newsList[activeName].length > 0"
      >
        <div class="news-list-item" v-for="item in newsList[activeName]" :key="item.id">
          <div class="item-left">
            <span class="item-title">
              {{ item.messageTitle }}
              <span class="new-item" v-if="!item.readFlag">NEW</span>
            </span>
            <span class="item-content ellipsis" v-if="activeName !== '公告'">
              {{ item.messageContent }}
            </span>
            <span class="item-time">{{ item.createTime }}</span>
          </div>
          <div class="item-right">
            <el-button type="primary" v-if="!item.readFlag && activeName !== newsTypes['通知']" @click="goto(item)">
              <!-- 防止后面加公告类型 -->
              {{ activeName === newsTypes['待办'] ? '去处理' : '详情' }}
            </el-button>
            <el-button v-if="!item.readFlag && activeName !== newsTypes['公告']" @click="readNotification([item.id])">
              {{ activeName === newsTypes['待办'] ? '已处理' : '已读' }}
            </el-button>
          </div>
        </div>
        <div class="news-pages">
          <el-pagination
            background
            layout="total, sizes, prev, pager, next"
            :current-page.sync="pages.current"
            :page-size="pages.size"
            :total="pages.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <div class="news-list-container" v-else>
        <div class="no-data">
          <no-data />
        </div>
      </div>
    </div>
  </page-container>
</template>

<script>
import pageMixin from '@/mixins/Page'
import BasePage from '@/mixins/BasePage'
import { newsTypes } from '@/maps/enum'
import {
  backlogPage,
  noticePage,
  unReadNum,
  readNotification,
  readBacklogfication,
  refreshMessage
} from '@/apis/newsManagement'
import NoData from '@/components/NoData'

export default {
  components: {
    NoData
  },
  mixins: [pageMixin, BasePage],
  data() {
    return {
      newsTypes,
      activeName: newsTypes['待办'],
      unReadcount: {
        [newsTypes['待办']]: 0,
        [newsTypes['通知']]: 0
      },
      tabList: [
        {
          label: '待办',
          activeName: newsTypes['待办']
        },
        {
          label: '通知',
          activeName: newsTypes['通知']
        }
        // {
        //   label: '公告',
        //   activeName: '公告'
        // }
      ],
      newsList: {
        [newsTypes['待办']]: [],
        [newsTypes['通知']]: []
      },
      pages: {
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  watch: {
    activeName(activeName) {
      if (activeName) {
        this.$router.replace({
          name: 'SystemNewsList',
          query: { activeName }
        })
      }
    },
    $route: {
      immediate: true,
      handler(newRoute) {
        this.activeName = newRoute.query.activeName || newsTypes['待办']
        this.pages.current = 1
        this.fetchData()
      }
    }
  },
  computed: {
    formatActiveName() {
      switch (this.activeName) {
        case newsTypes['待办']:
          return '当前标记为已处理'
        case newsTypes['通知']:
          return '当前标记为已读'
        case newsTypes['公告']:
          return ''
        default:
          return ''
      }
    }
  },
  // created() {
  //   const activeName = this.$route.query.activeName
  //   activeName ? (this.activeName = activeName) : null
  // },
  mounted() {
    this.getUnReadNum()
  },
  methods: {
    searchData() {
      this.getUnReadNum()
      this.fetchData()
    },
    getUnReadNum() {
      unReadNum().then(({ data }) => {
        console.log(data)
        this.unReadcount[newsTypes['待办']] = data.backlogNum
        this.unReadcount[newsTypes['通知']] = data.noticeNum
      })
    },
    fetchData() {
      const params = {
        current: this.pages.current,
        size: this.pages.size
      }
      const api = this.activeName === newsTypes['待办'] ? backlogPage : noticePage
      api(params).then(res => {
        this.newsList[this.activeName] = res.data.records
        this.pages.total = res.data.total * 1
      })
    },
    goto(item) {
      // 点击后将数据处理为 已读或者已处理
      if (this.activeName === newsTypes['待办']) {
        let modelParam = {}
        if (item.modelParam) {
          modelParam = JSON.parse(item.modelParam)
        }
        this.$router.push({
          name: item.model,
          ...modelParam
        })
      } else if (this.activeName === newsTypes['公告']) {
        this.readMsg([item.id])
        this.$router.push({
          name: 'AnnouncementDetail',
          query: {
            id: item.id
          }
        })
      }
    },
    readAllNotification() {
      const ids = this.newsList[this.activeName].map(item => item.id)
      this.readNotification(ids)
    },
    readNotification(ids) {
      const api = this.activeName === newsTypes['待办'] ? readBacklogfication : readNotification
      api({ ids }).then(res => {
        if (res.data) {
          refreshMessage({ functionList: [this.activeName] })
          this.searchData()
        }
      })
    },
    handleCurrentChange(current) {
      this.pages.current = current
      this.fetchData()
    },
    handleSizeChange(size) {
      this.pages.current = 1
      this.pages.size = size
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
.news-list {
  background-color: #fff;
  border-radius: 8px;
  padding: 0 24px;
  .news-list-header {
    position: relative;
    .all-readed {
      position: absolute;
      top: 15px;
      right: 0px;
      z-index: 10;
      cursor: pointer;
      color: #333;
    }
  }
  /deep/.el-tabs {
    .el-tabs__header {
      margin: 0;
    }
    // .el-tabs__nav-scroll {
    //   padding: 0 24px;
    // }
    .el-tabs__nav-wrap::after {
      height: 1px;
    }
    .el-tabs__item {
      line-height: 54px;
      height: 54px;
      width: 140px;
      text-align: center;
      font-size: 16px;
      color: #999;
      .news-count {
        .el-badge__content {
          background-color: #ccc;
          &.is-fixed {
            top: 27px;
            right: -5px;
          }
        }
      }
      &.is-active {
        color: #333;
        font-weight: bold;
        .news-count {
          .el-badge__content {
            background-color: #cc3333;
          }
        }
      }
    }
    .el-tabs__active-bar {
      height: 4px;
      background-color: #333333;
    }
  }
  .news-list-container {
    .news-list-item {
      display: flex;
      justify-content: space-between;
      padding: 16px 24px;
      border-bottom: 1px solid #e4e7ed;
      .item-left {
        display: flex;
        flex-direction: column;
        width: calc(100% - 200px);
        span {
          color: #333;
          margin-bottom: 13px;
          width: 100%;
          &:nth-last-child(1) {
            margin: 0;
          }
          &.item-time {
            color: #999;
          }
        }
        .new-item {
          display: inline-block;
          width: 38px;
          height: 18px;
          font-size: 12px;
          text-align: center;
          line-height: 18px;
          color: #fff;
          background: #cc3333;
          border-radius: 2px;
        }
      }
      .item-right {
        display: flex;
        align-items: center;
      }
      &:hover {
        background-color: #f2f2f2;
      }
    }
    .news-pages {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 77px;
    }
    .no-data {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 24px 0;
    }
  }
}
</style>
