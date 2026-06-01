const features = [
  {
    id: 1,
    icon: "💰",
    iconBg: "bg-blue-100",
    title: "Track every expense",
    description: "Add expenses in seconds and categorize them automatically.",
    border: "hover:border-blue-200",
  },
  {
    id: 2,
    icon: "📈",
    iconBg: "bg-green-100",
    title: "Set smarter budgets",
    description: "Create budgets that help you stay on track and save more.",
    border: "hover:border-green-200",
  },
  {
    id: 3,
    icon: "📊",
    iconBg: "bg-purple-100",
    title: "Get clear insights",
    description: "Beautiful reports that help you understand your spending habits.",
    border: "hover:border-purple-200",
  },
];

export default function FeatureCards() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      {features.map((feature) => (
        <div
          key={feature.id}
          className={`flex items-start gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-transparent ${feature.border} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
        >
          {/* Icon */}
          <div className={`${feature.iconBg} p-3 rounded-xl text-2xl flex-shrink-0`}>
            {feature.icon}
          </div>

          {/* Text */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">
              {feature.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}