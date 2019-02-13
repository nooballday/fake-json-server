import _request from 'request'

async function jsonHandler(req, res) { //handler can be separate it doesnt have to be inline here
    const data = req.params

    const username = data.username
    const repo = data.repo
    const file = data.file

    const rawUrl = `https://raw.githubusercontent.com/${username}/${repo}/master/${file}.json`

    _request(rawUrl, function (_e, _r, body) {
        const responseJson = JSON.parse(body)
        res.json(responseJson)
    })
}

module.exports = {
    method: 'USE',
    path: '/:username/:repo/:file',
    handler: jsonHandler,
    middleware: [

    ]
}