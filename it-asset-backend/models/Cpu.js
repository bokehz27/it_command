module.exports = (sequelize, DataTypes) => {
    const Cpu = sequelize.define('Cpu', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'cpus',
        timestamps: false
    });
    return Cpu;
};