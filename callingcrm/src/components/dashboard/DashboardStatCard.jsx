import { ArrowDown, ArrowUp } from 'lucide-react'

const DashboardStatCard = ({
    title,
    value,
    change,
    comparison,
    changeType,
    icon: Icon,
    iconType,
}) => {
    const iconStyles = {
        blue: "bg-blue-100 text-blue-700",
        green: "bg-emerald-500 text-white",
        red: "bg-red-500 text-white",
    };
    const changeStyles = {
        positive: "text-emerald-600",
        negative: "text-red-500",
    };


    return (

        <div className='h-[190px] rounded-xl border border-blue-100 bg-white p-4 shadow-sm lg:h-[172px]'>
            {/* top row  */}
            <div className='flex items-center gap-3'>
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconStyles[iconType]
                    }`}>
                    <Icon size={20}
                        strokeWidth={2.5} />

                </div>
                <p className='min-w-0 truncate text-lg font-semibold text-blue-950 sm:text-base'>
                    {title}
                </p>
            </div>

            {/* value */}
            <p className='mt-5 text-[26px] leading-none font-bold tracking-tight text-[#12356F] lg:text-sm'>
                {value}
            </p>

            {/* changes */}
            <div className={`mt-3 flex items-center gap-1.5 text-[15px] font-medium ${changeStyles[changeType]
                }`}>
                {changeType === "positive" ? (
                    <ArrowUp size={17}
                        strokeWidth={2.5} />
                ) : <ArrowDown size={17} strokeWidth={2.5} />}

                <span>{change}</span>


            </div>

            {/* comparison */}
            <p className='mt-2.5 text-xs font-medium text-[#244A7C]'>
                {comparison}
            </p>
        </div>
    )


};


export default DashboardStatCard