// export default async function getGames(req, res) {
//   // let imgURL = undefined

//   const decode = ({ data, width }) => {
//     const decodedString = atob(data)
//     const l = decodedString.length
//     const buf = new Uint8ClampedArray(l)
//     for (let i = 0; i < l; i++) {
//       const char = decodedString[i]
//       const byte = char.charCodeAt(0)
//       buf[i] = byte
//     }
//     return new ImageData(buf, width)
//   }

//   async function load(title) {
//       const res = await fetch(
//         `https://editor.sprig.hackclub.com/api/thumbnail/${title}`
//       )
//       const json = await res.json()

//       if (json.image.kind === 'png') {
//         return `data:image/png;base64,${json.image.data}`
//       } else {
//         // Raw, hopefully
//         // const imageData = decode(json.image)
//         // const c = document.createElement('canvas')
//         // c.width = imageData.width
//         // c.height = imageData.height
//         // c.getContext('2d').putImageData(imageData, 0, 0)
//         // c.style['image-rendering'] = 'pixelated'
//         // return c.toDataURL()
//         return null
//       }
//   }

//   // const fetcher = async function getImage() {
//   //   const thing0 = await load('Maze_Runner')
//   //   const thing1 = await load('randomworld')
//   //   setGameImage(thing0)
//   //   setGameImage1(thing1)
//   // }
//   let image = await load('Maze_Runner')
//   res.json(image)

//   // res.json(fetcher)
// }
