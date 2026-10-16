import { useEffect, useState } from "react";
import api from "../services/api";

const Reports = () => {
  const [calls, setCalls] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError("");

        const [callsResponse, leadsResponse] = await Promise.all([
            api.get("/calls"),
            api.get("/leads"),
          ]);

        setCalls(callsResponse.data.calls ?? []);
        setLeads(leadsResponse.data.leads ?? []);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load reports."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const completedCalls = calls.filter(
    (call) => call.status === "Completed"
  ).length;

  const missedCalls = calls.filter(
    (call) => call.status === "Missed"
  ).length;

  const convertedLeads = leads.filter(
    (lead) => lead.status === "Converted"
  ).length;

  const reportCards = [
    { title: "Total Calls", value: calls.length },
    { title: "Completed Calls", value: completedCalls },
    { title: "Missed Calls", value: missedCalls },
    { title: "Total Leads", value: leads.length },
    { title: "Converted Leads", value: convertedLeads },
  ];

  if (loading) {
    return <div className="p-6">Loading reports...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of calling activity and lead performance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {reportCards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500">{card.title}</p>
            <p className="mt-2 text-2xl font-bold text-gray-800">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Call Status Breakdown
        </h2>

        {calls.length === 0 ? (
          <p className="text-sm text-gray-500">
            No call records available yet.
          </p>
        ) : (
          <div className="space-y-3">
            {["Completed", "Missed", "Busy", "Failed"].map((status) => {
              const count = calls.filter(
                (call) => call.status === status
              ).length;

              const percentage = (count / calls.length) * 100;

              return (
                <div key={status}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-gray-600">{status}</span>
                    <span className="font-medium text-gray-800">
                      {count}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;