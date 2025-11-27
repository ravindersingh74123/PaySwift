// "use client"
// import { Button } from "@/ui/src/button";
// import { Card } from "@/ui/src/card";
// import { Center } from "@/ui/src/Center";
// import { TextInput } from "@/ui/src/TextInput";
// import { useState } from "react";
// import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

// export function SendCard() {
//     const [number, setNumber] = useState("");
//     const [amount, setAmount] = useState("");

//     return <div className="h-[90vh]">
//         <Center>
//             <Card title="Send">
//                 <div className="min-w-72 pt-2">
//                     <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
//                         setNumber(value)
//                     }} />
//                     <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
//                         setAmount(value)
//                     }} />
//                     <div className="pt-4 flex justify-center">
//                         <Button onClick={async () => {
//                             await p2pTransfer(number, Number(amount) * 100)
//                         }}>Send</Button>
//                     </div>
//                 </div>
//             </Card>
//         </Center>
//     </div>
// }


// "use client"
// import { Button } from "@/ui/src/button";
// import { Card } from "@/ui/src/card";
// import { Center } from "@/ui/src/Center";
// import { TextInput } from "@/ui/src/TextInput";
// import { useState } from "react";
// import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

// export function SendCard() {
//     const [number, setNumber] = useState("");
//     const [amount, setAmount] = useState("");
//     const [message, setMessage] = useState("");

//     return (
//         <div className="h-[90vh]">
//             <Center>
//                 <Card title="Send">
//                     <div className="min-w-72 pt-2">
//                         <TextInput
//                             placeholder={"Number"}
//                             label="Number"
//                             onChange={(value) => {setNumber(value);setMessage("");}}
                            
//                         />
//                         <TextInput
//                             placeholder={"Amount"}
//                             label="Amount"
//                             onChange={(value) => {setAmount(value);setMessage("");}}
//                         />
//                         <div className="pt-4 flex justify-center">
//                             <Button
//                                 onClick={async () => {
//                                     setMessage(""); // clear previous message
//                                     try {
//                                         await p2pTransfer(number, Number(amount) * 100);
//                                         setMessage("✅ Money sent!");
//                                     } catch (error) {
//                                         setMessage("❌ Failed to send money.");
//                                     }
//                                 }}
//                             >
//                                 Send
//                             </Button>
//                         </div>
//                         {message && (
//                             <div className="pt-4 text-center text-sm text-gray-700">
//                                 {message}
//                             </div>
//                         )}
//                     </div>
//                 </Card>
//             </Center>
//         </div>
//     );
// }



"use client";
import { Button } from "@/ui/src/button";
import { Card } from "@/ui/src/card";
import { Center } from "@/ui/src/Center";
import { TextInput } from "@/ui/src/TextInput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className=" flex items-center justify-center">
      <Center>
        <Card title="Send">
          <div className="w-80 sm:w-96 space-y-6 pt-4">

            <TextInput
              placeholder="Enter mobile number"
              label="Phone Number"
              onChange={(value) => {
                setNumber(value);
                setMessage("");
              }}
            />

            <TextInput
              placeholder="Enter amount"
              label="Amount"
              onChange={(value) => {
                setAmount(value);
                setMessage("");
              }}
            />

            <div className="flex justify-end">
              <Button
                onClick={async () => {
                  setMessage("");
                  try {
                    await p2pTransfer(number, Number(amount) * 100);
                    setMessage("Money sent successfully!");
                  } catch {
                    setMessage("Failed to send money.");
                  }
                }}
              >
                Send
              </Button>
            </div>

            {message && (
              <div
                className={`text-sm text-center font-medium ${
                  message.toLowerCase().includes("failed")
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {message}
              </div>
            )}

          </div>
        </Card>
      </Center>
    </div>
  );
}

