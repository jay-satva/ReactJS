const jsonServer = require('json-server')
const bcrypt = reqire('bcryptjs')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()

server.post('/login', (req, res) => {
    const { name, password } = req.body
//this needs to change
    const db = router.db
    const user = db.get('users').find({ name }).value()

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" })
    }

    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
        { id: user.id, roleId: user.roleId }, SECRET_KEY, { expiresIn: '1h' }
    )

    res.json({
        token, user: { id: user.id, name: user.name, roleId: user.roleId }
    })
})

server.use((req, res, next) => {

    if (req.path === '/login') return next()
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" })
    }
})

const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const SECRET_KEY = "supersecretkey"

server.use(middlewares)
server.use(jsonServer.bodyParser)