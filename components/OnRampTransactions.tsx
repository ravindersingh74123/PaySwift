import { Card } from "@/ui/src/card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center py-10 text-gray-500 text-sm">
          No recent transactions
        </div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="pt-2 space-y-4">
        {transactions.map((t) => (
          <div
            key={t.time.toISOString()}
            className="flex justify-between border-b border-gray-200 pb-3 last:border-none last:pb-0"
          >
            <div>
              <div className="font-medium text-gray-800 text-sm">
                Received INR
              </div>
              <div className="text-xs text-gray-500">
                {t.time.toDateString()}
              </div>
            </div>

            <div className="flex flex-col justify-center font-semibold text-green-600">
              + ₹ {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
