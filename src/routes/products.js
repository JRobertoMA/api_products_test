const { Router } = require('express');
const router = Router();

const Products = require('../models/product');

router.post('/', async (req, res) => {
    const {id, title, category_id, price, available_quantity, description, status} = req.body;
    var data = {};
    var response = [];
    var status_data = [];
    if (id && title && category_id) {
        data['id'] = id.toString();
        data['title'] = title.toString();
        data['category_id'] = category_id.toString();
        if (price) {
            if (isNaN(parseInt(price))) {
                status_data.push(false);
                response.push("price is not a number");
            } else {
                data['price'] = price;
            }
        }
        if (available_quantity) {
            if (isNaN(parseInt(available_quantity))) {
                status_data.push(false);
                response.push("available_quantity is not a number");
            } else {
                data['available_quantity'] = available_quantity;
            }
        }
        if (description) {
            data['description'] = description.toString();
        }
        if (status) {
            data['status'] = status;
        }
        if (status_data.length > 0) {
            res.status(400);
            res.json({status: 400, answer: response});
        } else {
            const product = new Products(data);
            const result = await product.save();
            res.status(201);
            res.json({status: 201, result: result});
        }
    } else {
        res.status(400);
        res.json({status: 400, result: "id, title, category_id is required"});
    }
})

router.get('/', async (req, res) => {
    const result = await Products.find({},{_id: 0, __v: 0});
    res.status(200);
    res.json(result);
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    if (id) {
        const result = await Products.remove({id: id});
        res.status(200);
        res.json({status: 200, result: result});
    } else {
        res.status(400);
        res.json({status: 400, result: "id must not be blank"});
    }
    
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {title, category_id, price, available_quantity, description, status} = req.body;
    var data = {};
    var response = [];
    var status_data = [];
    if (title && category_id) {
        data['title'] = title.toString();
        data['category_id'] = category_id.toString();
    }
    if (price) {
        if (isNaN(parseInt(price))) {
            status_data.push(false);
            response.push("price is not a number");
        } else {
            data['price'] = price;
        }
    }
    if (available_quantity) {
        if (isNaN(parseInt(available_quantity))) {
            status_data.push(false);
            response.push("available_quantity is not a number");
        } else {
            data['available_quantity'] = available_quantity;
        }
    }
    if (description) {
        data['description'] = description.toString();
    }
    if (status) {
        data['status'] = status;
    }
    if (status_data.length > 0) {
        res.status(400);
        res.json({status: 400, answer: response});
    } else {
        const result = await Products.update({id: id}, {$set: data});
        res.status(200);
        res.json({status: 200, result: result});
    }
})

module.exports = router;