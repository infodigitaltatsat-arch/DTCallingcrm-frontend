import ActiveCall from "./ActiveCall";
import CallNotes from "./CallNotes";
import CampaignPerformance from "./CampaignPerformance";
import NextFollowUp from "./NextFollowUp";
import UpcomingSchedule from "./UpcomingSchedule";


const RightDashboard = () =>{
    return(
        <div className="w-full space-y-3 lg:flex lg:h-full lg:flex-col lg:gap-3 lg:space-y-0">
            {/* right column */}
            <ActiveCall />
            <CallNotes/>
            <NextFollowUp/>
            <CampaignPerformance/>
            <UpcomingSchedule/>
        </div>
    )
}

export default RightDashboard