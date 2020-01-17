"use strict";
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
var path = require("path");
var bodyParser = require("body-parser");
var expressSession = require("express-session");
var fs = require("fs");
var app = express();
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(bodyParser.json());
app.use(expressSession({
    secret: 'Shh... it is a secret :)',
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: false }
}));
var products = new Array();
function loadProducts() {
    products = JSON.parse(fs.readFileSync(path.join(__dirname, '/assets/products.json'), 'utf8'));
}
app.get('/api/products', function (req, res) {
    loadProducts();
    res.json(products);
});
app.get('/api/basket', function (req, res) {
    if (req.session.basket == undefined) {
        req.session.basket = [];
    }
    res.json(req.session.basket);
});
app.post('/api/basket', function (req, res) {
    if (req.session.basket == undefined) {
        req.session.basket = [];
    }
    req.session.basket = req.session.basket.concat([
        req.body
    ]);
    res.sendStatus(200);
});
app.post('/api/basket/remove-item', function (req, res) {
    removeItemFromBasket(req.body, req);
    res.sendStatus(200);
});
app.post('/api/basket/empty', function (req, res) {
    req.session.basket = [];
    res.sendStatus(200);
});
/* assets and libs */
app.use('/assets', express.static(path.join(__dirname, '/assets')));
app.use('/spectre', express.static(path.join(__dirname, '..', '/node_modules/spectre.css/dist')));
app.listen(8080, function () { return console.log('server is up and running'); });
function removeItemFromBasket(product, req) {
    var index = 0;
    for (var _i = 0, _a = req.session.basket; _i < _a.length; _i++) {
        var basketItem = _a[_i];
        if (basketItem.name === product.name) {
            req.session.basket.splice(index, 1);
            break;
        }
        index++;
    }
}
