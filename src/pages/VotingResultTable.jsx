

import React from "react";

export default function VotingResultTable({ results, voterAddress }) {

    // keep only candidates from same address as voter
    const filteredResults = results.filter(
        c => c.address === voterAddress
    );

    // calculate total votes ONLY for matched candidates
    const totalVotes = filteredResults.reduce(
        (sum, c) => sum + (c.votes || 0), 0
    );

    const getSignImage = (sign) => {
        if (!sign) return "https://via.placeholder.com/80";

        const key = sign.toString().trim().toLowerCase();

        const map = {
            elephant: "https://i.ibb.co.com/FkW0CrPk/download.jpg",
            computer: "https://i.ibb.co.com/PGf5YNdh/3285193-l3-969584-1-7d4a3ed14e0768912edcbf5203cbdc63.jpg",
            rocket: "https://i.ibb.co.com/WWf8tQ53/a1b1595eb9ca9d8b8a2f83d48171f142.jpg",
            pen: "https://i.ibb.co.com/r2RgzNcH/istockphoto-158424399-612x612.jpg",
            horse: "https://i.ibb.co.com/TxhvmqSw/cz-Nmcy1wcml2-YXRl-L3-Jhd3-Bpe-GVs-X2lt-YWdlcy93-ZWJza-XRl-X2-Nvbn-Rlbn-Qv-Zn-Job3-Jz-ZV9n-YWxsb3-Bf-Y2-Fud.jpg",
        };

        return map[key] || "https://via.placeholder.com/80";
    };

    if (filteredResults.length === 0) {
        return (
            <div className="bg-white p-8 mt-8 rounded shadow text-center">
                ❌ No results found for your area: <b>{voterAddress}</b>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 mt-8 rounded shadow">
            <h2 className="text-2xl font-bold text-center mb-6">
                🏆 Election Results ({voterAddress})
            </h2>

            <table className="w-full border">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3 border">Rank</th>
                        <th className="p-3 border">Name</th>
                        <th className="p-3 border">Address</th>
                        <th className="p-3 border">Sign</th>
                        <th className="p-3 border">Total Votes</th>
                        <th className="p-3 border">Vote %</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredResults.map((c, i) => {
                        const percent =
                            totalVotes > 0
                                ? ((c.votes / totalVotes) * 100).toFixed(2)
                                : "0.00";

                        return (
                            <tr
                                key={c._id}
                                className={
                                    i === 0
                                        ? "bg-green-100 font-bold"
                                        : ""
                                }
                            >
                                <td className="p-3 border text-center">
                                    {i + 1}
                                </td>

                                <td className="p-3 border">
                                    {c.name}
                                </td>

                                <td className="p-3 border">
                                    {c.address}
                                </td>

                                <td className="p-3 border text-center">
                                    <img
                                        src={getSignImage(c.sign)}
                                        alt={c.sign}
                                        className="w-10 h-10 mx-auto rounded-full"
                                    />
                                </td>

                                <td className="p-3 border text-center">
                                    {c.votes}
                                </td>

                                <td className="p-3 border text-center">
                                    {percent} %
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <p className="mt-4 text-center text-green-700 font-semibold">
                🥇 Winner: {filteredResults[0].name}
            </p>
        </div>
    );
}
