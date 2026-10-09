import { CalendarDays, ChevronDown, Clock3 } from "lucide-react";

const NextFollowUp = () =>{
    return(
        <div className="flex flex-col rounded-xl border border-blue-100 bg-white p-3 shadow-sm lg:grow">

            {/* news */}
            <div className="flex items-center gap-4 ">
                <Clock3 size={17}
                className="text-blue-700"/>
                <h2 className="font-bold text-sm text-[#102F69] ">
                    Next Follow-up
                </h2>
            </div>

            {/* dates */}
            <div className="mt-3 flex items-center gap-3">
                <CalendarDays size={18} className="text-blue-700"/>
                <span className="text-sm font-semibold text-[#18396F]">08 Oct 2026</span>
                <span className=""><ChevronDown size={15} className="text-gray-500"/></span>
                <span className="text-sm font-semibold text-[#18396F] ">10:30 AM</span>
            </div>

            {/* btn */}
            <button 
            type="button"
            className="mt-3 flex h-[34px] w-full items-center justify-between rounded-lg border border-blue-100 bg-white px-3 text-md font-medium text-[#18396F] lg:mt-auto">
                Set Follow-up 
                <ChevronDown size={16}/>
            </button>
        </div>
    )
}

export default NextFollowUp;