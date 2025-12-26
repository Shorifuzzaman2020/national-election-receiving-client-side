// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function CreateElection() {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({
//         name: "",
//         position: "",
//         description: "",
//         startDate: "",
//         endDate: ""
//     });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         if (!formData.name.trim() || !formData.position.trim()) {
//             toast.error("Election name and position are required");
//             return;
//         }

//         setLoading(true);
//         try {
//             const response = await axios.post("http://localhost:5000/api/admin/create-election", formData);
            
//             if (response.data.success) {
//                 toast.success("Election created successfully!");
//                 setTimeout(() => {
//                     navigate("/admin/dashboard");
//                 }, 1500);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Failed to create election");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
//             <ToastContainer position="top-right" autoClose={3000} />
            
//             <div className="max-w-4xl mx-auto">
//                 {/* Header */}
//                 <div className="mb-8">
//                     <button
//                         onClick={() => navigate("/admin/dashboard")}
//                         className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
//                     >
//                         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                         </svg>
//                         Back to Dashboard
//                     </button>
                    
//                     <div className="bg-white rounded-xl shadow-lg p-6">
//                         <h1 className="text-3xl font-bold text-gray-800">Create New Election</h1>
//                         <p className="text-gray-600 mt-2">Set up a new election with required details</p>
//                     </div>
//                 </div>

//                 {/* Form */}
//                 <div className="bg-white rounded-xl shadow-lg p-6">
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         {/* Election Name */}
//                         <div>
//                             <label className="block text-gray-700 text-sm font-medium mb-2">
//                                 Election Name *
//                             </label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 placeholder="e.g., General Election 2025, Student Council Election"
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                                 required
//                             />
//                             <p className="text-sm text-gray-500 mt-1">
//                                 Give a descriptive name for the election
//                             </p>
//                         </div>

//                         {/* Position */}
//                         <div>
//                             <label className="block text-gray-700 text-sm font-medium mb-2">
//                                 Position *
//                             </label>
//                             <input
//                                 type="text"
//                                 name="position"
//                                 value={formData.position}
//                                 onChange={handleChange}
//                                 placeholder="e.g., President, Mayor, Secretary"
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                                 required
//                             />
//                             <p className="text-sm text-gray-500 mt-1">
//                                 The position candidates are running for
//                             </p>
//                         </div>

//                         {/* Description */}
//                         <div>
//                             <label className="block text-gray-700 text-sm font-medium mb-2">
//                                 Description
//                             </label>
//                             <textarea
//                                 name="description"
//                                 value={formData.description}
//                                 onChange={handleChange}
//                                 rows="4"
//                                 placeholder="Describe the election purpose, rules, and important information..."
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                             ></textarea>
//                         </div>

//                         {/* Dates */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label className="block text-gray-700 text-sm font-medium mb-2">
//                                     Start Date (Optional)
//                                 </label>
//                                 <input
//                                     type="date"
//                                     name="startDate"
//                                     value={formData.startDate}
//                                     onChange={handleChange}
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-gray-700 text-sm font-medium mb-2">
//                                     End Date (Optional)
//                                 </label>
//                                 <input
//                                     type="date"
//                                     name="endDate"
//                                     value={formData.endDate}
//                                     onChange={handleChange}
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                                 />
//                             </div>
//                         </div>

//                         {/* Important Notes */}
//                         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                             <div className="flex items-start">
//                                 <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                                 <div>
//                                     <p className="text-blue-800 font-medium">Important Notes:</p>
//                                     <ul className="text-blue-700 text-sm list-disc list-inside mt-1 space-y-1">
//                                         <li>After creating election, you need to approve candidates</li>
//                                         <li>Start voting only after approving candidates</li>
//                                         <li>Once voting ends, results become final</li>
//                                         <li>You can create only one active election at a time</li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Buttons */}
//                         <div className="flex justify-end space-x-4 pt-4">
//                             <button
//                                 type="button"
//                                 onClick={() => navigate("/admin/dashboard")}
//                                 className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
//                                 disabled={loading}
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 disabled={loading}
//                                 className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
//                             >
//                                 {loading ? (
//                                     <span className="flex items-center">
//                                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                         </svg>
//                                         Creating...
//                                     </span>
//                                 ) : "Create Election"}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateElection() {
    const navigate = useNavigate();

    const startVoting = async () => {
        await axios.post("http://localhost:5000/admin/start-voting");
        alert("Voting Started");
    };

    const endVoting = async () => {
        await axios.post("http://localhost:5000/admin/end-voting");
        alert("Voting Ended");
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/admin/login");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Top Bar */}
            <div className="flex justify-between items-center border p-4 bg-white shadow">
                <button
                    onClick={() => navigate("/")}
                    className="border px-4 py-2 rounded"
                >
                    Go Home
                </button>

                <h1 className="text-2xl font-bold">Admin Dashboard</h1>

                <button
                    onClick={logout}
                    className="border px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>

            {/* Create Election */}
            <div className="mt-20 text-center">
                <h2 className="text-xl font-semibold mb-12">Create Election</h2>

                <div className="flex justify-center gap-16">
                    <button
                        onClick={startVoting}
                        className="px-12 py-6 text-xl border-2 border-black rounded-lg hover:bg-black hover:text-white transition"
                    >
                        Start Voting
                    </button>

                    <button
                        onClick={endVoting}
                        className="px-12 py-6 text-xl border-2 border-black rounded-lg hover:bg-black hover:text-white transition"
                    >
                        End Voting
                    </button>
                </div>
            </div>
        </div>
    );
}
