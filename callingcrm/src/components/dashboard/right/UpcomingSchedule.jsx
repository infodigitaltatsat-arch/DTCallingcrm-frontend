import { CalendarDays } from "lucide-react";

const schedule = [
    {
        title: "Live Campaign calling",
        time: "9:00 AM - 12:00 PM",
        color: "bg-blue-600",
    },
    {
        title: "Agent training Session",
        time: "01:00 PM - 02:00 PM",
        color: "bg-purple-600",
    },
    {
        title: "Daily Review Meeting",
        time: "05:00 PM - 05:30 PM",
        color: "bg-emerald-500",
    },

];

const UpcomingSchedule = () => {
    return (
        <div className="flex flex-col rounded-xl border border-blue-100 bg-white p-3 shadow-sm lg:grow">


            {/* heading */}
            <div className="flex items-center justify-between ">
                <div className="flex items-center justify-center gap-4 ">
                    <CalendarDays size={18} className="text-blue-700" />
                    <h2 className="text-sm font-bold text-[#102F69]">Upcoming Schedule</h2>
                </div>
                <button className="text-[15px] text-blue-500 font-medium">
                    View All
                </button>
            </div>

            {/* Sessions */}

            <div className="mt-3 lg:flex lg:flex-1 lg:flex-col lg:justify-evenly">
                {schedule.map((item) => (
                    <div 
                    key={item.title}
                    className="mb-4 flex gap-3 lg:mb-0" >
                        <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                            item.color
                        }`}></span>
                        <div>
                            <p className="text-[15px] font-bold text-[#18396F]">{item.title}</p>
                            <p className="mt-0.5 text-[13px] text-blue-800">{item.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default UpcomingSchedule;