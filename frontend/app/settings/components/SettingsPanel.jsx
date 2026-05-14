const tabs = [
  { id: 1, icon: "👤", label: "Profile", active: true },
  { id: 2, icon: "⚙️", label: "Preferences", active: false },
  { id: 3, icon: "🏷️", label: "Categories", active: false },
  { id: 4, icon: "💳", label: "Budget", active: false },
  { id: 5, icon: "🔔", label: "Notifications", active: false },
  { id: 6, icon: "🛡️", label: "Security", active: false },
  { id: 7, icon: "🔒", label: "Data & Privacy", active: false },
  { id: 8, icon: "💰", label: "Payment & Billing", active: false },
];

export default function SettingsPanel() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-2 flex flex-col gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-left w-full
            ${tab.active
              ? "bg-blue-50 text-blue-600 font-semibold"
              : "text-gray-600 hover:bg-gray-50"
            }`}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}