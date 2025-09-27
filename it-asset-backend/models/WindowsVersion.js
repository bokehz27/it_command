module.exports = (sequelize, DataTypes) => {
    const WindowsVersion = sequelize.define('WindowsVersion', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'windows_versions',
        timestamps: false
    });
    return WindowsVersion;
};