
export const createAndDelStore = function (db, table) {
  if (db.objectStoreNames.contains(table) === true) {
    deleteSotore(db, table)
  }
  createStore(db, table)
}

export const deleteSotore = function(db, table) {
  let res = false
  try {
    if (db) {
      db.deleteObjectStore(table)
    }
    res = true
  } catch (err) {
    console.info('delete store faild:', err)
    res = false
  }

  return res
}

export const createStore = function(db, table) {
  // console.info('db.objectStoreNames:', db.objectStoreNames.contains(table))

  if (!db.objectStoreNames.contains(table)) {
    try {
      const objectStore = db.createObjectStore(table, { keyPath: 'key' })
      objectStore.createIndex('value', 'value', { unique: false })
    } catch (err) {
      console.info('err:', err)
    }
  }
}

export const getStore = function(db, table, way) {
  if (!db.objectStoreNames.contains(table)) {
    return false
  }

  const transaction = db.transaction([table], way)

  transaction.oncomplete = function() {
    console.info('transaction oncomplete')
  }
  transaction.onerror = function() {
    console.info('transaction error')
  }

  return transaction.objectStore(table)
}

export const initStore = function(db, table) {
  if (typeof table === 'string') {
    createStore(db, table)
  } else {
    if (Array.isArray(table)) {
      table.forEach(item => {
        // createAndDelStore(db, item)
        createStore(db, item)
      })
    }
  }
}

export const createStoreDynamic = function (newTableName) {
  let rejectCb = null
  let resolveCb = null
  const promise = new Promise((resolve, reject) => {
    rejectCb = resolve
    resolveCb = reject
  })

  if (this.db.objectStoreNames.contains(newTableName) === true) {
    console.info(`table ${newTableName} already exist`)
    rejectCb(false)
  } else {
    let { version, tableName, dbConnectedCb, dbConnectFailCb } = this.options
    if (typeof tableName === 'string') {
      tableName = [tableName, newTableName]
    } else if (Array.isArray(tableName)) {
      tableName.push(newTableName)
    } else {
      tableName = newTableName
    }
    this.options.version = version + 1
    this.options.tableName = tableName

    window.localStorage.setItem('indexedDBVersion', this.options.version)

    this.options.dbConnectedCb = function() {
      dbConnectedCb && dbConnectedCb()
      resolveCb(true)
    }
    this.options.dbConnectFailCb = function(err) {
      dbConnectFailCb && dbConnectFailCb(err)
      rejectCb(err)
    }

    this.initDB(this.options)
  }

  return promise
}
