
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { recentCalls } from "../../data/followups/RecentCalls";

const RecentCalls = () => {
  const statusStyles = {
    Connected: "bg-emerald-50 text-emerald-700",
    Missed: "bg-red-50 text-red-600",
    "No Answer": "bg-blue-50 text-blue-700",
  };

  const statusDots = {
    Connected: "bg-emerald-600",
    Missed: "bg-red-500",
    "No Answer": "bg-blue-400",
  };

  return (
    <section className="min-w-0 overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">
      {/* Header */}
      <div className="flex h-[52px] items-center justify-between border-b border-slate-100 px-4">
        <div className="flex items-center gap-2.5">
          <Phone size={20} className="text-blue-700" />
          <h2 className="text-[15px] font-bold text-[#102F69]">
            Recent Calls
          </h2>
        </div>

        <Link
          to="/call-history"
          className="text-xs font-medium text-blue-600 hover:text-blue-800"
        >
          View All
        </Link>
      </div>

      {/* 🟢 NEW: Compact calls table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-left">
          <thead>
            <tr className="h-[34px] bg-blue-50/80 text-[10px] font-semibold text-[#18396F] sm:text-[11px]">
              <th className="w-[35%] px-2 sm:px-3">Lead</th>
              <th className="w-[15%] px-1">Agent</th>
              <th className="w-[15%] px-1">Duration</th>
              <th className="w-[23%] px-1">Status</th>
              <th className="w-[12%] px-1">Action</th>
            </tr>
          </thead>

          <tbody>
            {recentCalls.map((call) => (
              <tr
                key={call.id}
                className="h-[42px] border-t border-slate-100 text-[10px] text-[#18396F] sm:text-[11px]"
              >
                {/* Lead */}
                <td className="px-2 sm:px-3">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white ${call.avatarColor}`}
                    >
                      {call.initials}
                    </span>
                    <span className="truncate font-medium">
                      {call.name}
                    </span>
                  </div>
                </td>

                {/* Agent */}
                <td className="truncate px-1">{call.agent}</td>

                {/* Duration */}
                <td className="whitespace-nowrap px-1">{call.duration}</td>

                {/* Status */}
                <td className="px-1">
                  <span
                    className={`inline-flex max-w-full items-center gap-1 rounded-full px-1.5 py-1 text-[9px] font-medium sm:gap-1.5 sm:px-2 sm:text-[10px] ${statusStyles[call.status]}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${statusDots[call.status]}`}
                    />
                    <span className="truncate">{call.status}</span>
                  </span>
                </td>

                {/* Action */}
                <td className="px-1">
                  {call.status === "Connected" ? (
                    <Link
                      to="/call-history"
                      className="font-medium text-blue-700 underline underline-offset-2"
                    >
                      View
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        window.dispatchEvent(
                          new CustomEvent("crm:quick-call", {
                            detail: { call },
                          })
                        )
                      }
                      className="font-medium text-blue-700 underline underline-offset-2"
                    >
                      Call
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentCalls;