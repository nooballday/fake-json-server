import $ from 'cheerio'
import { _get } from "../../util";

export default async function (req, res, next) {
    const data = req.params
    const username = data.username
    const repo = data.repo

    const { err, body, status_code } = await _get(`https://github.com/${username}/${repo}`)

    if (err) {
        throw new Error('Unrecognize Url')
    }

    if (status_code != 200) {
        return res.status(403).json({
            message: 'Unrecognized github repo'
        })
    }

    const fileCount = $('tr.js-navigation-item', body).length
    if (fileCount > 5) {
        return res.status(405).json({
            file_found: fileCount,
            message: 'Please make sure that you are authorized as PRO user'
        })
    }

    next()
}