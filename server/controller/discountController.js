const { Discount } = require('../models');

const getDiscounts = async (req, res, next) => {
    try {
        const discounts = await Discount.find({});
        res.statusCode = 200;
        res.header('ContentType', 'application/json');
        res.json(discounts);
    }
    catch (error) {
        next(error);
    }
}


const addDiscounts = async (req, res, next) => {
    try {
        let { name, description, value, discountStartDate, discountEndDate } = req.body;
        let discount = Discount.create({ name, description, value, discountStartDate, discountEndDate })

        res.statusCode = 200;
        res.header('ContentType', 'application/json');
        res.json(discount);
    }
    catch (error) {
        next(error);
    }
}

module.exports = { getDiscounts, addDiscounts };