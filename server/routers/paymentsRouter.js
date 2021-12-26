var mongoose = require('mongoose');
var paymentRouter = require('express').Router();
var Paymets = require('../models/payments');
var authenticate = require('../authentication');

