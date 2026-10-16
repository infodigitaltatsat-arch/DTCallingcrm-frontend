import { useCallback, useEffect, useState } from "react";
import { Phone, RefreshCw, Plus, X } from "lucide-react";
import api from "../services/api";

const emptyForm = {
  contact: "",
  phone: "",
  status: "Completed",
  duration: "0",
  notes: "",
};

const Calls = () => {
  const [calls, setCalls] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [callsResponse, contactsResponse] = await Promise.all([
        api.get("/calls"),
        api.get("/contacts"),
      ]);

      setCalls(callsResponse.data.calls || []);
      setContacts(contactsResponse.data.contacts || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load calls or contacts."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    Promise.all([api.get("/calls"), api.get("/contacts")])
      .then(([callsResponse, contactsResponse]) => {
        if (!active) return;
        setCalls(callsResponse.data.calls || []);
        setContacts(contactsResponse.data.contacts || []);
      })
      .catch((err) => {
        if (active) {
          setError(
            err.response?.data?.message || "Failed to load calls or contacts."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleContactChange = (contactId) => {
    const selectedContact = contacts.find(
      (contact) => contact._id === contactId
    );

    setForm((current) => ({
      ...current,
      contact: contactId,
      phone: selectedContact?.phone || "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await api.post("/calls", {
        ...form,
        duration: Number(form.duration),
      });

      setCalls((current) => [
        response.data.call,
        ...current,
      ]);
      setForm(emptyForm);
      setShowForm(false);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to save call record."
      );
    } finally {
      setSaving(false);
    }
  };

  const formatDuration = (seconds = 0) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <section className="min-w-0 p-4 sm:p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Calls</h1>
          <p className="mt-1 text-sm text-slate-500">
            Record and review call activity.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>

          <button
            type="button"
            onClick={() => {
              setError("");
              setShowForm(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            <Plus size={17} />
            Log Call
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-blue-100 bg-white">
        {loading ? (
          <p className="p-8 text-center text-sm text-slate-500">
            Loading calls...
          </p>
        ) : calls.length === 0 ? (
          <div className="p-10 text-center">
            <Phone className="mx-auto mb-3 text-slate-400" size={30} />
            <p className="font-medium text-slate-700">No call records yet</p>
            <p className="mt-1 text-sm text-slate-500">
              Select Log Call to record your first call.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-sm">
              <thead className="bg-blue-50 text-xs uppercase text-blue-950">
                <tr>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Agent</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {calls.map((call) => (
                  <tr key={call._id}>
                    <td className="px-4 py-3 font-medium text-blue-950">
                      {call.contact?.name || "Unknown contact"}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {call.phone || "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {call.agent?.name || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs text-blue-700">
                        {call.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatDuration(call.duration)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                      {call.calledAt
                        ? new Date(call.calledAt).toLocaleString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg space-y-4 rounded-xl bg-white p-5 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-blue-950">
                Log a Call
              </h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                aria-label="Close form"
                className="rounded p-1 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {contacts.length === 0 ? (
              <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                No contacts found. A contact must exist before you can log a call.
              </p>
            ) : (
              <>
                <label className="block text-sm font-medium text-slate-700">
                  Contact *
                  <select
                    required
                    value={form.contact}
                    onChange={(event) =>
                      handleContactChange(event.target.value)
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5"
                  >
                    <option value="">Select a contact</option>
                    {contacts.map((contact) => (
                      <option key={contact._id} value={contact._id}>
                        {contact.name} — {contact.phone}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Phone
                  <input
                    value={form.phone}
                    readOnly
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Outcome *
                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm({ ...form, status: event.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Missed">Missed</option>
                    <option value="Busy">Busy</option>
                    <option value="Failed">Failed</option>
                  </select>
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Duration in seconds
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={form.duration}
                    onChange={(event) =>
                      setForm({ ...form, duration: event.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Notes
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(event) =>
                      setForm({ ...form, notes: event.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5"
                    placeholder="Optional call notes"
                  />
                </label>

                <button
                  type="submit"
                  disabled={saving || !form.contact}
                  className="w-full rounded-lg bg-blue-700 px-4 py-2.5 font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Call Record"}
                </button>
              </>
            )}
          </form>
        </div>
      )}
    </section>
  );
};

export default Calls;