import http from 'node:http'
import {useJSONMiddleware} from './middlewares/json.js'
import { router } from './routes.js'


const server = http.createServer(async (req, res) => {
    const route = router.getRoute(req.url, req.method)
    if (route) {
        await useJSONMiddleware(req, res, route)
        await router.middleware(req, res, route)
        try {
            return route.handler(req, res)
        } catch(e) {
            return res.writeHead(500).end()
        }
    } else {
        return res.writeHead(404).end()
    }
})

server.listen(3333)