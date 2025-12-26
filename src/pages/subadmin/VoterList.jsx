

import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VoterList() {
    const [voters, setVoters] = useState([]);
    const [filteredVoters, setFilteredVoters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingVoter, setEditingVoter] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [editForm, setEditForm] = useState({
        name: "",
        voterId: "",
        email: "",
        phone: "",
        district: "",
        bloodGroup: ""
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [searchBy, setSearchBy] = useState("voterId"); // Default search by voterId
    const [isSearching, setIsSearching] = useState(false);

    // Fetch voters
    useEffect(() => {
        fetchVoters();
    }, []);

    // Filter voters when search term changes
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredVoters(voters);
            setIsSearching(false);
        } else {
            filterVoters();
            setIsSearching(true);
        }
    }, [searchTerm, voters, searchBy]);

    const fetchVoters = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:5000/subadmin/voters");
            setVoters(res.data);
            setFilteredVoters(res.data);
        } catch (error) {
            toast.error("Failed to load voters");
            console.error("Error fetching voters:", error);
        } finally {
            setLoading(false);
        }
    };

    // Filter voters based on search criteria
    const filterVoters = () => {
        const term = searchTerm.toLowerCase().trim();
        
        if (!term) {
            setFilteredVoters(voters);
            return;
        }

        const filtered = voters.filter(voter => {
            switch (searchBy) {
                case "voterId":
                    return voter.voterId?.toLowerCase().includes(term);
                case "name":
                    return voter.name?.toLowerCase().includes(term);
                case "email":
                    return voter.email?.toLowerCase().includes(term);
                case "phone":
                    return voter.phone?.toLowerCase().includes(term);
                case "district":
                    return voter.district?.toLowerCase().includes(term);
                case "bloodGroup":
                    return voter.bloodGroup?.toLowerCase().includes(term);
                default:
                    return (
                        voter.voterId?.toLowerCase().includes(term) ||
                        voter.name?.toLowerCase().includes(term) ||
                        voter.email?.toLowerCase().includes(term) ||
                        voter.phone?.toLowerCase().includes(term) ||
                        voter.district?.toLowerCase().includes(term) ||
                        voter.bloodGroup?.toLowerCase().includes(term)
                    );
            }
        });
        
        setFilteredVoters(filtered);
    };

    // Clear search
    const clearSearch = () => {
        setSearchTerm("");
        setFilteredVoters(voters);
        setIsSearching(false);
    };

    // Delete voter
    const handleDelete = async (voterId, voterName) => {
        try {
            await axios.delete(`http://localhost:5000/subadmin/voters/${voterId}`);
            
            // Remove from local state
            const updatedVoters = voters.filter(v => v._id !== voterId);
            setVoters(updatedVoters);
            setFilteredVoters(updatedVoters.filter(v => 
                searchTerm ? v.voterId?.toLowerCase().includes(searchTerm.toLowerCase()) : true
            ));
            
            toast.success(`Voter "${voterName}" deleted successfully`);
            setDeleteConfirm(null);
        } catch (error) {
            toast.error("Failed to delete voter");
            console.error("Delete error:", error);
        }
    };

    // Start editing
    const handleEditClick = (voter) => {
        setEditingVoter(voter._id);
        setEditForm({
            name: voter.name,
            voterId: voter.voterId,
            email: voter.email,
            phone: voter.phone,
            district: voter.district,
            bloodGroup: voter.bloodGroup
        });
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setEditingVoter(null);
        setEditForm({
            name: "",
            voterId: "",
            email: "",
            phone: "",
            district: "",
            bloodGroup: ""
        });
    };

    // Save edited voter
    const handleSaveEdit = async (voterId) => {
        try {
            // Validate
            if (!editForm.name.trim() || !editForm.voterId.trim() || !editForm.email.trim()) {
                toast.error("Please fill all required fields");
                return;
            }

            await axios.put(`http://localhost:5000/subadmin/voters/${voterId}`, editForm);
            
            // Update local state
            const updatedVoters = voters.map(v => 
                v._id === voterId 
                    ? { ...v, ...editForm } 
                    : v
            );
            
            setVoters(updatedVoters);
            setFilteredVoters(updatedVoters.filter(v => 
                searchTerm ? v.voterId?.toLowerCase().includes(searchTerm.toLowerCase()) : true
            ));
            
            setEditingVoter(null);
            toast.success("Voter updated successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update voter");
            console.error("Update error:", error);
        }
    };

    // Blood groups for dropdown
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    // Sample districts
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

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <ToastContainer position="top-right" autoClose={3000} />
            
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Voter Management</h1>
                    <p className="text-gray-600 mt-2">View, edit, and manage registered voters</p>
                    
                    <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center space-x-2">
                            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                Total Voters: {voters.length}
                            </div>
                            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                Active: {voters.filter(v => v.status !== 'inactive').length}
                            </div>
                            {isSearching && (
                                <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                                    Found: {filteredVoters.length}
                                </div>
                            )}
                        </div>
                        <button 
                            onClick={fetchVoters}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Search Section */}
                <div className="mb-6 bg-white rounded-xl shadow-lg p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Search Voters</h3>
                            <p className="text-sm text-gray-500">Find voters by different criteria</p>
                        </div>
                        
                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                            {/* Search by dropdown */}
                            <div className="flex-shrink-0">
                                <select
                                    value={searchBy}
                                    onChange={(e) => setSearchBy(e.target.value)}
                                    className="w-full md:w-auto border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="voterId">By Voter ID</option>
                                    <option value="name">By Name</option>
                                    <option value="email">By Email</option>
                                    <option value="phone">By Phone</option>
                                    <option value="district">By District</option>
                                    <option value="bloodGroup">By Blood Group</option>
                                </select>
                            </div>
                            
                            {/* Search input */}
                            <div className="flex-grow md:max-w-md">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder={`Search by ${searchBy === 'voterId' ? 'Voter ID' : searchBy}...`}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    {searchTerm && (
                                        <button
                                            onClick={clearSearch}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                            
                            {/* Clear button */}
                            {searchTerm && (
                                <button
                                    onClick={clearSearch}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex-shrink-0 flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                    
                    {/* Search tips */}
                    {isSearching && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm text-blue-700">
                                    Searching by {searchBy === 'voterId' ? 'Voter ID' : searchBy}: "{searchTerm}" • Found {filteredVoters.length} voter(s)
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Voter Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {loading ? (
                        <div className="flex justify-center items-center p-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : filteredVoters.length === 0 ? (
                        <div className="text-center p-12">
                            {isSearching ? (
                                <>
                                    <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="mt-4 text-lg font-medium text-gray-900">No voters found</h3>
                                    <p className="mt-1 text-gray-500">
                                        No voters found for "{searchTerm}" in {searchBy === 'voterId' ? 'Voter ID' : searchBy}
                                    </p>
                                    <button
                                        onClick={clearSearch}
                                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Clear Search
                                    </button>
                                </>
                            ) : (
                                <>
                                    <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0c-.9 0-1.7-.1-2.5-.3" />
                                    </svg>
                                    <h3 className="mt-4 text-lg font-medium text-gray-900">No voters found</h3>
                                    <p className="mt-1 text-gray-500">No voters have been registered yet.</p>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            #
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Voter ID
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Phone
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            District
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Blood Group
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredVoters.map((voter, index) => (
                                        <tr key={voter._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {index + 1}
                                            </td>
                                            
                                            {/* Name - Editable */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editingVoter === voter._id ? (
                                                    <input
                                                        type="text"
                                                        value={editForm.name}
                                                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                ) : (
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {voter.name}
                                                    </div>
                                                )}
                                            </td>
                                            
                                            {/* Voter ID - Editable */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {editingVoter === voter._id ? (
                                                    <input
                                                        type="text"
                                                        value={editForm.voterId}
                                                        onChange={(e) => setEditForm({...editForm, voterId: e.target.value})}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                ) : (
                                                    <span className={searchBy === 'voterId' && searchTerm ? 
                                                        "bg-yellow-100 px-2 py-1 rounded" : ""
                                                    }>
                                                        {voter.voterId}
                                                    </span>
                                                )}
                                            </td>
                                            
                                            {/* Email - Editable */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {editingVoter === voter._id ? (
                                                    <input
                                                        type="email"
                                                        value={editForm.email}
                                                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                ) : voter.email}
                                            </td>
                                            
                                            {/* Phone - Editable */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {editingVoter === voter._id ? (
                                                    <input
                                                        type="tel"
                                                        value={editForm.phone}
                                                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                ) : voter.phone}
                                            </td>
                                            
                                            {/* District - Editable */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {editingVoter === voter._id ? (
                                                    <select
                                                        value={editForm.district}
                                                        onChange={(e) => setEditForm({...editForm, district: e.target.value})}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                                                    >
                                                        <option value="">Select District</option>
                                                        {districts.map(d => (
                                                            <option key={d} value={d}>{d}</option>
                                                        ))}
                                                    </select>
                                                ) : voter.district}
                                            </td>
                                            
                                            {/* Blood Group - Editable */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editingVoter === voter._id ? (
                                                    <select
                                                        value={editForm.bloodGroup}
                                                        onChange={(e) => setEditForm({...editForm, bloodGroup: e.target.value})}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                                                    >
                                                        <option value="">Select Blood Group</option>
                                                        {bloodGroups.map(bg => (
                                                            <option key={bg} value={bg}>{bg}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                        voter.bloodGroup?.includes('+') 
                                                            ? 'bg-red-100 text-red-800'
                                                            : 'bg-blue-100 text-blue-800'
                                                    }`}>
                                                        {voter.bloodGroup}
                                                    </span>
                                                )}
                                            </td>
                                            
                                            {/* Status */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                    voter.status === 'active' 
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {voter.status || 'active'}
                                                </span>
                                            </td>
                                            
                                            {/* Actions */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {editingVoter === voter._id ? (
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleSaveEdit(voter._id)}
                                                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={handleCancelEdit}
                                                            className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleEditClick(voter)}
                                                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center"
                                                        >
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => setDeleteConfirm(voter)}
                                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm flex items-center"
                                                        >
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Delete Confirmation Modal */}
                {deleteConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                            <div className="p-6">
                                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.795-.833-2.565 0L4.33 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">
                                    Delete Voter
                                </h3>
                                <p className="mt-2 text-sm text-gray-500 text-center">
                                    Are you sure you want to delete voter "{deleteConfirm.name}"? This action cannot be undone.
                                </p>
                                <div className="mt-6 flex justify-center space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setDeleteConfirm(null)}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(deleteConfirm._id, deleteConfirm.name)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}