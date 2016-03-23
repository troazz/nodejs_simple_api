"use strict";

module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("product", {
        name: {
            type: DataTypes.STRING(100),
            validate: {notEmpty: true}
        },
        description: DataTypes.TEXT,
        category_id: {
            type: DataTypes.INTEGER,
            validate: {notEmpty: true, isInt: true}
        },
        stock: {
            type: DataTypes.INTEGER,
            validate: {notEmpty: true, isInt: true}
        },
        cost: {
            type: DataTypes.DOUBLE,
            validate: {notEmpty: true, isFloat: true}
        },
        price: {
            type: DataTypes.DOUBLE,
            validate: {notEmpty: true, isFloat: true}
        }
        }, {
            classMethods: {
            associate: function(models) {
                Product.belongsTo(models.category, {foreignKey: "category_id"})
            }
        }
    });

    return Product;
};
