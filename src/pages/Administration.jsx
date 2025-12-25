import { useNavigate } from "react-router-dom";

export default function Administration() {
    const navigate = useNavigate();
    
    return (
        <div>
            <h1 className="text-center font-bold text-4xl mt-4">National Election Receiving System</h1>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">

                <div className="w-full max-w-md bg-white shadow-xl rounded-lg border p-6">

                    <h1 className="text-center text-2xl font-bold mb-6">
                        Administration Login
                    </h1>

                    <div className="flex justify-center mb-8">
                        <div className="w-24 h-24 rounded-full border-4 border-gray-400 flex items-center justify-center text-gray-500 font-semibold">
                            Logo
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => navigate("/admin-login")}
                            className="w-full py-3 bg-blue-600 text-white rounded-lg"
                        >
                            Log in as Admin
                        </button>

                        <button
                        onClick={() => navigate("/sub-admin-login")}
                            className="w-full py-3 bg-green-600 text-white rounded-lg"
                        >
                            Log in as Sub Admin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
