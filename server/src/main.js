import express from 'express'
import router from './router.js'
import cors from 'cors'
import syncData from './shared/database/syncDatabase.js'

 
const app = express()
const port = process.env.APP_PORT || 3000

async function server() {

    app.use(cors())
    app.use(express.json())
    app.use('/api', router)

    await syncData()
    app.listen(port, () => {
        console.log(`Example app listening on port http://localhost:${port}`)
    })
}

server()