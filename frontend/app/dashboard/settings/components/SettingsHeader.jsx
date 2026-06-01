export default function SettingsHeader() {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-black text-slate-900 tracking-tight text-center md:text-left">Account Settings</h1>
      <p className="text-slate-500 text-sm font-medium text-center md:text-left">
        Manage your profile, application preferences, and security.
      </p>
    </div>
  );
}