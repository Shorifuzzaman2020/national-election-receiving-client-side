export default function CandidateLayout({children}){
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-700 text-white p-4">Candidate Panel</div>
      <div className="p-4">{children}</div>
    </div>
  )
}
