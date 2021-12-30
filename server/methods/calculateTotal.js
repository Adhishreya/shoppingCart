const { reject } = require("lodash");
const { model } = require("mongoose");
var Products = require('../models/products');

var itemCount = 0;
var summary = [];
var total = 0;
function calculateTotal(data) {
    var promiseAllTrial = data.map(function (item) {
        return new Promise(function (resolve, reject) {
            Products.findById(item.productId).then(product => {
                total += product.price * item.quantity;
                itemCount += item.quantity;
                resolve({
                    productName: product.productName,
                    quantity: item.quantity,
                    price: product.price * item.quantity
                });
            });
        });
    });
 return  Promise.all(promiseAllTrial).then(res => {
        summary.push(res);
        const finalSummary = {
            itemCount: itemCount,
            total: total
        }
        summary.push(finalSummary);
        return summary;
    });
}


function updateOrders(data) {
}
module.exports = { calculateTotal };


