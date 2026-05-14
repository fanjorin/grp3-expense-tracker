import Sidebar from "./components/Sidebar";
import SettingsHeader from "./components/SettingsHeader";
import SettingsPanel from "./components/SettingsPanel";
import ProfileSection from "./components/ProfileSection";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-56 flex-1 p-8">
        <SettingsHeader />

        {/* Settings Layout */}
        <div className="flex gap-6">

          {/* Left Panel */}
          <div className="w-64 flex-shrink-0">
            <SettingsPanel />
          </div>

          {/* Right Content */}
          <div className="flex-1">
            <ProfileSection />
          </div>

        </div>
      </main>

    </div>
  );
}