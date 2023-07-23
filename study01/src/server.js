import http from 'node:http'
import {useJSONMiddleware} from './middlewares/json.js'
import { router } from './routes.js'


const server = http.createServer(async (req, res) => {
    const route = router.getRoute(req.url, req.method)
    if (route) {
        await useJSONMiddleware(req, res, route)
        return route.handler(req, res)
    } else {
        return res.writeHead(404).end()
    }
})

server.listen(3333)