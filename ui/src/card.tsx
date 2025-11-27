// import React, { JSX } from "react";

// export function Card({
//   title,
//   children,
// }: {
//   title: string;
//   children?: React.ReactNode;
// }): JSX.Element {
//   return (
//     <div
//       className="border p-6 bg-white rounded-xl bg-[#ededed]"
//     >
//       <h1 className="text-xl border-b pb-2">
//         {title}
//       </h1>
//       <div >{children}</div>
//     </div>
//   );
// }




export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm px-6 py-5">
      <h1 className="text-lg font-semibold text-gray-800 mb-4">
        {title}
      </h1>
      {children}
    </div>
  );
}
