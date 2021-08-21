import { compatibleIndexDB, getCacheType, getHashCode } from './utils'
import { openDB, closeDB, deleteDB } from './core-db'
import { getStore, initStore, createStoreDynamic } from './core-store'
import { addRecord, searchRecord, clearRecords, updateRecord, removeRecord } from './core-record'

const defaultOptions = {
  version: 1, // indexedDB version
  dbName: 'dbName', // indexedDB name
  tableName: 'tableName', // tables name is string or [string]
  dbConnectedCb: null,
  dbConnectFailCb: null,
  type: 'callback' // type Promise, callback
}

export const Cache = class {
  constructor(options) {
    this.options = Object.assign(defaultOptions, options)
    this.type = 'indexedDb'
    this.db = null

    this.initDB()
  }

  initDB(options) {
    let rejectCb = null
    let resolveCb = null
    const promise = new Promise((resolve, reject) => {
      resolveCb = resolve
      rejectCb = reject
    })

    if (options) {
      this.options = Object.assign(defaultOptions, options)
    }

    const { dbConnectedCb, dbConnectFailCb, tableName, type, version } = this.options

    // compatibleIndexDB()
    this.type = getCacheType()

    // update version
    let cacheVersion = window.localStorage.getItem('indexedDBVersion')
    cacheVersion = cacheVersion ? parseInt(cacheVersion, 10) : null
    if (cacheVersion && cacheVersion > version) {
      this.options.version = cacheVersion
    } else {
      window.localStorage.setItem('indexedDBVersion', version)
    }

    openDB(this.options).then((resolve) => {
      const { from, dbOwn } = resolve

      this.db = dbOwn

      this.db.onversionchange = function() {
        console.log('A new version of this page is ready. Please reload or close this tab!')
        closeDB(this.db)
      }.bind(this)

      if (from === 'update') {
        initStore(this.db, tableName)
      }

      if (type === 'Promise') {
        resolveCb(this)
      } else {
        dbConnectedCb && dbConnectedCb(this)
      }
    }).catch(err => {
      console.info('init db faild:', err)
      if (type === 'Promise') {
        rejectCb(err)
      } else {
        dbConnectFailCb && dbConnectFailCb(err)
      }
      // const target = err.err.target
      // const numbs = target && target.error ? target.error.toString().match(/\d+/g) : []
      // if (numbs && numbs.length >= 2) {
      //   this.options.version = Number(numbs[1])
      //   this.initDB(this.options)
      // } else {
      //   if (type === 'Promise') {
      //     rejectCb(err)
      //   } else {
      //     dbConnectFailCb && dbConnectFailCb(err)
      //   }
      // }
    })

    if (type === 'Promise') {
      return promise
    }
  }

  deleteDB(dbName, db) {
    return deleteDB(dbName || this.options.dbName, db || this.db)
  }

  closeDB(db) {
    closeDB(db || this.db)
  }

  async add(table, key, value) {
    const newKey = getHashCode(key)
    const record = {
      key: newKey,
      value
    }
    try {
      const searched = await this.get(table, key)
      // console.info('***searched:', searched)
      const store = getStore(this.db, table, 'readwrite')

      if (searched) {
        const newData = JSON.parse(JSON.stringify(Object.assign(searched, record)))
        return updateRecord(store, newData)
      } else {
        return addRecord(store, record)
      }
    } catch (err) {
      console.info('add record faild:', err)
      throw err
    }
  }

  get(table, key) {
    const newKey = getHashCode(key)
    const store = getStore(this.db, table, 'readonly')

    return store ? searchRecord(store, newKey) : Promise.reject(new Error(`you table ${table} has not been created.`))
  }

  update(table, key, value) {
    return this.add(table, key, value)
  }

  remove(table, key) {
    const newKey = getHashCode(key)
    return removeRecord(getStore(this.db, table, 'readwrite'), newKey)
  }

  clear(table) {
    const store = getStore(this.db, table, 'readwrite')
    return clearRecords(store)
  }

  createTable(newTableName) {
    return createStoreDynamic.bind(this)(newTableName)
  }
}

Cache.compatibleIndexDB = compatibleIndexDB

Cache.deleteDB = deleteDB

export default Cache
