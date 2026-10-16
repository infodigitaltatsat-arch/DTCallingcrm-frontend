import { useEffect, useState } from "react";
import { Phone, PhoneCall, History, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";

const QuickCall = () => {
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [calling, setCalling] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [callSid, setCallSid] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const response = await api.get("/contacts");
        const contactList = response.data.contacts || [];

        setContacts(contactList);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load contacts."
        );
      } finally {
        setLoadingContacts(false);
      }
    };

    loadContacts();
  }, []);

  const handleStartCall = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setCallSid("");

    const to = phoneNumber.trim();
    if (!/^\+[1-9]\d{7,14}$/.test(to)) {
      setError("Enter a valid phone number in international format, such as +919876543210.");
      return;
    }

    const matchingContact = contacts.find(
      (contact) => contact.phone?.trim() === to
    );

    setCalling(true);

    try {
      // Start the Twilio automated trial call.
      const response = await api.post("/voice/trial-call", { to });

      const sid = response.data.call?.sid || "";
      setCallSid(sid);

      if (!matchingContact) {
        setMessage(
          "Twilio accepted the call request. This number does not match a saved CRM contact, so the call was not added to Call History."
        );
        return;
      }

      // Save the call in history only when its number matches a saved contact.
      try {
        await api.post("/calls", {
          contact: matchingContact._id,
          phone: to,
          status: "Initialized",
          duration: 0,
          notes: `Twilio automated trial message requested. Call SID: ${sid}`,
        });

        setMessage(
          "Twilio accepted the call request, and the call was saved to CRM history. This is an automated message, not a live agent conversation."
        );
      } catch {
        setMessage(
          "Twilio accepted the call request, but the CRM history record could not be saved. Check Call History before retrying."
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Twilio could not start the call."
      );
    } finally {
      setCalling(false);
    }
  };

  return (
    <section className="min-w-0 p-4 sm:p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Quick Call</h1>
          <p className="mt-1 text-sm text-slate-500">
            Enter a phone number to start a Twilio trial voice message.
          </p>
        </div>

        <Link
          to="/call-history"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-blue-800 hover:bg-blue-50"
        >
          <History size={17} />
          Call History
        </Link>
      </div>

      <div className="max-w-2xl rounded-xl border border-blue-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          <PhoneCall size={24} />
        </div>

        <h2 className="text-lg font-bold text-blue-950">
          Start a trial call
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          The number must be verified with Twilio while you are using a trial
          account. Calls to numbers matching saved contacts are linked to call
          history.
        </p>

        {error && (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
            {message}
            {callSid && (
              <p className="mt-2 break-all text-xs">
                Twilio Call SID: {callSid}
              </p>
            )}
          </div>
        )}

        <form onSubmit={handleStartCall} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Destination phone number
            <input
              type="tel"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder="+919876543210"
              required
              disabled={calling}
              className="mt-2 w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
            />
          </label>

          <button
            type="submit"
            disabled={calling || loadingContacts}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {calling ? (
              <>
                <LoaderCircle size={18} className="animate-spin" />
                Starting call...
              </>
            ) : (
              <>
                <Phone size={18} />
                Start Trial Call
              </>
            )}
          </button>
        </form>

        <p className="mt-4 text-xs leading-5 text-slate-500">
          Trial mode plays an automated message. It does not provide live
          two-way browser calling, and a successful request does not mean
          the recipient answered.
        </p>
      </div>
    </section>
  );
};

export default QuickCall;