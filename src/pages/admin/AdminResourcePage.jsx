import { useEffect, useMemo, useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import { supabase } from "../../supabaseClient";

const inputClass =
  "w-full border border-gold/20 px-3 py-2 text-sm font-body outline-none focus:border-gold bg-white";

function normalizeValue(field, value) {
  if (field.type === "number") {
    return value === "" ? null : Number(value);
  }

  if (field.type === "json") {
    if (!value.trim()) return [];
    try {
      return JSON.parse(value);
    } catch {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  return value === "" && field.nullable ? null : value;
}

function fieldValueForForm(field, record) {
  const value = record?.[field.key] ?? field.defaultValue ?? "";
  return field.type === "json" ? JSON.stringify(value || [], null, 2) : value;
}

export default function AdminResourcePage({ config }) {
  const { tables, fetchTable, createRecord, updateRecord, deleteRecord } = useAdmin();
  const records = tables[config.table] || [];
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const emptyForm = useMemo(
    () =>
      config.fields.reduce((acc, field) => {
        acc[field.key] = field.type === "json"
          ? JSON.stringify(field.defaultValue || [], null, 2)
          : field.defaultValue ?? "";
        return acc;
      }, {}),
    [config.fields]
  );

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(emptyForm);
  }, [emptyForm]);

  useEffect(() => {
    fetchTable(config.table);
  }, [config.table, fetchTable]);

  const openCreate = () => {
    setError("");
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (record) => {
    setError("");
    setEditing(record.id);
    setForm(
      config.fields.reduce((acc, field) => {
        acc[field.key] = fieldValueForForm(field, record);
        return acc;
      }, {})
    );
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    const payload = config.fields.reduce((acc, field) => {
      if (field.readOnlyOnEdit && editing) return acc;
      acc[field.key] = normalizeValue(field, form[field.key]);
      return acc;
    }, {});

    const result = editing
      ? await updateRecord(config.table, editing, payload)
      : await createRecord(config.table, payload);

    setSaving(false);

    if (!result.success) {
      setError(result.error?.message || `Unable to save ${config.singular.toLowerCase()}.`);
      return;
    }

    closeForm();
  };

  const handleDelete = async (record) => {
    const label = record[config.titleKey] || record.id;
    if (!window.confirm(`Delete ${label}? This cannot be undone.`)) return;

    const result = await deleteRecord(config.table, record.id);
    if (!result.success) {
      setError(result.error?.message || `Unable to delete ${config.singular.toLowerCase()}.`);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="font-display text-3xl font-light text-obsidian mb-2">{config.title}</h2>
          <p className="text-slate font-body text-sm">
            {records.length} {config.countLabel}
          </p>
        </div>
        <button
          onClick={openCreate}
          className="bg-obsidian text-ivory text-xs tracking-widest uppercase px-6 py-3 hover:bg-gold hover:text-obsidian transition-colors font-body"
        >
          Add {config.singular}
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
            className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-xl"
          >
            <h3 className="font-display text-xl text-obsidian mb-6">
              {editing ? `Edit ${config.singular}` : `New ${config.singular}`}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {config.fields.map((field) => (
                <div key={field.key} className={field.type === "textarea" || field.type === "json" ? "sm:col-span-2" : ""}>
                  <label className="block text-[10px] tracking-widest uppercase text-slate/60 font-body mb-1">
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <select
                      value={form[field.key]}
                      onChange={(event) => setForm({ ...form, [field.key]: event.target.value })}
                      required={field.required}
                      className={inputClass}
                    >
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "textarea" || field.type === "json" ? (
                    <textarea
                      value={form[field.key]}
                      onChange={(event) => setForm({ ...form, [field.key]: event.target.value })}
                      required={field.required}
                      rows={field.type === "json" ? 5 : 3}
                      className={inputClass}
                    />
                  ) : field.type === "image" ? (
                    <div>
                      {form[field.key] && (
                        <img src={form[field.key]} alt="Preview" className="h-16 object-cover mb-2 border border-gold/20" />
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
                            setForm({ ...form, [field.key]: publicUrlData.publicUrl });
                          } catch (err) {
                            setError(err.message || "Upload failed");
                          } finally {
                            setSaving(false);
                          }
                        }}
                        className={inputClass}
                      />
                    </div>
                  ) : (
                    <input
                      type={field.type || "text"}
                      value={form[field.key]}
                      onChange={(event) => setForm({ ...form, [field.key]: event.target.value })}
                      required={field.required}
                      disabled={field.readOnlyOnEdit && editing}
                      className={`${inputClass} disabled:bg-mist disabled:text-slate/60`}
                    />
                  )}
                </div>
              ))}
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
              {config.columns.map((column) => (
                <th key={column.key} className="p-4 font-medium">{column.label}</th>
              ))}
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="border-b border-gold/5 hover:bg-mist/50">
                {config.columns.map((column) => (
                  <td key={column.key} className="p-4 text-slate max-w-xs truncate">
                    {column.render ? column.render(record) : String(record[column.key] ?? "")}
                  </td>
                ))}
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(record)}
                      className="text-xs text-gold hover:text-gold-dark font-body"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(record)}
                      className="text-xs text-red-600 hover:text-red-800 font-body"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {records.length === 0 && (
              <tr>
                <td colSpan={config.columns.length + 1} className="p-8 text-center text-slate font-body">
                  No {config.countLabel} found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
