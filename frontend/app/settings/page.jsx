import Sidebar from "./components/Sidebar";
import SettingsHeader from "./components/SettingsHeader";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-56 flex-1 p-8">
        <SettingsHeader />
      </main>

    </div>
  );
}