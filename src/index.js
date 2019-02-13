import debug from 'debug'
import { Server } from './lib'

/**
 * app is an express instance,
 * while the routes is the controller, if you chose to create your own routes just add it to 'app'
 * as you would an express server
 */

const app = Server.app
const routes = Server.routes({
    dir_as_path: false
})

app.use('/v1', routes)

app.listen(process.env.SERVER_PORT, () => {
    debug('server:init')(`server running at port : ${process.env.SERVER_PORT} at ${new Date()}`)
})