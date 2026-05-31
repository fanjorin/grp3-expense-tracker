const settingsItems = [
  { id: 1, icon: "🏷️", iconBg: "bg-green-100", title: "Categories", description: "Manage your expense categories" },
  { id: 2, icon: "💳", iconBg: "bg-yellow-100", title: "Budget", description: "Set and manage your monthly budget" },
  { id: 3, icon: "🔔", iconBg: "bg-purple-100", title: "Notifications", description: "Manage your email and push notifications" },
  { id: 4, icon: "🛡️", iconBg: "bg-blue-100", title: "Security", description: "Change password and manage security settings" },
  { id: 5, icon: "🔒", iconBg: "bg-red-100", title: "Data & Privacy", description: "Manage your data and privacy preferences" },
  { id: 6, icon: "💰", iconBg: "bg-blue-100", title: "Payment & Billing", description: "Manage your subscription and payment methods" },
];

export default function SettingsList() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {settingsItems.map((item, index) => (
        <div
          key={item.id}
          className={`flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-blue-50 transition-all duration-200 group
            ${index !== settingsItems.length - 1 ? "border-b border-gray-100" : ""}`}
        >
          <div className="flex items-center gap-4">
            <div className={`${item.iconBg} w-10 h-10 rounded-full flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-200`}>
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{item.title}</p>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
          </div>
          <span className="text-gray-400 text-lg group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200">›</span>
        </div>
      ))}
    </div>
  );
}