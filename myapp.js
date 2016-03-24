var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator'),
    // routes
    product = require('./routes/product'),
    category = require('./routes/category');

app.set('port', 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: false
})); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());

// Add headers
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// route
app.get('/product', product.list);
app.get('/product/:id', product.detail);
app.post('/product', product.add);
app.delete('/product/:id', product.delete);
app.put('/product/:id', product.edit);

app.get('/category', category.list);
app.get('/category/:id', category.detail);
app.post('/category', category.add);
app.delete('/category/:id', category.delete);
app.put('/category/:id', category.edit);
// route


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        status: 'error',
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    });
});

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
