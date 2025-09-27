module.exports = (sequelize, DataTypes) => {
    const SpecialProgram = sequelize.define('SpecialProgram', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'special_programs',
        timestamps: false
    });
    return SpecialProgram;
};