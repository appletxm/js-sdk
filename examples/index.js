
function doNetWorkTest() {
  /**
   * test network down control
   * **/
  
  function log(msg) {
    var msgDom = document.querySelector('#js-tip-panel')
    msgDom.innerHTML = msg
  }

  // use default on/off line behavie
  HfWebTool.networkDownControl()

  // customize behavie at on/off hook
  // HfWebTool.networkDownControl({
  //   onlineCb: function() {
  //     log('web is online call back')
  //   },

  //   offlineCb: function() {
  //     log('web is offline call back')
  //   }
  // })
}

function doCacheTest() {
  /**
   * test cache
   * **/

  var Cache = HfWebTool.Cache
  var dbIsReady = false

  // var items = cache.compatibleIndexDB()
  // window['indexedDB'] = items['indexedDB']
  // window['IDBTransaction'] = items['IDBTransaction']
  // window['IDBKeyRange'] = items['IDBKeyRange']


  var cache = new Cache({
    version: 1, // indexedDB version
    dbName: 'test-db', // indexedDB name
    tableName: ['test-table'], // indexDb table name string or [string] : array string for multiple table
    dbConnectedCb: function() {
      dbIsReady = true
      console.info('db open success')
    },
    dbConnectFailCb: function(err) {
      console.info('db open faild:', err)
      dbIsReady = false
    }
  })

  document.querySelector('#cahce-add').onclick = function() {
    if (dbIsReady !== true) {
      alert('cache not ready yet')
      return false
    }
    
    var params = {
      a: 8888, 
      b: 456, 
      arr: [1,2,5, 'string']
    }
    cache.add('test-table', 'http://a/b', params).then(function(res){
      console.info('***1 res**', res)
    }).catch(function(err){
      console.info('***1err**', err)
    })
  }

  document.querySelector('#cahce-update').onclick = function() {
    if (dbIsReady !== true) {
      alert('cache not ready yet')
      return false
    }

    var params = {
      a: 9999, 
      b: 888, 
      arr: [1,2,5, '789']
    }
    cache.update('test-table', 'http://a/b', params).then(function(res){
      console.info('***1 res**', res)
    }).catch(function(err){
      console.info('***1err**', err)
    })
  }

  document.querySelector('#cahce-remove').onclick = function() {
    if (dbIsReady !== true) {
      alert('cache not ready yet')
      return false
    }
    cache.remove('test-table', 'http://a/b').then(function(res){
      console.info('***1 res**', res)
    }).catch(function(err){
      console.info('***1err**', err)
    })
  }

  document.querySelector('#cahce-clear').onclick = function() {
    if (dbIsReady !== true) {
      alert('cache not ready yet')
      return false
    }
    cache.clear('test-table').then(function(res){
      console.info('***1 res**', res)
    }).catch(function(err){
      console.info('***1err**', err)
    })
  }

  document.querySelector('#cahce-search').onclick = function() {
    if (dbIsReady !== true) {
      alert('cache not ready yet')
      return false
    }
    
    cache.get('test-table-2', 'http://a9/b8').then(function(res){
      console.info('***1 res**', res)
    }).catch(function(err){
      console.info('***1err**', err)
    })
  }

  document.querySelector('#cache-new-table').onclick = function() {
    if (dbIsReady !== true) {
      alert('cache not ready yet')
      return false
    }

    cache.createTable('test-table-2')   
  }

  document.querySelector('#cache-add-2').onclick = function() {
    if (dbIsReady !== true) {
      alert('cache not ready yet')
      return false
    }

    var params = {
      a: 555, 
      b: 2222, 
      arr: [1,2,5, 'string']
    }
    cache.add('test-table-2', 'http://a9/b8', params).then(function(res){
      console.info('***1 res**', res)
    }).catch(function(err){
      console.info('***1err**', err)
    })
  }

}

function doRequestQueueTest() {
  /**
   * test request queue
   * **/

  new HfWebTool.RequestQueue({
    duration: 2000,
    needWaitResponse: false, // if set to be true the 'duration' item will not work
    axios: axios
  })

  function createRequest() {
    axios.get('/api/test3', {
      params: {
        a: 111,
        b: 2222
      }
    }).then(function(res) {
      console.info('=========then=======', res)
    }).catch(function(err) {
      console.info('=========catch========', err)
    })
  }

  document.querySelector('#trigger-request').addEventListener('click', function() {
    createRequest()

    setInterval(function() {
      createRequest()
    }, 100)
  })
}

function rsaTest() {
  /* global HfWebTool */
  /**
   * test rsa
   * **/

  var rsa = HfWebTool.rsa
  var RSAKeyPair = rsa.RSAKeyPair
  var encryptedString = rsa.encryptedString
  var setMaxDigits = rsa.setMaxDigits

  var btn = document.querySelector('#trigger-rsa')
  var input = document.querySelector('#test-rsa')
  var output = document.querySelector('#test-rsa-output')

  function getKey(string) {
    setMaxDigits(130)
    const publicKey = 'cf82b0d9cacc5fc663cd4158565401ee0872b8ae1e7795aebdab4dfb69760d11372be9294204c914a546782db4e4d87b1b1ef8a3b97b42a3366c90877f8194942073b6d5ee7c9fed99898a382bb27107518ce8d9f7657e762b827f3433476db2513e0c7cdc38e283f7da5de268b1da020561839cfd8bb64542a8b64ad4eac747';
    const key = new RSAKeyPair('10001', '', publicKey)
    const result = encryptedString(key, string)
    return result
  }

  btn.addEventListener('click', function() {
    var string = input.value
    var outPutString = getKey(string)
    output.textContent = outPutString
  })
}

function validatorTest() {
  /* global HfWebTool */
  /**
   * test rsa
   * **/

  var validator = HfWebTool.Validator

  var btn = document.querySelector('#trigger-idcard')
  var input = document.querySelector('#test-idcard')
  var output = document.querySelector('#test-idcard-output')

  btn.addEventListener('click', function() {
    var string = input.value
    var outPutString = validator.validateIdCard(string)
    output.textContent = outPutString
  })
}

(function() {
  /**
   * all utils samples
   * **/
  doNetWorkTest()
  doCacheTest()
  doRequestQueueTest()
  rsaTest()
  validatorTest()

  console.info('version:', HfWebTool.version)
})()
