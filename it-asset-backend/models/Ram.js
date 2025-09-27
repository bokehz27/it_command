module.exports = (sequelize, DataTypes) => {
    const Ram = sequelize.define('Ram', {
        size: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'rams',
        timestamps: false
    });
    return Ram;
};