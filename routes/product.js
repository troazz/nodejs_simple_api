var models   = require('../models');
// default validation schema
var schema = {
    id: {
        in: 'params',
        notEmpty: {
            errorMessage: "Please fill product ID"
        },
        isInt: {
            errorMessage: "Product ID must be an integer"
        }
    }
};

exports.list = function (req, res){
    req.sanitizeQuery('limit').toInt();
    req.sanitizeQuery('page').toInt();

    var limit = (req.query.limit != undefined) ? req.query.limit : 10;
    var page  = (req.query.page != undefined && req.query.page > 0) ? req.query.page : 1;
    var offset = ((page - 1) * limit);
    models.product.findAll({
        offset: offset,
        limit: limit,
        include: [ models.category ]
    }).then(function(rows) {
        res.json({status: "ok", data: rows});
    });
}

exports.add = function (req, res){
    models.category.check(req.body.category_id, function(rows){
        if (rows != null){
            var data = {
                name        : req.body.name,
                description : req.body.description,
                category_id : req.body.category_id,
                stock       : req.body.stock,
                cost        : req.body.cost,
                price       : req.body.price,
            }
            models.product.create(data).then(function(rows){
                res.json({status: "ok", inserted_id: rows.id});
            }).catch(function(err){
                var errors = [];
                for(var i=0; i< err.errors.length;i++){
                    errors.push({param:err.errors[i].path, msg:err.errors[i].message});
                }
                res.status(400).json({status:"error", error:errors});
            });
        }else{
            res.status(400).json({status: "error", error: {param: "parent", msg: "category ID is not found."}});
        }
    })
}

exports.edit = function (req, res){
    // start validation
    req.check(schema);
    var errors = req.validationErrors();
    // end validation

    if (errors){
        res.status(400).json({status: "error", error: errors});
    }else{
        models.category.check(req.body.category_id, function(rows){
            if (rows != null){
                var data = {
                    name        : req.body.name,
                    description : req.body.description,
                    category_id : req.body.category_id,
                    stock       : req.body.stock,
                    cost        : req.body.cost,
                    price       : req.body.price,
                }
                models.product.update(data, {
                    where:{
                        id:req.params.id
                    }
                }).then(function(rows){
                    if (rows[0])
                        res.json({status: "ok", updated_id: req.params.id});
                    else
                        res.status(400).json({status:"error", message: "product ID not found"});
                }).catch(function(err){
                    var errors = [];
                    for(var i=0; i< err.errors.length;i++){
                        errors.push({param:err.errors[i].path, msg:err.errors[i].message});
                    }
                    res.status(400).json({status:"error", error:errors});
                });
            }else{
                res.status(400).json({status: "error", error: {param: "parent", msg: "category ID is not found."}});
            }
        })
    }
}

exports.detail = function (req, res){
    // validation
    req.check(schema);
    var errors = req.validationErrors();
    // end validation

    if (errors){
        res.status(400).json({status: "error", error: errors});
    }else{
        models.product.findOne({
            where: {
                id: req.params.id
            },
            include: [ models.category ]
        }).then(function(row){
            if (row != null){
                res.json({status: "ok", data: row});
            }else{
                res.status(400).json({status: "error", error: {param: "id", msg: "product with ID ("+req.params.id+") not found"}});
            }
        });
    }
}

exports.delete = function (req, res){
    // validation
    req.check(schema);
    var errors = req.validationErrors();
    // end validation

    if (errors){
        res.status(400).json({status: "error", error: errors});
    }else{
        models.product.destroy({
            where:{
                id:req.params.id
            }
        }).then(function(rows, metadata){
            console.log(rows);
            console.log(metadata);
            if (rows)
                res.json({status: "ok", deleted_id: req.params.id});
            else
                res.status(400).json({status:"error", message: "product ID not found"});
        });
    }
}