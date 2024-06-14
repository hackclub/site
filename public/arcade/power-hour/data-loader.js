let fetchedDataCache = {}

async function pullFromStorage() {
  const ts = parseInt(localStorage.getItem('fetchedDataTimestamp'))
  if (!ts) {
    console.log("No timestamp found in storage")
    return null
  }

  const now = new Date().getTime()
  const expiration = 1000 * 60 * 5 // 5 min
  const isExpired = now - ts > expiration

  if (isExpired) {
    console.log("Data in storage is expired")
    return null
  }

  return JSON.parse(localStorage.getItem('fetchedData'))
}

async function fetchData() {
  return await fetch('/api/arcade/hack-hour/inventory').then(d => d.json())
}

async function setToStorage(data) {
  localStorage.setItem('fetchedData', JSON.stringify(data))
  localStorage.setItem('fetchedDataTimestamp', new Date().getTime())
}

async function fetchedDataLoader() {
  if (Object.keys(fetchedDataCache) > 0) {
    console.log("Found data in cache")
    return fetchedDataCache
  }
  const storage = await pullFromStorage()
  if (storage) {
    console.log("Found parts data in storage")
    return storage
  }

  const data = await fetchData()
  if (data) {
    console.log("found parts data in fetch")
    setToStorage(data)
    fetchedDataCache = data
    return data
  }
}

let fetchDataJob
async function fetchedData() {
  if (!fetchDataJob) {
    fetchDataJob = fetchedDataLoader()
  }
  return await fetchDataJob
}

// start loading data as soon as this file loads
fetchedData()