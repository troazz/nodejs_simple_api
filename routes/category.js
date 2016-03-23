var models   = require('../models');
// validation schema
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
    models.category.findAll({ order:"parent asc, id asc" }).then(function(rows) {
        var tmp = {},
            result = [];
        // build root category
        for(var i=0; i < rows.length; i++){
            rows[i] = rows[i].dataValues;
            rows[i].child = [];
            if (rows[i].parent === 0)
                result.push(rows[i]);
            else{
                if (tmp[rows[i].parent] === undefined)
                    tmp[rows[i].parent] = [];
                tmp[rows[i].parent].push(rows[i]);
            }
        }

        var set_child = function(r, t){
            for(var i = 0; i < r.length; i++){
                if (t[r[i].id] !== undefined){
                    for(var j = 0; j < t[r[i].id].length; j++){
                        r[i].child.push(t[r[i].id][j]);
                    }
                    delete t[r[i].id];
                }
                if (r[i].child.length){
                    r[i].child = set_child(r[i].child, t);
                }
            }
            return r;
        };

        // place child to it's parent category
        while(Object.keys(tmp).length > 0){
            result = set_child(result, tmp);
        }

        res.json({status: "ok", data: result});
    });
};

exports.add = function (req, res){
    models.category.check(req.body.parent, function(rows){
        if (rows !== null){
            var data = {
                name        : req.body.name,
                description : req.body.description,
                parent      : req.body.parent === undefined ? 0 : req.body.parent,
            };
            models.category.create(data).then(function(rows){
                res.json({status: "ok", inserted_id: rows.id});
            }).catch(function(err){
                var errors = [];
                for(var i=0; i< err.errors.length;i++){
                    errors.push({param:err.errors[i].path, msg:err.errors[i].message});
                }
                res.status(400).json({status:"error", error:errors});
            });
        }else{
            res.status(400).json({status: "error", error: {param: "parent", msg: "parent ID is not found."}});
        }
    });
};

exports.edit = function (req, res){
    // validation
    req.check(schema);
    var errors = req.validationErrors();
    // end validation

    if (errors){
        res.status(400).json({status: "error", error: errors});
    }else{
        models.category.check(req.body.parent, function(rows){
            if (rows !== null){
                var data = {
                    name        : req.body.name,
                    description : req.body.description,
                    parent      : req.body.parent === undefined ? 0 : req.body.parent,
                };
                models.category.update(data, {
                    where:{
                        id:req.params.id
                    }
                }).then(function(rows){
                    if (rows[0])
                        res.json({status: "ok", updated_id: req.params.id});
                    else
                        res.status(400).json({status:"error", message: "category ID not found"});
                }).catch(function(err){
                    var errors = [];
                    for(var i=0; i< err.errors.length;i++){
                        errors.push({param:err.errors[i].path, msg:err.errors[i].message});
                    }
                    res.status(400).json({status:"error", error:errors});
                });
            }else{
                res.status(400).json({status: "error", error: {param: "parent", msg: "parent ID is not found."}});
            }
        });
    }
};

exports.detail = function (req, res){
    // validation
    req.check(schema);
    var errors = req.validationErrors();
    // end validation

    if (errors){
        res.status(400).json({status: "error", error: errors});
    }else{
        models.category.check(req.params.id, function(row){
            if (row !== null){
                res.json({status: 'ok', data: row.dataValues});

                /* failed script to get all child dinamically
                row       = row.dataValues;
                row.child = [];
                var max   = 0;
                var cur   = 0;
                var set_to_parent = function(id_parent){
                    for(var i = 0; i < id_parent.length; i++);
                }

                var get_child = function(r, id){
                    models.category.findAll({where: {parent: id}}).then(function(a){
                        max += Object.keys(a).length;
                        for(var i=0; i < Object.keys(a).length; i++){
                            cur++;
                            a[i] = a[i].dataValues;
                            a[i].child = [];
                            get_child(a[i], a[i].id);
                            r.child.push(a[i]);
                        }
                        if (cur >= max)
                            console.log(r);
                    })
                }

                get_child(row, row.id);
                */
            }else{
                res.status(400).json({status: "error", error: {param: "id", msg: "Category with ID ("+req.params.id+") not found"}});
            }
        });
    }
};

exports.delete = function (req, res){
    // validation
    req.check(schema);
    var errors = req.validationErrors();
    // end validation

    if (errors){
        res.status(400).json({status: "error", error: errors});
    }else{
        models.category.destroy({
            where:{
                id:req.params.id
            }
        }).then(function(rows, metadata){
            if (rows)
                res.json({status: "ok", deleted_id: req.params.id});
            else
                res.status(400).json({status:"error", message: "category ID not found"});
        });
    }
};
