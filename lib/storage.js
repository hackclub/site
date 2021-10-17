const stubbedStorage = {}
'get set remove keys'
  .split(' ')
  .forEach(method => (stubbedStorage[method] = () => null))

let localStorage
try {
  localStorage = window.localStorage
} catch (e) {
  if (e instanceof ReferenceError) {
    localStorage = stubbedStorage
  }
}

const storage = {
  get: key => {
    try {
      // (max@maxwofford.com) Values that were set before values were stringified might fail to parse, so we return the raw storage item if we can't parse it
      return JSON.parse(localStorage.getItem(key))
    } catch (e) {
      if (e.name === 'SyntaxError') {
        return localStorage.getItem(key)
      } else {
        console.error(e)
      }
    }
  },
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  remove: key => localStorage.removeItem(key),
  keys: () => Object.keys(localStorage)
}

export default storage
