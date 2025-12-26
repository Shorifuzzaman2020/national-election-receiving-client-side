import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CandidateDashboard() {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) return navigate("/candidate/login");

        axios.get("http://localhost:5000/candidate/profile", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setProfile(res.data))
        .catch(() => {
            localStorage.clear();
            navigate("/candidate/login");
        });
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/candidate-login");
    };

    if (!profile) return <div className="p-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Candidate Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">
                            Welcome, {profile.candidate.name}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Status Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Nomination Status</h2>
                        <p className="text-gray-600">Check your nomination application status</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full ${
                        profile.nomination.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : profile.nomination.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                    }`}>
                        {profile.nomination.status}
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Candidate Information</h3>
                        <p><b>Full Name:</b> {profile.candidate.name}</p>
                        <p><b>Email:</b> {profile.candidate.email}</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Nomination Details</h3>
                        <p><b>Nomination ID:</b> {profile.nomination.nominationId}</p>
                        <p><b>Symbol:</b> {profile.nomination.symbol}</p>
                        <p><b>Applied On:</b> {new Date(profile.nomination.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Actions */}
                {profile.nomination.status === "Approved" && (
                    <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">See Result</h3>
                        <div className="flex gap-4">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded">Result</button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
