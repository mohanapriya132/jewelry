import AdminResourcePage from "./AdminResourcePage";
import { customerFields } from "./adminResourceConfigs";

export default function AdminCustomers() {
  return (
    <AdminResourcePage
      config={{
        table: "customers",
        title: "Customers",
        singular: "Customer",
        countLabel: "registered customers",
        titleKey: "name",
        fields: customerFields,
        columns: [
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "orders", label: "Orders" },
          { key: "spent", label: "Total Spent" },
          { key: "joined", label: "Joined" },
        ],
      }}
    />
  );
}
