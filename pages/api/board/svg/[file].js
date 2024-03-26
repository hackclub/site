import JSZip from "jszip";
import {read, plot, renderLayers, renderBoard, stringifySvg} from '@tracespace/core'
import fs from 'fs'

export const GenerateSVG = async (gerberURL) => {
    const zip = new JSZip();
    const data = await fetch(gerberURL)
        .then((res) => res.arrayBuffer());
    let files = [];
    try { await (zip.loadAsync(data).then(function (zip) {
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
    })) } catch (e) {
        console.error(e)
        return {}
    }

    // wait for files to be written
    await new Promise((resolve) => {
        setTimeout(resolve, 1000); // very hacky but works!!!!
    });

    console.log(files)

    let readResult;
    try {
        readResult = await read(files)
    } catch (e) {
        console.error(e)
        return {}
    }
    const plotResult = plot(readResult)
    const renderLayersResult = renderLayers(plotResult)
    const renderBoardResult = renderBoard(renderLayersResult)

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
    // ensure valid file url is included
    const url = new URL(decodeURI(file))
    const svg = await GenerateSVG(url)
    return res.status(200).json(svg)
}
// test me with: curl http://localhost:3000/api/board/svg/https%3A%2F%2Fgithub.com%2Fhackclub%2FOnBoard%2Fraw%2Fmain%2Fprojects%2F2_Switch_Keyboard%2Fgerber.zip