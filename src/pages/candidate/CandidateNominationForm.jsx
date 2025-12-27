// import { useState } from "react";
// import axios from "axios";

// export default function NominationForm() {
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         address: "",
//         sign: "Elephant"
//     });

//     const submit = async () => {
//         await axios.post("https://server-voting-app.vercel.app/nominate", {
//             ...form,
//             status: "Pending"
//         });
//         alert("Nomination Submitted Successfully");
//     };

//     return (
//         <div className="bg-white shadow-lg border rounded-lg p-6 max-w-xl mx-auto">

//             <h1 className="text-2xl font-bold text-center mb-2">
//                 National Election Receiving System
//             </h1>

//             <p className="text-center text-gray-600 mb-6">
//                 National Election – 2026
//             </p>

//             <h2 className="text-lg font-semibold mb-4 text-center">
//                 Nomination Form
//             </h2>

//             <div className="space-y-4">

//                 <div>
//                     <label className="block font-medium">Name:</label>
//                     <input
//                         className="w-full border p-2 rounded"
//                         onChange={e => setForm({ ...form, name: e.target.value })}
//                     />
//                 </div>

//                 <div>
//                     <label className="block font-medium">Email:</label>
//                     <input
//                         className="w-full border p-2 rounded"
//                         onChange={e => setForm({ ...form, email: e.target.value })}
//                     />
//                 </div>

//                 <div>
//                     <label className="block font-medium">Address:</label>
//                     <input
//                         className="w-full border p-2 rounded"
//                         onChange={e => setForm({ ...form, address: e.target.value })}
//                     />
//                 </div>

//                 <div>
//                     <label className="block font-medium">Sign Choice:</label>
//                     <select
//                         className="w-full border p-2 rounded"
//                         onChange={e => setForm({ ...form, sign: e.target.value })}
//                     >
//                         <option>Elephant</option>
//                         <option>Horse</option>
//                         <option>Pen</option>
//                         <option>Rocket</option>
//                         <option>Computer</option>
//                     </select>
//                 </div>

//                 <button
//                     onClick={submit}
//                     className="w-full bg-blue-700 text-white py-2 rounded-lg mt-4"
//                 >
//                     Submit
//                 </button>
//             </div>
//         </div>
//     );
// }


import { useState } from "react";
import axios from "axios";

export default function CandidateNominationForm() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        sign: "Elephant"
    });

    const [loading, setLoading] = useState(false);

    const startPayment = async () => {
        if (!form.name || !form.email || !form.address) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            // Step 1: Create payment session
            const res = await axios.post("https://server-voting-app.vercel.app/payment/initiate", {
                name: form.name,
                email: form.email
            });

            // Step 2: Save form temporarily in localStorage
            localStorage.setItem("nominationData", JSON.stringify(form));

            // Step 3: Redirect to SSLCommerz gateway
            window.location.href = res.data.url;

        } catch (err) {
            console.error(err);
            alert("Payment initialization failed");
            setLoading(false);
        }
        

    };

    return (
        <div className="bg-white shadow-lg border rounded-lg p-6 max-w-xl mx-auto">

            <h1 className="text-2xl font-bold text-center mb-2">
                National Election Receiving System
            </h1>

            <p className="text-center text-gray-600 mb-6">
                National Election – 2026
            </p>

            <h2 className="text-lg font-semibold mb-4 text-center">
                Nomination Form
            </h2>

            <div className="space-y-4">

                <div>
                    <label className="block font-medium">Name:</label>
                    <input
                        className="w-full border p-2 rounded"
                        onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block font-medium">Email:</label>
                    <input
                        className="w-full border p-2 rounded"
                        onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block font-medium">Address:</label>
                    <input
                        className="w-full border p-2 rounded"
                        onChange={e => setForm({ ...form, address: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block font-medium">Sign Choice:</label>
                    <select
                        className="w-full border p-2 rounded"
                        onChange={e => setForm({ ...form, sign: e.target.value })}
                    >
                        <option>Elephant</option>
                        <option>Horse</option>
                        <option>Pen</option>
                        <option>Rocket</option>
                        <option>Computer</option>
                    </select>
                </div>

                <button
                    disabled={loading}
                    onClick={startPayment}
                    className="w-full bg-green-600 text-white py-2 rounded-lg mt-4 hover:bg-green-700 transition"
                >
                    {loading ? "Redirecting to Payment..." : "Proceed to Payment"}
                </button>
            </div>
        </div>
    );
}
