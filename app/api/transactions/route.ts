import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import db from "@/db/index";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = Number(session.user.id);

  // Fetch OnRamp transactions
  const onRampTransactions = await db.onRampTransaction.findMany({
    where: { userId },
    orderBy: { startTime: "desc" }
  });

  // Fetch P2P transactions
  const p2pTransfers = await db.p2pTransfer.findMany({
    where: {
      OR: [
        { fromUserId: userId },
        { toUserId: userId }
      ]
    },
    orderBy: { timestamp: "desc" },
    include: {
      fromUser: true,
      toUser: true
    }
  });

  const formattedTransactions = [
    ...onRampTransactions.map(tx => ({
      id: `onramp-${tx.id}`,
      type: "onramp",
      status: tx.status,
      provider: tx.provider,
      amount: tx.amount,
      time: tx.startTime,
      message: `Bank transfer via ${tx.provider}`
    })),
    ...p2pTransfers.map(tx => ({
      id: `p2p-${tx.id}`,
      type: "p2p",
      amount: tx.amount,
      time: tx.timestamp,
      direction: tx.fromUserId === userId ? "debited" : "credited",
      counterparty: tx.fromUserId === userId ? tx.toUser.number : tx.fromUser.number
    }))
  ];

  // Sort all transactions by time
  formattedTransactions.sort((a, b) => +new Date(b.time) - +new Date(a.time));

  return Response.json(formattedTransactions);
}
