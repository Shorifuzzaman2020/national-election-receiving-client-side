// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function VoterDashboard() {
//     const navigate = useNavigate();
//     const [voter, setVoter] = useState(null);
//     const [election, setElection] = useState(null);
//     const [candidates, setCandidates] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedCandidate, setSelectedCandidate] = useState(null);
//     const [voting, setVoting] = useState(false);
//     const [results, setResults] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem("voterToken");
//         if (!token) {
//             navigate("/voter/login");
//             return;
//         }

//         fetchDashboardData();
//     }, [navigate]);

//     const fetchDashboardData = async () => {
//         try {
//             setLoading(true);

//             // Fetch voter profile
//             const profileRes = await axios.get("https://server-voting-app.vercel.app/api/voter/profile", {
//                 headers: { Authorization: `Bearer ${localStorage.getItem("voterToken")}` }
//             });

//             if (profileRes.data.success) {
//                 setVoter(profileRes.data.voter);

//                 // Store voting status
//                 const votingStatus = profileRes.data.votingStatus;

//                 // If voting is open and voter hasn't voted, fetch candidates
//                 if (votingStatus.votingOpen && !votingStatus.hasVoted) {
//                     const candidatesRes = await axios.get("https://server-voting-app.vercel.app/api/voter/candidates");
//                     if (candidatesRes.data.success) {
//                         setCandidates(candidatesRes.data.candidates);
//                     }
//                 }

//                 // If election is finished, fetch results
//                 if (votingStatus.electionFinished) {
//                     const resultsRes = await axios.get("https://server-voting-app.vercel.app/api/voter/results");
//                     if (resultsRes.data.success) {
//                         setResults(resultsRes.data);
//                     }
//                 }
//             }
//         } catch (error) {
//             console.error("Dashboard error:", error);
//             if (error.response?.status === 401) {
//                 localStorage.removeItem("voterToken");
//                 localStorage.removeItem("voterInfo");
//                 navigate("/voter/login");
//             }
//             toast.error("Failed to load dashboard");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleVote = async () => {
//         if (!selectedCandidate) {
//             toast.error("Please select a candidate");
//             return;
//         }

//         if (!window.confirm(`Are you sure you want to vote for ${selectedCandidate.name}? This action cannot be undone.`)) {
//             return;
//         }

//         setVoting(true);
//         try {
//             const response = await axios.post("https://server-voting-app.vercel.app/api/voter/vote", {
//                 voterId: voter.voterId,
//                 candidateId: selectedCandidate.id
//             });

//             if (response.data.success) {
//                 toast.success("Vote submitted successfully!");

//                 // Refresh dashboard
//                 fetchDashboardData();

//                 // Clear selection
//                 setSelectedCandidate(null);
//                 setCandidates([]);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Failed to submit vote");
//         } finally {
//             setVoting(false);
//         }
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("voterToken");
//         localStorage.removeItem("voterInfo");
//         localStorage.removeItem("electionInfo");
//         navigate("/voter/login");
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <ToastContainer position="top-right" autoClose={3000} />

//             {/* Header */}
//             <header className="bg-white shadow">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//                     <div className="flex flex-col md:flex-row md:items-center justify-between">
//                         <div>
//                             <h1 className="text-2xl font-bold text-gray-800">Voter Dashboard</h1>
//                             <p className="text-gray-600">Welcome back, {voter?.name}</p>
//                         </div>
//                         <div className="flex items-center space-x-4 mt-4 md:mt-0">
//                             <span className="text-gray-600">
//                                 Voter ID: <span className="font-bold">{voter?.voterId}</span>
//                             </span>
//                             <button
//                                 onClick={handleLogout}
//                                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//                             >
//                                 Logout
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </header>

//             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 {/* Voter Info Card */}
//                 <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                         <div className="bg-blue-50 p-4 rounded-lg">
//                             <h3 className="text-sm font-medium text-blue-800">Voter ID</h3>
//                             <p className="text-xl font-bold text-blue-900">{voter?.voterId}</p>
//                         </div>
//                         <div className="bg-green-50 p-4 rounded-lg">
//                             <h3 className="text-sm font-medium text-green-800">Status</h3>
//                             <p className="text-xl font-bold text-green-900">Active</p>
//                         </div>
//                         <div className="bg-purple-50 p-4 rounded-lg">
//                             <h3 className="text-sm font-medium text-purple-800">District</h3>
//                             <p className="text-xl font-bold text-purple-900">{voter?.district}</p>
//                         </div>
//                         <div className="bg-red-50 p-4 rounded-lg">
//                             <h3 className="text-sm font-medium text-red-800">Voting Status</h3>
//                             <p className="text-xl font-bold text-red-900">
//                                 {voter?.hasVoted ? "Already Voted" : "Not Voted Yet"}
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Voting Section */}
//                 {!voter?.hasVoted && candidates.length > 0 && (
//                     <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//                         <div className="flex items-center justify-between mb-6">
//                             <div>
//                                 <h2 className="text-xl font-bold text-gray-800">Cast Your Vote</h2>
//                                 <p className="text-gray-600">Select your preferred candidate</p>
//                             </div>
//                             <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
//                                 Voting Open
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {candidates.map(candidate => (
//                                 <div
//                                     key={candidate.id}
//                                     className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
//                                         selectedCandidate?.id === candidate.id
//                                             ? "border-blue-500 bg-blue-50"
//                                             : "border-gray-200 hover:border-blue-300"
//                                     }`}
//                                     onClick={() => setSelectedCandidate(candidate)}
//                                 >
//                                     <div className="flex items-center justify-between mb-3">
//                                         <h3 className="text-lg font-semibold text-gray-800">
//                                             {candidate.name}
//                                         </h3>
//                                         {selectedCandidate?.id === candidate.id && (
//                                             <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
//                                                 <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                                                 </svg>
//                                             </div>
//                                         )}
//                                     </div>
//                                     <div className="space-y-2">
//                                         <p className="text-sm text-gray-600">
//                                             <span className="font-medium">Position:</span> {candidate.position}
//                                         </p>
//                                         <p className="text-sm text-gray-600">
//                                             <span className="font-medium">Symbol:</span> {candidate.symbol}
//                                         </p>
//                                         <p className="text-sm text-gray-600">
//                                             <span className="font-medium">Nomination ID:</span> {candidate.nominationId}
//                                         </p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {selectedCandidate && (
//                             <div className="mt-8 p-4 bg-blue-50 rounded-lg">
//                                 <div className="flex flex-col md:flex-row md:items-center justify-between">
//                                     <div>
//                                         <p className="text-blue-800 font-medium">
//                                             Selected Candidate: <span className="font-bold">{selectedCandidate.name}</span>
//                                         </p>
//                                         <p className="text-blue-700 text-sm">
//                                             Position: {selectedCandidate.position}
//                                         </p>
//                                     </div>
//                                     <button
//                                         onClick={handleVote}
//                                         disabled={voting}
//                                         className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
//                                     >
//                                         {voting ? (
//                                             <span className="flex items-center">
//                                                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                                 </svg>
//                                                 Submitting Vote...
//                                             </span>
//                                         ) : "Confirm Vote"}
//                                     </button>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 )}

//                 {/* Voting Not Available */}
//                 {!voter?.hasVoted && candidates.length === 0 && (
//                     <div className="bg-white rounded-xl shadow-lg p-8 text-center">
//                         <div className="max-w-md mx-auto">
//                             <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                                 <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-800 mb-2">
//                                 Voting Not Available
//                             </h3>
//                             <p className="text-gray-600 mb-6">
//                                 {results ? "Voting has ended. Check the results below." : "Voting is not open yet or has not started. Please check back later."}
//                             </p>
//                             <button
//                                 onClick={fetchDashboardData}
//                                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                             >
//                                 Refresh Status
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 {/* Already Voted Message */}
//                 {voter?.hasVoted && (
//                     <div className="bg-white rounded-xl shadow-lg p-8 text-center">
//                         <div className="max-w-md mx-auto">
//                             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                                 <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-800 mb-2">
//                                 Vote Submitted Successfully!
//                             </h3>
//                             <p className="text-gray-600 mb-6">
//                                 Thank you for participating in the election. Your vote has been recorded.
//                             </p>
//                             {results ? (
//                                 <button
//                                     onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
//                                     className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//                                 >
//                                     View Results
//                                 </button>
//                             ) : (
//                                 <button
//                                     onClick={fetchDashboardData}
//                                     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                                 >
//                                     Check Results
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {/* Election Results */}
//                 {results && (
//                     <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
//                         <div className="flex items-center justify-between mb-6">
//                             <div>
//                                 <h2 className="text-xl font-bold text-gray-800">Election Results</h2>
//                                 <p className="text-gray-600">Final results for {results.election.name}</p>
//                             </div>
//                             <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
//                                 Final Results
//                             </div>
//                         </div>

//                         <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                 <div className="text-center">
//                                     <p className="text-sm text-gray-600">Total Votes</p>
//                                     <p className="text-2xl font-bold text-gray-800">{results.election.totalVotes}</p>
//                                 </div>
//                                 <div className="text-center">
//                                     <p className="text-sm text-gray-600">Position</p>
//                                     <p className="text-2xl font-bold text-gray-800">{results.election.position}</p>
//                                 </div>
//                                 <div className="text-center">
//                                     <p className="text-sm text-gray-600">Status</p>
//                                     <p className="text-2xl font-bold text-green-600">Completed</p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="space-y-4">
//                             {results.results.map((candidate, index) => (
//                                 <div key={candidate._id} className="border border-gray-200 rounded-lg p-4">
//                                     <div className="flex items-center justify-between mb-2">
//                                         <div className="flex items-center">
//                                             <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold mr-3">
//                                                 {index + 1}
//                                             </div>
//                                             <div>
//                                                 <h3 className="font-semibold text-gray-800">{candidate.candidateName}</h3>
//                                                 <p className="text-sm text-gray-600">{candidate.candidatePosition}</p>
//                                             </div>
//                                         </div>
//                                         <div className="text-right">
//                                             <p className="text-2xl font-bold text-gray-800">{candidate.totalVotes} votes</p>
//                                             <p className="text-sm text-gray-600">{candidate.percentage}%</p>
//                                         </div>
//                                     </div>
//                                     <div className="w-full bg-gray-200 rounded-full h-2">
//                                         <div 
//                                             className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
//                                             style={{ width: `${candidate.percentage}%` }}
//                                         ></div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {!voter?.hasVoted && (
//                             <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//                                 <div className="flex items-center">
//                                     <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.795-.833-2.565 0L4.33 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                                     </svg>
//                                     <p className="text-yellow-800">
//                                         You did not vote in this election. Results are now final.
//                                     </p>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// }






// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function VoterDashboard() {
//     const navigate = useNavigate();
//     const [voter, setVoter] = useState(null);
//     const [candidates, setCandidates] = useState([]);
//     const [results, setResults] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [voting, setVoting] = useState(false);
//     const [selectedCandidate, setSelectedCandidate] = useState(null);
//     const [electionStatus, setElectionStatus] = useState({
//         votingStatus: "NOT_STARTED",
//         nominationOpen: false
//     });

//     useEffect(() => {
//         const token = localStorage.getItem("voterToken");
//         if (!token) {
//             toast.error("Please login first");
//             navigate("/voter/login");
//             return;
//         }
//         fetchDashboardData();
//     }, [navigate]);

//     const fetchDashboardData = async () => {
//         try {
//             setLoading(true);
//             const token = localStorage.getItem("voterToken");

//             // 1. Fetch election status directly from elections collection
//             const statusRes = await axios.get("https://server-voting-app.vercel.app/api/election/status");

//             if (statusRes.data.success) {
//                 const electionData = statusRes.data.election || {};
//                 setElectionStatus({
//                     votingStatus: electionData.votingStatus || "NOT_STARTED",
//                     nominationOpen: electionData.nominationOpen || false
//                 });

//                 // 2. Fetch voter profile
//                 const profileRes = await axios.get("https://server-voting-app.vercel.app/api/voter/profile", {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });

//                 if (profileRes.data.success) {
//                     setVoter(profileRes.data.voter);
//                     const hasVoted = profileRes.data.voter?.hasVoted || false;

//                     // 3. If voting is active (Started), fetch approved candidates
//                     if (electionData.votingStatus === "Started" && !hasVoted) {
//                         const candidatesRes = await axios.get("https://server-voting-app.vercel.app/api/voter/candidates");
//                         if (candidatesRes.data.success) {
//                             setCandidates(candidatesRes.data.candidates || []);
//                         }
//                     }

//                     // 4. If voting has ended (Ended), fetch results
//                     if (electionData.votingStatus === "Ended") {
//                         const resultsRes = await axios.get("https://server-voting-app.vercel.app/api/voter/results", {
//                             headers: { Authorization: `Bearer ${token}` }
//                         });
//                         if (resultsRes.data.success) {
//                             setResults(resultsRes.data);
//                         }
//                     }
//                 }
//             }
//         } catch (error) {
//             console.error("Dashboard error:", error);
//             if (error.response?.status === 401 || error.response?.status === 403) {
//                 localStorage.removeItem("voterToken");
//                 localStorage.removeItem("voterInfo");
//                 navigate("/voter/login");
//             } else {
//                 toast.error(error.response?.data?.message || "Failed to load dashboard");
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleVote = async () => {
//         if (!selectedCandidate) {
//             toast.error("Please select a candidate");
//             return;
//         }

//         if (!window.confirm(`Are you sure you want to vote for ${selectedCandidate.name}? This action cannot be undone.`)) {
//             return;
//         }

//         setVoting(true);
//         try {
//             const token = localStorage.getItem("voterToken");
//             const response = await axios.post(
//                 "https://server-voting-app.vercel.app/api/voter/vote",
//                 {
//                     voterId: voter.voterId,
//                     nominationId: selectedCandidate.nominationId // Use nominationId from candidates data
//                 },
//                 {
//                     headers: { Authorization: `Bearer ${token}` }
//                 }
//             );

//             if (response.data.success) {
//                 toast.success("Vote submitted successfully!");

//                 // Refresh dashboard data
//                 fetchDashboardData();

//                 // Clear selection
//                 setSelectedCandidate(null);
//                 setCandidates([]);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Failed to submit vote");
//         } finally {
//             setVoting(false);
//         }
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("voterToken");
//         localStorage.removeItem("voterInfo");
//         localStorage.removeItem("electionInfo");
//         navigate("/voter/login");
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//             </div>
//         );
//     }

//     // Determine what to show based on election status
//     const showCandidates = electionStatus.votingStatus === "Started";
//     const showResults = electionStatus.votingStatus === "Ended";
//     const showWaiting = electionStatus.votingStatus === "NOT_STARTED";
//     const hasVoted = voter?.hasVoted || false;

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <ToastContainer position="top-right" autoClose={3000} />

//             {/* Header */}
//             <header className="bg-white shadow">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//                     <div className="flex flex-col md:flex-row md:items-center justify-between">
//                         <div>
//                             <h1 className="text-2xl font-bold text-gray-800">Voter Dashboard</h1>
//                             <p className="text-gray-600">Welcome back, {voter?.name}</p>
//                         </div>
//                         <div className="flex items-center space-x-4 mt-4 md:mt-0">
//                             <div className={`px-3 py-1 rounded-full text-sm font-medium ${
//                                 electionStatus.votingStatus === "Started" ? "bg-green-100 text-green-800" :
//                                 electionStatus.votingStatus === "Ended" ? "bg-red-100 text-red-800" :
//                                 "bg-yellow-100 text-yellow-800"
//                             }`}>
//                                 {electionStatus.votingStatus === "Started" ? "Voting Active" :
//                                  electionStatus.votingStatus === "Ended" ? "Voting Ended" :
//                                  "Voting Not Started"}
//                             </div>
//                             <span className="text-gray-600">
//                                 ID: <span className="font-bold">{voter?.voterId}</span>
//                             </span>
//                             <button
//                                 onClick={handleLogout}
//                                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//                             >
//                                 Logout
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </header>

//             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 {/* Status Banner */}
//                 <div className={`mb-8 p-6 rounded-xl ${
//                     electionStatus.votingStatus === "Ended" ? 'bg-red-50 border-l-4 border-red-500' :
//                     electionStatus.votingStatus === "Started" ? 'bg-green-50 border-l-4 border-green-500' :
//                     'bg-yellow-50 border-l-4 border-yellow-500'
//                 }`}>
//                     <div className="flex items-center">
//                         <div className="flex-shrink-0">
//                             {electionStatus.votingStatus === "Ended" ? (
//                                 <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                             ) : electionStatus.votingStatus === "Started" ? (
//                                 <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
//                                 </svg>
//                             ) : (
//                                 <svg className="h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                             )}
//                         </div>
//                         <div className="ml-3">
//                             <p className={`text-lg font-medium ${
//                                 electionStatus.votingStatus === "Ended" ? 'text-red-800' :
//                                 electionStatus.votingStatus === "Started" ? 'text-green-800' :
//                                 'text-yellow-800'
//                             }`}>
//                                 {electionStatus.votingStatus === "Ended" ? 'Voting Has Ended' :
//                                  electionStatus.votingStatus === "Started" ? 'Voting is Active' :
//                                  'Waiting for Voting to Start'}
//                             </p>
//                             <p className={`mt-1 ${
//                                 electionStatus.votingStatus === "Ended" ? 'text-red-700' :
//                                 electionStatus.votingStatus === "Started" ? 'text-green-700' :
//                                 'text-yellow-700'
//                             }`}>
//                                 {electionStatus.votingStatus === "Ended" ? 'Results are now available' :
//                                  electionStatus.votingStatus === "Started" ? 'You can now cast your vote' :
//                                  'Please wait for the admin to start voting'}
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Voting Section - Show only if voting is Started AND voter hasn't voted */}
//                 {showCandidates && !hasVoted && (
//                     <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//                         <div className="flex items-center justify-between mb-6">
//                             <div>
//                                 <h2 className="text-xl font-bold text-gray-800">Cast Your Vote</h2>
//                                 <p className="text-gray-600">Select your preferred candidate</p>
//                             </div>
//                             <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
//                                 Voting Active
//                             </div>
//                         </div>

//                         {candidates.length === 0 ? (
//                             <div className="text-center py-12">
//                                 <div className="w-16 h-16 text-gray-400 mx-auto mb-4">
//                                     <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                     </svg>
//                                 </div>
//                                 <h3 className="text-xl font-medium text-gray-700 mb-2">No Approved Candidates</h3>
//                                 <p className="text-gray-500">There are no approved candidates for voting yet.</p>
//                             </div>
//                         ) : (
//                             <>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                                     {candidates.map(candidate => (
//                                         <div
//                                             key={candidate._id}
//                                             className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
//                                                 selectedCandidate?._id === candidate._id
//                                                     ? "border-blue-500 bg-blue-50"
//                                                     : "border-gray-200 hover:border-blue-300"
//                                             }`}
//                                             onClick={() => setSelectedCandidate(candidate)}
//                                         >
//                                             <div className="flex items-center justify-between mb-3">
//                                                 <h3 className="text-lg font-semibold text-gray-800">
//                                                     {candidate.name}
//                                                 </h3>
//                                                 {selectedCandidate?._id === candidate._id && (
//                                                     <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
//                                                         <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                                                         </svg>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                             <div className="space-y-2">
//                                                 <p className="text-sm text-gray-600">
//                                                     <span className="font-medium">Email:</span> {candidate.email}
//                                                 </p>
//                                                 {candidate.address && (
//                                                     <p className="text-sm text-gray-600">
//                                                         <span className="font-medium">Address:</span> {candidate.address}
//                                                     </p>
//                                                 )}
//                                                 {candidate.sign && (
//                                                     <p className="text-sm text-gray-600">
//                                                         <span className="font-medium">Symbol:</span> 
//                                                         <span className="ml-1 text-lg">
//                                                             {candidate.sign === "Elephant" && "🐘"}
//                                                             {candidate.sign === "Horse" && "🐎"}
//                                                             {candidate.sign === "Pen" && "✏️"}
//                                                             {candidate.sign === "Rocket" && "🚀"}
//                                                             {candidate.sign === "Computer" && "💻"}
//                                                         </span>
//                                                     </p>
//                                                 )}
//                                                 {candidate.nominationId && (
//                                                     <p className="text-sm text-gray-600">
//                                                         <span className="font-medium">Nomination ID:</span> {candidate.nominationId}
//                                                     </p>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 {selectedCandidate && (
//                                     <div className="mt-8 p-4 bg-blue-50 rounded-lg">
//                                         <div className="flex flex-col md:flex-row md:items-center justify-between">
//                                             <div>
//                                                 <p className="text-blue-800 font-medium">
//                                                     Selected Candidate: <span className="font-bold">{selectedCandidate.name}</span>
//                                                 </p>
//                                                 {selectedCandidate.sign && (
//                                                     <p className="text-blue-700 text-sm">
//                                                         Symbol: {selectedCandidate.sign === "Elephant" && "🐘 Elephant"}
//                                                         {selectedCandidate.sign === "Horse" && "🐎 Horse"}
//                                                         {selectedCandidate.sign === "Pen" && "✏️ Pen"}
//                                                         {selectedCandidate.sign === "Rocket" && "🚀 Rocket"}
//                                                         {selectedCandidate.sign === "Computer" && "💻 Computer"}
//                                                     </p>
//                                                 )}
//                                             </div>
//                                             <button
//                                                 onClick={handleVote}
//                                                 disabled={voting}
//                                                 className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
//                                             >
//                                                 {voting ? (
//                                                     <span className="flex items-center">
//                                                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                                         </svg>
//                                                         Submitting Vote...
//                                                     </span>
//                                                 ) : "Confirm Vote"}
//                                             </button>
//                                         </div>
//                                     </div>
//                                 )}
//                             </>
//                         )}
//                     </div>
//                 )}

//                 {/* Already Voted Message */}
//                 {hasVoted && (
//                     <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-8">
//                         <div className="max-w-md mx-auto">
//                             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                                 <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-800 mb-2">
//                                 Vote Submitted Successfully!
//                             </h3>
//                             <p className="text-gray-600 mb-6">
//                                 Thank you for participating in the election. Your vote has been recorded.
//                             </p>
//                             {showResults && (
//                                 <button
//                                     onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
//                                     className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//                                 >
//                                     View Results
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {/* Waiting for Voting Message */}
//                 {showWaiting && !hasVoted && (
//                     <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-8">
//                         <div className="max-w-md mx-auto">
//                             <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                                 <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-800 mb-2">
//                                 Voting Not Started Yet
//                             </h3>
//                             <p className="text-gray-600 mb-6">
//                                 The admin has not started voting yet. Please check back later.
//                             </p>
//                             <button
//                                 onClick={fetchDashboardData}
//                                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                             >
//                                 Refresh Status
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 {/* Results Section */}
//                 {showResults && results && (
//                     <div className="bg-white rounded-xl shadow-lg p-6">
//                         <div className="flex items-center justify-between mb-6">
//                             <div>
//                                 <h2 className="text-xl font-bold text-gray-800">Election Results</h2>
//                                 {results.election?.name && (
//                                     <p className="text-gray-600">Final results for {results.election.name}</p>
//                                 )}
//                             </div>
//                             <div className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium">
//                                 Voting Ended
//                             </div>
//                         </div>

//                         {results.results?.length > 0 ? (
//                             <>
//                                 <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//                                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                         <div className="text-center">
//                                             <p className="text-sm text-gray-600">Total Votes</p>
//                                             <p className="text-2xl font-bold text-gray-800">
//                                                 {results.election?.totalVotes || results.results.reduce((sum, r) => sum + (r.totalVotes || 0), 0)}
//                                             </p>
//                                         </div>
//                                         <div className="text-center">
//                                             <p className="text-sm text-gray-600">Position</p>
//                                             <p className="text-2xl font-bold text-gray-800">
//                                                 {results.election?.position || "Election"}
//                                             </p>
//                                         </div>
//                                         <div className="text-center">
//                                             <p className="text-sm text-gray-600">Status</p>
//                                             <p className="text-2xl font-bold text-red-600">Completed</p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="space-y-4">
//                                     {results.results.map((candidate, index) => (
//                                         <div key={candidate._id} className="border border-gray-200 rounded-lg p-4">
//                                             <div className="flex items-center justify-between mb-2">
//                                                 <div className="flex items-center">
//                                                     <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold mr-3">
//                                                         {index + 1}
//                                                     </div>
//                                                     <div>
//                                                         <h3 className="font-semibold text-gray-800">
//                                                             {candidate.candidateName || candidate.name}
//                                                         </h3>
//                                                         <div className="flex items-center mt-1">
//                                                             {candidate.sign && (
//                                                                 <span className="text-lg mr-2">
//                                                                     {candidate.sign === "Elephant" && "🐘"}
//                                                                     {candidate.sign === "Horse" && "🐎"}
//                                                                     {candidate.sign === "Pen" && "✏️"}
//                                                                     {candidate.sign === "Rocket" && "🚀"}
//                                                                     {candidate.sign === "Computer" && "💻"}
//                                                                 </span>
//                                                             )}
//                                                             <p className="text-sm text-gray-600">
//                                                                 {candidate.nominationId && `ID: ${candidate.nominationId}`}
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="text-right">
//                                                     <p className="text-2xl font-bold text-gray-800">
//                                                         {candidate.totalVotes || candidate.votes || 0} votes
//                                                     </p>
//                                                     {candidate.percentage && (
//                                                         <p className="text-sm text-gray-600">{candidate.percentage}%</p>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                             {candidate.percentage && (
//                                                 <div className="w-full bg-gray-200 rounded-full h-2">
//                                                     <div 
//                                                         className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
//                                                         style={{ width: `${candidate.percentage}%` }}
//                                                     ></div>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </>
//                         ) : (
//                             <div className="text-center py-12">
//                                 <div className="w-16 h-16 text-gray-400 mx-auto mb-4">
//                                     <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                                     </svg>
//                                 </div>
//                                 <h3 className="text-xl font-medium text-gray-700 mb-2">No Results Available</h3>
//                                 <p className="text-gray-500">Results will be published soon.</p>
//                             </div>
//                         )}

//                         {!hasVoted && (
//                             <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//                                 <div className="flex items-center">
//                                     <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.795-.833-2.565 0L4.33 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                                     </svg>
//                                     <p className="text-yellow-800">
//                                         You did not vote in this election.
//                                     </p>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 )}

//                 {/* Voter Information */}
//                 <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Information</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="space-y-3">
//                             <div>
//                                 <label className="text-sm text-gray-500">Full Name</label>
//                                 <p className="font-medium">{voter?.name}</p>
//                             </div>
//                             <div>
//                                 <label className="text-sm text-gray-500">Voter ID</label>
//                                 <p className="font-medium text-blue-600">{voter?.voterId}</p>
//                             </div>
//                             <div>
//                                 <label className="text-sm text-gray-500">Email</label>
//                                 <p className="font-medium">{voter?.email}</p>
//                             </div>
//                         </div>
//                         <div className="space-y-3">
//                             <div>
//                                 <label className="text-sm text-gray-500">Phone</label>
//                                 <p className="font-medium">{voter?.phone}</p>
//                             </div>
//                             <div>
//                                 <label className="text-sm text-gray-500">District</label>
//                                 <p className="font-medium">{voter?.district}</p>
//                             </div>
//                             <div>
//                                 <label className="text-sm text-gray-500">Voting Status</label>
//                                 <p className={`font-medium ${hasVoted ? 'text-green-600' : 'text-red-600'}`}>
//                                     {hasVoted ? 'Already Voted' : 'Not Voted Yet'}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }



// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function VoterDashboard() {
//     const navigate = useNavigate();

//     const [voter, setVoter] = useState(null);
//     const [votingStatus, setVotingStatus] = useState("NOT_STARTED");
//     const [candidates, setCandidates] = useState([]);
//     const [selectedCandidate, setSelectedCandidate] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [submitting, setSubmitting] = useState(false);

//     useEffect(() => {
//         const token = localStorage.getItem("voterToken");
//         if (!token) return navigate("/voter/login");
//         loadDashboard();
//     }, []);

//     const loadDashboard = async () => {
//         try {
//             setLoading(true);

//             const profileRes = await axios.get("https://server-voting-app.vercel.app/api/voter/profile", {
//                 headers: { Authorization: `Bearer ${localStorage.getItem("voterToken")}` }
//             });

//             setVoter(profileRes.data.voter);

//             const statusRes = await axios.get("https://server-voting-app.vercel.app/election/status");
//             setVotingStatus(statusRes.data.votingStatus);

//             if (statusRes.data.votingStatus === "Started") {
//                 const nominationsRes = await axios.get("https://server-voting-app.vercel.app/admin/nominations");
//                 const approved = nominationsRes.data.filter(n => n.status === "Approved");
//                 setCandidates(approved);
//             }

//         } catch (err) {
//             toast.error("Session expired");
//             navigate("/voter/login");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const submitVote = async () => {
//         if (!selectedCandidate) return toast.error("Select a candidate first");

//         if (!confirm(`Confirm your vote for ${selectedCandidate.name}?`)) return;

//         try {
//             setSubmitting(true);

//             await axios.post("https://server-voting-app.vercel.app/api/voter/vote", {
//                 voterId: voter.voterId,
//                 candidateId: selectedCandidate._id
//             });

//             toast.success("Vote submitted successfully!");
//             setSelectedCandidate(null);
//             loadDashboard();

//         } catch {
//             toast.error("Vote failed");
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <ToastContainer />

//             <header className="bg-white p-4 shadow flex justify-between">
//                 <div>
//                     <h1 className="text-xl font-bold">Voter Dashboard</h1>
//                     <p>Welcome, {voter.name}</p>
//                 </div>
//                 <button onClick={() => { localStorage.clear(); navigate("/voter/login"); }}
//                     className="bg-red-600 text-white px-4 py-2 rounded">
//                     Logout
//                 </button>
//             </header>

//             <main className="max-w-5xl mx-auto p-8">

//                 {/* STATUS DISPLAY */}
//                 {votingStatus !== "Started" && (
//                     <div className="bg-white p-10 rounded shadow text-center text-xl">
//                         {votingStatus === "NOT_STARTED" && "🕒 Voting has not started yet"}
//                         {votingStatus === "Ended" && "🛑 Voting has ended"}
//                     </div>
//                 )}

//                 {/* CIRCLE VOTING UI */}
//                 {votingStatus === "Started" && (
//                     <div className="bg-white p-10 rounded shadow">
//                         <h2 className="text-2xl font-bold mb-6 text-center">Cast Your Vote</h2>

//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-center">
//                             {candidates.map(c => (
//                                 <div key={c._id} onClick={() => setSelectedCandidate(c)}
//                                     className="cursor-pointer flex flex-col items-center">

//                                     <div className={`w-28 h-28 rounded-full border-4 flex items-center justify-center text-center
//                                         ${selectedCandidate?._id === c._id
//                                             ? "border-blue-600 bg-blue-100"
//                                             : "border-gray-400 hover:border-blue-400"}`}>

//                                         <span className="font-bold">{c.name}</span>
//                                     </div>

//                                     <p className="mt-2 text-sm text-gray-600">{c.position}</p>
//                                 </div>
//                             ))}
//                         </div>

//                         {selectedCandidate && (
//                             <div className="text-center mt-10">
//                                 <button
//                                     onClick={submitVote}
//                                     disabled={submitting}
//                                     className="bg-blue-600 text-white px-10 py-3 rounded text-lg">
//                                     {submitting ? "Submitting..." : "Confirm Vote"}
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 )}

//             </main>
//         </div>
//     );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VoterDashboard() {
    const navigate = useNavigate();

    const [voter, setVoter] = useState(null);
    const [votingStatus, setVotingStatus] = useState("NOT_STARTED");
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    //update 
    const [results, setResults] = useState([]);


    useEffect(() => {
        const token = localStorage.getItem("voterToken");
        if (!token) return navigate("/voter/login");
        loadDashboard();
    }, []);

    // const loadDashboard = async () => {
    //     try {
    //         setLoading(true);

    //         const profileRes = await axios.get("https://server-voting-app.vercel.app/api/voter/profile", {
    //             headers: { Authorization: `Bearer ${localStorage.getItem("voterToken")}` }
    //         });

    //         setVoter(profileRes.data.voter);

    //         const statusRes = await axios.get("https://server-voting-app.vercel.app/election/status");
    //         setVotingStatus(statusRes.data.votingStatus);

    //         if (statusRes.data.votingStatus === "Started") {
    //             const nominationsRes = await axios.get("https://server-voting-app.vercel.app/admin/nominations");
    //             const approved = nominationsRes.data.filter(n => n.status === "Approved");
    //             setCandidates(approved);
    //         }

    //     } catch {
    //         toast.error("Session expired");
    //         navigate("/voter/login");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const loadDashboard = async () => {
        try {
            setLoading(true);

            const profileRes = await axios.get("https://server-voting-app.vercel.app/api/voter/profile", {
                headers: { Authorization: `Bearer ${localStorage.getItem("voterToken")}` }
            });

            setVoter(profileRes.data.voter);

            const statusRes = await axios.get("https://server-voting-app.vercel.app/election/status");
            const status = statusRes.data.votingStatus;
            setVotingStatus(status);

            if (status === "Started") {
                const nominationsRes = await axios.get("https://server-voting-app.vercel.app/admin/nominations");
                const approved = nominationsRes.data.filter(n => n.status === "Approved");
                setCandidates(approved);
            }

            if (status === "Ended") {
                const resultRes = await axios.get("https://server-voting-app.vercel.app/admin/nominations");
                const approved = resultRes.data.filter(n => n.status === "Approved");
                const sorted = approved.sort((a, b) => b.votes - a.votes);
                setResults(sorted);
            }

        } catch {
            toast.error("Session expired");
            navigate("/voter/login");
        } finally {
            setLoading(false);
        }
    };

    const submitVote = async () => {
        if (!selectedCandidate) return toast.error("Select a candidate first");

        if (!window.confirm(`Confirm your vote for ${selectedCandidate.name}?`)) return;

        try {
            setSubmitting(true);

            await axios.patch("https://server-voting-app.vercel.app/api/vote", {
                voterId: voter.voterId,
                nominationId: selectedCandidate.nominationId
            });

            toast.success("Vote submitted successfully!");
            setSelectedCandidate(null);
            loadDashboard();

        } catch (err) {
            toast.error(err.response?.data?.message || "Vote failed");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100">
            <ToastContainer />

            <header className="bg-white p-4 shadow flex justify-between">
                <div>
                    <h1 className="text-xl font-bold">Voter Dashboard</h1>
                    <p>Welcome, {voter.name}</p>
                </div>
                <button onClick={() => { localStorage.clear(); navigate("/voter/login"); }}
                    className="bg-red-600 text-white px-4 py-2 rounded">
                    Logout
                </button>
            </header>

            <main className="max-w-5xl mx-auto p-8">

                {/* STATUS DISPLAY */}
                {votingStatus !== "Started" && (
                    <div className="bg-white p-10 rounded shadow text-center text-xl">
                        {votingStatus === "NOT_STARTED" && "🕒 Voting has not started yet"}
                        {votingStatus === "Ended" && "🛑 Voting has ended"}
                        {/* RESULT TABLE */}
                        {votingStatus === "Ended" && results.length > 0 && (
                            <div className="bg-white p-8 mt-8 rounded shadow">
                                <h2 className="text-2xl font-bold text-center mb-6">🏆 Election Results</h2>

                                <table className="w-full border">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="p-3 border">Rank</th>
                                            <th className="p-3 border">Candidate</th>
                                            {/* <th className="p-3 border">Position</th> */}
                                            <th className="p-3 border">Total Votes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.map((c, i) => (
                                            <tr key={c._id} className={i === 0 ? "bg-green-100 font-bold" : ""}>
                                                <td className="p-3 border text-center">{i + 1}</td>
                                                <td className="p-3 border">{c.name}</td>
                                                {/* <td className="p-3 border">{c.position}</td> */}
                                                <td className="p-3 border text-center">{c.votes}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <p className="mt-4 text-center text-green-700 font-semibold">
                                    🥇 Winner: {results[0].name}
                                </p>
                            </div>
                        )}

                    </div>

                )}

                {/* CIRCLE VOTING UI */}
                {/* {votingStatus === "Started" && (
                    <div className="bg-white p-10 rounded shadow">
                        <h2 className="text-2xl font-bold mb-6 text-center">Cast Your Vote</h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-center">
                            {candidates.map(c => (
                                <div key={c._id} onClick={() => setSelectedCandidate(c)}
                                    className="cursor-pointer flex flex-col items-center">

                                    <div className={`w-28 h-28 rounded-full border-4 flex items-center justify-center text-center
                                        ${selectedCandidate?.nominationId === c.nominationId
                                            ? "border-blue-600 bg-blue-100"
                                            : "border-gray-400 hover:border-blue-400"}`}>

                                        <span className="font-bold">{c.name}</span>
                                    </div>

                                    <p className="mt-2 text-sm text-gray-600">{c.position}</p>
                                </div>
                            ))}
                        </div>

                        {selectedCandidate && (
                            <div className="text-center mt-10">
                                <button
                                    onClick={submitVote}
                                    disabled={submitting}
                                    className="bg-blue-600 text-white px-10 py-3 rounded text-lg">
                                    {submitting ? "Submitting..." : "Confirm Vote"}
                                </button>
                            </div>
                        )}
                    </div>
                )} */}
                {votingStatus === "Started" && voter && (
                    <div className="bg-white p-10 rounded shadow">
                        <h2 className="text-2xl font-bold mb-6 text-center">Cast Your Vote</h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-center">
                            {candidates
                                .filter(c => c.address === voter.district)   // 🔐 district filter here
                                .map(c => (
                                    <div
                                        key={c._id}
                                        onClick={() => setSelectedCandidate(c)}
                                        className="cursor-pointer flex flex-col items-center"
                                    >
                                        <div
                                            className={`w-28 h-28 rounded-full border-4 flex items-center justify-center text-center
                            ${selectedCandidate?.nominationId === c.nominationId
                                                    ? "border-blue-600 bg-blue-100"
                                                    : "border-gray-400 hover:border-blue-400"}`}
                                        >
                                            <span className="font-bold">{c.name}</span>
                                        </div>

                                        <p className="mt-2 text-sm text-gray-600">{c.position}</p>
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
                                    {submitting ? "Submitting..." : "Confirm Vote"}
                                </button>
                            </div>
                        )}
                    </div>
                )}

            </main>
        </div>
    );
}
