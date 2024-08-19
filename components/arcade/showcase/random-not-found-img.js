const notFoundImgs = [
  'https://cloud-6laa73jem-hack-club-bot.vercel.app/0not_found5.png',
  'https://cloud-6laa73jem-hack-club-bot.vercel.app/1not_found4.png',
  'https://cloud-6laa73jem-hack-club-bot.vercel.app/2not_found3.png',
  'https://cloud-6laa73jem-hack-club-bot.vercel.app/3not_found2.png',
  'https://cloud-6laa73jem-hack-club-bot.vercel.app/4not_found1.png'
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
