import { _get } from "../../util"
import fileCounterMiddleware from './github-doc-counter'

async function jsonHandler(req, res) { //handler can be separate it doesnt have to be inline here
    const data = req.params

    const username = data.username
    const repo = data.repo
    const file = data.file
    const firstObject = data.fo
    const rawUrl = `https://raw.githubusercontent.com/${username}/${repo}/master/${file}.json`

    const { body, err } = await _get(rawUrl)

    const responseJson = parseFirstObject(JSON.parse(body), firstObject)

    if (err) {
        return res.status(403).json({
            code: 403,
            message: err.message
        })
    }

    return res.json(responseJson)
}

function parseFirstObject(data, firstObject) {
    return firstObject ? data[firstObject] : data
}

module.exports = {
    method: 'USE',
    path: '/mock/:username/:repo/:file/:fo?',
    handler: jsonHandler,
    middleware: [
        fileCounterMiddleware
    ]
}