import { CalendarDays, ChevronDown, Clock3 } from "lucide-react";

const NextFollowUp = () =>{
    return(
        <div className="flex flex-col rounded-xl border border-blue-100 bg-white p-2.5 shadow-sm lg:grow">

            {/* news */}
            <div className="flex items-center gap-3 ">
                <Clock3 size={16}
                className="text-blue-700"/>
                <h2 className="font-bold text-sm text-[#102F69] ">
                    Next Follow-up
                </h2>
            </div>

            {/* dates */}
            <div className="mt-2.5 flex items-center gap-2.5">
                <CalendarDays size={17} className="text-blue-700"/>
                <span className="text-[13px] font-semibold text-[#18396F]">08 Oct 2026</span>
                <span className=""><ChevronDown size={15} className="text-gray-500"/></span>
                <span className="text-[13px] font-semibold text-[#18396F] ">10:30 AM</span>
            </div>

            {/* btn */}
            <button 
            type="button"
            className="mt-2.5 flex h-8 w-full items-center justify-between rounded-lg border border-blue-100 bg-white px-2.5 text-sm font-medium text-[#18396F] lg:mt-auto">
                Set Follow-up 
                <ChevronDown size={16}/>
            </button>
        </div>
    )
}

export default NextFollowUp;