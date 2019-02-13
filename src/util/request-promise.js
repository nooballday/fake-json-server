import _request from 'request'

function _get(url) {
    return new Promise((resolve, reject) => {
        _request(url, function (_e, _r, body) {
            try {
                resolve({
                    body: body,
                    status_code: _r.statusCode
                })
            } catch (error) {
                reject({ err: error })
            }
        })
    })
}

export {
    _get
} 