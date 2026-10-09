import {
    BarChart3,
    ChevronDown,
} from 'lucide-react'

import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

import { performanceData } from '../../data/PerformanceData/callPerformanceData'

const CallPerformance = () => {
    return (
        <section className='min-w-0 overflow-hidden rounded-xl bg-[#0647B8] p-2.5 text-white shadow-sm sm:p-3'>
            <div className='flex items-center justify-between'>
                <div className='flex min-w-0 items-center gap-2'>
                    <BarChart3 size={20} strokeWidth={2.5} />
                    <h2 className='truncate text-sm font-bold sm:text-base'>Call Performance</h2>
                </div>

                <button className='flex shrink-0 items-center gap-1.5 rounded-lg border border-blue-400/60 bg-blue-700/40 px-2.5 py-1 text-xs sm:text-sm'>
                    Last 7 Days
                    <ChevronDown size={14}/>
                </button>
            </div>

            <div className='mt-2.5 flex flex-wrap justify-end gap-x-3 gap-y-1 text-xs'>
                <span className='flex items-center gap-1.5'>
                    <span className='h-2.5 w-2.5 rounded-full bg-blue-400'/>
                        Connected
                   
                </span>
                <span className='flex items-center gap-1.5'>
                    <span className='h-2.5 w-2.5 rounded-full bg-red-400' />
                    Missed
                </span>
                <span className='flex items-center gap-1.5'>
                    <span className='h-2.5 w-2.5 rounded-full bg-green-400' />
                    Total Calls
                </span>
            </div>

            <div className='mt-1 h-[195px] w-full min-w-0 sm:h-[205px]'>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={performanceData}
                        margin={{
                            top: 8,
                            right: 6,
                            left: -20,
                            bottom: 0,
                        }}>
                        <CartesianGrid
                            stroke="rgba(255,255,255,0.16)"
                            vertical={true} />

                        <XAxis
                            dataKey="day"
                            tick={{
                                fill: "#ffffff",
                                fontSize: 10,
                            }}
                            axisLine={{
                                stroke: "rgba(255,255,255,0.35)",
                            }}
                            tickLine={false} />

                        <YAxis
                            domain={[0, 250]}
                            ticks={[0, 50, 100, 150, 200, 250]}
                            tick={{
                                fill: "#ffffff",
                                fontSize: 10,
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            contentStyle={{
                                borderRadius: "8px",
                                border: "none",
                                fontSize: "12px",
                            }}
                        />

                        <Legend
                            verticalAlign="top"
                            height={0}
                            content={() => null}
                        />

                        <Line
                            type="monotone"
                            dataKey="connected"
                            stroke="#3B82F6"
                            strokeWidth={2.5}
                            dot={{
                                r: 3,
                                fill: "#3B82F6",
                            }}
                            activeDot={{
                                r: 5,
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="missed"
                            stroke="#EF4444"
                            strokeWidth={2.5}
                            dot={{
                                r: 3,
                                fill: "#EF4444",
                            }}
                            activeDot={{
                                r: 5,
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="#FFFFFF"
                            strokeWidth={2.5}
                            dot={{
                                r: 3,
                                fill: "#FFFFFF",
                            }}
                            activeDot={{
                                r: 5,
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </section>
    )
}


export default CallPerformance