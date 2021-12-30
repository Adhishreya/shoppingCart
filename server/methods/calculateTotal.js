const { reject } = require("lodash");
const { model } = require("mongoose");
var Products = require('../models/products');

var itemCount = 0;
var summary = [];
var total = 0;
// function gernerateSummary(data) {

//     new Promise((resolve, reject) => {
//         data.forEach((items, index) => {
//             var quant = items.quantity;
//             var orderSummary = {};

//             Products.findById(items.productId).then(product => {
//                 total += product.price * quant;
//                 orderSummary = {
//                     productName: product.productName,
//                     quantity: quant,
//                     price: product.price * quant
//                 }
//                 itemCount += quant;
//                 return orderSummary;
//             }).then(res => {
//                 summary.push(res);

//                 // console.log(summary);
//             });
//         });

//         resolve(summary);
//     })

//     // console.log(summary);
// }

// function calculateTotal(data) {
//     new Promise((resolve) => {
//         gernerateSummary(data);
//         resolve(summary);
//     }).then(() => {
//         const finalSummary = {
//             itemCount: itemCount,
//             total: total
//         }
//         summary.push(finalSummary);
//         console.log(summary);

//     });
// }

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
    // console.log(Promise.all(promiseAllTrial));
    //     promiseAllTrial[0].then(res => {
    //         summary.push(res);
    //         console.log(summary);
    //     });
    // }

    Promise.all(promiseAllTrial).then(res => {
        summary.push(res);
        const finalSummary = {
            itemCount: itemCount,
            total: total
        }
        summary.push(finalSummary);
        // console.log(summary);
        return summary;
    });
}
module.exports = { calculateTotal };


