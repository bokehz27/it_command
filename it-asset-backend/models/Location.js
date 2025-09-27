module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define('Location', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'locations',
        timestamps: false
    });
    return Location;
};