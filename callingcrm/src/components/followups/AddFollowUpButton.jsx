import { useState } from "react";
import { Plus, X } from "lucide-react";
import api from "../../services/api";

const localDateTime = () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
};

const AddFollowUpButton = ({ onCreated }) => {
  const [open, setOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ contact: "", scheduledAt: localDateTime(), notes: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const showForm = async () => {
    setOpen(true);
    setError("");
    try {
      const { data } = await api.get("/contacts");
      setContacts(data.contacts || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load contacts");
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const { data } = await api.post("/follow-ups", {
        ...form,
        scheduledAt: new Date(form.scheduledAt).toISOString(),
      });
      onCreated(data.followUp);
      setOpen(false);
      setForm({ contact: "", scheduledAt: localDateTime(), notes: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add follow-up");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <button onClick={showForm} className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-700">
        <Plus size={14} /> Add
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form onSubmit={submit} className="w-full max-w-md space-y-4 rounded-xl bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-blue-950">Add Follow-up</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="text-slate-500"><X size={20} /></button>
            </div>
            <label className="block text-sm font-medium text-slate-700">
              Contact *
              <select required value={form.contact} onChange={(event) => setForm({ ...form, contact: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-200 p-2.5">
                <option value="">Select a contact</option>
                {contacts.map((contact) => <option key={contact._id} value={contact._id}>{contact.name} - {contact.phone}</option>)}
              </select>
            </label>
            {!contacts.length && <p className="text-sm text-slate-500">No contacts found.</p>}
            <label className="block text-sm font-medium text-slate-700">
              Date and time *
              <input required type="datetime-local" value={form.scheduledAt} onChange={(event) => setForm({ ...form, scheduledAt: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-200 p-2.5" />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Notes
              <textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-200 p-2.5" rows="2" />
            </label>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button disabled={saving || !contacts.length} className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50">
              {saving ? "Saving..." : "Save Follow-up"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddFollowUpButton;
