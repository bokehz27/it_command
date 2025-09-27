module.exports = (sequelize, DataTypes) => {
    const Storage = sequelize.define('Storage', {
        type: DataTypes.STRING,
        size: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'storages',
        timestamps: false
    });
    return Storage;
};