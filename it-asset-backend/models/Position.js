module.exports = (sequelize, DataTypes) => {
    const Position = sequelize.define('Position', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'positions',
        timestamps: false
    });
    return Position;
};