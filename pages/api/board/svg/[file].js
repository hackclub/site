import JSZip from "jszip";
import {read, plot, renderLayers, renderBoard, stringifySvg} from '@tracespace/core'
import fs from 'fs'

async function asyncLoadZip(data) {
    return await new Promise((resolve, reject) => {
        JSZip.loadAsync(data).then(function (zip) {
            resolve(zip)
        }, function (e) {
            reject(e)
        });
    })
}
async function asyncUnzip (file) {
    const zip = new JSZip();
    return await new Promise((resolve, reject) => {
        zip.file(file).async("uint8array").then(function (data) {
            resolve(data)
        }, function (e) {
            reject(e)
        });
    })
}

export const GenerateSVG = async (zipFile) => {
    //const zip = new JSZip();
    const data = await fetch(zipFile)
        .then((res) => res.arrayBuffer());
    let files = [];
    if(!fs.existsSync('gerber'))
        fs.mkdirSync('gerber');
    try {
        const zip = await asyncLoadZip(data)
        await new Promise(async (resolve, reject) => {
            for(let filename of Object.keys(zip.files)) {
                await (zip.files[filename].async('uint8array').then(function (fileData) {
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
                        //console.log('gerber/' + filename)
                        files.push('gerber/' + filename);
                        if(!fs.existsSync('gerber/' + filename))
                            fs.writeFileSync('gerber/' + filename, fileData);
                    }
                }));
                //console.log(zip.files[filename])
            }
            resolve();
        });
    } catch (e) {
        console.error(e)
        if(fs.existsSync('gerber'))
            fs.rmdirSync('gerber', { recursive: true });
        return {}
    }

    //console.log(files)

    let readResult;
    try {
        readResult = await read(files)
    } catch (e) {
        console.error(e)
        if(fs.existsSync('gerber'))
            fs.rmdirSync('gerber', { recursive: true });
        return {}
    }
    const plotResult = plot(readResult)
    const renderLayersResult = renderLayers(plotResult)
    const renderBoardResult = renderBoard(renderLayersResult)

    if(fs.existsSync('gerber'))
        fs.rmdirSync('gerber', { recursive: true });
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