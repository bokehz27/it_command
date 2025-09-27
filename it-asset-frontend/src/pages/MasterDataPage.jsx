// src/pages/MasterDataPage.jsx
import { useState } from "react";
import GenericMasterData from "../components/GenericMasterData";
import StorageManager from "../components/StorageManager";
import BuildingManager from "../components/BuildingManager";
import SubcategoryManager from "../components/SubcategoryManager";
import ModelManager from "../components/ModelManager";
import EmailManager from "../components/EmailManager";
import EmployeeManager from "../components/EmployeeManager";
import IpPoolManager from "../components/IpPoolManager";

const masterDataConfig = [
  // Simple Data
  {
    title: "Asset Statuses",
    endpoint: "/master-data/asset-statuses",
    component: "generic",
    dataKey: "name",
  },
  {
    title: "Brands",
    endpoint: "/master-data/brands",
    component: "generic",
    dataKey: "name",
  },
  {
    title: "Categories",
    endpoint: "/master-data/categories",
    component: "generic",
    dataKey: "name",
  },
  {
    title: "CPU Models",
    endpoint: "/master-data/cpus",
    component: "generic",
    dataKey: "name",
  },
  {
    title: "Departments",
    endpoint: "/master-data/departments",
    component: "generic",
    dataKey: "name",
  },
  {
    title: "Locations",
    endpoint: "/master-data/locations",
    component: "generic",
    dataKey: "name",
  },
  {
    title: "Office Versions",
    endpoint: "/master-data/office-versions",
    component: "generic",
    dataKey: "name",
  },
  {
    title: "Positions",
    endpoint: "/master-data/positions",
    component: "generic",
    dataKey: "name",
  },
  {
    title: "Roles",
    endpoint: "/master-data/roles",
    component: "generic",
    dataKey: "name",
  },
  {
    title: "Special Programs",
    endpoint: "/master-data/special-programs",
    component: "generic",
    dataKey: "name",
  },
  {
    title: "Windows Versions",
    endpoint: "/master-data/windows-versions",
    component: "generic",
    dataKey: "name",
  },
  {
    title: "Antivirus Programs",
    endpoint: "/master-data/antivirus-programs",
    component: "generic",
    dataKey: "name",
  },
  // RAM ใช้ dataKey เป็น 'size'
  {
    title: "RAM Sizes",
    endpoint: "/master-data/rams",
    component: "generic",
    dataKey: "size",
  },

  // Complex Data
  {
    title: "Buildings",
    endpoint: "/master-data/buildings",
    component: "buildings",
  },
  { title: "Emails", endpoint: "/master-data/emails", component: "emails" },
  {
    title: "Storages",
    endpoint: "/master-data/storages",
    component: "storages",
  },
  {
    title: "Subcategories",
    endpoint: "/master-data/subcategories",
    component: "subcategories",
  },
  { title: "Models", endpoint: "/master-data/models", component: "models" },
  { title: "Employees", endpoint: "/employees", component: "employees" },
  { title: "IP Pools", endpoint: "/ip-pools", component: "ip-pools" },
];

const pageStyles = {
  display: "flex",
  height: "calc(100vh - 40px)",
};

const sidebarStyles = {
  width: "250px",
  borderRight: "1px solid #444",
  padding: "20px",
  backgroundColor: "#2a2a2a",
  overflowY: "auto",
};

const contentStyles = {
  flexGrow: 1,
  padding: "20px",
  overflowY: "auto",
};

const listStyles = {
  listStyle: "none",
  padding: 0,
};

const listItemStyles = {
  padding: "10px",
  cursor: "pointer",
  borderRadius: "5px",
  marginBottom: "5px",
};

function MasterDataPage() {
  const [selectedMaster, setSelectedMaster] = useState(masterDataConfig[0]);

  const renderContent = () => {
    switch (selectedMaster.component) {
      case "storages":
        return <StorageManager />;
      case "buildings":
        return <BuildingManager />;
      case "subcategories":
        return <SubcategoryManager />;
      case "models":
        return <ModelManager />;
      case "employees":
        return <EmployeeManager />;
      case "emails":
        return <EmailManager />;
      case "ip-pools":
        return <IpPoolManager />;
      case "generic":
      default:
        return (
          <GenericMasterData
            key={selectedMaster.title}
            title={selectedMaster.title}
            apiEndpoint={selectedMaster.endpoint}
            dataKey={selectedMaster.dataKey} // ส่ง dataKey ไปให้ Component
          />
        );
    }
  };

  return (
    <div style={pageStyles}>
      <aside style={sidebarStyles}>
        <h3>Master Data Types</h3>
        <ul style={listStyles}>
          {masterDataConfig.map((item) => (
            <li
              key={item.title}
              onClick={() => setSelectedMaster(item)}
              style={{
                ...listItemStyles,
                backgroundColor:
                  selectedMaster.title === item.title
                    ? "#007bff"
                    : "transparent",
                fontWeight:
                  selectedMaster.title === item.title ? "bold" : "normal",
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </aside>
      <section style={contentStyles}>
        <h1>Manage {selectedMaster.title}</h1>
        {renderContent()}
      </section>
    </div>
  );
}

export default MasterDataPage;
