

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        password: "",
        code: "",
        email: ""
    });

    const sendCode = async () => {
        try {
            await axios.post("http://localhost:5000/admin/send-code", {
                email: form.email
            });
            alert("Verification code sent to your email");
        } catch (err) {
            alert("Failed to send code");
        }
    };

    // const submit = async () => {
    //     try {
    //         const res = await axios.post("http://localhost:5000/admin/verify-code", {
    //             email: form.email,
    //             code: form.code
    //         });

    //         if (res.data.success) {
    //             alert("Login verified successfully");
    //             navigate("/admin/dashboard");   // ✅ Redirect
    //         }
    //     } catch (err) {
    //         alert("Invalid code");
    //     }
    // };

    const submit = async () => {
        try {
            const res = await axios.post("http://localhost:5000/admin/verify-code", {
                email: form.email,
                code: form.code
            });

            if (res.data.success && res.data.role === "admin") {

                // 🔐 Save token
                localStorage.setItem("token", res.data.token);

                alert("Admin login successful");

                // 🚀 Redirect
                navigate("/admin/dashboard");
            }
            else {
                alert("You are not authorized as admin");
            }

        } catch (err) {
            alert(err.response?.data?.error || "Invalid code");
        }
    };

    return (
        <div>
            <h1 className="text-center font-bold text-4xl mt-4">Admin Login</h1>
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <div className="w-full max-w-lg bg-white shadow-xl border rounded-lg p-6 space-y-4">

                    <input
                        placeholder="Admin Email"
                        className="w-full p-3 border rounded"
                        onChange={e => setForm({ ...form, email: e.target.value })}
                    />

                    <input
                        placeholder="Name"
                        className="w-full p-3 border rounded"
                        onChange={e => setForm({ ...form, name: e.target.value })}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded"
                        onChange={e => setForm({ ...form, password: e.target.value })}
                    />

                    <div className="flex gap-3">
                        <input
                            placeholder="Enter Code"
                            className="flex-1 p-3 border rounded"
                            onChange={e => setForm({ ...form, code: e.target.value })}
                        />
                        <button
                            onClick={sendCode}
                            className="px-4 bg-gray-700 text-white rounded"
                        >
                            Get Code
                        </button>
                    </div>

                    <button
                        onClick={submit}
                        className="w-full py-3 bg-blue-700 text-white rounded-lg"
                    >
                        Submit
                    </button>

                </div>
            </div>
        </div>
    );
}
