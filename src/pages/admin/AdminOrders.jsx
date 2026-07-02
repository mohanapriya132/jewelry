import AdminResourcePage from "./AdminResourcePage";
import { orderFields } from "./adminResourceConfigs";

export default function AdminOrders() {
  return (
    <AdminResourcePage
      config={{
        table: "orders",
        title: "Orders",
        singular: "Order",
        countLabel: "total orders",
        titleKey: "customer",
        fields: orderFields,
        columns: [
          { key: "id", label: "Order ID" },
          { key: "customer", label: "Customer" },
          { key: "email", label: "Email" },
          { key: "items", label: "Items" },
          { key: "total", label: "Total" },
          { key: "date", label: "Date" },
          { key: "status", label: "Status" },
        ],
      }}
    />
  );
}
