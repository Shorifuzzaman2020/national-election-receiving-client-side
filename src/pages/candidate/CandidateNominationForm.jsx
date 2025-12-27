
// import { useState } from "react";
// import axios from "axios";

// export default function CandidateNominationForm() {

//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         address: "",
//         sign: "Elephant"
//     });

//     const [loading, setLoading] = useState(false);

//     const startPayment = async () => {
//         if (!form.name || !form.email || !form.address) {
//             alert("Please fill all fields");
//             return;
//         }

//         try {
//             setLoading(true);

//             // Step 1: Create payment session
//             const res = await axios.post("http://localhost:5000/payment/initiate", {
//                 name: form.name,
//                 email: form.email
//             });

//             // Step 2: Save form temporarily in localStorage
//             localStorage.setItem("nominationData", JSON.stringify(form));

//             // Step 3: Redirect to SSLCommerz gateway
//             window.location.href = res.data.url;

//         } catch (err) {
//             console.error(err);
//             alert("Payment initialization failed");
//             setLoading(false);
//         }
        

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
//                     disabled={loading}
//                     onClick={startPayment}
//                     className="w-full bg-green-600 text-white py-2 rounded-lg mt-4 hover:bg-green-700 transition"
//                 >
//                     {loading ? "Redirecting to Payment..." : "Proceed to Payment"}
//                 </button>
//             </div>
//         </div>
//     );
// }


import { useState } from "react";
import axios from "axios";

const districts = [
  "Barguna", "Barishal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur",
  "Bandarban", "Brahmanbaria", "Chandpur", "Chattogram", "Cumilla", "Cox's Bazar", "Feni", "Khagrachhari", "Lakshmipur", "Noakhali", "Rangamati",
  "Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail",
  "Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira",
  "Jamalpur", "Mymensingh", "Netrokona", "Sherpur",
  "Bogura", "Joypurhat", "Naogaon", "Natore", "Chapainawabganj", "Pabna", "Rajshahi", "Sirajganj",
  "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon",
  "Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"
];

export default function CandidateNominationForm() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    sign: "Elephant"
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const startPayment = async () => {
    const newErrors = {};

    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.address) newErrors.address = "District is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    try {
      setLoading(true);

      const res = await axios.post("https://server-voting-app.vercel.app/payment/initiate", {
        name: form.name,
        email: form.email
      });

      localStorage.setItem("nominationData", JSON.stringify(form));
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

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg`}
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg`}
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
        </div>

        {/* District Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            District *
          </label>
          <select
            value={form.address}
            className={`w-full border ${errors.address ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg`}
            onChange={e => setForm({ ...form, address: e.target.value })}
          >
            <option value="">Select District</option>
            {districts.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address}</p>}
        </div>

        {/* Sign */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sign Choice
          </label>
          <select
            className="w-full border border-gray-300 p-3 rounded-lg"
            value={form.sign}
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
          className="w-full bg-green-600 text-white py-3 rounded-lg mt-4 hover:bg-green-700 transition"
        >
          {loading ? "Redirecting to Payment..." : "Proceed to Payment"}
        </button>

      </div>
    </div>
  );
}
