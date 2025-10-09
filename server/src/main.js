import express from 'express'
import router from './router.js';
import cors from 'cors'

const app = express()
const port = process.env.APP_PORT || 3000

function server() {

    app.use(cors())
    app.use(express.json())
    app.use('/api', router);

    app.listen(port, () => {
        console.log(`Example app listening on port http://localhost:${port}`)
    })
}

server();

//export default server