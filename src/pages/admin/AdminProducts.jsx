import { useState } from "react";
import { useProducts } from "../../context/ProductContext";
import { CATEGORIES, badgeColor } from "../../data/products";
import { supabase } from "../../supabaseClient";

const emptyProduct = {
  name: "",
  category: "Rings",
  tag: "Rings",
  price: "",
  original: "",
  rating: 5,
  reviews: 0,
  image: "",
  badge: "New",
  description: "",
  features: "",
};

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyProduct);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const openCreate = () => {
    setEditing(null);
    setForm(emptyProduct);
    setError("");
    setShowForm(true);
  };

  const openEdit = (product) => {
    setEditing(product.id);
    setForm({
      ...product,
      original: product.original || "",
      features: Array.isArray(product.features)
        ? product.features.join(", ")
        : product.features || "",
    });
    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setForm(emptyProduct);
    setEditing(null);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      tag: form.category,
      original: form.original || null,
      rating: Number(form.rating),
      reviews: Number(form.reviews),
      features: String(form.features || "")
        .split(",")
        .map((feature) => feature.trim())
        .filter(Boolean),
    };

    const result = editing
      ? await updateProduct(editing, payload)
      : await addProduct(payload);

    setSaving(false);

    if (!result?.success) {
      setError(result?.error?.message || "Unable to save product.");
      return;
    }

    closeForm();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      const result = await deleteProduct(id);
      if (!result?.success) {
        setError(result?.error?.message || "Unable to delete product.");
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="font-display text-3xl font-light text-obsidian mb-2">Products</h2>
          <p className="text-slate font-body text-sm">{products.length} products in catalogue</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-obsidian text-ivory text-xs tracking-widest uppercase px-6 py-3 hover:bg-gold hover:text-obsidian transition-colors font-body"
        >
          Add Product
        </button>
      </div>

      {error && (
        <div className="mb-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-body">
          {error}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 shadow-xl"
          >
            <h3 className="font-display text-xl text-obsidian mb-6">
              {editing ? "Edit Product" : "New Product"}
            </h3>
            <div className="space-y-4">
              {[
                { key: "name", label: "Name", required: true },
                { key: "price", label: "Price (e.g. Rs 1,24,999)", required: true },
                { key: "original", label: "Original Price (optional)" },
                { key: "description", label: "Description", required: true },
                { key: "features", label: "Features (comma separated)" },
              ].map(({ key, label, required }) => (
                <div key={key}>
                  <label className="block text-[10px] tracking-widest uppercase text-slate/60 font-body mb-1">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={form[key] || ""}
                    onChange={(event) => setForm({ ...form, [key]: event.target.value })}
                    required={required}
                    className="w-full border border-gold/20 px-3 py-2 text-sm font-body outline-none focus:border-gold"
                  />
                </div>
              ))}
              <div>
                <label className="block text-[10px] tracking-widest uppercase text-slate/60 font-body mb-1">
                  Image
                </label>
                {form.image && (
                  <img src={form.image} alt="Preview" className="h-16 object-cover mb-2 border border-gold/20" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    setSaving(true);
                    try {
                      const fileName = `${Date.now()}_${file.name}`;
                      const { error: uploadError } = await supabase.storage.from("images").upload(fileName, file);
                      if (uploadError) throw uploadError;
                      const { data: publicUrlData } = supabase.storage.from("images").getPublicUrl(fileName);
                      setForm({ ...form, image: publicUrlData.publicUrl });
                    } catch (err) {
                      setError(err.message || "Upload failed");
                    } finally {
                      setSaving(false);
                    }
                  }}
                  className="w-full border border-gold/20 px-3 py-2 text-sm font-body outline-none focus:border-gold bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-slate/60 font-body mb-1">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(event) =>
                      setForm({ ...form, category: event.target.value, tag: event.target.value })
                    }
                    className="w-full border border-gold/20 px-3 py-2 text-sm font-body outline-none focus:border-gold"
                  >
                    {CATEGORIES.filter((category) => category !== "All").map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-slate/60 font-body mb-1">
                    Badge
                  </label>
                  <select
                    value={form.badge}
                    onChange={(event) => setForm({ ...form, badge: event.target.value })}
                    className="w-full border border-gold/20 px-3 py-2 text-sm font-body outline-none focus:border-gold"
                  >
                    {["Bestseller", "New", "Sale", "Exclusive"].map((badge) => (
                      <option key={badge} value={badge}>
                        {badge}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-obsidian text-ivory text-xs tracking-widest uppercase py-3 hover:bg-gold hover:text-obsidian transition-colors font-body disabled:opacity-60"
              >
                {saving ? "Saving..." : editing ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="flex-1 border border-obsidian/20 text-obsidian text-xs tracking-widest uppercase py-3 hover:bg-mist transition-colors font-body"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-gold/10 shadow-sm overflow-x-auto">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="border-b border-gold/10 text-left text-slate/60">
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Badge</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gold/5 hover:bg-mist/50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover"
                    />
                    <span className="text-obsidian">{product.name}</span>
                  </div>
                </td>
                <td className="p-4 text-slate">{product.category}</td>
                <td className="p-4 text-obsidian">{product.price}</td>
                <td className="p-4">
                  <span
                    className={`text-[9px] tracking-widest uppercase px-2 py-1 ${badgeColor[product.badge] || "bg-obsidian text-ivory"}`}
                  >
                    {product.badge}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(product)}
                      className="text-xs text-gold hover:text-gold-dark font-body"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-xs text-red-600 hover:text-red-800 font-body"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-slate font-body">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
