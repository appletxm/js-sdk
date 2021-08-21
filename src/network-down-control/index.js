
import { showTip, closeTip } from './offline-ui'

let options = {
  step: 5000,
  timer: 0
}

function handleOffline() {
  showTip(closePanel)
}

function checkNetWork() {
  const { timer, onlineCb, offlineCb } = options

  if (navigator.onLine) {
    closeTip()
    clearTimeout(timer)
    if (onlineCb && typeof onlineCb === 'function') {
      onlineCb()
    }
  } else {
    if (offlineCb && typeof offlineCb === 'function') {
      offlineCb()
    } else {
      handleOffline()
    }
  }
}

function closePanel() {
  let { timer, step } = options

  closeTip()
  clearTimeout(timer)

  timer = setTimeout(() => {
    checkNetWork()
  }, step)
}

function addEvent() {
  window.addEventListener('load', () => {
    window.addEventListener('online', () => {
      checkNetWork()
    })

    window.addEventListener('offline', () => {
      checkNetWork()
    })
  })
}

function assign(target, source) {
  if (!Object.assign) {
    for (var key in source) {
      target[key] = source[key]
    }
  } else {
    Object.assign(target, source)
  }

  return target
}

function networkDownControl(userOptions) {
  options = assign(options, userOptions)
  addEvent(options)
}

export default networkDownControl
