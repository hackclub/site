const notFoundImgs = [
  'https://hc-cdn.hel1.your-objectstorage.com/s/v3/84cb8c978b46a91d85a33b8066cf5317520ad0e2_15_8eb847859f610cce2233b24481f3bc880501db43_0not_found5.webp',
  'https://hc-cdn.hel1.your-objectstorage.com/s/v3/6cde4f95297ca094c335f1171bfabe0d53e40f8c_16_80acc53926de0de7ac70f026f989bc9ab8d70e0c_1not_found4.webp',
  'https://hc-cdn.hel1.your-objectstorage.com/s/v3/f58e4ccf9338e54b7ceb27bd0541e3271907029a_17_0239ccb065b0c4e90b9d8db419e99d0b0f69d9a4_2not_found3.webp',
  'https://hc-cdn.hel1.your-objectstorage.com/s/v3/58d50093a776805d5062aff48086628a2c49ae55_18_270b3483e449b6dedb90d411700f89587031c6a3_3not_found2.webp',
  'https://hc-cdn.hel1.your-objectstorage.com/s/v3/5854ad2ee8e983a42c3472777df8bbb2e6b5d643_19_b9bbda124c8ef547cd19fbd950d3c06f17119d88_4not_found1.webp'
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
