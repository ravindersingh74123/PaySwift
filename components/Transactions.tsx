// "use client";

// import { useEffect, useState } from "react";
// import { Card } from "@/ui/src/card";

// interface Transaction {
//   id: string;
//   type: "onramp" | "p2p";
//   amount: number;
//   time: string;
//   status?: string;
//   provider?: string;
//   message?: string;
//   direction?: "credited" | "debited";
//   counterparty?: string;
// }

// export const Transactions = () => {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);

//   useEffect(() => {
//     fetch("/api/transactions")
//       .then(res => res.json())
//       .then(setTransactions)
//       .catch(console.error);
//   }, []);

//   return (
//     <Card title="Transaction History">
//       {transactions.map(tx => (
//         <div
//           key={tx.id}
//           className="border-b py-3 text-sm flex flex-col gap-1"
//         >
//           <div className="font-medium">
//             {tx.type === "onramp"
//               ? tx.message
//               : `${tx.direction === "credited" ? "Received from" : "Sent to"} ${tx.counterparty}`}
//           </div>
//           <div className="text-xs text-gray-600">
//             ₹{(tx.amount / 100).toFixed(2)} • {new Date(tx.time).toLocaleString()}
//           </div>
//           {tx.status && <div className="text-xs text-blue-600">Status: {tx.status}</div>}
//         </div>
//       ))}
//     </Card>
//   );
// };



"use client";

import { useEffect, useState } from "react";
import { Card } from "@/ui/src/card";

interface Transaction {
  id: string;
  type: "onramp" | "p2p";
  amount: number;
  time: string;
  status?: string;
  provider?: string;
  message?: string;
  direction?: "credited" | "debited";
  counterparty?: string;
}

export const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then(res => res.json())
      .then(setTransactions)
      .catch(console.error);
  }, []);

  const bankTransfers = transactions.filter(tx => tx.type === "onramp");
  const p2pTransfers = transactions.filter(tx => tx.type === "p2p");

  return (
    <Card title="Transaction History">
      <div className="text-lg font-semibold mb-2">Bank Transfers</div>
      {bankTransfers.length === 0 ? (
        <div className="text-sm text-gray-500 pb-4">No bank transfers found.</div>
      ) : (
        bankTransfers.map(tx => (
          <div
            key={tx.id}
            className="border-b py-3 text-sm flex flex-col gap-1"
          >
            <div className="font-medium">
              Bank transfer via {tx.provider}
            </div>
            <div className="text-xs text-gray-600">
              ₹{(tx.amount / 100).toFixed(2)} • {new Date(tx.time).toLocaleString()}
            </div>
            {tx.status && <div className="text-xs text-blue-600">Status: {tx.status}</div>}
          </div>
        ))
      )}

      <div className="text-lg font-semibold mt-6 mb-2">P2P Transfers</div>
      {p2pTransfers.length === 0 ? (
        <div className="text-sm text-gray-500">No P2P transfers found.</div>
      ) : (
        <div className="grid grid-cols-3 text-sm font-medium border-b pb-1">
          <div>Type</div>
          <div>Amount</div>
          <div>With</div>
        </div>
      )}
      {p2pTransfers.map(tx => (
        <div
          key={tx.id}
          className="grid grid-cols-3 text-sm py-2 border-b"
        >
          <div className={tx.direction === "credited" ? "text-green-600" : "text-red-600"}>
            {tx.direction === "credited" ? "Credited" : "Debited"}
          </div>
          <div>₹{(tx.amount / 100).toFixed(2)}</div>
          <div>{tx.counterparty}</div>
        </div>
      ))}
    </Card>
  );
};
