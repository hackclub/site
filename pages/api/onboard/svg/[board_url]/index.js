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
  try {
    const response = await fetch(gerberURL)
    if (!response.ok) {
      return { status: response.status, error: `Failed to fetch gerber file: ${response.status}` }
    }
    
    const arrayBuffer = await response.arrayBuffer()
    const files = []
    const zip = new JSZip()

    const zippedData = await new Promise((resolve, _reject) => {
      zip.loadAsync(arrayBuffer).then(resolve).catch(e => {
        console.error('Error loading zip file:', e.message || 'Unknown error')
        resolve({
          files: {} // Return empty files object on error
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
  } catch (error) {
    console.error('Error processing gerber file:', error.message || 'Unknown error')
    return { status: 500, error: 'Internal server error processing gerber file' }
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
