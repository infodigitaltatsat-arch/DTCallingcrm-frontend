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

        <div className='h-[210px] lg:h-[180px] rounded-xl border border-blue-100 bg-white p-5 shadow-sm'>
            {/* top row  */}
            <div className='flex items-center gap-3'>
                <div className={`flex h-11 w-11 lg:h-8 lg:w-8 shrink-0 items-center justify-center rounded-full ${iconStyles[iconType]
                    }`}>
                    <Icon size={22}
                        strokeWidth={2.5} />

                </div>
                <p className='min-w-0 truncate text-xl lg:text-[18px] font-semibold text-blue-950 sm:text-base'>
                    {title}
                </p>
            </div>

            {/* value */}
            <p className='mt-6 text-[28px] lg:text-[15px] leading-none font-bold tracking-tight text-[#12356F]'>
                {value}
            </p>

            {/* changes */}
            <div className={`mt-4 flex items-center gap-1.5 text-[17px] font-medium ${changeStyles[changeType]
                }`}>
                {changeType === "positive" ? (
                    <ArrowUp size={19}
                        strokeWidth={2.5} />
                ) : <ArrowDown size={19} strokeWidth={2.5} />}

                <span>{change}</span>


            </div>

            {/* comparison */}
            <p className='mt-3 text-[13px] font-medium text-[#244A7C]'>
                {comparison}
            </p>
        </div>
    )


};


export default DashboardStatCard