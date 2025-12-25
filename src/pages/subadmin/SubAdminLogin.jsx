import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SubAdminLogin() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        password: "",
        phone: "",
        code: ""
    });

    const sendCode = async () => {
        await axios.post("http://localhost:5000/subadmin/send-code", {
            phone: form.phone
        });
        alert("Code sent");
    };

    const submit = async () => {
        const res = await axios.post("http://localhost:5000/subadmin/login", form);

        if (res.data.success) {
            localStorage.setItem("token", res.data.token);
            navigate("/subadmin/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 w-full max-w-md space-y-4 rounded shadow">

                <h2 className="text-xl font-bold text-center">Sub Admin Login</h2>

                <input placeholder="Name" className="w-full p-3 border rounded"
                    onChange={e => setForm({ ...form, name: e.target.value })} />

                <input placeholder="Phone Number" className="w-full p-3 border rounded"
                    onChange={e => setForm({ ...form, phone: e.target.value })} />

                <input type="password" placeholder="Password" className="w-full p-3 border rounded"
                    onChange={e => setForm({ ...form, password: e.target.value })} />

                <div className="flex gap-2">
                    <input placeholder="Enter Code" className="w-full p-3 border rounded flex-1"
                        onChange={e => setForm({ ...form, code: e.target.value })} />
                    <button onClick={sendCode} className="bg-gray-700 text-white px-3 rounded">
                        Get Code
                    </button>
                </div>

                <button onClick={submit} className="w-full bg-blue-700 text-white py-2 rounded">
                    Login
                </button>

            </div>
        </div>
    );
}
