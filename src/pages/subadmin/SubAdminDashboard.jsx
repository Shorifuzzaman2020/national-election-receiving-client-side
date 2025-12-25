import SubAdminLayout from "../../layouts/SubAdminLayout";
import { useNavigate } from "react-router-dom";

export default function SubAdminDashboard() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/subadmin/login");
    };

    return (
        <SubAdminLayout>
            <div className="space-y-12">

                {/* Top Bar */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => navigate("/")}
                        className="border px-5 py-2 rounded-md hover:bg-gray-100"
                    >
                        Go Home
                    </button>

                    <h1 className="text-2xl font-bold">Sub Admin Dashboard</h1>

                    <button
                        onClick={logout}
                        className="border px-5 py-2 rounded-md hover:bg-gray-100"
                    >
                        Log Out
                    </button>
                </div>

                {/* Center Buttons */}
                <div className="flex flex-col items-center gap-10 mt-24">

                    <button
                        onClick={() => navigate("/subadmin/add-voter")}
                        className="w-72 py-4 text-lg border-2 border-black rounded-xl hover:bg-black hover:text-white transition"
                    >
                        Add Voter
                    </button>

                    <button
                        onClick={() => navigate("/subadmin/voter-list")}
                        className="w-72 py-4 text-lg border-2 border-black rounded-xl hover:bg-black hover:text-white transition"
                    >
                        See Voter List
                    </button>

                </div>
            </div>
        </SubAdminLayout>
    );
}
