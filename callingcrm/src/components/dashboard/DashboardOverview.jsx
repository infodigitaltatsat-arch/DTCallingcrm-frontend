import { CalendarDays, ChevronDown } from 'lucide-react'
import DashboardStatCard from './DashboardStatCard'

import { dashboardStats } from '../../data/Dashboard/dashboardStats'
import PerformanceSection from './PerformanceSection'
import TodaysFollowUps from './TodaysFollowUps'
import RecentCalls from './RecentCalls'
import LeadPipelines from './LeadPipelines'

const DashboardOverview = () => {
    return (
        <section className='w-full'>

            {/* Heading date */}
            <div className='lg:flex justify-between '>
                <div className='mb-5'>
                    <h1 className='text-[26px] font-bold leading-tight text-blue-950 sm:text-[30px]'>
                        Good Morning, Admin  👏
                    </h1>
                    <p className='mt-2 text-[15px] text-blue-900 sm:text-[17px] '>
                        Here's Whats's happening with your calling today.
                    </p>
                </div>

                {/* Date Selector */}
                <button
                    type='button'
                    className='flex h-[52px] items-center justify-between gap-4 rounded-xl border border-blue-100 bg-white px-4 shadow-sm'>
                    <div className='flex items-center gap-2.5'>
                        <CalendarDays size={18} className='text-blue-800'/>
                        <span className='text-sm font-semibold sm:text-base'>
                            Wed, 7 Oct 2026
                        </span>
                    </div>
                </button>
            </div>


            {/* Statistics */}
            <div className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                {dashboardStats.map((stat) => (
                    <DashboardStatCard
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        change={stat.change}
                        comparison={stat.comparison}
                        changeType={stat.changeType}
                        icon={stat.icon}
                        iconType={stat.iconType} />
                ))}
            </div>

            <PerformanceSection/>
           <div className='mt-3 grid min-w-0 grid-cols-1 gap-2.5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]'>
             <TodaysFollowUps/>
            <RecentCalls/>
           </div>
           <LeadPipelines/>



        </section>
    )
}

export default DashboardOverview