import { SendCard } from "../../../components/SendCard";
import prisma from "@/db/index";
import { BalanceCard } from "../../../components/BalanceCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}
export default async function () {
  const balance = await getBalance();

   return (
  <div className="w-full flex justify-center px-6 pt-16 overflow-x-hidden max-w-screen min-h-screen overflow-y-auto">
    <div className="max-w-4xl w-full">

      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-12">
        Peer-to-Peer Transfer
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        <div className="w-full flex justify-center lg:justify-start">
          <SendCard />
        </div>

        <div className="w-full flex justify-center lg:justify-end">
          <BalanceCard amount={balance.amount} locked={balance.locked} />
        </div>

      </div>

    </div>
  </div>
);
}
