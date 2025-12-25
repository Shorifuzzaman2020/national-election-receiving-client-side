// export default function AdminLayout({children}){
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="bg-blue-700 text-white p-4">Admin Panel</div>
//       <div className="p-4">{children}</div>
//     </div>
//   )
// }

import { Link } from "react-router-dom";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">

      {/* Top Navbar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-white shadow-md">

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-700 text-white flex items-center justify-center rounded-lg font-bold text-xl">
            A
          </div>
          <h1 className="text-xl font-bold text-slate-800">Admin Panel</h1>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
          >
            Home
          </Link>
          <button
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
