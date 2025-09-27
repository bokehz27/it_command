module.exports = (sequelize, DataTypes) => {
  const AntivirusProgram = sequelize.define('AntivirusProgram', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'antivirus_programs',
    timestamps: false
  });
  return AntivirusProgram;
};