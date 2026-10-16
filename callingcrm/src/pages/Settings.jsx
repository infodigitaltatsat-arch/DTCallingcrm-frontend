import { useState } from 'react';
import {
  Bell,
  LockKeyhole,
  UserRound,
  Save,
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const [notifications, setNotifications] = useState({
    followUps: true,
    callUpdates: true,
    campaigns: false,
  });

  const [profile, setProfile] = useState({
    name: '',
    email: '',
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: UserRound },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: LockKeyhole },
  ];

  const handleProfileSave = (event) => {
    event.preventDefault();
    // Profile updates are not connected to a backend endpoint yet.
    alert('Profile settings are not connected to the backend yet.');
  };

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-4 sm:p-6">

      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your account and application preferences.
        </p>
      </div>

      {/* Settings layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">

        {/* Sidebar */}
        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-3">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Settings content */}
        <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 sm:p-7">

          {/* Profile */}
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Profile Settings
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                View and edit your personal information.
              </p>

              <form
                onSubmit={handleProfileSave}
                className="mt-6 max-w-xl space-y-5"
              >
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(event) =>
                      setProfile({
                        ...profile,
                        name: event.target.value,
                      })
                    }
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(event) =>
                      setProfile({
                        ...profile,
                        email: event.target.value,
                      })
                    }
                    placeholder="Enter your email address"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
                >
                  <Save size={17} />
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Notification Preferences
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Choose which CRM updates you want to enable.
              </p>

              <div className="mt-6 divide-y divide-slate-100">
                {[
                  {
                    id: 'followUps',
                    title: 'Follow-up Reminders',
                    description: 'Reminders for upcoming scheduled follow-ups.',
                  },
                  {
                    id: 'callUpdates',
                    title: 'Call Updates',
                    description: 'Updates related to call activity.',
                  },
                  {
                    id: 'campaigns',
                    title: 'Campaign Updates',
                    description: 'Updates related to campaigns.',
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 py-5"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={notifications[item.id]}
                      aria-label={item.title}
                      onClick={() =>
                        setNotifications({
                          ...notifications,
                          [item.id]: !notifications[item.id],
                        })
                      }
                      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                        notifications[item.id]
                          ? 'bg-blue-700'
                          : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                          notifications[item.id]
                            ? 'left-6'
                            : 'left-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs text-slate-400">
                Preferences currently apply to this page only and are not
                saved to the database.
              </p>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Security
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Account security information.
              </p>

              <div className="mt-6 rounded-lg border border-slate-200 p-4">
                <div className="flex items-start gap-3">
                  <LockKeyhole
                    size={20}
                    className="mt-0.5 text-blue-700"
                  />
                  <div>
                    <p className="font-medium text-slate-800">
                      Account Authentication
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      This application uses your existing login and
                      authentication system.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm font-medium text-amber-800">
                  Password management
                </p>
                <p className="mt-1 text-sm text-amber-700">
                  Password changes are not available on this page because
                  a password-change API has not been connected here.
                </p>
              </div>
            </div>
          )}

        </section>
      </div>
    </div>
  );
};

export default Settings;