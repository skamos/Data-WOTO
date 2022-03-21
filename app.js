const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')

const formRoutes = require('./routes/form')
const statsRoutes = require('./routes/stats')
const crewRoutes = require('./routes/crew')
const lieuRoutes = require('./routes/lieu')
const testRoutes = require('./routes/test')

const app = express()

dotenv.config()

mongoose
  .connect(
    process.env.DB_PREFIX +
      process.env.DB_USER +
      ':' +
      process.env.DB_PASS +
      '@' +
      process.env.DB_HOST +
      '/' +
      process.env.DB_COLLEC +
      '?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

// Routes
app.use('/api/form', formRoutes)
app.use('/api/stats', statsRoutes)
app.use('/api/crew', crewRoutes)
app.use('/api/lieu', lieuRoutes)
app.use('/api/test', testRoutes)

app.use(express.static(path.join(__dirname, './dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist'))
})

module.exports = app
