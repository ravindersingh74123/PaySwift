// "use client"
// import { Button } from "@/ui/src/button";
// import { Card } from "@/ui/src/card";
// import { Select } from "@/ui/src/Select";
// import { useState } from "react";
// import { TextInput } from "@/ui/src/TextInput";
// import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";

// const SUPPORTED_BANKS = [{
//     name: "HDFC Bank",
//     redirectUrl: "https://netbanking.hdfcbank.com"
// }, {
//     name: "Axis Bank",
//     redirectUrl: "https://www.axisbank.com/"
// }];

// export const AddMoney = () => {
//     const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
//     const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
//     const [value, setValue] = useState(0)
//     return <Card title="Add Money">
//     <div className="w-full">
//         <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => {
//             setValue(Number(val))
//         }} />
//         <div className="py-4 text-left">
//             Bank
//         </div>
//         <Select onSelect={(value) => {
//             setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
//             setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
//         }} options={SUPPORTED_BANKS.map(x => ({
//             key: x.name,
//             value: x.name
//         }))} />
//         <div className="flex justify-center pt-4">
//             <Button onClick={async () => {
//                 await createOnRampTransaction(provider, value)
//                 window.location.href = redirectUrl || "";
//             }}>
//             Add Money
//             </Button>
//         </div>
//     </div>
// </Card>
// }


"use client";
import { Button } from "@/ui/src/button";
import { Card } from "@/ui/src/card";
import { Select } from "@/ui/src/Select";
import { useState } from "react";
import { TextInput } from "@/ui/src/TextInput";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [
  { name: "HDFC Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
  { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/" },
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [value, setValue] = useState(0);

  return (
    <Card title="Add Money">
      <div className="space-y-5">
        <TextInput
          label="Amount"
          placeholder="Enter amount"
          onChange={(val) => setValue(Number(val))}
        />

        <label className="text-sm font-medium text-gray-700">
          Select Bank
        </label>

        <Select
          onSelect={(value) => {
            const bank = SUPPORTED_BANKS.find((x) => x.name === value);
            setRedirectUrl(bank?.redirectUrl || "");
            setProvider(bank?.name || "");
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />

        <div className="flex justify-end">
          <Button
            onClick={async () => {
              await createOnRampTransaction(provider, value);
              window.location.href = redirectUrl || "";
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
