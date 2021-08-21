## hf-web-tool (工具类类库)

> 下载地址 [http://172.30.0.176:4873/-/web/detail/hf-web-tool](http://172.30.0.176:4873/-/web/detail/hf-web-tool)

> 源码地址: [http://175.102.179.36:9011/front-end-base/hf-web-tool](http://175.102.179.36:9011/front-end-base/hf-web-tool)

It's normal util and include below features
>1. [Internal down notifaction](#chapter-4-1)
>2. [Cache for app](#chapter-4-2)
>3. [Request Queue](#chapter-4-3)
>4. [RSA](#chapter-4-4)
>5. [VALIDATOR](#chapter-4-5)
>6. A privae ajax lib (will append soon)
>7. A private promise lib (will append soon)

#### 1. Lib Compatible Introduce
Compatible of utils are belows
IE >= 10
Firefox >= 50
Chrome >= 50
IOS Safari >= 10
Android >= 4.4

#### 2. Install Package

> Will only publihsed the packe to our private npm registry, so you need to config you npm server's registry when you want to insatll this module, you can according [Guidline config npm](http://175.102.179.36:9011/front-end-base/hf-vue-h5#chapter-2) 
> All examples can be found in 'examples' folder in hf-web-tool package

```shell
# use npm install
npm install hf-web-tool

# use yarn install
yarn add hf-web-tool

```

#### 3. How to use it

3.1 Using it as cdn external script

```html
<script src="build/index.min.js"></script>
<script type="text/javascript">
console.info(HfWebTool)
<sciprt>

```

3.2 Using it as es6 module

```javascript
import HfWebTool from 'hf-web-tool'
console.info(HfWebTool)
<sciprt>

```

#### 4.  Utils Modules Introduction

##### <a name="chapter-4-1" id="chapter-4-1">4.1 Offline and Online Control</a>

A tool will show a offline pop message box when the network down suddenly, you just need to import as module or external link as script in your app, and then call the function as belows code

```javascript
// cdn use it
HfWebTool.networkDownControl()

// es6 module import
import { networkDownControl } from 'hf-web-tool'

networkDownControl()
```

if you want to define a customize behavie or UI when the network down, you shoul set a callback function like belows

```javascript 
HfWebTool.networkDownControl({
  onlineCb: function() {
    log('web is online call back')
  },

  offlineCb: function() {
    log('web is offline call back')
  }
})
```

##### <a name="chapter-4-2" id="chapter-4-2">4.2 Cache</a>

A tool will help us to use indexedDB convenience, so that can increase the memeroy for cache, not be limited the 5MB memery in localstorage, you can use it as belows code

```javascript
// cdn use it
var Cache = HfWebTool.Cache

// es6 module import
import { Cache } from 'hf-web-tool'

```

We already show how to get the Cache constructor as above, then the next code will show how to init cache

```javascript 
var cache = new Cache({
  version: 1, // indexedDB version
  dbName: 'test-db', // indexedDB name
  tableName: ['test-table', 'test-table-2'], // indexDb table name string or [string] : array string for multiple table
  dbConnectedCb: function() {
    dbIsReady = true
    console.info('db open success')
  },
  dbConnectFailCb: function(err) {
    console.info('db open faild:', err)
    dbIsReady = false
  }
})
```

After will completed the init process, and then will get the cache instance, and it expose some apis, you can check them one by one

> Notice all the operate api will return promise


###### add record sample
'test-table' is the table name for current cache, 'http://a/b' the key for the 'params', 'params' is the real value

```javascript 
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
```

###### update record sample
'test-table' is the table name for current cache, 'http://a/b' the key for the 'params', 'params' is the real value

```javascript 
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
```

###### search record sample
'test-table' is the table name for current cache, 'http://a/b' the key point real value

```javascript 
cache.get('test-table', 'http://a/b').then(function(res){
  console.info('***1 res**', res)
}).catch(function(err){
  console.info('***1err**', err)
})
```

###### remove record sample
'test-table' is the table name for current cache, 'http://a/b' the key point real value

```javascript 
cache.remove('test-table', 'http://a/b').then(function(res){
  console.info('***1 res**', res)
}).catch(function(err){
  console.info('***1err**', err)
})
```

###### clear table sample
'test-table' is the table name for current cache

```javascript 
cache.clear('test-table').then(function(res){
  console.info('***1 res**', res)
}).catch(function(err){
  console.info('***1err**', err)
})
```

###### create table dynamic
'test-table-2' is the table name will be created

```javascript 
cache.createTable('test-table-2').then(function(res){
  console.info('***res**', res)
}).catch(function(err){
  console.info('***err**', err)
})
```
###### delete database
'test-db' is the database name will be deleted
```javascript
  Cache.deleteDB('test-db') // Cache is the class

  // or
  cache.deleteDB('test-db') // cache is the instance of Cache class

```


##### <a name="chapter-4-3" id="chapter-4-3">4.3 Request Queue</a>

A tool will help us to ignore the frequently ajax call from the client side

> You can check the samples in `examples` folder

```javascript
// cdn use
var RequestQueue = HfWebTool.RequestQueue
new RequestQueue({
  duration: 2000,
  needWaitResponse: true,
  axios
})

// es6 module import
import { RequestQueue } from 'hf-web-tool'
new RequestQueue({
  duration: 2000,
  needWaitResponse: true,
  axios
})

```

Request Queue Initial Parameter Introduction

| Item        | description           | isRequired |  type  |  default  |
| ------------- | --------------------- | :--------: | :--------: | :--------: |
| duration      | The duration between two reqeusts (`the same request url`) | no | Number | 100(`milliseconds`) |
| needWaitResponse      | This parameter will get high proiority than `duration`, if set `needWaitResponse` to be `true`, then the `duration` will not work, and if you want `duration` work as expected set `needWaitResponse` to be `false` or just let it by default | no | Boolean | false |
| axios      | The ajax lib which will be intercepted | yes | Object | {} |


##### <a name="chapter-4-4" id="chapter-4-4">4.4 RSA </a>

```javascript 

const { RSAKeyPair, encryptedString, setMaxDigits } = HfWebTool.rsa

const publicKey = 'cf82b0d9cacc5fc663cd4158565401ee0872b8ae1e7795aebdab4dfb69760d11372be9294204c914a546782db4e4d87b1b1ef8a3b97b42a3366c90877f8194942073b6d5ee7c9fed99898a382bb27107518ce8d9f7657e762b827f3433476db2513e0c7cdc38e283f7da5de268b1da020561839cfd8bb64542a8b64ad4eac747';
const encryLength  = 130

function encrypt(string) {
    setMaxDigits(encryLength);
    const key = new RSAKeyPair('10001', '', publicKey);
    const result = encryptedString(key, string);
    return result;
}

console.log(encrypt('123123'))
```


##### <a name="chapter-4-5" id="chapter-4-5">4.5 validator </a>

```javascript 

const { validateIdCard } = HfWebTool.validator

// 身份证号码验证
const idcard = '445381199902122981'
const flag = validateIdCard(idcard); // true / false

console.log(flag)
```
