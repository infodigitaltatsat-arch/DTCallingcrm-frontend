import CallPerformance from "./CallPerformance";
import CallStatus from "./CallStatus";

const PerformanceSection = () =>{
    return(
        <div className="mt-3 grid min-w-0 grid-cols-1 items-stretch gap-3 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
            <CallPerformance />
            <CallStatus />
        </div>
    )
}

export default PerformanceSection