const defaultConfig = {
  duration: 100,
  needWaitResponse: false,
  axios: {
    interceptors: {
      request: {
        use() {}
      },
      response: {
        use() {}
      }
    }
  }
}

const RequestQueue = class {
  constructor(config) {
    this.queue = {}
    this.config = Object.assign(defaultConfig, config)
    this.init(this.config)
  }

  init(config) {
    config.axios.interceptors.request.use((request) => {
      var res = this.add(request)
      if (res === true) {
        return request
      } else {
        throw new Error('too frenquently request')
      }
    }, function (error) {
      throw error
    })

    config.axios.interceptors.response.use((response) => {
      this.remove(response.config)
      return response
    }, function (error) {
      throw error
    })
  }

  add(config) {
    const url = window.btoa(config.url)
    if (this.queue[url]) {
      if (this.config.needWaitResponse) {
        return false
      }

      const request = this.queue[url]
      const gap = new Date().getTime() - request.timestamp

      if (gap <= this.config.duration) {
        return false
      } else {
        this.queue[url].timestamp = new Date().getTime()
        return true
      }
    } else {
      this.queue[url] = {
        timestamp: new Date().getTime(),
        url: config.url
      }

      return true
    }
  }

  remove(config) {
    const url = window.btoa(config.url)
    const { needWaitResponse, duration } = this.config

    if (needWaitResponse) {
      delete this.queue[url]
    } else {
      const timeStamp = new Date().getTime()
      const gap = timeStamp - this.queue.timeStamp
      if (gap > duration) {
        delete this.queue[url]
      }
    }
  }
}

export default RequestQueue
