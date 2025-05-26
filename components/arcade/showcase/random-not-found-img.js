const notFoundImgs = [
  'https://hc-cdn.hel1.your-objectstorage.com/s/v3/8eb847859f610cce2233b24481f3bc880501db43_0not_found5.png',
  'https://hc-cdn.hel1.your-objectstorage.com/s/v3/80acc53926de0de7ac70f026f989bc9ab8d70e0c_1not_found4.png',
  'https://hc-cdn.hel1.your-objectstorage.com/s/v3/0239ccb065b0c4e90b9d8db419e99d0b0f69d9a4_2not_found3.png',
  'https://hc-cdn.hel1.your-objectstorage.com/s/v3/270b3483e449b6dedb90d411700f89587031c6a3_3not_found2.png',
  'https://hc-cdn.hel1.your-objectstorage.com/s/v3/b9bbda124c8ef547cd19fbd950d3c06f17119d88_4not_found1.png'
]

const hashCode = (s='key') =>
  s.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)

const randomNotFoundImg = key => {
  return notFoundImgs[hashCode(key) % notFoundImgs.length]
}

export default randomNotFoundImg
