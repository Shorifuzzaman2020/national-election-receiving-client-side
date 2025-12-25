import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import AdminDashboard from "../pages/admin/Dashboard"
import CandidateDashboard from "../pages/candidate/Dashboard"
import SubAdminDashboard from "../pages/subadmin/SubAdminDashboard"
import VoterDashboard from "../pages/voter/Dashboard"
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

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/candidate" element={<CandidateDashboard />} />
            <Route path="/subadmin" element={<SubAdminDashboard />} />
            <Route path="/voter" element={<VoterDashboard />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/nomination" element={<NominationForm />} />
            <Route path="/admin/create-sub-admin" element={<CreateSubAdmin />} />
            <Route path="/admin/applied-candidates" element={<AppliedCandidates />} />
            <Route path="/admin/create-election" element={<CreateElection />} />
            <Route path="/admin/result" element={<Result />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/administration" element={<Administration />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/sub-admin-login" element={<SubAdminLogin />}/>
            <Route path="/subadmin/dashboard" element={<SubAdminDashboard />}/>
        </Routes>
    )
}
