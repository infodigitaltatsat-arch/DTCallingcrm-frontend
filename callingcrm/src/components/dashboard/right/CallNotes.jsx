import { useState } from "react";
import { ChevronDown, FilePenLine } from "lucide-react";

const CallNotes = () =>{
    const [note, setNote] = useState("");
    const [saved, setSaved] = useState(false);

    const handleSave = () =>{
        if(!note.trim()) return;

        setSaved(true);
        setTimeout(()=>{
            setSaved(false)
        },2000)
    };

    return(
        <div className="flex flex-col rounded-xl border border-blue-100 bg-blue-50 p-3 shadow-sm lg:grow">
            {/* new */}
            <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center  ">
                    <FilePenLine size={17} className="text-blue-700"/>
                    <h2 className="text-sm font-bold text-[#102F69]">Call Notes</h2>

                </div>
                <ChevronDown className="text-[#102F69]" size={17}/>

            </div>

            <textarea className="mt-2 h-[48px] w-full resize-none rounded-lg border border-blue-100 bg-white px-3 py-2 text-sm text-[#102F69] outline-none placeholder:text-slate-400 focus:border-blue-400 lg:flex-1 lg:min-h-[72px]"
            value={note}
            onChange={(event)=>setNote(event.target.value)}
            placeholder="Add notes about this call..."/>
            <button 
            type="button"
            onClick={handleSave}
            className="mt-2 h-[34px] w-full rounded-lg bg-blue-600 text-md font-medium text-white transition hover:bg-blue-700">{saved ? "Note saved" : "Save Note"}</button>
        </div>
    )

}

export default CallNotes;