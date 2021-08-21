var source = new EventSource('${hotServerApi}', { withCredentials: false })

function doHotModules() {
  var scripts = document.querySelectorAll('script')
  var srcs = []
  for(var i = 0; i < scripts.length; i++) {
    if (scripts[i].getAttribute('src').indexOf(['/hot-client', 'examples/eventsource.min.js']) < 0) {
      var src = scripts[i].getAttribute('src')
      srcs.push(src)
      scripts[i].remove()
    }
  }

  for(var i = 0; i < srcs.length; i++) {
    var script = document.createElement('script')
    script.setAttribute('src', srcs[i])
    document.body.append(script)
  }
}

// source.addEventListener('open', (event) => {
//   console.info('*****source open:', event)
// })

source.addEventListener('message', function(event) {
  console.info('*****source message:', event.data)
})

source.addEventListener('error', function(event) {
  console.info('*****source error:', event)
})

source.addEventListener('hot', function(event) {
  console.info('*****customize hot event:', event)
  var data = JSON.parse(event.data)
  if (data.type && data.type === 'hot') {
    doHotModules()
  }
})

// window.addEventListener('unload', function(event) {
//   source.close()
// })
