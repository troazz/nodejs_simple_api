var frisby = require('frisby');
frisby.create('Get List of Product')
    .get('http://localhost:3000/product')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        status: "ok"
    })
    .expectJSONTypes("data.*", {
        name: String,
        description: String,
        category_id: Number,
        stock: Number,
        cost: Number,
        price: Number,
        createdAt: String,
        updatedAt: String,
        category: Object
    })
    .toss();

frisby.create('Get Detail of Product')
    .get('http://localhost:3000/product/1/')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        status: "ok"
    })
    .expectJSONTypes("data", {
        name: String,
        description: String,
        category_id: Number,
        stock: Number,
        cost: Number,
        price: Number,
        createdAt: String,
        updatedAt: String,
        category: Object
    })
    .toss();

frisby.create('Create New Product')
    .post('http://localhost:3000/product', {
        name: "Frisby Product",
        description: "Here's is the description of Frisby",
        stock: 10,
        price: 10000,
        cost: 8000,
        category_id: 1
    }, {
        json: true
    })
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        status: "ok"
    })
    .expectJSONTypes("inserted_id", Number)
    .afterJSON(function(json) {
        frisby.create('Update product data').
        put('http://localhost:3000/product/' + json.inserted_id, {
                name: "Frisby Product (updated)",
                description: "Here's is the description of Frisby (updated)",
                stock: 5,
                price: 11000,
                cost: 7000,
                category_id: 2
            }, {
                json: true
            })
            .expectStatus(200)
            .expectHeaderContains('content-type', 'application/json')
            .expectJSON({
                status: "ok"
            })
            .expectJSONTypes("updated_id", Number)
            .afterJSON(function(json) {
                frisby.create('Delete category')
                    .delete('http://localhost:3000/product/' + json.updated_id)
                    .expectJSON({
                        status: "ok"
                    })
                    .expectJSONTypes("deleted_id", Number)
                    .toss();
            })
            .toss();
    })
    .toss();

frisby.create('Get error on update with wrong body content')
    .put('http://localhost:3000/product/7/', {
        name: "",
        description: "Here's is the description of Frisby (updated)",
        stock: 5,
        price: "asas",
        cost: 7000,
        category_id: 2
    }, {
        json: true
    })
    .expectStatus(400)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        status: "error"
    })
    .toss();

frisby.create('Get error on update with wrong params')
    .put('http://localhost:3000/product/7s/', {
        name: "Frisby Product (updated)",
        description: "Here's is the description of Frisby (updated)",
        stock: 5,
        price: 11000,
        cost: 7000,
        category_id: 2
    }, {
        json: true
    })
    .expectStatus(400)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        status: "error"
    })
    .toss();

frisby.create('Get error on update with non existed ID')
    .put('http://localhost:3000/product/99999/', {
        name: "Frisby Product (updated)",
        description: "Here's is the description of Frisby (updated)",
        stock: 5,
        price: 11000,
        cost: 7000,
        category_id: 2
    }, {
        json: true
    })
    .expectStatus(400)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        status: "error"
    })
    .toss();

frisby.create('Get error on delete data with wrong params type')
    .delete('http://localhost:3000/product/asas/')
    .expectJSON({
        status: "error"
    })
    .toss();

frisby.create('Get error on delete data with non existed ID')
    .delete('http://localhost:3000/product/99999/')
    .expectJSON({
        status: "error"
    })
    .toss();

frisby.create('Get error on create new product with wrong body content type')
    .post('http://localhost:3000/product', {
        name: "",
        description: "Here's is the description of Frisby",
        stock: 10,
        price: "asas",
        cost: "ass"
    }, {
        json: true
    })
    .expectStatus(400)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        status: "error"
    })
    .toss();
