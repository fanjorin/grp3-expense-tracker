import SettingsHeader from "./components/SettingsHeader";
import SettingsPanel from "./components/SettingsPanel";
import ProfileSection from "./components/ProfileSection";
import PreferencesSection from "./components/PreferencesSection";
import SettingsList from "./components/SettingsList";

export default function SettingsPage() {
  return (
    <>
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
          <PreferencesSection />
          <SettingsList />
        </div>

      </div>
    </>
  );
}
