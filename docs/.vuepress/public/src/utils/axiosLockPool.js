import md5 from 'md5'

export class AxiosLockPool {
  /**
   * 构造器
   * @param gap 时间间隔
   */
  constructor(gap) {
    this.pool = []
    this.gap = Number.isNaN(+gap) ? 0 : +gap
  }

  /**
   *
   * @param {object|string}raw
   * @returns {string}
   */
  static jsonify(raw) {
    return typeof raw === 'string' ? raw : JSON.stringify(raw)
  }

  /**
   *
   * @param {object} config
   * @param {object} config.data
   * @param {object} config.url
   * @param {object} [config.params]
   */
  static forgeKey(config) {
    let dataString = ''
    if (config.data && config.data instanceof FormData) {
      const json = {}
      config.data.forEach((value, key) => {
        json[key] = value
      })
      try {
        dataString = AxiosLockPool.jsonify(json)
      } catch (e) {
        console.log('')
      }
    } else {
      dataString = AxiosLockPool.jsonify(config.data)
    }

    const paramString = config.params ? AxiosLockPool.jsonify(config.params) : ''
    return md5(config.url + dataString + paramString)
  }

  /**
   *
   * @param {object} config
   * @param {string} [config.baseURL]
   * @param {string} config.url
   * @param {object} config.data
   * @param {object} [config.params]
   */
  add(config) {
    const key = AxiosLockPool.forgeKey(config)
    if (this.pool.includes(key)) {
      return false
    } else {
      this.pool.push(key)
      return key
    }
  }
  /**
   *
   * @param {string} key add方法里返回出来的key
   * @returns {boolean}
   */
  delete(key) {
    if (this.pool.includes(key)) {
      this._dispatchDelete(key)
      return true
    } else {
      return false
    }
  }

  clear() {
    this.pool = []
  }

  _dispatchDelete(key) {
    setTimeout(() => {
      const idx = this.pool.indexOf(key)
      if (~idx) {
        this.pool.splice(idx, 1)
      }
    }, this.gap)
  }
}
