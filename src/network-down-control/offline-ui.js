import icon from './icon'

let offlinePanel = null
let isSmallScreen = false
const popWidth = 550
const smallWidth = 300
const smallIconWidth = 64
const offlineCssName = 'js-web-offline-panel'

function closeTip() {
  if (offlinePanel) {
    offlinePanel.style.display = 'none'
  }
}

function createWholePanel() {
  const offlinePanel = document.createElement('div')
  offlinePanel.setAttribute('class', offlineCssName)
  offlinePanel.setAttribute('style', 'position: fixed; width: 100vw; height: 100vh; top: 0; left: 0; z-index: 999999; font-size: 0;')

  return offlinePanel
}

function createMask() {
  const maskDom = document.createElement('div')
  maskDom.setAttribute('style', 'position: fixed; width: 100vw; height: 100vh; top: 0; left: 0; background-color: rgba(0,0,0,0.2);')
  return maskDom
}

function createTipPanel(realWidth) {
  const tipPanel = document.createElement('div')
  tipPanel.setAttribute('style', `box-sizing: content-box; position: relative; padding: 20px; width: ${realWidth}px; height: 160px; line-height: 160px; position: fixed; top: 50%; left:  50%; margin: -80px -${(realWidth + 40) / 2}px;  background-color: rgba(255,255,255,1); box-shadow: 0 2px 8px rgba(0,0,0,.1); border-radius: 4px;`)

  return tipPanel
}

function createIcon(isSmallScreen) {
  let iconStr = icon
  const iconDom = document.createElement('span')

  iconDom.setAttribute('style', `display: inline-block; vertical-align: middle; ${isSmallScreen ? '' : 'margin-left: 20px;'}`)

  if (isSmallScreen === true) {
    iconStr = iconStr.replace(/(width|height)="(\d+)"/g, (str1, str2, str3) => {
      return str2 + '="' + smallIconWidth + '"'
    })
  }
  iconDom.innerHTML = iconStr

  return iconDom
}

function createTextDom(isSmallScreen, buttonHandler) {
  const textDom = document.createElement('span')
  textDom.setAttribute('style', `position: absolute; top: ${isSmallScreen ? 45 : 55}px; left: ${isSmallScreen ? 100 : 165}px; right: 20px; bottom: ${isSmallScreen ? 45 : 55}px; line-height: 32px; display: block; padding-left: ${isSmallScreen ? 20 : 30}px; border-left: 1px solid #eee;`)
  textDom.innerHTML = '<span style="color: #666; font-size: 18px; font-weight: 300; line-height: 24px;">网络出现故障，请检查你的网络是否通畅</span>'
  const button = document.createElement('button')
  button.innerHTML = '确定'
  button.setAttribute('style', 'display: block; outline: none; cursor: pointer; color: #fff; font-size: 16px; border: 0; width:80px; height:36px; line-height: 36px; background:linear-gradient(134deg,rgba(241,192,140,1) 0%,rgba(215,153,87,1) 100%); border-radius:4px;')
  button.addEventListener('click', () => {
    if (buttonHandler && typeof buttonHandler === 'function') {
      buttonHandler()
    }
  })
  textDom.appendChild(button)

  return textDom
}

function showTip(buttonHandler) {
  offlinePanel = document.querySelector('.' + offlineCssName)
  isSmallScreen = popWidth > document.documentElement.clientWidth

  const realWidth = isSmallScreen ? smallWidth : popWidth

  if (!offlinePanel) {
    offlinePanel = createWholePanel()
    const maskDom = createMask()
    const tipPanel = createTipPanel(realWidth)
    const iconDom = createIcon(isSmallScreen)
    const textDom = createTextDom(isSmallScreen, buttonHandler)

    tipPanel.appendChild(iconDom)
    tipPanel.appendChild(textDom)
    offlinePanel.appendChild(maskDom)
    offlinePanel.appendChild(tipPanel)

    document.body.appendChild(offlinePanel)
  } else {
    offlinePanel.style.display = 'block'
  }
}

export { showTip, closeTip }
