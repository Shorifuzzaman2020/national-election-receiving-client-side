import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import AdminDashboard from "../pages/admin/Dashboard"

import SubAdminDashboard from "../pages/subadmin/SubAdminDashboard"

import Dashboard from "../pages/admin/Dashboard"
import NominationForm from "../pages/admin/NominationForm"
import CreateSubAdmin from "../pages/admin/CreateSubAdmin"
import AppliedCandidates from "../pages/admin/AppliedCandidates"
import CreateElection from "../pages/admin/CreateElection"
import Result from "../pages/admin/Result"
import AdminLogin from "../pages/admin/AdminLogin"
import Administration from "../pages/Administration"
import PaymentSuccess from "../pages/PaymentSuccess"
import SubAdminLogin from "../pages/subadmin/SubAdminLogin"
import SubAdminLayout from "../layouts/SubAdminLayout"
import CandidateLogin from "../pages/candidate/CandidateLogin"
import CandidateDashboard from "../pages/candidate/CandidateDashboard"
import AddVoter from "../pages/subadmin/AddVoter"
import VoterList from "../pages/subadmin/VoterList"
import VoterLogin from "../pages/voter/VoterLogin"
import VoterDashboard from "../pages/voter/VoterDashboard"
import CandidateNominationForm from "../pages/candidate/CandidateNominationForm"



// export default function Router() {
//     return (
//         <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/admin" element={<AdminDashboard />} />
//             <Route path="/candidate" element={<CandidateDashboard />} />
//             <Route path="/subadmin" element={<SubAdminDashboard />} />
            
//             <Route path="/admin/dashboard" element={<Dashboard />} />
//             <Route path="/admin/nomination" element={<NominationForm />} />
//             <Route path="/admin/create-sub-admin" element={<CreateSubAdmin />} />
//             <Route path="/admin/applied-candidates" element={<AppliedCandidates />} />
//             <Route path="/admin/create-election" element={<CreateElection />} />
//             <Route path="/admin/result" element={<Result />} />
//             <Route path="/admin-login" element={<AdminLogin />} />
//             <Route path="/administration" element={<Administration />} />
//             <Route path="/payment-success" element={<PaymentSuccess />} />
//             <Route path="/sub-admin-login" element={<SubAdminLogin />} />
//             <Route path="/subadmin/dashboard" element={<SubAdminDashboard />} />
//             <Route path="/candidate-login" element={<CandidateLogin />} />
//             <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
//             <Route path="/subadmin/add-voter" element={<AddVoter />} />
//             <Route path="/subadmin/voter-list" element={<VoterList />} />
//             <Route path="/voter-login" element={<VoterLogin />} />
//             <Route path="/voter/dashboard" element={<VoterDashboard/>} />
//             <Route path="/candidate-nomination" element={<CandidateNominationForm />} />

//         </Routes>
//     )
// }

// import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

export default function Router() {
    return (
        <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/voter-login" element={<VoterLogin />} />
            <Route path="/candidate-login" element={<CandidateLogin />} />
            <Route path="/administration" element={<Administration />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/sub-admin-login" element={<SubAdminLogin />} />
            {/* ================= ADMIN ================= */}
            <Route path="/admin/dashboard" element={
                <ProtectedRoute role="admin">
                    <Dashboard />
                </ProtectedRoute>
            }/>

            <Route path="/admin/nomination" element={
                <ProtectedRoute role="admin">
                    <NominationForm />
                </ProtectedRoute>
            }/>

            <Route path="/admin/create-sub-admin" element={
                <ProtectedRoute role="admin">
                    <CreateSubAdmin />
                </ProtectedRoute>
            }/>

            <Route path="/admin/applied-candidates" element={
                <ProtectedRoute role="admin">
                    <AppliedCandidates />
                </ProtectedRoute>
            }/>

            <Route path="/admin/create-election" element={
                <ProtectedRoute role="admin">
                    <CreateElection />
                </ProtectedRoute>
            }/>

            <Route path="/admin/result" element={
                <ProtectedRoute role="admin">
                    <Result />
                </ProtectedRoute>
            }/>

            {/* ================= SUB ADMIN ================= */}
            <Route path="/subadmin/dashboard" element={
                <ProtectedRoute role="subadmin">
                    <SubAdminDashboard />
                </ProtectedRoute>
            }/>

            <Route path="/subadmin/add-voter" element={
                <ProtectedRoute role="subadmin">
                    <AddVoter />
                </ProtectedRoute>
            }/>

            <Route path="/subadmin/voter-list" element={
                <ProtectedRoute role="subadmin">
                    <VoterList />
                </ProtectedRoute>
            }/>

            {/* ================= CANDIDATE ================= */}
            <Route path="/candidate/dashboard" element={
                <ProtectedRoute role="candidate">
                    <CandidateDashboard />
                </ProtectedRoute>
            }/>

            {/* ================= VOTER ================= */}
            <Route path="/voter/dashboard" element={
                <ProtectedRoute role="voter">
                    <VoterDashboard />
                </ProtectedRoute>
            }/>

            {/* Public */}
            <Route path="/candidate-nomination" element={<CandidateNominationForm />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />

        </Routes>
    );
}
