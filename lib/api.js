import fetch from 'unfetch'
import storage from './storage'

export const url = 'https://api.hackclub.com/'
const methods = ['GET', 'PUT', 'POST', 'PATCH', 'DELETE']

const generateMethod =
  method =>
  (path, options = {}, fetchOptions = {}) => {
    let filteredOptions = {}
    const authToken = storage.get('authToken')
    if (authToken) {
      options.authToken = authToken
    }

    for (let [key, value] of Object.entries(options)) {
      switch (key) {
        case 'authToken':
          filteredOptions.headers = filteredOptions.headers || {}
          filteredOptions.headers['Authorization'] = `Bearer ${value}`
          break
        case 'data':
          if (value instanceof FormData) {
            filteredOptions.body = value
          } else {
            filteredOptions.body = JSON.stringify(value)
            filteredOptions.headers = filteredOptions.headers || {}
            filteredOptions.headers['Content-Type'] = 'application/json'
          }
          break
        default:
          filteredOptions[key] = value
          break
      }
    }

    if (fetchOptions.noAuth) {
      if (filteredOptions.headers && filteredOptions.headers['Authorization']) {
        delete filteredOptions.headers['Authorization']
      }
    }

    const foreignUrl = path.startsWith('http')
    const urlPath = foreignUrl ? path : url + path

    return fetch(urlPath, { method, ...filteredOptions })
      .then(res => {
        if (res.ok) {
          const contentType = res.headers.get('content-type')
          if (contentType && contentType.indexOf('application/json') !== -1) {
            return res.json()
          } else {
            return res.text()
          }
        } else {
          if (res.status === 422) {
            return res.json().then(json => {
              // eslint-disable-next-line
              throw { ...res, errors: json.errors }
            })
          } else {
            throw res
          }
        }
      })
      .catch(err => {
        throw err
      })
  }

let api = {}

methods.forEach(method => {
  api[method.toLowerCase()] = generateMethod(method)
})

api.currentUser = () => api.get(`v1/users/current`)

export default api
