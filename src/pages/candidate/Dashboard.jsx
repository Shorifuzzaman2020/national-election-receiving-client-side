// import CandidateLayout from "../../layouts/CandidateLayout";


// export default function Dashboard() {
//     return (
//         <CandidateLayout>
//             <h1 className="text-xl font-bold">Candidate Dashboard</h1>
//         </CandidateLayout>
//     )
// }

import CandidateLayout from "../../layouts/CandidateLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import NominationForm from "./NominationForm";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/election/status")
      .then(res => setOpen(res.data.nominationOpen));
  }, []);

  return (
    <CandidateLayout>
      <h1 className="text-xl font-bold mb-6">Candidate Dashboard</h1>

      {open ? <NominationForm /> : (
        <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
          Nomination is not open yet.
        </div>
      )}
    </CandidateLayout>
  );
}
