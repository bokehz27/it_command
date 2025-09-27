module.exports = (sequelize, DataTypes) => {
    const Email = sequelize.define('Email', {
        email_address: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'emails',
        timestamps: false
    });
    return Email;
};