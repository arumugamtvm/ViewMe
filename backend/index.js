require('dotenv').config();
const express = require('express')
const app = express()
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const routes = require('./router/routes')

const PORT = process.env.PORT || 4000;

require('./config/db');

app.use(cors({ origin: '*', credentials: true }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.get('/', (req, res) => res.send('Api is running.........'))

app.use('/api', routes)

app.use('*', (req, res) => res.status(404).send('<h2>404 Not Found</h2>'))

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
