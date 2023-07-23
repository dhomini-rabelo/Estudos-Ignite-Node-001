import http from 'node:http'
import {useJSONMiddleware} from './middlewares/json.js'
import { router } from './routes.js'


const server = http.createServer(async (req, res) => {
    await useJSONMiddleware(req, res)

    const handler = router.getHandler(req.url, req.method)

    return handler ? handler(req, res) : res.writeHead(404).end()
})

server.listen(3333)