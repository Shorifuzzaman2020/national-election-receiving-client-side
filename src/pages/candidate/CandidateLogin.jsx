// import axios from "axios";
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// export default function CandidateLogin() {
//     const navigate = useNavigate();

//     const [form, setForm] = useState({
//         email: "",
//         password: ""
//     });

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError("");

//         try {
//             const response = await axios.post(
//                 "https://server-voting-app.vercel.app/api/candidate/login",
//                 form
//             );

//             if (response.data.success) {
//                 // Save token
//                 localStorage.setItem("candidateToken", response.data.token);

//                 // Save candidate info
//                 localStorage.setItem("candidateInfo", JSON.stringify(response.data.candidate));

//                 // Redirect to dashboard
//                 navigate("/candidate/dashboard");
//             }
//         } catch (err) {
//             console.error("Login error:", err);
//             setError(err.response?.data?.message || "Login failed. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
//             <div className="bg-white p-8 w-full max-w-md space-y-6 rounded-2xl shadow-2xl">

//                 <div className="text-center">
//                     <h2 className="text-3xl font-bold text-gray-800">Candidate Login</h2>
//                     <p className="text-gray-600 mt-2">Access your nomination dashboard</p>
//                 </div>

//                 {error && (
//                     <div className="bg-red-50 border-l-4 border-red-500 p-4">
//                         <div className="flex">
//                             <div className="flex-shrink-0">
//                                 <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                                 </svg>
//                             </div>
//                             <div className="ml-3">
//                                 <p className="text-sm text-red-700">{error}</p>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-gray-700 text-sm font-medium mb-1">
//                             Email Address
//                         </label>
//                         <input
//                             type="email"
//                             required
//                             placeholder="Enter your registered email"
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                             value={form.email}
//                             onChange={(e) => setForm({ ...form, email: e.target.value })}
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-gray-700 text-sm font-medium mb-1">
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             required
//                             placeholder="Enter your password"
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                             value={form.password}
//                             onChange={(e) => setForm({ ...form, password: e.target.value })}
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
//                     >
//                         {loading ? (
//                             <span className="flex items-center justify-center">
//                                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                 </svg>
//                                 Logging in...
//                             </span>
//                         ) : "Login"}
//                     </button>
//                 </form>

//                 <div className="text-center space-y-3">
//                     <p className="text-gray-600">
//                         Don't have a nomination?{" "}
//                         <Link to="/nominate" className="text-blue-600 hover:text-blue-800 font-medium">
//                             Apply for Nomination
//                         </Link>
//                     </p>
//                     <p className="text-gray-600">
//                         Not registered yet?{" "}
//                         <Link to="/candidate/register" className="text-blue-600 hover:text-blue-800 font-medium">
//                             Register as Candidate
//                         </Link>
//                     </p>
//                     <p className="text-sm text-gray-500">
//                         Having trouble?{" "}
//                         <a href="mailto:support@election.com" className="text-blue-500 hover:underline">
//                             Contact Support
//                         </a>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }


// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function CandidateLogin() {

//     const [email, setEmail] = useState("");
//     const navigate = useNavigate();

//     const submit = async () => {
//         try {
//             const res = await axios.post("https://server-voting-app.vercel.app/candidate/login", { email });

//             if (res.data.success) {
//                 localStorage.setItem("token", res.data.token);
//                 localStorage.setItem("nominationId", res.data.nominationId);

//                 navigate("/candidate/dashboard");
//             }
//         } catch (err) {
//             alert(err.response?.data?.message || "Login failed");
//         }
//     };

//     return (
//         <div className="min-h-screen flex justify-center items-center bg-gray-100">
//             <div className="bg-white p-8 w-full max-w-md space-y-4 rounded shadow">

//                 <h2 className="text-xl font-bold text-center">Candidate Login</h2>

//                 <input
//                     placeholder="Enter your Email"
//                     className="w-full p-3 border rounded"
//                     onChange={e => setEmail(e.target.value)}
//                 />

//                 <button onClick={submit} className="w-full bg-green-700 text-white py-2 rounded">
//                     Login
//                 </button>

//             </div>
//         </div>
//     );
// }


import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CandidateLogin() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const sendCode = async () => {
        try {
            await axios.post("https://server-voting-app.vercel.app/candidate/send-code", { email });
            alert("OTP sent to your email");
        } catch (err) {
            alert(err.response?.data?.error || "Not a candidate");
        }
    };

    const submit = async () => {
        try {
            const res = await axios.post("https://server-voting-app.vercel.app/candidate/login", { email, code });

            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("nominationId", res.data.nominationId);
                //update for protected route
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", "candidate");
                //end for test purpose
                navigate("/candidate/dashboard");
            }
        } catch (err) {
            alert(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 w-full max-w-md space-y-4 rounded shadow">

                <h2 className="text-xl font-bold text-center">Candidate Login</h2>

                <input
                    placeholder="Candidate Email"
                    className="w-full p-3 border rounded"
                    onChange={e => setEmail(e.target.value)}
                />

                <div className="flex gap-2">
                    <input
                        placeholder="Enter OTP"
                        className="flex-1 p-3 border rounded"
                        onChange={e => setCode(e.target.value)}
                    />
                    <button onClick={sendCode} className="bg-gray-700 text-white px-4 rounded">
                        Get Code
                    </button>
                </div>

                <button onClick={submit} className="w-full bg-green-700 text-white py-2 rounded">
                    Login
                </button>

            </div>
        </div>
    );
}
