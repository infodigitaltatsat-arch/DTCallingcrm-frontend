import { useState } from "react";
import { CalendarDays, ChevronDown, Clock3 } from "lucide-react";

const STORAGE_KEY = "crm_next_followup";

const getSavedFollowUp = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // Use the default values if saved data is unavailable.
  }

  return { date: "2026-10-12", time: "10:30" };
};

const formatDate = (date) => {
  if (!date) return "Choose a date";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const NextFollowUp = () => {
  const [followUp, setFollowUp] = useState(getSavedFollowUp);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(getSavedFollowUp);
  const [message, setMessage] = useState("");

  const handleSave = () => {
    if (!draft.date || !draft.time) {
      setMessage("Please select both a date and a time.");
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
      setFollowUp(draft);
      setIsEditing(false);
      setMessage("Follow-up saved in this browser.");
    } catch {
      setMessage("Unable to save. Please try again.");
    }
  };

  return (
    <div className="flex flex-col rounded-xl border border-blue-100 bg-white p-2.5 shadow-sm lg:grow">
      <div className="flex items-center gap-3">
        <Clock3 size={16} className="text-blue-700" />
        <h2 className="text-sm font-bold text-[#102F69]">
          Next Follow-up
        </h2>
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
        <CalendarDays size={17} className="text-blue-700" />
        <span className="text-[13px] font-semibold text-[#18396F]">
          {formatDate(followUp.date)}
        </span>
        <span className="text-[13px] font-semibold text-[#18396F]">
          {followUp.time
            ? new Date(`2000-01-01T${followUp.time}`).toLocaleTimeString(
                "en-US",
                { hour: "2-digit", minute: "2-digit" }
              )
            : "Choose a time"}
        </span>
      </div>

      {isEditing && (
        <div className="mt-3 space-y-2">
          <label className="block text-xs font-medium text-slate-600">
            Follow-up date
            <input
              type="date"
              value={draft.date}
              min={new Date().toLocaleDateString("en-CA")}
              onChange={(event) =>
                setDraft({ ...draft, date: event.target.value })
              }
              className="mt-1 w-full rounded-lg border border-blue-100 p-2 text-sm"
            />
          </label>

          <label className="block text-xs font-medium text-slate-600">
            Follow-up time
            <input
              type="time"
              value={draft.time}
              onChange={(event) =>
                setDraft({ ...draft, time: event.target.value })
              }
              className="mt-1 w-full rounded-lg border border-blue-100 p-2 text-sm"
            />
          </label>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setDraft(followUp);
                setIsEditing(false);
                setMessage("");
              }}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {!isEditing && (
        <button
          type="button"
          onClick={() => {
            setDraft(followUp);
            setIsEditing(true);
            setMessage("");
          }}
          className="mt-2.5 flex h-8 w-full items-center justify-between rounded-lg border border-blue-100 bg-white px-2.5 text-sm font-medium text-[#18396F] hover:bg-blue-50 lg:mt-auto"
        >
          Set Follow-up
          <ChevronDown size={16} />
        </button>
      )}

      {message && (
        <p role="status" className="mt-2 text-xs text-blue-700">
          {message}
        </p>
      )}
    </div>
  );
};

export default NextFollowUp;