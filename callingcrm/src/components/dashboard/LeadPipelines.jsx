import { Funnel } from "lucide-react";
import { leadPipelineData } from "../../data/Dashboard/leadPipelinesData";

// Fallback gradient (dark → light blue) if a stage has no `color` in your data
const FALLBACK_COLORS = ["#0B3FA8", "#2F6FDB", "#3F7CE6", "#6FA3F5", "#7FB0F8"];

// Arrow depth and white gap between stages (in px)
const ARROW = 22;
const GAP = 4;

const LeadPipeline = () => {
  const total = leadPipelineData.length;

  return (
    <section className="w-full min-w-0 rounded-xl border border-blue-100 bg-white px-4 py-3 shadow-sm sm:px-5 sm:py-4">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Funnel
            size={22}
            strokeWidth={2.5}
            className="fill-blue-800 text-blue-800"
          />
          <h2 className="text-base font-bold text-blue-950 sm:text-lg">
            Lead Pipeline
          </h2>
        </div>

        <button
          type="button"
          className="text-xs font-medium text-blue-700 hover:underline sm:text-sm"
        >
          View Details
        </button>
      </div>

      {/* Pipeline */}
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-0">
        {leadPipelineData.map((stage, index) => {
          const isFirst = index === 0;
          const isLast = index === total - 1;

          // Pointed right edge for all except last; notched left edge for all except first
          let clip;
          if (isFirst) {
            clip = `polygon(0 0, calc(100% - ${ARROW}px) 0, 100% 50%, calc(100% - ${ARROW}px) 100%, 0 100%)`;
          } else if (isLast) {
            clip = `polygon(0 0, 100% 0, 100% 100%, 0 100%, ${ARROW}px 50%)`;
          } else {
            clip = `polygon(0 0, calc(100% - ${ARROW}px) 0, 100% 50%, calc(100% - ${ARROW}px) 100%, 0 100%, ${ARROW}px 50%)`;
          }

          const textColor = index === 3 ? "#16417E" : "#FFFFFF";

          return (
            <div
              key={stage.id}
              className={[
                "flex h-16 min-w-0 flex-1 items-center rounded-lg sm:h-[72px] sm:rounded-none",
                "[clip-path:none] sm:[clip-path:var(--clip)]",
                isFirst ? "sm:rounded-l-xl" : "",
                isLast ? "sm:rounded-r-xl" : "",
                !isFirst ? `sm:-ml-[${ARROW - GAP}px]` : "",
              ].join(" ")}
              style={{
                "--clip": clip,
                backgroundColor: stage.color || FALLBACK_COLORS[index],
                color: textColor,
                // padding so text clears the notch / arrow
                paddingLeft: isFirst ? 20 : ARROW + 14,
                paddingRight: ARROW,
              }}
            >
              <div className="min-w-0">
                <p className="truncate text-xs font-medium sm:text-[13px]">
                  {stage.label}
                </p>
                <p className="mt-1 text-lg font-bold leading-none sm:text-xl">
                  {stage.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LeadPipeline;