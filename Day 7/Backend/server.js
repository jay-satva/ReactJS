const jsonserver = require('json-server')
const bcrypt = reqire('bcryptjs')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const SECRET_KEY = "supersecretkey"

server.use(middlewares)
server.use(jsonServer.bodyParser)