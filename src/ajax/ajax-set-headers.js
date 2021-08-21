export function doSet(options, xhrObj) {
  // .setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  const headers = options.headers

  for (const key in headers) {
    const newKey = key === 'contentType' ? 'Content-Type' : key
    xhrObj.setRequestHeader(newKey, headers[key])
  }
  // if(options.method === 'POST'){
  //   xhrObj.setRequestHeader('Content-Length', options.paramsStr.length)
  // }
}
