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