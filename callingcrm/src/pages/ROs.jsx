import { useEffect, useState } from "react";
import api from "../services/api";

const ROs = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await api.get("/calls");
        setCalls(response.data.calls || []);
      } catch {
        setError("Failed to load calling records.");
      } finally {
        setLoading(false);
      }
    };

    fetchCalls();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          ROs
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          View outbound calling records and their status.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-800">
            Calling Records
          </h2>
        </div>

        {loading ? (
          <p className="p-6 text-gray-500">Loading records...</p>
        ) : error ? (
          <p className="p-6 text-red-500">{error}</p>
        ) : calls.length === 0 ? (
          <p className="p-6 text-gray-500">No calling records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-medium">Contact</th>
                  <th className="px-5 py-4 font-medium">Phone</th>
                  <th className="px-5 py-4 font-medium">Agent</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 font-medium">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {calls.map((call) => (
                  <tr key={call._id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-medium text-gray-800">
                      {call.contact?.name || call.contactName || "—"}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {call.contact?.phone || call.phone || "—"}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {call.agent?.name || call.agentName || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        {call.status || "Unknown"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {call.createdAt
                        ? new Date(call.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ROs;