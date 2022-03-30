const { Router } = require('express');


class Routes {

    constructor() {
        this.router = Router()
        this.config()
    }

    config = () => {
        this.router.get('/', (req, res) => res.send('Hello world'))
    }
}


const routes = new Routes()
module.exports = routes.router