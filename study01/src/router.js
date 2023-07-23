export class Router {
    #routes = []

    #buildPath(path) {
        const routerParamsRegex = /:([a-zA-Z]+)/g
        const pathWithParams = path.replaceAll(routerParamsRegex, '(?<$1>[a-z0-9\-_]+)')
        return new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)
    }

    middleware(req, res, route) {

        function getQueryParams(query) {
            if (!query) {
                return {}
            }
            return query.slice(1).split('&').reduce((queryParams, query) => {
                const [paramName, paramValue] = query.split('=')
                queryParams[paramName] = paramValue
                return queryParams
            }, {})
        }

        const routeParams = req.url.match(route.path)
        req.params = { ...routeParams.groups }
        req.query = { ...getQueryParams(routeParams.groups.query) }
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