// import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Ajax from './ajax'
import MyPromise from './promise'
import networkDownControl from './network-down-control'
import Cache from './cache'
import RequestQueue from './request-queue'
import rsa from './rsa'
import validator from './validator'

const version = '{{version}}'

const tools = { version, Ajax, MyPromise, networkDownControl, Cache, RequestQueue, rsa, validator }

// console.info('version:', version)

export default tools
