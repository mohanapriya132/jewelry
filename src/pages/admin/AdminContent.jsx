import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import AdminResourcePage from "./AdminResourcePage";
import { contentResourceConfigs } from "./adminResourceConfigs";

const tabs = [
  { label: "Categories", path: "categories", config: contentResourceConfigs.categories },
  { label: "Offers", path: "offers", config: contentResourceConfigs.offers },
  { label: "Features", path: "features", config: contentResourceConfigs.features },
  { label: "Wedding Tabs", path: "wedding-tabs", config: contentResourceConfigs.weddingTabs },
  { label: "Wedding Products", path: "wedding-products", config: contentResourceConfigs.weddingProducts },
  { label: "Wedding Promises", path: "wedding-promises", config: contentResourceConfigs.weddingPromises },
];

export default function AdminContent() {
  return (
    <div>
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={`/admin/content/${tab.path}`}
              className={({ isActive }) =>
                `text-[10px] tracking-widest uppercase px-4 py-2 border transition-colors font-body ${
                  isActive
                    ? "bg-obsidian text-ivory border-obsidian"
                    : "border-obsidian/20 text-slate hover:border-gold hover:text-gold"
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>

      <Routes>
        <Route index element={<Navigate to="categories" replace />} />
        {tabs.map((tab) => (
          <Route
            key={tab.path}
            path={tab.path}
            element={<AdminResourcePage config={tab.config} />}
          />
        ))}
      </Routes>
    </div>
  );
}
