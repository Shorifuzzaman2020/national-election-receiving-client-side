// export default function Home(){
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-3xl">
//       Online Election System
//     </div>
//   )
// }

import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-900 to-slate-900 text-white flex flex-col items-center justify-center px-6">

            {/* System Title */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide">
                    National Election Receiving System
                </h1>
                <p className="text-lg text-slate-200">
                    Secure • Transparent • Voter Friendly
                </p>
            </div>

            {/* Main Actions */}
            <div className="w-full max-w-lg space-y-10">

                {/* Voter Login — BIG */}
                <Link
                    to="/voter-login"
                    className="block text-center bg-green-600 hover:bg-green-700 transition rounded-2xl py-8 text-2xl font-bold shadow-2xl"
                >
                    Voter Login
                </Link>

                {/* Admin Login — SMALL */}
                <div className="flex justify-center">
                    <Link
                        to="/administration"
                        className="text-sm px-5 py-2 rounded-md border border-slate-300 hover:bg-white hover:text-slate-900 transition"
                    >
                        Administrative Login
                    </Link>
                </div>
                <div className="flex justify-center">
                    <Link
                        to="/candidate-login"
                        className="text-sm px-5 py-2 rounded-md border border-slate-300 hover:bg-white hover:text-slate-900 transition"
                    >
                        Candidate Login
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-6 text-sm text-slate-300">
                © {new Date().getFullYear()} National Election Commission
            </div>
        </div>
    );
}
