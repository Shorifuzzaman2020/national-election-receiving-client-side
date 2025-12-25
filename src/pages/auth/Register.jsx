import AuthLayout from "../../layouts/AuthLayout"

export default function Register(){
  return (
    <AuthLayout>
      <div className="bg-slate-800 p-8 rounded w-96">
        <h2 className="text-2xl mb-6 text-center">Register</h2>
        <input className="w-full p-2 mb-3 rounded text-black" placeholder="Name"/>
        <input className="w-full p-2 mb-3 rounded text-black" placeholder="Email"/>
        <input type="password" className="w-full p-2 mb-4 rounded text-black" placeholder="Password"/>
        <button className="w-full bg-green-600 py-2 rounded">Register</button>
      </div>
    </AuthLayout>
  )
}
