const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = new Schema({
    id: String,
    title: String,
    category_id: String,
    price: {
        type: Number,
        default: 0
    },
    available_quantity: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ""
    },
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Products',Product);
