module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    asset_name: DataTypes.STRING,
    serial_number: DataTypes.STRING,
    device_id: DataTypes.STRING,
    mac_address_lan: DataTypes.STRING,
    mac_address_wifi: DataTypes.STRING,
    wifi_status: DataTypes.STRING,
    windows_product_key: DataTypes.STRING,
    office_product_key: DataTypes.STRING,
    bitlocker_csv_file: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    fin_asset_ref_no: DataTypes.STRING,
    remark: DataTypes.TEXT,
  }, {
    tableName: 'assets',
    timestamps: false // We don't have createdAt/updatedAt in the assets table
  });

  return Asset;
};