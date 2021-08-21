export const getHashCode = function(path) {
  let code = null

  // try {
  //   code = window.btoa(path + '')
  // } catch {
  //   if (typeof path === 'string') {
  //     Array.from(path).forEach((char, index) => {
  //       // console.info(char, path.codePointAt(index), path.charCodeAt(index))
  //       code = code + path.codePointAt(index)
  //     })
  //   }
  // }

  path = path + ''
  try {
    code = window.btoa(path)
  } catch {
    code = encodeURIComponent(path)
  }

  return code + ''
}

export const generateDbName = function(dbName) {
  dbName = dbName + '-' + (new Date().getTime())

  return dbName
}

export const compatibleIndexDB = function() {
  const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
  const IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction
  const IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

  // window.indexedDB = indexedDB
  // window.IDBTransaction = IDBTransaction
  // window.IDBKeyRange = IDBKeyRange

  return {
    indexedDB,
    IDBTransaction,
    IDBKeyRange
  }
}

export const getCacheType = function() {
  const type = !window.indexedDB ? 'localStorage' : 'indexedDB'
  return type
}
