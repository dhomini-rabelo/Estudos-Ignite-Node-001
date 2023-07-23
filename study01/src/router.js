export class Router {
    #routes = []

    add(path, method, handler) {
        this.#routes.push({
            path, method, handler,
        })
    }

    getRoute(path, method) {
        return this.#routes.find(route => route.path === path && route.method === method) || null
    }
}