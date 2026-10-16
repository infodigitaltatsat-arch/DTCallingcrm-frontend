import { useEffect, useMemo, useState } from "react";
import {
  Users,
  UserCheck,
  UserX,
  Search,
  RefreshCw,
  Mail,
  CalendarDays,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import api from "../services/api";

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // CHANGED: Reusable API fetch with refresh support.
  const fetchAgents = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const response = await api.get("/agents");
      setAgents(response.data.agents || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load agents."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    let active = true;

    api.get("/agents")
      .then((response) => {
        if (active) setAgents(response.data.agents || []);
      })
      .catch((err) => {
        if (active) {
          setError(err.response?.data?.message || "Failed to load agents.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // NEW: Summary values are derived from the actual API data.
  const activeCount = agents.filter((agent) => agent.isActive).length;
  const inactiveCount = agents.length - activeCount;

  // NEW: Search and status filtering.
  const filteredAgents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return agents.filter((agent) => {
      const matchesSearch = [
        agent.name,
        agent.email,
        agent.role,
      ].some((value) =>
        String(value || "").toLowerCase().includes(query)
      );

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && agent.isActive) ||
        (statusFilter === "inactive" && !agent.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [agents, search, statusFilter]);

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = (name = "") =>
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "A";

  return (
    <section className="min-w-0 space-y-6 p-4 sm:p-6">
      {/* Page heading */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-blue-600">
            <Users size={17} />
            <span>Team Management</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-blue-950 sm:text-3xl">
            Agents
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View and monitor the agents registered in your team.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchAgents(true)}
          disabled={loading || refreshing}
          className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-white px-4 py-2.5 text-sm font-semibold text-blue-800 shadow-sm transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={16}
            className={refreshing ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Agents
              </p>
              <p className="mt-2 text-3xl font-bold text-blue-950">
                {loading ? "—" : agents.length}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Users size={23} />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Registered agent accounts
          </p>
        </div>

        <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Active Agents
              </p>
              <p className="mt-2 text-3xl font-bold text-emerald-700">
                {loading ? "—" : activeCount}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <UserCheck size={23} />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Accounts marked as active
          </p>
        </div>

        <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm sm:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Inactive Agents
              </p>
              <p className="mt-2 text-3xl font-bold text-rose-600">
                {loading ? "—" : inactiveCount}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <UserX size={23} />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Accounts marked as inactive
          </p>
        </div>
      </div>

      {/* Agents table */}
      <div className="overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-50 p-4 sm:p-5">
          <div>
            <h2 className="font-bold text-blue-950">All Agents</h2>
            <p className="mt-1 text-xs text-slate-500">
              Agent account details and status
            </p>
          </div>

          <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
            {loading ? "Loading..." : `${filteredAgents.length} shown`}
          </span>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 px-3">
            <Search size={17} className="shrink-0 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, email, or role..."
              className="min-w-0 flex-1 bg-transparent py-2.5 text-sm outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500"
          >
            <option value="all">All statuses</option>
            <option value="active">Active only</option>
            <option value="inactive">Inactive only</option>
          </select>
        </div>

        {loading ? (
          <div className="space-y-4 p-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-14 animate-pulse rounded-lg bg-slate-100"
              />
            ))}
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <AlertCircle
              size={30}
              className="mx-auto mb-3 text-rose-500"
            />
            <p className="font-semibold text-slate-800">
              Unable to load agents
            </p>
            <p className="mt-1 text-sm text-slate-500">{error}</p>
            <button
              type="button"
              onClick={() => fetchAgents()}
              className="mt-4 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Try again
            </button>
          </div>
        ) : filteredAgents.length === 0 ? (
          <div className="p-10 text-center">
            <Users
              size={32}
              className="mx-auto mb-3 text-slate-300"
            />
            <p className="font-semibold text-slate-800">
              No agents found
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or status filter.
            </p>
            {(search || statusFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                }}
                className="mt-3 text-sm font-semibold text-blue-700 hover:text-blue-900"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-blue-50/70 text-xs uppercase tracking-wide text-blue-900">
                <tr>
                  <th className="px-5 py-4 font-semibold">Agent</th>
                  <th className="px-5 py-4 font-semibold">Email</th>
                  <th className="px-5 py-4 font-semibold">Role</th>
                  <th className="px-5 py-4 font-semibold">Joined</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredAgents.map((agent) => (
                  <tr
                    key={agent._id}
                    className="transition hover:bg-blue-50/40"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-800">
                          {getInitials(agent.name)}
                        </div>
                        <div>
                          <p className="font-semibold text-blue-950">
                            {agent.name || "Unnamed agent"}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-400">
                            Agent account
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail size={15} className="shrink-0 text-slate-400" />
                        <span>{agent.email || "—"}</span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1.5 text-xs font-semibold capitalize text-indigo-700">
                        <ShieldCheck size={14} />
                        {agent.role || "agent"}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={15} className="text-slate-400" />
                        {formatDate(agent.createdAt)}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 text-xs font-semibold ${
                          agent.isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            agent.isActive
                              ? "bg-emerald-500"
                              : "bg-rose-500"
                          }`}
                        />
                        {agent.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500">
        Agent information is loaded from the existing CRM backend.
      </p>
    </section>
  );
};

export default Agents;