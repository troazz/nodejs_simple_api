"use strict";

module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define("category", {
        name: {
            type: DataTypes.STRING(100),
            validate: {
                notEmpty: true
            }
        },
        description: DataTypes.TEXT,
        parent: {
            type: DataTypes.INTEGER,
            validate: {
                isInt: true
            }
        },
    });

    Category.check = function(id, callback) {
        if (id !== undefined && id !== "" && id !== 0) {
            Category.findOne({
                where: {
                    id: id
                }
            }).then(callback);
        } else
            callback([{
                root: true
            }]);
    };

    return Category;
};
