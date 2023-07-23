export class Router {
    #routes = []

    #buildPath(path) {
        const routerParamsRegex = /:([a-zA-Z]+)/g
        const pathWithParams = path.replaceAll(routerParamsRegex, '(?<$1>[a-z0-9\-_]+)')
        return new RegExp(`^${pathWithParams}`)
    }

    middleware(req, res, route) {
        req.params = { ...req.url.match(route.path).groups }
    }

    add(path, method, handler) {
        this.#routes.push({
            path: this.#buildPath(path), 
            method, 
            handler,
        })
    }

    getRoute(path, method) {
        return this.#routes.find(route => route.path.test(path) && route.method === method) || null
    }
}