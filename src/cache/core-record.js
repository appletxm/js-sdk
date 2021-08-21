export const addRecord = function(store, record) {
  const req = store.add(record)
  let resolveCb = null
  let rejectCb = null

  const promise = new Promise((resolve, reject) => {
    resolveCb = resolve
    rejectCb = reject
  })

  // const req = transaction.add(record)
  req.onsuccess = function () {
    resolveCb(true)
  }
  req.onerror = function (event) {
    rejectCb(event)
  }

  return promise
}

export const searchRecord = function(store, key) {
  const req = store.get(key)
  let resolveCb = null
  let rejectCb = null

  const promise = new Promise((resolve, reject) => {
    resolveCb = resolve
    rejectCb = reject
  })

  req.onerror = function(event) {
    rejectCb(event)
  }

  req.onsuccess = function() {
    resolveCb(req.result)
  }

  return promise
}

export const updateRecord = function(store, record) {
  const req = store.put(record)
  let resolveCb = null
  let rejectCb = null

  const promise = new Promise((resolve, reject) => {
    resolveCb = resolve
    rejectCb = reject
  })

  req.onsuccess = function () {
    resolveCb(true)
  }

  req.onerror = function (event) {
    rejectCb(event)
  }

  return promise
}

export const removeRecord = function(store, key) {
  const req = store.delete(key)
  let resolveCb = null
  let rejectCb = null

  const promise = new Promise((resolve, reject) => {
    resolveCb = resolve
    rejectCb = reject
  })

  req.onsuccess = function () {
    resolveCb(true)
  }

  req.onerror = function (event) {
    rejectCb(event)
  }

  return promise
}

export const clearRecords = function(store) {
  const req = store.clear()
  let resolveCb = null
  let rejectCb = null

  const promise = new Promise((resolve, reject) => {
    resolveCb = resolve
    rejectCb = reject
  })

  req.onsuccess = function () {
    resolveCb(true)
  }

  req.onerror = function (event) {
    rejectCb(event)
  }

  return promise
}
