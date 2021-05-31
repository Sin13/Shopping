module.exports = class locals {

    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    auth() {
        return {
            auth: {
                check: this.req.isAuthenticated(),
                user: this.req.user
            },
            name: 'Sina'
        }
    }

}