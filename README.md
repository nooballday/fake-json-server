## Exton
A skeleton that wrap [Express](https://expressjs.com/), provided you with more functionalities to jump start your express project.

### !Important
1. this project using ES6 by default
2. some functionalities that i implement might already provided by express i just re implement it to make it easier and faster to use

### How to start using exton
`git clone https://github.com/nooballday/exton.git my-express-project` 

`cd my-express-project`

`npm install`

`npm start:dev`

### Functionality

#### - Starting up
```javascript
import { Server } from './lib'

/**
 * app is an express instance,
 * while the routes is the controller, if you chose to create your own routes just add it to 'app'
 * as you would an express server,
 * the configuration is also the same as the Express configuration
 */
const app = Server.app()
const routes = Server.routes({
    dir_as_path: true
})

app.use('/api/v1', routes)

app.listen(3002, () => {
	console.log(`Server is running at port 3002`)   
})
```

#### - Controller
You dont need to register your controller manually to an express instance, this skeleton will do it for you, just create a file with `.controller.js` extension inside `src/controller` you will need to provided an object inside your file
there are 4 supported methods which are `GET`, `POST`, `PUT`, `DELETE`

```javascript
module.exports  = {
	method:  'GET',
	path:  '/:name',
	handler:  async  function (req, res) { //handler can be separate it doesnt have to be inline here
	const name = req.params.name
		res.send({
			name: name,
			message:  getMessage(name)
		})
	},
	middleware: [//put your express middleware here]
}
```
for more detail can read  [here](https://expressjs.com/en/4x/api.html#req)


#### - Error catcher
by default this skeleton will provide your controller an uncaught exception handler but if you want to override the method your could easily do it

```javascript
import { Server } from './lib'

/**
 * if you want to have custom error handler use below function to hookup
 * your function to catch any uncaught exception in your controller, there is a default
 * if you are not setting up this function
 * set this function on top of your entry.js file to succesfully overriding error handler
 */
Server.errorHandler(function (err, req, res, next) {
    res.send({
        custom_error : `there is an error in ${req.url} with message : ${err}`
    })
})
```

#### Default routing directory's name as path

One reason why i implement it by default is to make APIs more readable whether by other team member or the front end dev, what it does basically provide your API's `path` such as `/login` with it's parent directory's name, for example i have login controller as such:
```
src
  - controller
	  - user
		  - login.controller.js
```
By default the skeleton will add `/user/` infront of your path that you provided inside the file

Of course if you want to disable it you can turn it off by adding `dir_as_path : false` when you registering routes

```javascript
const routes = Server.routes({
    dir_as_path: false
})
app.use('/api/v1', routes)
```

#### Build
To use the project in your production you need to build it
`npm build`

it will generate file `dist/` in project directory that contain the already compiled javascript source code.

you can then run the code
`node dist/index.js`

or if you use [PM2](http://pm2.keymetrics.io/)

`pm2 start dist/index.js`