import { useCallback, useEffect, useState } from "react";
import {
  Activity,
  Clock3,
  Phone,
  PhoneCall,
  PhoneOff,
  RefreshCw,
  UserRound,
} from "lucide-react";
import api from "../../../services/api";

const ActiveCall = () => {
  const [latestCall, setLatestCall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // CHANGED: Load real saved call records instead of hardcoded caller details.
  const fetchLatestCall = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    setError("");

    try {
      const response = await api.get("/calls");
      const calls = response.data.calls || [];
      setLatestCall(calls[0] || null);
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not load call records."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    api.get("/calls")
      .then((response) => {
        if (active) setLatestCall(response.data.calls?.[0] || null);
      })
      .catch((err) => {
        if (active) {
          setError(err.response?.data?.message || "Could not load call records.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const formatDate = (value) => {
    if (!value) return "Date unavailable";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "Date unavailable";

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (seconds = 0) => {
    const total = Math.max(0, Number(seconds) || 0);
    return `${Math.floor(total / 60)}m ${total % 60}s`;
  };

  const statusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-emerald-50 text-emerald-700";
      case "missed":
        return "bg-rose-50 text-rose-700";
      case "busy":
        return "bg-amber-50 text-amber-700";
      case "failed":
        return "bg-slate-100 text-slate-700";
      default:
        return "bg-blue-50 text-blue-700";
    }
  };

  return (
    <section className="overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm lg:flex lg:flex-col">
      <div className="flex h-[42px] items-center justify-between bg-[#0647B8] px-3 text-white">
        <div className="flex items-center gap-2">
          <Phone size={17} strokeWidth={2.5} />
          <h2 className="text-sm font-bold">Active Call</h2>
        </div>

        <button
          type="button"
          onClick={() => fetchLatestCall(true)}
          disabled={loading || refreshing}
          aria-label="Refresh latest call record"
          title="Refresh call records"
          className="rounded p-1 transition hover:bg-white/15 disabled:opacity-60"
        >
          <RefreshCw
            size={15}
            className={refreshing ? "animate-spin" : ""}
          />
        </button>
      </div>

      <div className="space-y-4 p-3">
        {/* CHANGED: Never show a fake connected call or timer. */}
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600">
            <PhoneOff size={19} />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-800">
              No active live call
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              Live audio controls are unavailable in trial mode.
            </p>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-blue-900">
            <Activity size={14} />
            Latest recorded call
          </div>

          {loading ? (
            <div className="h-20 animate-pulse rounded-lg bg-slate-100" />
          ) : error ? (
            <div className="rounded-lg border border-rose-100 bg-rose-50 p-3 text-xs text-rose-700">
              {error}
              <button
                type="button"
                onClick={() => fetchLatestCall()}
                className="ml-1 font-bold underline"
              >
                Retry
              </button>
            </div>
          ) : !latestCall ? (
            <div className="rounded-lg border border-dashed border-slate-200 p-4 text-center">
              <PhoneCall
                size={21}
                className="mx-auto mb-2 text-slate-400"
              />
              <p className="text-sm font-semibold text-slate-700">
                No call records yet
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Saved call records will appear here.
              </p>
            </div>
          ) : (
            <div className="rounded-lg border border-blue-100 p-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                  <UserRound size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-blue-950">
                    {latestCall.contact?.name || "Unknown contact"}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-slate-600">
                    {latestCall.phone || "No phone number saved"}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-semibold ${statusClass(
                    latestCall.status
                  )}`}
                >
                  {latestCall.status || "Unknown"}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 size={13} />
                  {formatDuration(latestCall.duration)}
                </span>
                <span>{formatDate(latestCall.calledAt)}</span>
              </div>
            </div>
          )}
        </div>

        {/* CHANGED: These controls stay disabled until live calling is integrated. */}
        <div className="grid grid-cols-4 gap-2 border-t border-slate-100 pt-3">
          {[
            { label: "Mute", icon: Phone },
            { label: "Keypad", icon: Activity },
            { label: "Hold", icon: Clock3 },
            { label: "End", icon: PhoneOff },
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              disabled
              title={`${label} requires an active live call`}
              className="flex cursor-not-allowed flex-col items-center gap-1 opacity-40"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full ${
                  label === "End"
                    ? "bg-rose-100 text-rose-700"
                    : "bg-blue-50 text-blue-800"
                }`}
              >
                <Icon size={17} />
              </span>
              <span className="text-[11px] font-medium text-slate-700">
                {label}
              </span>
            </button>
          ))}
        </div>

        <p className="text-[11px] leading-4 text-slate-500">
          A saved call record or successful trial request does not mean a
          live call is connected. These controls require a live voice
          connection.
        </p>
      </div>
    </section>
  );
};

export default ActiveCall;