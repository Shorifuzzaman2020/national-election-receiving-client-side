// import axios from "axios";
// import { useEffect } from "react";

// export default function PaymentSuccess() {

//     useEffect(() => {
//         const data = JSON.parse(localStorage.getItem("nominationData"));

//         axios.post("https://server-voting-app.vercel.app/nominate", {
//             ...data,
//             status: "Pending"
//         });

//         localStorage.removeItem("nominationData");
//     }, []);

//     return (
//         <div className="h-screen flex items-center justify-center">
//             <h1 className="text-2xl font-bold text-green-600">
//                 Payment Successful! Nomination Submitted 🎉
//             </h1>
//         </div>
//     );
// }



// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function PaymentSuccess() {

//     const [nominationId, setNominationId] = useState("");

//     useEffect(() => {
//         const data = JSON.parse(localStorage.getItem("nominationData"));

//         axios.post("https://server-voting-app.vercel.app/nominate", {
//             ...data,
//             status: "Pending",
//             payment: "Paid"
//         })
//             .then(res => {
//                 setNominationId(res.data.nominationId);
//                 localStorage.removeItem("nominationData");
//             });

//     }, []);

//     return (
//         <div className="h-screen flex flex-col items-center justify-center space-y-4">

//             <h1 className="text-2xl font-bold text-green-600">
//                 Payment Successful! Nomination Submitted 🎉
//             </h1>

//             {nominationId && (
//                 <p className="text-lg">
//                     Your Nomination ID:
//                     <span className="font-bold text-blue-700 ml-2">{nominationId}</span>
//                 </p>
//             )}

//         </div>
//     );
// }



import axios from "axios";
import { useEffect, useState, useRef } from "react";

export default function PaymentSuccess() {
    const [nominationId, setNominationId] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const hasSubmitted = useRef(false);

    useEffect(() => {
        // Prevent duplicate submissions
        if (hasSubmitted.current) return;
        hasSubmitted.current = true;

        const submitNomination = async () => {
            try {
                const data = JSON.parse(localStorage.getItem("nominationData"));
                
                if (!data) {
                    setError("No nomination data found");
                    setLoading(false);
                    return;
                }

                const response = await axios.post("https://server-voting-app.vercel.app/nominate", {
                    ...data,
                    status: "Pending",
                    payment: "Paid"
                });

                if (response.data.success) {
                    setNominationId(response.data.nominationId);
                    localStorage.removeItem("nominationData");
                }
            } catch (err) {
                console.error("Submission error:", err);
                setError(err.response?.data?.error || "Failed to submit nomination");
            } finally {
                setLoading(false);
            }
        };

        submitNomination();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Processing your nomination...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-red-600">Error</h1>
                <p className="text-red-500 mt-2">{error}</p>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center space-y-4">
            <h1 className="text-2xl font-bold text-green-600">
                Payment Successful! Nomination Submitted 🎉
            </h1>

            {nominationId && (
                <p className="text-lg">
                    Your Nomination ID:
                    <span className="font-bold text-blue-700 ml-2">{nominationId}</span>
                </p>
            )}
        </div>
    );
}