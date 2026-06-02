const settingsItems = [
  {
    id: 1,
    icon: "🏷️",
    iconBg: "bg-green-50 text-green-600",
    title: "Categories",
    description: "Manage your custom expense categories",
  },
  {
    id: 2,
    icon: "💳",
    iconBg: "bg-amber-50 text-amber-600",
    title: "Budget",
    description: "Set and manage your monthly budget",
  },
  {
    id: 3,
    icon: "🔔",
    iconBg: "bg-purple-50 text-purple-600",
    title: "Notifications",
    description: "Manage email and push notifications",
  },
  {
    id: 4,
    icon: "🛡️",
    iconBg: "bg-blue-50 text-blue-600",
    title: "Security",
    description: "Change password and manage security",
  },
  {
    id: 5,
    icon: "🔒",
    iconBg: "bg-red-50 text-red-600",
    title: "Data & Privacy",
    description: "Manage your data and privacy preferences",
  },
  {
    id: 6,
    icon: "💰",
    iconBg: "bg-indigo-50 text-indigo-600",
    title: "Payment & Billing",
    description: "Manage subscriptions and payments",
  },
];

export default function SettingsList() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="px-5 sm:px-6 py-5 border-b border-slate-50">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          More Settings
        </h3>
      </div>
      <div className="divide-y divide-slate-50">
        {settingsItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 cursor-pointer hover:bg-slate-50/50 transition-all duration-200 group"
          >
            <div className="flex items-center gap-4 sm:gap-5">
              <div
                className={`${item.iconBg} w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center text-lg sm:text-xl shadow-sm group-hover:scale-110 transition-transform duration-300 shrink-0`}
              >
                {item.icon}
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight">
                  {item.title}
                </p>
                <p className="text-[10px] sm:text-xs text-slate-400 font-medium">
                  {item.description}
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 group-hover:text-blue-500 group-hover:bg-blue-50 group-hover:translate-x-1 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
