
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VotingResultTable from "../VotingResultTable";

export default function VoterDashboard() {
    const navigate = useNavigate();

    const [voter, setVoter] = useState(null);
    const [votingStatus, setVotingStatus] = useState("NOT_STARTED");
    const [hasVoted, setHasVoted] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("voterToken");
        if (!token) return navigate("/voter/login");
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("voterToken");

            // Get voter profile
            const profileRes = await axios.get(
                "https://server-voting-app.vercel.app/api/voter/profile",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setVoter(profileRes.data.voter);
            setHasVoted(profileRes.data.votingStatus.hasVoted);

            // Get election status
            const statusRes = await axios.get(
                "https://server-voting-app.vercel.app/election/status"
            );

            const status = statusRes.data.votingStatus || "NOT_STARTED";
            setVotingStatus(status);

            // Load candidates only if voting started
            if (status === "Started") {
                const candRes = await axios.get(
                    "https://server-voting-app.vercel.app/api/voter/candidates",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setCandidates(candRes.data.candidates);
            }

            // Load results if voting ended
            if (status === "Ended") {
                const resultRes = await axios.get(
                    "https://server-voting-app.vercel.app/api/voter/results",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (resultRes.data.success) {
                    setResults(resultRes.data.results);
                }
            }
        } catch (err) {
            toast.error("Session expired");
            localStorage.clear();
            navigate("/voter/login");
        } finally {
            setLoading(false);
        }
    };


    const getSignImage = (sign) => {
        if (!sign) return "https://via.placeholder.com/150";

        const key = sign.toString().trim().toLowerCase();

        const map = {
            elephant:
                "https://i.ibb.co.com/FkW0CrPk/download.jpg",
            computer:
                "https://i.ibb.co.com/PGf5YNdh/3285193-l3-969584-1-7d4a3ed14e0768912edcbf5203cbdc63.jpg",
            rocket:
                "https://i.ibb.co.com/WWf8tQ53/a1b1595eb9ca9d8b8a2f83d48171f142.jpg",
            pen:
                "https://i.ibb.co.com/r2RgzNcH/istockphoto-158424399-612x612.jpg",
            horse:
                "https://i.ibb.co.com/TxhvmqSw/cz-Nmcy1wcml2-YXRl-L3-Jhd3-Bpe-GVs-X2lt-YWdlcy93-ZWJza-XRl-X2-Nvbn-Rlbn-Qv-Zn-Job3-Jz-ZV9n-YWxsb3-Bf-Y2-Fud.jpg",
        };

        return map[key] || "https://via.placeholder.com/150";
    };


    const submitVote = async () => {
        if (!selectedCandidate) return toast.error("Select a candidate first");

        if (
            !window.confirm(`Confirm your vote for ${selectedCandidate.name}?`)
        )
            return;

        try {
            setSubmitting(true);

            await axios.patch(
                "https://server-voting-app.vercel.app/api/vote",
                {
                    voterId: voter.voterId,
                    nominationId: selectedCandidate.nominationId,
                }
            );

            toast.success("Vote submitted successfully!");
            setSelectedCandidate(null);
            loadDashboard();
        } catch (err) {
            toast.error(err.response?.data?.message || "Vote failed");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading)
        return (
            <div className="h-screen flex items-center justify-center">
                Loading...
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-100">
            <ToastContainer />

            <header className="bg-white p-4 shadow flex justify-between">
                <div>
                    <h1 className="text-xl font-bold">Voter Dashboard</h1>
                    <p>Welcome, {voter.name}</p>
                </div>
                <button
                    onClick={() => {
                        localStorage.clear();
                        navigate("/voter/login");
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </header>

            <main className="max-w-5xl mx-auto p-8">
                {/* Status message */}
                {votingStatus !== "Started" && (
                    <div className="bg-white p-10 rounded shadow text-center text-xl">
                        {votingStatus === "NOT_STARTED" &&
                            "🕒 Voting has not started yet"}
                        {votingStatus === "Ended" && "🛑 Voting has ended"}
                    </div>
                )}

                {/* Show results when ended */}
                {votingStatus === "Ended" && results.length > 0 && (

                    <VotingResultTable
                        results={results}
                        voterAddress={voter.district}
                    />

                )}

                {/* If voting started but already voted */}
                {votingStatus === "Started" && hasVoted && (
                    <div className="bg-white p-10 rounded shadow text-center text-xl text-green-600 font-bold">
                        ✅ You have already voted. Thank you!
                    </div>
                )}

                {/* Voting UI only if NOT voted */}
                {votingStatus === "Started" && !hasVoted && (
                    <div className="bg-white p-10 rounded shadow">
                        <h2 className="text-2xl font-bold mb-6 text-center">
                            Cast Your Vote
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-center">
                            {candidates
                                .filter(
                                    (c) => c.address === voter.district
                                )
                                .map((c) => (
                                    <div
                                        key={c._id}
                                        onClick={() =>
                                            setSelectedCandidate(c)
                                        }
                                        className="cursor-pointer flex flex-col items-center"
                                    >
                                        <div
                                            className={`w-28 h-28 rounded-full border-4 flex items-center justify-center overflow-hidden
                      ${selectedCandidate?.nominationId ===
                                                    c.nominationId
                                                    ? "border-blue-600 bg-blue-100"
                                                    : "border-gray-400 hover:border-blue-400"
                                                }`}
                                        >
                                            <img
                                                src={getSignImage(c.sign)}
                                                alt={c.sign}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <p className="mt-2 text-sm text-gray-600">
                                            {c.position}
                                        </p>
                                    </div>
                                ))}
                        </div>


                        {selectedCandidate && (
                            <div className="text-center mt-10">
                                <button
                                    onClick={submitVote}
                                    disabled={submitting}
                                    className="bg-blue-600 text-white px-10 py-3 rounded text-lg"
                                >
                                    {submitting
                                        ? "Submitting..."
                                        : "Confirm Vote"}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
