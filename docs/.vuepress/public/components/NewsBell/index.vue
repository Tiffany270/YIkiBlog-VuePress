<template>
  <div class="bell-content">
    <el-popover placement="bottom" width="400" trigger="hover" @show="popShow" popper-class="news-pop-class">
      <el-badge slot="reference" :value="totalCount" :max="99" class="item" :hidden="totalCount === 0">
        <img class="bell" src="./img/bell.png" alt="" />
      </el-badge>
      <div class="news-list">
        <div class="news-list-header" v-if="isShow">
          <el-tabs v-model="activeName" :stretch="true">
            <el-tab-pane v-for="tab in tabList" :name="tab.activeName" :key="tab.activeName">
              <template slot="label">
                <el-badge
                  :value="unReadCount[tab.activeName]"
                  :max="99"
                  class="news-count"
                  :hidden="unReadCount[tab.activeName] === 0"
                >
                  <span>{{ tab.label }}</span>
                </el-badge>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="news-list-container" v-if="newsList[activeName].length > 0">
          <div class="news-list-item" v-for="item in newsList[activeName]" :key="item.id" @click="clickNews(item)">
            <div class="item-top" :class="activeName === newsTypes['公告'] ? 'announcement-list' : ''">
              <span class="item-title ellipsis">{{ item.messageTitle || item.title }}</span>
              <span class="item-time">{{ activeName === newsTypes['公告'] ? item.enableTime : item.createTime }}</span>
            </div>
            <div class="item-content ellipsis" v-if="activeName !== newsTypes['公告']">
              {{ item.messageContent }}
            </div>
          </div>
          <div class="news-list-actions">
            <span @click="readCurrentPage">{{ formatActiveName }}</span>
            <span @click="gotoAll">查看全部</span>
          </div>
        </div>
        <div class="news-list-container" v-else>
          <div class="no-data">
            <no-data />
          </div>
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { newsTypes } from '@/maps/enum'
import { readNotification, readBacklogfication, readAnnouncement, refreshMessage } from '@/apis/newsManagement'
import NoData from '@/components/NoData'

export default {
  components: {
    NoData
  },
  data() {
    return {
      isShow: false,
      activeName: newsTypes['待办'],
      newsTypes,
      unReadCount: {
        [newsTypes['待办']]: 0,
        [newsTypes['通知']]: 0,
        [newsTypes['公告']]: 0
      },
      newsList: {
        [newsTypes['待办']]: [],
        [newsTypes['通知']]: [],
        [newsTypes['公告']]: []
      },
      closeWS: false,
      // 重连次数
      connectNumber: 0,
      // 重连间隔时间
      connectSeconds: [0, 1, 1, 2, 3, 10, 20, 30]
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    source() {
      return this.userInfo.attrs.source
    },
    tabList() {
      // 服务商平台
      if (this.source === 'ADMIN') {
        return [
          { label: '待办', activeName: newsTypes['待办'] },
          { label: '通知', activeName: newsTypes['通知'] },
          { label: '公告', activeName: newsTypes['公告'] }
        ]
      } else {
        // 运营后台和B端
        return [
          { label: '待办', activeName: newsTypes['待办'] },
          { label: '通知', activeName: newsTypes['通知'] }
        ]
      }
    },
    wsUrl() {
      // 模板：wss://gateway.test-axb.gigpayroll.com/api/message/websocket/operation/message/112
      const wsURL =
        process.env.NODE_ENV === 'production'
          ? process.env.VUE_APP_WS_URL
          : 'ws://192.168.0.121:8101/api/message/websocket'
      let source
      let projectId = ''
      switch (this.source) {
        case 'OPERATOR':
          source = 'operation'
          break
        case 'ADMIN':
          source = 'admin'
          break
        case 'WEB':
          source = 'web'
          break
      }
      // B端 要projectId
      if (this.source === 'WEB') {
        projectId = `${this.userInfo.attrs.projectId}/`
      }
      return `${wsURL}/${source}/message/${projectId}${this.userInfo.accountId}`
    },
    totalCount() {
      let total = 0
      Object.keys(this.unReadCount).forEach(key => {
        total += this.unReadCount[key]
      })
      return total
    },
    formatActiveName() {
      switch (this.activeName) {
        case newsTypes['待办']:
          return '当前标记为已处理'
        case newsTypes['通知']:
          return '当前标记为已读'
        case newsTypes['公告']:
          return '当前标记为已读'
        default:
          return ''
      }
    }
  },
  mounted() {
    this.openWS()
  },
  beforeDestroy() {
    this.closeWs = true
  },
  methods: {
    popShow() {
      this.activeName = newsTypes['待办']
      this.isShow = true
    },
    openWS() {
      const ws = new WebSocket(this.wsUrl)
      ws.onopen = event => {
        console.log('open', event)
      }
      ws.onmessage = event => {
        const data = JSON.parse(event.data)
        const newsType = data.function
        this.newsList[newsType] = data.data.list
        this.unReadCount[newsType] = data.data.unReadCount
        this.$notify.closeAll()
        if (data.needRemind) {
          this.$notify.success({
            title: '通知',
            message: '你有新的消息，请注意查看',
            duration: 3000,
            offset: 48
          })
        }
      }
      ws.onclose = () => {
        let s = 0
        let timer = null
        this.connectNumber < this.connectSeconds.length - 1 ? this.connectNumber++ : null
        // 非正常关闭 重新连接
        if (!this.closeWs) {
          timer = setInterval(() => {
            s++
            console.log(this.connectSeconds[this.connectNumber])
            if (s === this.connectSeconds[this.connectNumber]) {
              clearInterval(timer)
              this.openWS()
            }
          }, 1000)
        } else {
          clearInterval(timer)
        }
      }
    },
    clickNews(item) {
      if (this.activeName === newsTypes['待办']) {
        let modelParam = {}
        if (item.modelParam) {
          modelParam = JSON.parse(item.modelParam)
        }
        this.$router.push({
          name: item.model,
          ...modelParam
        })
      } else if (this.activeName === newsTypes['通知']) {
        this.$router.push({
          name: 'SystemNewsList',
          query: {
            activeName: this.activeName
          }
        })
      } else if (this.activeName === newsTypes['公告']) {
        this.$router.push({
          name: 'AnnouncementDetail',
          query: {
            id: item.id
          }
        })
      }
    },
    readCurrentPage() {
      const ids = this.newsList[this.activeName].map(item => item.id)
      this.readMsg(ids)
    },
    readMsg(ids) {
      let api
      switch (this.activeName) {
        case newsTypes['待办']:
          api = readBacklogfication
          break
        case newsTypes['通知']:
          api = readNotification
          break
        case newsTypes['公告']:
          api = readAnnouncement
          break
      }
      api({ ids }).then(res => {
        if (res.data) {
          refreshMessage({ functionList: [this.activeName] })
        }
      })
    },
    gotoAll() {
      if (this.activeName === newsTypes['公告']) {
        this.$router.push({
          name: 'AnnouncementList'
        })
      } else {
        this.$router.push({
          name: 'SystemNewsList',
          query: {
            activeName: this.activeName
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.bell-content {
  margin-right: 36px;
  .el-badge {
    .bell {
      width: 28px;
      height: 28px;
    }
    /deep/.el-badge__content {
      background-color: #cc3333;
    }
  }
}
</style>
<style lang="scss">
.news-pop-class {
  padding: 0 !important;
  .el-tabs__header {
    margin: 0;
  }
  .el-tabs__nav-scroll {
    padding: 0 24px;
  }
  .el-tabs__nav-wrap::after {
    height: 1px;
  }
  .el-tabs__item {
    line-height: 48px;
    height: 48px;
    font-size: 14px;
    color: #999;
    .news-count {
      .el-badge__content {
        background-color: #ccc;
        &.is-fixed {
          top: 24px;
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
          &.is-fixed {
            top: 24px;
            right: -5px;
          }
        }
      }
    }
  }
  .el-tabs__active-bar {
    height: 4px;
    background-color: #333333;
  }
  .news-list-container {
    padding: 0 24px;
    .news-list-item {
      padding: 11px 0 15px;
      cursor: pointer;
      border-bottom: 1px solid #e4e7ed;
      .item-top {
        display: flex;
        justify-content: space-between;
        height: 19px;
        line-height: 19px;
        .item-title {
          font-size: 14px;
          font-weight: bold;
          width: 200px;
        }
        .item-time {
          color: #999;
        }
        &.announcement-list {
          line-height: 25px;
        }
      }
      .item-content {
        font-size: 12px;
        width: 350px;
        margin-top: 11px;
      }
      &:hover {
        background-color: #f2f2f2;
        .item-content {
          color: #3360e1;
        }
      }
    }
    .news-list-actions {
      display: flex;
      justify-content: space-between;
      height: 60px;
      line-height: 60px;
      span {
        cursor: pointer;
        &:nth-child(1) {
          color: #999;
        }
      }
    }
    .no-data {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 29px 0 53px;
      color: #333;
      img {
        width: 128px;
        height: 128px;
      }
    }
  }
}
</style>
