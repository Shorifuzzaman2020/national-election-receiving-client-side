import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="min-h-[80vh] flex flex-col items-center justify-start pt-10">

        {/* Top Bar */}
        <div className="w-full flex justify-between items-center mb-10 px-10">
          <Link
            to="/"
            className="border px-5 py-2 rounded-md font-medium hover:bg-gray-100"
          >
            Go Home
          </Link>

          <h1 className="text-2xl font-bold">Admin Dashboard</h1>

          <button className="border px-5 py-2 rounded-md font-medium hover:bg-gray-100">
            Log Out
          </button>
        </div>

        {/* Dashboard Buttons */}
        <div className="w-full max-w-md space-y-5">

          <DashboardButton to="/admin/nomination">
            Nomination Form
          </DashboardButton>

          <DashboardButton to="/admin/create-sub-admin">
            Create Sub Admin
          </DashboardButton>

          <DashboardButton to="/admin/applied-candidates">
            Applied Candidate
          </DashboardButton>

          <DashboardButton to="/admin/create-election">
            Create Election
          </DashboardButton>

          <DashboardButton to="/admin/result">
            See Result
          </DashboardButton>

        </div>
      </div>
    </AdminLayout>
  );
}

/* Reusable Button Component */
function DashboardButton({ children, to }) {
  return (
    <Link
      to={to}
      className="block w-full text-center border-2 border-black rounded-xl py-3 text-lg font-semibold hover:bg-black hover:text-white transition"
    >
      {children}
    </Link>
  );
}
