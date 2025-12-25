export default function SubAdminLayout({children}){
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-700 text-white p-4">Sub Admin Panel</div>
      <div className="p-4">{children}</div>
    </div>
  )
}
