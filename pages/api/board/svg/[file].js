import JSZip from "jszip";
import {read, plot, renderLayers, renderBoard, stringifySvg} from '@tracespace/core'
import fs from 'fs'

export const GenerateSVG = async (zipFile) => {
    const zip = new JSZip();
    const data = await fetch(zipFile)
        .then((res) => res.arrayBuffer());
    let files = [];
    await zip.loadAsync(data).then(function (zip) {
        Object.keys(zip.files).forEach(function (filename) {
            zip.files[filename].async('uint8array').then(function (fileData) {
                filename = filename.replace(/\//g, '_');
                const extension = filename.split('.').pop().toLowerCase();
                if (extension === 'gbr' || // gerber
                    extension === 'drl' || // drillfile
                    extension === 'gko' || // gerber board outline
                    extension === 'gbl' || // gerber bottom layer
                    extension === 'gbp' || // gerber bottom paste
                    extension === 'gbs' || // gerber bottom solder mask
                    extension === 'gbo' || // gerber bottom silk
                    extension === 'gtl' || // gerber top layer
                    extension === 'gto' || // gerber top silk
                    extension === 'gts'    // gerber top soldermask
                ) {
                    console.log(filename)
                    files.push(filename);
                    fs.writeFileSync(filename, fileData);
                }
            });
        })
    })

    // wait for files to be written
    await new Promise((resolve) => {
        setTimeout(resolve, 100); // very hacky but works!!!!
    });

    console.log(files)

    const readResult = await read(files)
    const plotResult = plot(readResult)
    const renderLayersResult = renderLayers(plotResult)
    const renderBoardResult = renderBoard(renderLayersResult)

    for (const file of files) {
        fs.unlinkSync(file);
    }

    return {
        top: stringifySvg(renderBoardResult.top),
        bottom: stringifySvg(renderBoardResult.bottom),
    }
}

export default async function handler(req, res) {
    const { file } = req.query
    if (!file) {
        return res.status(400).json({ status: 400, error: 'Must provide file' })
    }
    const svg = await GenerateSVG(file)
    return res.status(200).json(svg)
}