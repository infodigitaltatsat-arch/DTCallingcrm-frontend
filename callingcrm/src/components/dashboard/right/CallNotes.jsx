import { useState } from "react";
import { ChevronDown, FilePenLine } from "lucide-react";

const STORAGE_KEY = "crm_call_notes"

const CallNotes = () =>{
    const [note, setNote] = useState(()=>{
        try{
            return localStorage.getItem(STORAGE_KEY) || "";
        }catch{
            return ""
        }
    });

    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");

    const handleSave =() =>{
        try{
            localStorage.setItem(STORAGE_KEY,note.trim());
        setNote(note.trim());
        setError("");
        setSaved(true);
        }
     catch{
        setError("Could not save the notes, Please try again");
        setSaved(false)
     }
    }


    return(
        <div className="flex flex-col rounded-xl border border-blue-100 bg-blue-50 p-2.5 shadow-sm lg:grow">
            {/* new */}
            <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center  ">
                    <FilePenLine size={17} className="text-blue-700"/>
                    <h2 className="text-sm font-bold text-[#102F69]">Call Notes</h2>

                </div>
                <ChevronDown className="text-[#102F69]" size={17}/>

            </div>

            <textarea className="mt-2 h-[44px] w-full resize-none rounded-lg border border-blue-100 bg-white px-2.5 py-1.5 text-sm text-[#102F69] outline-none placeholder:text-slate-400 focus:border-blue-400 lg:flex-1 lg:min-h-[64px]"
            value={note}
            onChange={(event)=>setNote(event.target.value)}
            placeholder="Add notes about this call..."/>
            <button 
            type="button"
            onClick={handleSave}
            className="mt-2 h-8 w-full rounded-lg bg-blue-600 text-sm font-medium text-white transition hover:bg-blue-700">{saved ? "Note saved" : "Save Note"}</button>
            {error && <p role="alert" className="mt-2 text-xs text-red-600">{error}</p>}
        </div>
    )

}

export default CallNotes;