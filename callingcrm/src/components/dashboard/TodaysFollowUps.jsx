
import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { todaysFollowUps } from "../../data/followups/todaysFollowUps";

const TodayFollowUps = () => {
  return (
    <section className=" min-w-0 overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">
      <div className="flex h-[52px] items-center justify-between border-b border-slate-100 px-4">
        <div className="flex items-center gap-2.5">
          <CalendarDays size={21} className="text-blue-700" />
          <h2 className="text-[15px] font-bold text-[#102F69]">
            Today's Follow-ups
          </h2>
        </div>

        <Link
          to="/follow-ups"
          className="text-xs font-medium text-blue-600 hover:text-blue-800"
        >
          View All
        </Link>
      </div>

      <div className="px-4">
        {todaysFollowUps.map((item, index) => (
          <div
            key={item.id}
            className={`grid min-h-[76px] grid-cols-[38px_minmax(0,1fr)_78px_70px] items-center gap-2 ${
              index !== todaysFollowUps.length - 1
                ? "border-b border-slate-200"
                : ""
            }`}
          >
            <div
              className={`flex h-[38px] w-[38px] items-center justify-center rounded-full text-xs font-bold text-white ${item.avatarColor}`}
            >
              {item.initials}
            </div>

            <div className="min-w-0">
              <p className="truncate text-[12px] font-bold text-[#18396F]">
                {item.name}
              </p>
              <p className="mt-1 truncate text-[11px] text-[#55749F]">
                {item.phone}
              </p>
            </div>

            <p className="whitespace-nowrap text-right text-[11px] font-semibold text-[#244A7C]">
              {item.time}
            </p>

            <div className="flex justify-end">
              <span
                className={`inline-flex min-w-[62px] justify-center rounded-full px-2 py-1.5 text-[10px] font-semibold ${item.priorityStyle}`}
              >
                {item.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodayFollowUps;