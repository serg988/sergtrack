require('./models/User')
require('./models/Track')
const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes.js')
const trackRoutes = require('./routes/trackRoutes.js')
const requireAuth = require('./middlewares/requireAuth.js')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(authRoutes)
app.use(trackRoutes)

const mongoUri = process.env.MONGO_URI
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance')
})
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to mongo', err)
})

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`)
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000')
})
