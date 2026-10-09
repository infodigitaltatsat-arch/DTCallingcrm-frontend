import { Target } from "lucide-react";

const campaigns = [
    {
        name: "Real Estate Campaign",
        calls: "842 calls",
        percentage: "68%",
    },
    {
        name: "Education Campaign",
        calls: "510 calls",
        percentage: "52%",
    },
    {
        name: "Insurance Campaign",
        calls: "382 calls",
        percentage: "41%",
    },
    {
        name: "Product Campaigns",
        calls: "276 calls",
        percentage: "32%",
    },
];

const CampaignPerformance = () => {
    return (
        <div className="flex flex-col rounded-xl border border-blue-100 bg-white p-3 shadow-sm lg:grow">

            {/* hading */}
            <div className="flex items-center justify-between ">
                <div className="flex gap-4  items-center justify-center">

                    <Target size={19} className="text-blue-700"></Target>
                    <h2 className="text-sm font-bold text-[#102F69]">Campaign Performance</h2>
                </div>
                <button className="text-[15px] text-blue-500 font-medium">
                    View All
                </button>

            </div>

            {/*  */}
            <div className="mt-3 space-y-3 lg:flex lg:flex-1 lg:flex-col lg:justify-evenly lg:space-y-0">
                {campaigns.map((campaign) => (
                    <div className="" key={campaign.name}>
                        <div className="flex items-center justify-between">
                            <p className="truncate text-[13px] font-semibold text-[#18396F]">
                                {campaign.name}
                            </p>
                            <span className="text-[14px] font-semibold text-[#18396F]">
                                {campaign.percentage}
                            </span>

                        </div>

                        <div className="mt-1 flex items-center justify-between">
                            <span className="text-[13px] text-slate-500">{campaign.calls}</span>

                        </div>

                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-blue-50">
                            <div className="h-full rounded-full bg-blue-600" style={{width:campaign.percentage}} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default CampaignPerformance