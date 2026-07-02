import { useProducts } from "../../context/ProductContext";
import { useAdmin } from "../../context/AdminContext";
import { parsePrice, formatPrice } from "../../utils/formatPrice";

const statusColors = {
  Delivered: "bg-green-100 text-green-800",
  Shipped: "bg-blue-100 text-blue-800",
  Processing: "bg-yellow-100 text-yellow-800",
  Pending: "bg-gray-100 text-gray-800",
  Approved: "bg-green-100 text-green-800",
};

export default function AdminDashboard() {
  const { products } = useProducts();
  const { orders, customers, reviews } = useAdmin();

  const totalRevenue = orders.reduce(
    (acc, o) => acc + parsePrice(o.total),
    0
  );
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const pendingReviews = reviews.filter((r) => r.status === "Pending").length;

  const stats = [
    { label: "Total Products", value: products.length, color: "text-gold-dark" },
    { label: "Total Orders", value: orders.length, color: "text-obsidian" },
    { label: "Customers", value: customers.length, color: "text-obsidian" },
    { label: "Revenue", value: formatPrice(totalRevenue), color: "text-gold-dark" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display text-3xl font-light text-obsidian mb-2">Dashboard</h2>
        <p className="text-slate font-body text-sm">Overview of your jewellery store</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-gold/10 p-6 shadow-sm">
            <p className="text-xs tracking-widest uppercase text-slate/60 font-body mb-2">
              {stat.label}
            </p>
            <p className={`font-display text-3xl font-light ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gold/10 shadow-sm">
          <div className="p-6 border-b border-gold/10 flex justify-between items-center">
            <h3 className="font-display text-xl text-obsidian">Recent Orders</h3>
            {pendingOrders > 0 && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-body">
                {pendingOrders} pending
              </span>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-gold/10 text-left text-slate/60">
                  <th className="p-4 font-medium">Order</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Total</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b border-gold/5 hover:bg-mist/50">
                    <td className="p-4 text-obsidian">{order.id}</td>
                    <td className="p-4 text-slate">{order.customer}</td>
                    <td className="p-4 text-obsidian">{order.total}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-gold/10 shadow-sm">
          <div className="p-6 border-b border-gold/10 flex justify-between items-center">
            <h3 className="font-display text-xl text-obsidian">Recent Reviews</h3>
            {pendingReviews > 0 && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-body">
                {pendingReviews} pending
              </span>
            )}
          </div>
          <div className="divide-y divide-gold/5">
            {reviews.slice(0, 5).map((review) => (
              <div key={review.id} className="p-4 hover:bg-mist/50">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm font-medium text-obsidian">{review.product}</p>
                  <span className={`text-xs px-2 py-0.5 rounded ${statusColors[review.status]}`}>
                    {review.status}
                  </span>
                </div>
                <p className="text-xs text-slate mb-1">{review.customer} · {review.date}</p>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3 h-3 ${i < review.rating ? "fill-gold text-gold" : "fill-none text-slate/30"}`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
