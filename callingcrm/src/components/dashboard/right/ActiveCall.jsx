import { useState } from "react";

import {
    Grid3X3,
    Mic,
    Pause,
    Phone,
    PhoneOff,
    UserRound,
} from 'lucide-react'

const ActiveCall = () => {
    const [muted, setMuted] = useState(false);
    const [onHold, setOnHold] = useState(false);

    return (
        <div className="overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm lg:flex lg:grow lg:flex-col">

            {/* blue header */}
            <div className="flex h-[45px] items-center gap-2 bg-[#0647B8] px-4 text-white">
                <Phone size={18} className="" strokeWidth={2.5} />
                <h2 className="text-sm font-bold">
                    Active calls
                </h2>
            </div>

            {/* call trimmer */}
            <div className="p-3 lg:flex lg:flex-1 lg:flex-col lg:justify-between">
                <div className="flex items-center gap-3 ">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100">
                        <Phone
                            size={27}
                            className="text-blue-700"
                            fill="currentColor" />
                    </div>
                    <div>
                        <p className="text-[20px] font-bold leading-none text-[#102F69]">
                            00:04:32
                        </p>
                        <p className="mt-1 text-sm font-medium text-emerald-600">
                            Connected
                        </p>
                    </div>
                </div>

                {/* lead info */}

                <div className="mt-4 flex items-center gap-3 lg:mt-0">
                    <div className="flex h-11 w-11 shrink-0 items-center rounded-full bg-blue-100 items-center justify-center">
                        <UserRound size={23} className="text-blue-500" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-md font-semibold text-blue-950">
                            Rahul Sharma
                        </p>
                        <p className="text-[13px] text-blue-950">
                            +91 090990990
                        </p>

                    </div>

                   <div className="w-15 h-8 flex bg-blue-100 items-center justify-center rounded-2xl ml-auto "> <span className="text-blue-700">Lead</span></div>

                </div>

                {/* call recording */}
                <div className="mt-5 grid grid-cols-4 gap-4 lg:mt-0">
                    <button
                        type="button"
                        onClick={() => setMuted(!muted)}
                        className="flex flex-col items-center gap-1 ">
                        <span className={`flex h-11 w-11 items-center justify-center rounded-full ${
                            muted ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-800"
                        }`}><Mic size={19} /></span>
                        <span className="text-[13px] font-medium text-[#102F69]">{muted ? "Unmute" : "Mute"}</span>
                    </button>

                    <button
                        type="button"
                        className="flex flex-col items-center gap-1 ">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-800"><Grid3X3 size={19} /></span>
                        <span className="text-[13px] font-medium text-[#102F69]">Keypad</span>
                    </button>

                    <button
                        type="button"
                        className="flex flex-col items-center gap-1 "
                        onClick={() => setOnHold(!onHold)}
                    >
                        <span className={`flex h-11 w-11 items-center justify-center rounded-full ${
                            onHold ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-800"
                        }`}><Pause size={19} /></span>
                        <span className="text-[13px] font-medium text-[#102F69]">{onHold ? "Resume" : "Hold"}</span>
                    </button>

                    <button
                        type="button"
                        className="flex flex-col items-center gap-1 ">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500 text-white"><PhoneOff size={19} /></span>
                        <span className="text-[13px] font-medium text-[#102F69]">End</span>
                    </button>

                </div>

            </div>
        </div>
    )
}

export default ActiveCall