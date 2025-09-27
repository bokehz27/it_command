module.exports = (sequelize, DataTypes) => {
  const AssetHistory = sequelize.define('AssetHistory', {
    action_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    field_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    old_value: DataTypes.TEXT,
    new_value: DataTypes.TEXT,
    change_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'asset_history',
    timestamps: false // We have a custom change_date field
  });
  return AssetHistory;
};