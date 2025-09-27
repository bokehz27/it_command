module.exports = (sequelize, DataTypes) => {
    const IpPool = sequelize.define('IpPool', {
        ip_address: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        is_used: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'ip_pools',
        timestamps: false
    });
    return IpPool;
};