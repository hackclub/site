let partsDataCache = {}

async function pullFromStorage() {
    const ts = parseInt(localStorage.getItem('partsDataTimestamp'))
    if (!ts) {
        console.log('No timestamp found in storage')
        return null
    }
    const now = new Date().getTime()
    const expiration = 1000 * 60 * 5 // 5 min

    if (ts && now - ts < expiration) {
        return JSON.parse(localStorage.getItem('partsData'))
    } else {
        console.log('Parts data in storage is expired')
        return null
    }
}

async function setToStorage(data) {
    localStorage.setItem('partsData', JSON.stringify(data))
    localStorage.setItem('partsDataTimestamp', new Date().getTime())
}

async function fetchPartsData() {
    const response = await fetch('https://hackclub.com/api/bin/wokwi/parts/');
    if (!response.ok) {
        throw new Error('Network response was not ok.');
    }
    data = await response.json();

    data = removeItemByAttribute(data, "type", "Microprocessor");
    return data
}
function removeItemByAttribute(arr, attr, value) {
    return arr.filter(item => item[attr] !== value);
}

async function partsDataLoader() {
    if (Object.keys(partsDataCache).length > 0) {
        console.log('Found parts data in cache')
        return partsDataCache
    }
    const storage = await pullFromStorage()
    if (storage) {
        console.log('Found parts data in storage')
        return storage
    }
    const data = await fetchPartsData()
    if (data) {
        console.log('Found parts data in fetch')
        setToStorage(data)
        partsDataCache = data
        return data
    }
}

let partsDataJob = null
async function partsData() {
    if (!partsDataJob) {
        partsDataJob = partsDataLoader()
    }
    return await partsDataJob
}