import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VoterLogin() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Enter Voter ID, 2: Enter Code
    const [voterId, setVoterId] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailMasked, setEmailMasked] = useState("");
    const [countdown, setCountdown] = useState(0);

    const handleVoterIdSubmit = async (e) => {
        e.preventDefault();
        if (!voterId.trim()) {
            toast.error("Please enter your Voter ID");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("https://server-voting-app.vercel.app/api/voter/send-code", {
                voterId
            });

            if (response.data.success) {
                setEmailMasked(response.data.emailMasked);
                setStep(2);
                startCountdown(300); // 5 minutes
                toast.success("Verification code sent to your email");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send verification code");
        } finally {
            setLoading(false);
        }
    };

    const handleCodeSubmit = async (e) => {
        e.preventDefault();
        if (!code.trim() || code.length !== 6) {
            toast.error("Please enter the 6-digit verification code");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("https://server-voting-app.vercel.app/api/voter/login", {
                voterId,
                code
            });

            if (response.data.success) {
                // Save token and voter info
                localStorage.setItem("voterToken", response.data.token);
                localStorage.setItem("voterInfo", JSON.stringify(response.data.voter));
                localStorage.setItem("electionInfo", JSON.stringify(response.data.election));
                //update for protected route
                localStorage.setItem("voterToken", response.data.token);
                localStorage.setItem("role", "voter");
                //end for test purpose
                toast.success("Login successful!");
                navigate("/voter/dashboard");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const resendCode = async () => {
        if (countdown > 0) {
            toast.error(`Please wait ${countdown} seconds before resending`);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("https://server-voting-app.vercel.app/api/voter/send-code", {
                voterId
            });

            if (response.data.success) {
                startCountdown(300); // 5 minutes
                toast.success("New verification code sent");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to resend code");
        } finally {
            setLoading(false);
        }
    };

    const startCountdown = (seconds) => {
        setCountdown(seconds);
        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-full">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                    <h1 className="text-2xl font-bold text-white text-center">
                        Voter Login
                    </h1>
                    <p className="text-blue-100 text-center mt-2">
                        Secure access to the election system
                    </p>
                </div>

                {/* Form */}
                <div className="p-6">
                    {step === 1 ? (
                        <form onSubmit={handleVoterIdSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Voter ID
                                </label>
                                <input
                                    type="text"
                                    value={voterId}
                                    onChange={(e) => setVoterId(e.target.value)}
                                    placeholder="Enter your Voter ID"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    disabled={loading}
                                />
                                <p className="text-sm text-gray-500 mt-2">
                                    Enter the Voter ID provided during registration
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending Code...
                                    </span>
                                ) : "Send Verification Code"}
                            </button>

                            <div className="text-center">
                                <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm">
                                    ← Back to Home
                                </Link>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleCodeSubmit} className="space-y-6">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-gray-700 text-sm font-medium">
                                        Verification Code
                                    </label>
                                    {countdown > 0 && (
                                        <span className="text-sm text-red-600 font-medium">
                                            Expires in: {formatTime(countdown)}
                                        </span>
                                    )}
                                </div>

                                <input
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    placeholder="Enter 6-digit code"
                                    className="w-full px-4 py-3 text-center text-2xl font-bold tracking-widest border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    maxLength={6}
                                    disabled={loading}
                                />

                                <p className="text-sm text-gray-500 mt-2">
                                    Enter the 6-digit code sent to {emailMasked}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <button
                                    type="submit"
                                    disabled={loading || code.length !== 6}
                                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Verifying...
                                        </span>
                                    ) : "Verify & Login"}
                                </button>

                                <button
                                    type="button"
                                    onClick={resendCode}
                                    disabled={loading || countdown > 0}
                                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50"
                                >
                                    Resend Code {countdown > 0 && `(${formatTime(countdown)})`}
                                </button>
                            </div>

                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setStep(1);
                                        setCode("");
                                        setCountdown(0);
                                    }}
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                    ← Use different Voter ID
                                </button>

                                <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm">
                                    Back to Home
                                </Link>
                            </div>
                        </form>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 p-4 border-t">
                    <p className="text-center text-sm text-gray-500">
                        Need help?{" "}
                        <a href="mailto:support@election.com" className="text-blue-600 hover:underline">
                            Contact Support
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}