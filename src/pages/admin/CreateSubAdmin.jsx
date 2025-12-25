// import React from 'react';

// const CreateSubAdmin = () => {
//     return (
//         <div>

//         </div>
//     );
// };

// export default CreateSubAdmin;

import AdminLayout from "../../layouts/AdminLayout";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CreateSubAdmin() {
    const [form, setForm] = useState({
        adminId: "",
        name: "",
        email: "",
        password: "",
        phone: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/api/admin/create-sub-admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        if (res.ok) {
            alert("Sub Admin Created Successfully");
            setForm({ adminId: "", name: "", email: "", password: "", phone: "" });
        } else {
            alert(data.message);
        }
    };


    return (
        <AdminLayout>
            <div className="space-y-10">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <Link
                        to="/admin"
                        className="border px-5 py-2 rounded-md hover:bg-gray-100"
                    >
                        Go Home
                    </Link>

                    <h1 className="text-2xl font-bold">Create Sub Admin</h1>

                    <button className="border px-5 py-2 rounded-md hover:bg-gray-100">
                        Log Out
                    </button>
                </div>

                {/* Form Card */}
                <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md border">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <InputField label="ID" name="adminId" value={form.adminId} onChange={handleChange} />
                        <InputField label="Name" name="name" value={form.name} onChange={handleChange} />
                        <InputField label="Email" name="email" value={form.email} onChange={handleChange} />
                        <InputField label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
                        <InputField label="Phone" name="phone" value={form.phone} onChange={handleChange} />
                        <div className="text-center">
                            <button className="px-8 py-3 border-2 border-black rounded-xl hover:bg-black hover:text-white transition font-semibold">
                                Submit
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </AdminLayout>
    );
}

function InputField({ label, name, value, onChange, type = "text" }) {
    return (
        <div>
            <label className="block mb-1 font-medium">{label}</label>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
            />
        </div>
    );
}
