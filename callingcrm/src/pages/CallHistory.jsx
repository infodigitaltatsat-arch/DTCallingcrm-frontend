import { useEffect, useState } from "react";
import { PhoneCall, Search, RefreshCw } from "lucide-react";
import api from "../services/api";

const CallHistory = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchCalls = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/calls");
      setCalls(response.data.calls || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load call history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    api.get("/calls")
      .then((response) => {
        if (active) setCalls(response.data.calls || []);
      })
      .catch((err) => {
        if (active) {
          setError(err.response?.data?.message || "Failed to load call history.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredCalls = calls.filter((call) => {
    const query = search.toLowerCase();

    return [
      call.contact?.name,
      call.phone,
      call.agent?.name,
      call.status,
    ].some((value) => String(value || "").toLowerCase().includes(query));
  });

  const formatDuration = (seconds = 0) =>
    `${Math.floor(seconds / 60)}m ${seconds % 60}s`;

  return (
    <section className="min-w-0 p-4 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Call History</h1>
          <p className="mt-1 text-sm text-slate-500">
            Review recorded calls and their outcomes.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchCalls}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <div className="mb-4 flex items-center gap-3 rounded-xl border border-blue-100 bg-white px-3">
        <Search size={18} className="shrink-0 text-slate-400" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search contact, phone, agent or status..."
          className="w-full min-w-0 py-3 text-sm outline-none"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">
        {loading ? (
          <p className="p-8 text-center text-sm text-slate-500">
            Loading call history...
          </p>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-sm text-red-600">{error}</p>
            <button
              type="button"
              onClick={fetchCalls}
              className="mt-3 text-sm font-semibold text-blue-600"
            >
              Try again
            </button>
          </div>
        ) : filteredCalls.length === 0 ? (
          <div className="p-8 text-center">
            <PhoneCall className="mx-auto mb-2 text-slate-400" size={28} />
            <p className="text-sm text-slate-600">No matching call records.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-blue-50 text-xs uppercase text-blue-900">
                <tr>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Agent</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredCalls.map((call) => (
                  <tr key={call._id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-blue-950">
                      {call.contact?.name || "Unknown contact"}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {call.phone || "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {call.agent?.name || "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatDuration(call.duration)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                        {call.status}
                      </span>
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

      <p className="mt-3 text-xs text-slate-500">
        Showing {filteredCalls.length} of {calls.length} recorded calls.
      </p>
    </section>
  );
};

export default CallHistory;