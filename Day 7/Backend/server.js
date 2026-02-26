const jsonServer = require('json-server')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const SECRET_KEY = "supersecretkey"

server.use(middlewares)
server.use(jsonServer.bodyParser)
//===================================================login===========================================
server.post('/login', (req, res) => {
    const { username, password } = req.body
    console.log(req.body)
    //this needs to change
    const db = router.db
    const user = db.get('users').find({ name: username }).value()
    console.log(user)

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" })
    }

    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
        { id: user.id, roleId: user.roleID }, SECRET_KEY, { expiresIn: '1h' }
    )

    res.json({
        token, user: { id: user.id, name: user.name, roleId: user.roleID }
    })
})
//================================================================auth================================
server.use((req, res, next) => {

    if (req.path === '/login' || req.path.startsWith("/permissions") || req.path.startsWith("/roles")) return next()
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
//=======================================================permission=====================================
server.use((req, res, next) => {
  if (req.path === "/login" || req.path.startsWith("/permissions") || req.path.startsWith("/roles")) return next()

  const db = router.db

  const role = db.get("roles").find({ id: req.user.roleId }).value()
  if (!role) {
    return res.status(403).json({ message: "Role not found" })
  }

  const rolePermissionIds = role.permissions || []

  // we will extract resource from path
  const pathParts = req.path.split("/")
  const resource = pathParts[1]
  if (!resource) return next()

  // then convert plural to singular
  const resourceSingular = resource.endsWith("s") ? resource.slice(0, -1) : resource
  const resourceUpper = resourceSingular.toUpperCase()

  let actionPrefix = ""

  switch (req.method) {
    case "GET":
      actionPrefix = "GET"
      break
    case "POST":
      actionPrefix = "ADD"
      break
    case "PUT":
    case "PATCH":
      actionPrefix = "EDIT"
      break
    case "DELETE":
      actionPrefix = "DELETE"
      break
    default:
      return next()
  }

  const requiredPermission = `${actionPrefix}_${resourceUpper}`

  const permissions = db
    .get("permissions")
    .filter((p) => rolePermissionIds.includes(p.id))
    .value()

  const hasPermission = permissions.some(
    (p) => p.action === requiredPermission,
  )

  if (!hasPermission) {
    return res.status(403).json({
      message: `Access denied: ${requiredPermission}`,
    })
  }

  next()
})

//===================================================user crus ==========================================

server.get('/users', (req, res) => {
    const db = router.db
    const users = db.get('users').value()
    const safeUsers = users.map(u => ({ id: u.id, name: u.name, email: u.email, roleID: u.roleID }))
    res.json(safeUsers)
})

// create
server.post('/users', (req, res) => {
    const { name, email, password, roleID } = req.body
    if (!name || !email || !password || !roleID) return res.status(400).json({ message: "All fields are required" })
    const db = router.db
    const existingUser = db.get('users').find({ email }).value()
    if (existingUser) return res.status(400).json({ message: "Email already exists" })

    const hashedPassword = bcrypt.hashSync(password, 12)
    const newUser = { id: Date.now(), name, email, password: hashedPassword, roleID }
    db.get('users').push(newUser).write()
    res.status(201).json({ id: newUser.id, name, email, roleID })
})

// update
server.put('/users/:id', (req, res) => {
    const { id } = req.params
    const { name, email, password, roleID } = req.body

    const db = router.db
    const user = db.get('users').find({ id: parseInt(id) }).value()
    if (!user) return res.status(404).json({ message: "User not found" })

    const updatedData = { name, email, roleID }
    if (password) updatedData.password = bcrypt.hashSync(password, 12)

    db.get('users').find({ id: parseInt(id) }).assign(updatedData).write()
    res.json({ id: parseInt(id), name, email, roleID })
})

// delete
server.delete('/users/:id', (req, res) => {
    const { id } = req.params
    const db = router.db
    const user = db.get('users').find({ id: parseInt(id) }).value()
    if (!user) return res.status(404).json({ message: "User not found" })

    db.get('users').remove({ id: parseInt(id) }).write()
    res.json({ message: "User deleted successfully" })
})

server.use(router)
server.listen(3000, () => {
  console.log("Server running on port 3000")
})