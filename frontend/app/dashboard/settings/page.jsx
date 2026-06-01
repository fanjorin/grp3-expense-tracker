import SettingsHeader from "./components/SettingsHeader";
import ProfileSection from "./components/ProfileSection";
import PreferencesSection from "./components/PreferencesSection";
import SettingsList from "./components/SettingsList";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <SettingsHeader />

      {/* Settings Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Right Content - Form Sections */}
        <div className="flex-1 flex flex-col gap-8">
          <ProfileSection />
          <PreferencesSection />
          <SettingsList />
        </div>
      </div>
    </div>
  );
}
