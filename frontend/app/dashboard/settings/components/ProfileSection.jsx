export default function ProfileSection() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 hover:shadow-md transition-all duration-300">

      <div className="flex items-center gap-3 mb-8">
        <span className="p-2 bg-blue-50 rounded-xl text-blue-600 text-lg">👤</span>
        <div>
          <h2 className="font-bold text-slate-900 text-lg leading-tight">Profile Information</h2>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">Update your personal details</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-10">

        {/* Avatar */}
        <div className="relative group mx-auto md:mx-0">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center border border-slate-100 shadow-inner group-hover:scale-105 transition-transform duration-300">
            <span className="text-5xl group-hover:scale-110 transition-transform duration-300">👤</span>
          </div>
          <button className="absolute -bottom-2 -right-2 bg-[#0052CC] text-white rounded-xl w-9 h-9 flex items-center justify-center cursor-pointer hover:bg-blue-700 hover:scale-110 transition-all duration-200 shadow-lg shadow-blue-600/20">
            <span className="text-sm">📷</span>
          </button>
        </div>

        {/* Form Fields */}
        <div className="flex-1 w-full">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-800 font-semibold outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="john.doe@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-800 font-semibold outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-8 pt-6 border-t border-slate-50">
            <button className="bg-[#0052CC] text-white text-sm px-8 py-3.5 rounded-xl hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/10 hover:-translate-y-0.5 transition-all duration-200 font-bold tracking-tight">
              Update Profile →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}