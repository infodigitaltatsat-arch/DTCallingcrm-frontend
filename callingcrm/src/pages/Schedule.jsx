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

const Schedule = () => {
    return (
        <div className="m-3 flex flex-col rounded-xl border border-blue-100 bg-white p-2.5 shadow-sm lg:grow">


            {/* heading */}
            <div className="flex items-center justify-between ">
                <div className="flex items-center justify-center gap-3 ">
                    <CalendarDays size={17} className="text-blue-700" />
                    <h2 className="text-sm font-bold text-[#102F69]">Upcoming Schedule</h2>
                </div>
                <button className="text-sm text-blue-500 font-medium">
                    View All
                </button>
            </div>

            {/* Sessions */}

            <div className="mt-2.5 lg:flex lg:flex-1 lg:flex-col lg:justify-evenly">
                {schedule.map((item) => (
                    <div 
                    key={item.title}
                    className="mb-3 flex gap-2.5 lg:mb-0" >
                        <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                            item.color
                        }`}></span>
                        <div>
                            <p className="text-sm font-bold text-[#18396F]">{item.title}</p>
                            <p className="mt-0.5 text-xs text-blue-800">{item.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Schedule;