import JSZip from 'jszip'
import {
  read,
  plot,
  renderLayers,
  renderBoard,
  stringifySvg
} from '@tracespace/core'
import fs from 'fs'

export const gerberToSvg = async gerberURL => {
  const data = await fetch(gerberURL).then(res => {
    return { status: res.status, arrayBuffer: res.arrayBuffer()}
  })
  if (data.status !== 200) {
    return { status: data.status, error: 'Failed to fetch gerber file' }
  }
  const files = []
  const zip = new JSZip()

  const zippedData = await new Promise((resolve, _reject) => {
    zip.loadAsync(data.arrayBuffer).then(resolve, e => {
      console.error(e)
      resolve({
        files: {} // TODO: actually handle this error (bad or nonexistent gerber.zip)
      })
    })
  })

  const allowedExtensions = [
    'gbr', // gerber
    'drl', // drillfile
    'gko', // gerber board outline
    'gbl', // gerber bottom layer
    'gbp', // gerber bottom paste
    'gbs', // gerber bottom solder mask
    'gbo', // gerber bottom silk
    'gtl', // gerber top layer
    'gto', // gerber top silk
    'gts' // gerber top soldermask
  ]
  const unzipJobs = Object.entries(zippedData.files).map(
    async ([filename, file]) => {
      const extension = filename.split('.').pop().toLowerCase()
      if (allowedExtensions.includes(extension)) {
        const filePath = `/tmp/${filename}`
        await new Promise((resolve, _reject) => {
          file.async('uint8array').then(function (fileData) {
            fs.writeFileSync(filePath, fileData)
            files.push(filePath)
            resolve()
          })
        })
      }
    }
  )

  await Promise.all(unzipJobs)

  let readResult
  try {
    readResult = await read(files)
  } catch (e) {
    console.error(e)
    return {}
  }
  const plotResult = plot(readResult)
  const renderLayersResult = renderLayers(plotResult)
  const renderBoardResult = renderBoard(renderLayersResult)
  for (const file of files) {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file)
    }
  }
  return {
    top: stringifySvg(renderBoardResult.top),
    bottom: stringifySvg(renderBoardResult.bottom)
    // all: stringifySvg(renderLayersResult)
  }
}

export default async function handler(req, res) {
  const { file, format } = req.query
  if (!file) {
    return res.status(400).json({ status: 400, error: 'Must provide file' })
  }
  // ensure valid file url is included
  const url = new URL(decodeURI(file))
  const svg = await gerberToSvg(url)
  if (format === 'top') {
    res.contentType('image/svg')
    return res.status(200).send(svg.top)
  }
  if (format === 'json') return res.status(200).json(svg)

  return res.status(200).json(svg)
}
// test me with: curl http://localhost:3000/api/board/svg/https%3A%2F%2Fgithub.com%2Fhackclub%2FOnBoard%2Fraw%2Fmain%2Fprojects%2F2_Switch_Keyboard%2Fgerber.zip
