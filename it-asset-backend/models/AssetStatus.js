module.exports = (sequelize, DataTypes) => {
    const AssetStatus = sequelize.define('AssetStatus', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'asset_statuses',
        timestamps: false
    });
    return AssetStatus;
};