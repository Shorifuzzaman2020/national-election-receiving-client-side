import { useState } from "react";
import api from "../../services/api";

export default function Login(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async()=>{
    const res = await api.post("/auth/login",{email,password});
    localStorage.setItem("token",res.data.token);
    const role = res.data.role;
    window.location.href = `/${role}`;
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded w-96 text-white">
        <input onChange={e=>setEmail(e.target.value)} className="w-full p-2 mb-3 text-black" placeholder="Email"/>
        <input type="password" onChange={e=>setPassword(e.target.value)} className="w-full p-2 mb-4 text-black" placeholder="Password"/>
        <button onClick={handleLogin} className="w-full bg-blue-600 py-2 rounded">Login</button>
      </div>
    </div>
  );
}
