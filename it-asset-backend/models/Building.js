module.exports = (sequelize, DataTypes) => {
    const Building = sequelize.define('Building', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        vlan: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'buildings',
        timestamps: false
    });
    return Building;
};