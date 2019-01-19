const getMessage = (name) => `hello ${name}`

module.exports = {
    method: 'GET',
    path: '/:name',
    handler: async function (req, res) { //handler can be separate it doesnt have to be inline here
        const name = re.params.name
        res.send({
            name: name,
            message: getMessage(name)
        })
    },
    middleware: [

    ]
}