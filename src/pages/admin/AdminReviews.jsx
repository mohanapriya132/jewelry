import AdminResourcePage from "./AdminResourcePage";
import { reviewFields } from "./adminResourceConfigs";

export default function AdminReviews() {
  return (
    <AdminResourcePage
      config={{
        table: "reviews",
        title: "Reviews",
        singular: "Review",
        countLabel: "customer reviews",
        titleKey: "product",
        fields: reviewFields,
        columns: [
          { key: "product", label: "Product" },
          { key: "customer", label: "Customer" },
          { key: "date", label: "Date" },
          { key: "rating", label: "Rating" },
          { key: "status", label: "Status" },
          { key: "comment", label: "Comment" },
        ],
      }}
    />
  );
}
