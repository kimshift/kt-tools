import { objectToQueryString } from './util'
const axios = require('axios')
const requestPromise = async params => {
  return axios({
    url: params.url,
    method: params.method,
    headers: params.headers,
    data: objectToQueryString(params.body),
    validateStatus: status => {
      return status >= 200 && status < 400
    },
    maxRedirects: 0,
    timeout: params.timeout || 600000,
  })
}
export default requestPromise
