import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import api from "../services/api";
import AddFollowUpButton from "../components/followups/AddFollowUpButton";

const FollowUps = () => {
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowUps = async () => {
      try {
        const response = await api.get("/follow-ups");
        setFollowUps(response.data.followUps || []);
      } catch (error) {
        console.error("Failed to load follow-ups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowUps();
  }, []);


  const handleStatusChange = async(id,status) =>{
    try{
        const response = await api.patch(`/follow-ups/${id}`,{status});

        setFollowUps((current) =>
          current.map((item) =>
            item._id === id ? response.data.followUp : item
          )
        );
    }
    catch(error){
        alert(error.response?.data?.message || "Failed to update status")
    }

  }

  const handleCreated = (item) => {
    setFollowUps((current) => [item, ...current]);
  };

  return (
    <section className="m-3 min-w-0 overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">
      <div className="flex h-[46px] items-center justify-between border-b border-slate-100 px-3">
        <div className="flex items-center gap-2">
          <CalendarDays size={19} className="text-blue-700" />
          <h2 className="text-[15px] font-bold text-[#102F69]">
            Follow-ups
          </h2>
        </div>

        <AddFollowUpButton onCreated={handleCreated} />
      </div>

      <div className="px-4">
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
              className={`grid min-h-[68px] grid-cols-[34px_minmax(0,1fr)_74px_auto] items-center gap-3 py-2 ${
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
                <span className="block">{new Date(item.scheduledAt).toLocaleDateString()}</span>
                {new Date(item.scheduledAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              <div className="flex justify-end pl-1">
                <select
                  value={item.status}
                  onChange={(event) =>
                    handleStatusChange(item._id, event.target.value)
                  }
                  aria-label={`Status for ${item.contact?.name || "follow-up"}`}
                  className="min-w-[108px] cursor-pointer rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-2 text-xs font-semibold text-blue-900 shadow-sm outline-none transition hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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

export default FollowUps;
