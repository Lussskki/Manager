import express from 'express'
import './db/connectMongo.js'

import firstrouter from './router/firstRouter.js'
import secondRouter from './router/secondRouter.js'
import thirdRouter from './router/thirdRouter.js'
import protectedRouter from './router/protectedRouter.js'

import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3002

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:3001'
const allowedMethods = process.env.ALLOWED_METHODS ? process.env.ALLOWED_METHODS.split(',') : ['GET', 'POST', 'DELETE']

app.use(cors({
    origin: allowedOrigin,
    methods: allowedMethods
}))

app.use(bodyParser.json())

app.use('/api/signup', firstrouter)
app.use('/api/login', secondRouter)
app.use('/api/addInfo', thirdRouter)
app.use('/api/profile', protectedRouter)

app.use(express.static(path.join(__dirname, '../build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`)
})
