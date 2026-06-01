export default function ProfileSection() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4 hover:shadow-md transition-shadow duration-300">

      <h2 className="font-semibold text-gray-800 text-lg mb-6">
        Profile Information
      </h2>

      <div className="flex items-start gap-8">

        {/* Avatar */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <span className="text-5xl">👤</span>
          </div>
          <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-blue-700 hover:scale-110 transition-all duration-200 shadow-md">
            <span className="text-white text-xs">📷</span>
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex-1">

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all duration-200"
            />
          </div>

          {/* Email Address */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all duration-200"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="bg-blue-600 text-white text-sm px-6 py-2.5 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium">
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}