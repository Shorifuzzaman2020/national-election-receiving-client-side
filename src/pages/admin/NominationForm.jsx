// import React from 'react';

// const NominationForm = () => {
//     return (
//         <div>
            
//         </div>
//     );
// };

// export default NominationForm;

// import AdminLayout from "../../layouts/AdminLayout";
// import { Link } from "react-router-dom";

// export default function NominationForm() {
//   return (
//     <AdminLayout>
//       <div className="space-y-10">

//         {/* Header */}
//         <div className="flex justify-between items-center">
//           <Link
//             to="/admin"
//             className="border px-5 py-2 rounded-md hover:bg-gray-100"
//           >
//             Go Home
//           </Link>

//           <h1 className="text-2xl font-bold">Nomination Form</h1>

//           <button className="border px-5 py-2 rounded-md hover:bg-gray-100">
//             Log Out
//           </button>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-center gap-10 mt-16">
//           <button className="px-10 py-4 text-lg border-2 border-black rounded-xl hover:bg-black hover:text-white transition">
//             Publish Form
//           </button>

//           <button className="px-10 py-4 text-lg border-2 border-black rounded-xl hover:bg-black hover:text-white transition">
//             Unpublish Now
//           </button>
//         </div>

//       </div>
//     </AdminLayout>
//   );
// }


import AdminLayout from "../../layouts/AdminLayout";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export default function NominationForm() {

  const publish = async () => {
    await axios.post("https://server-voting-app.vercel.app/admin/publish");
    alert("Nomination Form Published");
  };

  const unpublish = async () => {
    await axios.post("https://server-voting-app.vercel.app/admin/unpublish");
    alert("Nomination Form Closed");
  };
  const logout = () => {
        localStorage.removeItem("token");
        Navigate("/admin-login");
    };


  return (
    <AdminLayout>
      <div className="space-y-10">

        {/* Header */}
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="border px-5 py-2 rounded-md hover:bg-gray-100"
          >
            Go Home
          </Link>

          <h1 className="text-2xl font-bold">Nomination Form</h1>

          <button onClick={logout} className="border px-5 py-2 rounded-md hover:bg-gray-100">
            Log Out
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-10 mt-16">
          <button
            onClick={publish}
            className="px-10 py-4 text-lg border-2 border-black rounded-xl hover:bg-black hover:text-white transition"
          >
            Publish Form
          </button>
          <button
            onClick={unpublish}
            className="px-10 py-4 text-lg border-2 border-black rounded-xl hover:bg-black hover:text-white transition"
          >
            Unpublish Now
          </button>
        </div>

      </div>
    </AdminLayout>
  );
}
