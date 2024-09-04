let ServiceRouter = require('express').Router();
let authenticate = require('../authentication');

ServiceRouter.route()
.get(authenticate.verifyUser,)