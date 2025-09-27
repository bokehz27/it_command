module.exports = (sequelize, DataTypes) => {
    const OfficeVersion = sequelize.define('OfficeVersion', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'office_versions',
        timestamps: false
    });
    return OfficeVersion;
};