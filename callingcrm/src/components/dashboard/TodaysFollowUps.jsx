import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import AddFollowUpButton from "../followups/AddFollowUpButton";

const TodayFollowUps = () => {
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowUps = async () => {
      try {
        const response = await api.get("/follow-ups");
        const today = new Date().toDateString();

        const items = (response.data.followUps || [])
          .filter(
            (item) =>
              item.scheduledAt &&
              new Date(item.scheduledAt).toDateString() === today
          )
          .slice(0, 4);

        setFollowUps(items);
      } catch (error) {
        console.error("Failed to load follow-ups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowUps();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const { data } = await api.patch(`/follow-ups/${id}`, { status });
      setFollowUps((current) =>
        current.map((item) => item._id === id ? data.followUp : item)
      );
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  const handleCreated = (item) => {
    if (new Date(item.scheduledAt).toDateString() === new Date().toDateString()) {
      setFollowUps((current) => [item, ...current].slice(0, 4));
    }
  };

  return (
    <section className="min-w-0 overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">
      <div className="flex h-[46px] items-center justify-between border-b border-slate-100 px-3">
        <div className="flex items-center gap-2">
          <CalendarDays size={19} className="text-blue-700" />
          <h2 className="text-[15px] font-bold text-[#102F69]">
            Today's Follow-ups
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <AddFollowUpButton onCreated={handleCreated} />
          <Link to="/follow-ups" className="text-xs font-medium text-blue-600 hover:text-blue-800">View All</Link>
        </div>
      </div>

      <div className="px-3">
        {loading ? (
          <p className="p-4 text-center text-sm text-slate-500">
            Loading follow-ups...
          </p>
        ) : followUps.length === 0 ? (
          <p className="p-4 text-center text-sm text-slate-500">
            No follow-ups scheduled for today.
          </p>
        ) : (
          followUps.map((item, index) => (
            <div
              key={item._id}
              className={`grid min-h-[68px] grid-cols-[34px_minmax(0,1fr)_74px_66px] items-center gap-1.5 ${
                index !== followUps.length - 1
                  ? "border-b border-slate-200"
                  : ""
              }`}
            >
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
                {(item.contact?.name || "UC")
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="truncate text-[12px] font-bold text-[#18396F]">
                  {item.contact?.name || "Unknown Contact"}
                </p>
                <p className="mt-0.5 truncate text-[10px] text-[#55749F]">
                  {item.contact?.phone || "No phone"}
                </p>
              </div>

              <p className="whitespace-nowrap text-right text-[11px] font-semibold text-[#244A7C]">
                {new Date(item.scheduledAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              <div className="flex justify-end">
                <select
                  value={item.status}
                  onChange={(event) => handleStatusChange(item._id, event.target.value)}
                  aria-label={`Status for ${item.contact?.name || "follow-up"}`}
                  className={`max-w-[76px] cursor-pointer rounded-full px-2 py-1.5 text-[10px] font-semibold outline-none ${
                    item.status === "Pending"
                      ? "bg-amber-50 text-amber-600"
                      : item.status === "Completed"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default TodayFollowUps;
