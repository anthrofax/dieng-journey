import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/user-settings-sidebar/user-settings-sidebar";
import 'react-confirm-alert/src/react-confirm-alert.css';

function UserSettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-100">
      <div className="h-full w-full py-6">
        <Navbar />
        <div className="h-full w-full mt-28 mb-16 grid grid-cols-8">
          <Sidebar />
          {children}
        </div>
      </div>
    </div>
  );
}

export default UserSettingsLayout;
