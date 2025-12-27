

import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function AddVoter() {
  const [form, setForm] = useState({
    name: "", 
    voterId: "", 
    email: "", 
    phone: "",
    dob: null, 
    district: "", 
    upazila: "", 
    union: "", 
    bloodGroup: ""
  });

  const [age, setAge] = useState(null);
  const [isEligible, setIsEligible] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [datePickerKey, setDatePickerKey] = useState(Date.now()); // To reset datepicker

  // Calculate age when DOB changes
  useEffect(() => {
    if (form.dob) {
      const today = new Date();
      const birthDate = new Date(form.dob);
      
      // Calculate years
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      
      setAge(calculatedAge);
      setIsEligible(calculatedAge >= 18);
      
      // Update errors
      if (calculatedAge < 18) {
        setErrors(prev => ({
          ...prev,
          dob: "Must be at least 18 years old to register as voter"
        }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.dob;
          return newErrors;
        });
      }
    }
  }, [form.dob]);

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validate phone number (Bangladeshi format)
  const validatePhone = (phone) => {
    const re = /^(?:\+88|01)?(?:\d{11}|\d{13})$/;
    return re.test(phone);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.voterId.trim()) newErrors.voterId = "Voter ID is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!validatePhone(form.phone)) {
      newErrors.phone = "Invalid phone number (should be 11 digits)";
    }
    if (!form.dob) newErrors.dob = "Date of birth is required";
    if (!form.district) newErrors.district = "District is required";
    if (!form.upazila.trim()) newErrors.upazila = "Upazila is required";
    if (!form.union.trim()) newErrors.union = "Union is required";
    if (!form.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert("Please fix the errors in the form");
      return;
    }
    
    if (!isEligible) {
      alert("You must be at least 18 years old to register as a voter");
      return;
    }

    setLoading(true);
    
    try {
      // Format date for backend
      const formattedForm = {
        ...form,
        dob: form.dob.toISOString().split('T')[0], // Format as YYYY-MM-DD
        age: age // Send age to backend for verification
      };

      await axios.post("https://server-voting-app.vercel.app/subadmin/voters", formattedForm);
      
      alert("Voter Added Successfully!");
      
      // Reset form
      setForm({
        name: "", 
        voterId: "", 
        email: "", 
        phone: "",
        dob: null, 
        district: "", 
        upazila: "", 
        union: "", 
        bloodGroup: ""
      });
      setAge(null);
      setIsEligible(false);
      setDatePickerKey(Date.now()); // Reset date picker
      setErrors({});
      
    } catch (error) {
      console.error("Error adding voter:", error);
      alert(error.response?.data?.message || "Failed to add voter. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Add New Voter
          </h2>
          <p className="text-blue-100 text-center mt-2">
            Register a new voter for the election
          </p>
        </div>

        {/* Age Eligibility Banner */}
        {form.dob && (
          <div className={`p-4 mx-6 mt-6 rounded-lg ${isEligible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center">
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${isEligible ? 'bg-green-100' : 'bg-red-100'}`}>
                {isEligible ? (
                  <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${isEligible ? 'text-green-800' : 'text-red-800'}`}>
                  Age: <span className="font-bold">{age} years</span> • 
                  <span className="ml-2">
                    {isEligible ? "✅ Eligible to vote (18+ years)" : "❌ Not eligible (under 18 years)"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  placeholder="Enter full name"
                  className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Voter ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Voter ID *
                </label>
                <input
                  type="text"
                  value={form.voterId}
                  placeholder="Enter voter ID"
                  className={`w-full border ${errors.voterId ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                  onChange={e => setForm({ ...form, voterId: e.target.value })}
                />
                {errors.voterId && <p className="mt-1 text-sm text-red-600">{errors.voterId}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={form.email}
                  placeholder="example@email.com"
                  className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  placeholder="01XXXXXXXXX"
                  className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth *
            </label>
            <div className="relative">
              <DatePicker
                key={datePickerKey}
                selected={form.dob}
                onChange={(date) => setForm({ ...form, dob: date })}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select date of birth"
                className={`w-full border ${errors.dob ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                maxDate={new Date()}
                isClearable
              />
              <div className="absolute right-3 top-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob}</p>}
            {form.dob && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {form.dob.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            )}
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Address Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* District */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  District *
                </label>
                <select
                  value={form.district}
                  className={`w-full border ${errors.district ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                  onChange={e => setForm({ ...form, district: e.target.value })}
                >
                  <option value="">Select District</option>
                  {districts.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district}</p>}
              </div>

              {/* Upazila */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upazila *
                </label>
                <input
                  type="text"
                  value={form.upazila}
                  placeholder="Enter upazila"
                  className={`w-full border ${errors.upazila ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                  onChange={e => setForm({ ...form, upazila: e.target.value })}
                />
                {errors.upazila && <p className="mt-1 text-sm text-red-600">{errors.upazila}</p>}
              </div>

              {/* Union */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Union *
                </label>
                <input
                  type="text"
                  value={form.union}
                  placeholder="Enter union"
                  className={`w-full border ${errors.union ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                  onChange={e => setForm({ ...form, union: e.target.value })}
                />
                {errors.union && <p className="mt-1 text-sm text-red-600">{errors.union}</p>}
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blood Group *
            </label>
            <select
              value={form.bloodGroup}
              className={`w-full border ${errors.bloodGroup ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
              onChange={e => setForm({ ...form, bloodGroup: e.target.value })}
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
            {errors.bloodGroup && <p className="mt-1 text-sm text-red-600">{errors.bloodGroup}</p>}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || !isEligible}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition ${
                loading || !isEligible
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : isEligible ? (
                'Add Voter'
              ) : (
                'Age Not Eligible (Minimum 18 Years)'
              )}
            </button>
            
            <p className="text-center text-sm text-gray-500 mt-3">
              * Required fields must be filled. Age must be 18+ for voter registration.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}