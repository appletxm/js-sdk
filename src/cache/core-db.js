function openDB(options) {
  let resolveCb = null
  let rejectCb = null
  let db = null

  const promise = new Promise((resolve, reject) => {
    resolveCb = resolve
    rejectCb = reject
  })

  const req = window.indexedDB.open(options.dbName, options.version)

  req.onerror = function (event) {
    rejectCb({ res: false, err: event })
  }

  req.onsuccess = function () {
    db = req.result
    console.info('onsuccess', db.version)
    resolveCb({ res: true, from: 'new', dbOwn: db, err: null })
  }

  req.onupgradeneeded = function (event) {
    db = event.target.result
    console.info('onupgradeneeded:', db.version)
    resolveCb({ res: true, from: 'update', dbOwn: db, err: null })
  }

  return promise
}

function closeDB(db) {
  if (db) {
    db.close()
  }
}

function deleteDB(dbName, db) {
  if (db) {
    db.close()
  }
  let resolveCb = null
  let rejectCb = null

  const promise = new Promise((resolve, reject) => {
    resolveCb = resolve
    rejectCb = reject
  })

  const req = window.indexedDB.deleteDatabase(dbName)

  req.onerror = function (event) {
    rejectCb({ res: false, err: event })
  }

  req.onsuccess = function () {
    console.info('deleteDatabase onsuccess', dbName)
    window.localStorage.removeItem('indexedDBVersion')
    resolveCb({ res: true, err: null })
  }

  req.onblocked = function (event) {
    console.info('deleteDatabase onblocked:', event)
    rejectCb({ res: false, err: event })
  }

  return promise
}

export { openDB, closeDB, deleteDB }
