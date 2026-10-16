import { useMemo, useState, useEffect } from "react";
import { Plus, Search, X, Users } from "lucide-react";
import api from '../services/api'



const emptyForm = {
  name: "",
  phone: "",
  email: "",
  status: "New",
  source: "Website",
};

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [savingLead, setSavingLead] = useState(false);

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(query) ||
        lead.phone.includes(query) ||
        lead.email.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]);



  // fetch leads from the protected backend

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        setLoadError("");

        const response = await api.get('/leads');

        setLeads(response.data.leads.map((lead) => ({
          ...lead,
          id: lead._id,
        })))
      }
      catch (error) {
        console.error("Failed to fetch leads :", error);
        setLoadError(error.response?.data?.message || "Could not lead leads. Check your login token and backend connection.")
      }
      finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);




  const handleAddLead = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      setError("Name and phone number are required.");
      return;
    }

    try {
      setSavingLead(true);
      setError("");

      const response = await api.post("/leads", {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        source: form.source,
      });
      const savedLead = response.data.lead;

      setLeads((current) => [
        { ...savedLead, id: savedLead._id, email: savedLead.email || "" },
        ...current,
      ]);
      setForm(emptyForm);
      setShowForm(false);
    } catch (error) {
      console.error("Failed to save lead:", error);
      setError(error.response?.data?.message || "Failed to save lead.");
    } finally {
      setSavingLead(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setLoadError("");
      const response = await api.patch(`/leads/${id}/status`, { status });
      const updatedLead = response.data.lead;

      setLeads((current) =>
        current.map((lead) => lead.id === id ? {...lead,...updatedLead,id:updatedLead._id || id, email:updatedLead.email || "",}:lead)
      );
    } catch (error) {
      console.error("Failed to update lead status:", error);
      alert(error.response?.data?.message || "Unable to update lead status")
    }
  };

  return (
    <section className="min-w-0 p-3 sm:p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Leads</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage and track your potential customers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setError("");
            setShowForm(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
        >
          <Plus size={17} />
          Add Lead
        </button>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-2 rounded-lg border border-blue-100 bg-white px-3">
          <Search size={18} className="text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, phone or email..."
            className="w-full py-3 text-sm outline-none"
          />
        </label>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-lg border border-blue-100 bg-white px-3 py-3 text-sm text-blue-950 outline-none"
          aria-label="Filter leads by status"
        >
          <option value="All">All statuses</option>
          <option value="New">New</option>
          <option value="Interested">Interested</option>
          <option value="Follow-up">Follow-up</option>
          <option value="Converted">Converted</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
        <Users size={17} />
        {loading ? "Loading leads..." : (
          <>
            {filteredLeads.length} lead{filteredLeads.length === 1 ? "" : "s"}
          </>
        )}
      </div>
      {loadError && (
        <p role="alert" className="mb-3 text-sm text-red-600">{loadError}</p>
      )}

      <div className="overflow-x-auto rounded-xl border border-blue-100 bg-white shadow-sm">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="bg-blue-50 text-xs uppercase text-blue-950">
            <tr>
              <th className="px-4 py-3">Lead</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Update status</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="border-t border-slate-100">
                <td className="px-4 py-3">
                  <p className="font-semibold text-blue-950">{lead.name}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {lead.email || "No email provided"}
                  </p>
                </td>
                <td className="px-4 py-3 text-slate-600">{lead.phone}</td>
                <td className="px-4 py-3 text-slate-600">{lead.source}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={lead.status}
                    onChange={(event) =>
                      updateStatus(lead.id, event.target.value)
                    }
                    className="rounded-md border border-blue-100 bg-white p-2 text-xs"
                    aria-label={`Update status for ${lead.name}`}
                  >
                    <option>New</option>
                    <option>Interested</option>
                    <option>Follow-up</option>
                    <option>Converted</option>
                    <option>Lost</option>
                  </select>
                </td>
              </tr>
            ))}

            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                  No leads found. Try another search or add a lead.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={handleAddLead}
            className="w-full max-w-md space-y-4 rounded-xl bg-white p-5 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-blue-950">Add Lead</h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                aria-label="Close form"
                className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {[
              { key: "name", label: "Full name *", type: "text", required: true },
              { key: "phone", label: "Phone number *", type: "tel", required: true },
              { key: "email", label: "Email address", type: "email", required: false },
            ].map((field) => (
              <label key={field.key} className="block text-sm font-medium text-slate-700">
                {field.label}
                <input
                  type={field.type}
                  required={field.required}
                  value={form[field.key]}
                  onChange={(event) =>
                    setForm({ ...form, [field.key]: event.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
                />
              </label>
            ))}

            <label className="block text-sm font-medium text-slate-700">
              Source
              <select
                value={form.source}
                onChange={(event) =>
                  setForm({ ...form, source: event.target.value })
                }
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5"
              >
                <option>Website</option>
                <option>Campaign</option>
                <option>Referral</option>
                <option>Manual</option>
              </select>
            </label>

            {error && (
              <p role="alert" className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={savingLead}
              className="w-full rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800"
            >
              {savingLead ? "Saving..." : "Save Lead"}
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default Leads