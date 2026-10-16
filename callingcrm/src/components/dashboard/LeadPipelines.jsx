import { useEffect, useState } from "react";
import { Funnel } from "lucide-react";
import api from "../../services/api";

const stages = [
  { id: 1, status: "New", label: "New Leads", color: "#1646B5" },
  { id: 2, status: "Interested", label: "Interested", color: "#3975D9" },
  { id: 3, status: "Follow-up", label: "Follow-up", color: "#598CE8" },
  { id: 4, status: "Converted", label: "Converted", color: "#83B0F0" },
  { id: 5, status: "Lost", label: "Lost", color: "#9BC3F5" },
];

const ARROW = 22;

const LeadPipeline = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await api.get("/leads");
        setLeads(response.data.leads || []);
      } catch (error) {
        console.error("Failed to load lead pipeline:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return (
    <section className="w-full min-w-0 rounded-xl border border-blue-100 bg-white px-3 py-2.5 shadow-sm sm:px-4 sm:py-3">
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Funnel
            size={20}
            strokeWidth={2.5}
            className="fill-blue-800 text-blue-800"
          />
          <h2 className="text-[15px] font-bold text-blue-950 sm:text-base">
            Lead Pipeline
          </h2>
        </div>
      </div>

      {loading ? (
        <p className="p-4 text-center text-sm text-slate-500">
          Loading lead pipeline...
        </p>
      ) : (
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-0">
          {stages.map((stage, index) => {
            const isFirst = index === 0;
            const isLast = index === stages.length - 1;
            const value = leads.filter(
              (lead) => (lead.status || "New") === stage.status
            ).length;

            let clip;

            if (isFirst) {
              clip = `polygon(0 0, calc(100% - ${ARROW}px) 0, 100% 50%, calc(100% - ${ARROW}px) 100%, 0 100%)`;
            } else if (isLast) {
              clip = `polygon(0 0, 100% 0, 100% 100%, 0 100%, ${ARROW}px 50%)`;
            } else {
              clip = `polygon(0 0, calc(100% - ${ARROW}px) 0, 100% 50%, calc(100% - ${ARROW}px) 100%, 0 100%, ${ARROW}px 50%)`;
            }

            return (
              <div
                key={stage.id}
                className={[
                  "flex h-14 min-w-0 flex-1 items-center rounded-lg sm:h-16 sm:rounded-none",
                  "[clip-path:none] sm:[clip-path:var(--clip)]",
                  isFirst ? "sm:rounded-l-xl" : "",
                  isLast ? "sm:rounded-r-xl" : "",
                  !isFirst ? "sm:-ml-[18px]" : "",
                ].join(" ")}
                style={{
                  "--clip": clip,
                  backgroundColor: stage.color,
                  color: index === 3 ? "#153D79" : "#FFFFFF",
                  paddingLeft: isFirst ? 18 : ARROW + 12,
                  paddingRight: ARROW - 2,
                }}
              >
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-medium sm:text-xs">
                    {stage.label}
                  </p>
                  <p className="mt-1 text-base font-bold leading-none sm:text-lg">
                    {value.toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default LeadPipeline;