const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Import all model definition functions
const AssetModel = require('./Asset');
const EmployeeModel = require('./Employee');
const UserModel = require('./User');
const RoleModel = require('./Role');
const DepartmentModel = require('./Department');
const LocationModel = require('./Location');
const CategoryModel = require('./Category');
const SubcategoryModel = require('./Subcategory');
const BrandModel = require('./Brand');
const ModelModel = require('./Model');
const RamModel = require('./Ram');
const CpuModel = require('./Cpu');
const StorageModel = require('./Storage');
const WindowsVersionModel = require('./WindowsVersion');
const OfficeVersionModel = require('./OfficeVersion');
const AntivirusProgramModel = require('./AntivirusProgram');
const SpecialProgramModel = require('./SpecialProgram');
const PositionModel = require('./Position');
const EmailModel = require('./Email');
const BuildingModel = require('./Building');
const IpPoolModel = require('./IpPool');
const AssetHistoryModel = require('./AssetHistory');
const AssetStatusModel = require('./AssetStatus');


// Initialize models
const Asset = AssetModel(sequelize, DataTypes);
const Employee = EmployeeModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const Role = RoleModel(sequelize, DataTypes);
const Department = DepartmentModel(sequelize, DataTypes);
const Location = LocationModel(sequelize, DataTypes);
const Category = CategoryModel(sequelize, DataTypes);
const Subcategory = SubcategoryModel(sequelize, DataTypes);
const Brand = BrandModel(sequelize, DataTypes);
const Model = ModelModel(sequelize, DataTypes);
const Ram = RamModel(sequelize, DataTypes);
const Cpu = CpuModel(sequelize, DataTypes);
const Storage = StorageModel(sequelize, DataTypes);
const WindowsVersion = WindowsVersionModel(sequelize, DataTypes);
const OfficeVersion = OfficeVersionModel(sequelize, DataTypes);
const AntivirusProgram = AntivirusProgramModel(sequelize, DataTypes);
const SpecialProgram = SpecialProgramModel(sequelize, DataTypes);
const Position = PositionModel(sequelize, DataTypes);
const Email = EmailModel(sequelize, DataTypes);
const Building = BuildingModel(sequelize, DataTypes);
const IpPool = IpPoolModel(sequelize, DataTypes);
const AssetHistory = AssetHistoryModel(sequelize, DataTypes);
const AssetStatus = AssetStatusModel(sequelize, DataTypes);


// --- Define Associations (Relationships) ---

// Asset -> Master Data (One-to-Many)
Category.hasMany(Asset, { foreignKey: 'category_id' });
Asset.belongsTo(Category, { foreignKey: 'category_id' });

Subcategory.hasMany(Asset, { foreignKey: 'subcategory_id' });
Asset.belongsTo(Subcategory, { foreignKey: 'subcategory_id' });

Brand.hasMany(Asset, { foreignKey: 'brand_id' });
Asset.belongsTo(Brand, { foreignKey: 'brand_id' });

Model.hasMany(Asset, { foreignKey: 'model_id' });
Asset.belongsTo(Model, { foreignKey: 'model_id' });

Ram.hasMany(Asset, { foreignKey: 'ram_id' });
Asset.belongsTo(Ram, { foreignKey: 'ram_id' });

Cpu.hasMany(Asset, { foreignKey: 'cpu_id' });
Asset.belongsTo(Cpu, { foreignKey: 'cpu_id' });

Storage.hasMany(Asset, { foreignKey: 'storage_id' });
Asset.belongsTo(Storage, { foreignKey: 'storage_id' });

WindowsVersion.hasMany(Asset, { foreignKey: 'windows_version_id' });
Asset.belongsTo(WindowsVersion, { foreignKey: 'windows_version_id' });

OfficeVersion.hasMany(Asset, { foreignKey: 'office_version_id' });
Asset.belongsTo(OfficeVersion, { foreignKey: 'office_version_id' });

AntivirusProgram.hasMany(Asset, { foreignKey: 'antivirus_id' });
Asset.belongsTo(AntivirusProgram, { foreignKey: 'antivirus_id' });

Department.hasMany(Asset, { foreignKey: 'department_id' });
Asset.belongsTo(Department, { foreignKey: 'department_id' });

Location.hasMany(Asset, { foreignKey: 'location_id' });
Asset.belongsTo(Location, { foreignKey: 'location_id' });

AssetStatus.hasMany(Asset, { foreignKey: 'status_id' });
Asset.belongsTo(AssetStatus, { as: 'status', foreignKey: 'status_id' });

// Employee Relationships
Employee.hasMany(Asset, { foreignKey: 'user_id' });
Asset.belongsTo(Employee, { as: 'user', foreignKey: 'user_id' }); // 'user_id' in assets table refers to an employee

Department.hasMany(Employee, { foreignKey: 'department_id' });
Employee.belongsTo(Department, { foreignKey: 'department_id' });

Position.hasMany(Employee, { foreignKey: 'position_id' });
Employee.belongsTo(Position, { foreignKey: 'position_id' });

Email.hasMany(Employee, { foreignKey: 'email_id' });
Employee.belongsTo(Email, { foreignKey: 'email_id' });

// User & Role Relationships
Role.hasMany(User, { foreignKey: 'role_id' });
User.belongsTo(Role, { foreignKey: 'role_id' });

// Category -> Subcategory
Category.hasMany(Subcategory, { foreignKey: 'category_id' });
Subcategory.belongsTo(Category, { foreignKey: 'category_id' });

// Brand -> Model
Brand.hasMany(Model, { foreignKey: 'brand_id' });
Model.belongsTo(Brand, { foreignKey: 'brand_id' });

// IP Management Relationships
Building.hasMany(IpPool, { foreignKey: 'building_id' });
IpPool.belongsTo(Building, { foreignKey: 'building_id' });

Asset.hasMany(IpPool, { foreignKey: 'asset_id' });
IpPool.belongsTo(Asset, { foreignKey: 'asset_id' });

// History Relationships
User.hasMany(AssetHistory, { foreignKey: 'changed_by_user_id' });
AssetHistory.belongsTo(User, { foreignKey: 'changed_by_user_id' });

Asset.hasMany(AssetHistory, { foreignKey: 'asset_id' });
AssetHistory.belongsTo(Asset, { foreignKey: 'asset_id' });

// Many-to-Many Relationships
Asset.belongsToMany(SpecialProgram, { through: 'asset_special_programs', foreignKey: 'asset_id', timestamps: false });
SpecialProgram.belongsToMany(Asset, { through: 'asset_special_programs', foreignKey: 'special_program_id', timestamps: false });


// Bundle all models and sequelize instance for export
const db = {
  sequelize,
  Asset, Employee, User, Role, Department, Location, Category, Subcategory, Brand, Model, Ram, Cpu, Storage, WindowsVersion, OfficeVersion, AntivirusProgram, SpecialProgram, Position, Email, Building, IpPool, AssetHistory, AssetStatus
};

module.exports = db;