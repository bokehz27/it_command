module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    employee_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contactNumber: DataTypes.STRING
  }, {
    tableName: 'employees',
  });
  return Employee;
};