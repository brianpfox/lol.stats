"use strict";

class Routes {
    constructor(router, controller) {
        this._router = router;
        this._controller = controller;
    }

    configureRoutes() {
        this._router.get('/matches', this._controller.get);
        return this._router;
    }
}

module.exports.Routes = Routes;