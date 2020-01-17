import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as expressSession from 'express-session';
import * as fs from 'fs';

import {Product} from './types';

const app = express();
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));
app.use(bodyParser.json());
app.use(expressSession({
    secret: 'Shh... it is a secret :)',
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: false },
}));

let products: Array<Product> = new Array<Product>();

function loadProducts() {
    products = JSON.parse(fs.readFileSync(path.join(__dirname, '/assets/products.json'), 'utf8'));
}

app.get('/api/products', (req, res) => {
    loadProducts();
    res.json(products);
});

app.get('/api/basket', (req, res) => {
    if (req.session.basket == undefined) {
        req.session.basket = <Product[]>[];
    }
    res.json(req.session.basket);
});

app.post('/api/basket', (req, res) => {
    if (req.session.basket == undefined) {
        req.session.basket = <Product[]>[];
    }
    req.session.basket = <Product[]>[
        ...req.session.basket,
        <Product>req.body
    ];
    res.sendStatus(200);
});

app.post('/api/basket/remove-item', (req, res) => {
    removeItemFromBasket(<Product>req.body, req);
    res.sendStatus(200);
});

app.post('/api/basket/empty', (req, res) => {
    req.session.basket = [];
    res.sendStatus(200);
});

/* assets and libs */
app.use('/assets', express.static(path.join(__dirname, '/assets')));
app.use('/spectre', express.static(path.join(__dirname, '..', '/node_modules/spectre.css/dist')));

app.listen(8080, () => console.log('server is up and running'));

function removeItemFromBasket(product: Product, req) {
    let index = 0;
    for (let basketItem of req.session.basket) {
        if (basketItem.name === product.name) {
            req.session.basket.splice(index, 1);
            break;
        }
        index++;
    }
}
