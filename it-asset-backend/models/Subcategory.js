module.exports = (sequelize, DataTypes) => {
    const Subcategory = sequelize.define('Subcategory', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'subcategories',
        timestamps: false
    });
    return Subcategory;
};