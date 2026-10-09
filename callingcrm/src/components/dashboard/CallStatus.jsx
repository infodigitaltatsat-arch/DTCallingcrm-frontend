import { Phone } from "lucide-react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";

import {
  callStatusData,
  callStatusChartData,
  callStatusColors,
} from "../../data/PerformanceData/callStatusData";

const CallStatus = () => {
  return (
    <section className="min-w-0 overflow-hidden rounded-xl bg-[#0647B8] p-2.5 text-white shadow-sm sm:p-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Phone size={20} strokeWidth={2.5} />

        <h2 className="text-sm font-bold sm:text-base">
          Call Status
        </h2>
      </div>

      {/* Chart + Status List */}
      <div className="mt-2 grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-2">
        {/* Donut Chart */}
        <div className="relative h-[185px] min-w-0 sm:h-[195px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={callStatusChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="62%"
                outerRadius="88%"
                paddingAngle={1}
                stroke="#0647B8"
                strokeWidth={2}
              >
                {callStatusChartData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={callStatusColors[index]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Value */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-lg font-bold sm:text-xl">
              248
            </p>

            <p className="text-[10px] sm:text-xs">
              Total Calls
            </p>
          </div>
        </div>

        {/* Status List */}
        <div className="space-y-4">
          {callStatusData.map((status, index) => (
            <div
              key={status.name}
              className="flex min-w-0 items-center gap-1.5"
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{
                  backgroundColor: callStatusColors[index],
                }}
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-xs">
                    {status.name}
                  </span>

                  <span className="shrink-0 text-xs font-semibold">
                    {status.value}
                  </span>
                </div>

                <p className="text-[10px] text-blue-100">
                  ({status.percentage})
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CallStatus;