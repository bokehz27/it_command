module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Model', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'models',
        timestamps: false
    });
    return Model;
};