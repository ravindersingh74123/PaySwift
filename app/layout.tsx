
// import "./globals.css";
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { Providers } from "../provider";
// import { JSX } from "react";
// import LayoutWrapper from "@/components/LayoutWrapper";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Wallet",
//   description: "Simple wallet app",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }): JSX.Element {
 
//   return (
//     <html lang="en">
//       <Providers>
//         <body className={inter.className}>
//           <div className="min-w-full min-h-screen overflow-x-hidden">
            
//            <LayoutWrapper>{children}</LayoutWrapper>
//           </div>
//         </body>
//       </Providers>
//     </html>
//   );
// }


import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import { JSX } from "react";
import LayoutWrapper from "@/components/LayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple wallet app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen overflow-x-hidden bg-white`}
      >
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
