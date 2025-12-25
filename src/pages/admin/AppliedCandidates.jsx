import { useEffect, useState } from "react";
import axios from "axios";

const AppliedCandidates = () => {
    const [candidates, setCandidates] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        loadCandidates();
    }, []);

    const loadCandidates = async () => {
        const res = await axios.get("http://localhost:5000/admin/nominations");
        setCandidates(res.data);
    };

    const updateStatus = async (id, status) => {
        await axios.patch(`http://localhost:5000/admin/nominations/${id}`, { status });
        loadCandidates();
        setSelected(null);
    };

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-6">Applied Candidates</h1>

            <table className="w-full border">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border p-2">#</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Address</th>
                        <th className="border p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map((c, i) => (
                        <tr key={c._id}>
                            <td className="border p-2 text-center">{i + 1}</td>
                            <td className="border p-2">{c.name}</td>
                            <td className="border p-2">{c.address}</td>
                            <td className="border p-2 text-center">
                                <button
                                    onClick={() => setSelected(c)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded"
                                >
                                    See Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Details Modal */}
            {selected && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                    <div className="bg-white p-6 rounded w-96 space-y-4">

                        <h2 className="text-xl font-bold">Candidate Details</h2>
                        <p><b>Name:</b> {selected.name}</p>
                        <p><b>Email:</b> {selected.email}</p>
                        <p><b>Address:</b> {selected.address}</p>
                        <p><b>Sign:</b> {selected.sign}</p>
                        <p><b>Payment Status:</b> {selected.payment}</p>
                        <p><b>Nomination Status:</b> {selected.status}</p>

                        <div className="flex justify-between">
                            <button
                                onClick={() => updateStatus(selected._id, "Approved")}
                                className="bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Approve
                            </button>

                            <button
                                onClick={() => updateStatus(selected._id, "Rejected")}
                                className="bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Reject
                            </button>
                        </div>

                        <button
                            onClick={() => setSelected(null)}
                            className="w-full mt-3 border py-2 rounded"
                        >
                            Close
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default AppliedCandidates;
