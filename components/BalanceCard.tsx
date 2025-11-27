import { Card } from "@/ui/src/card";

export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <div className="w-full">
      
      <Card title="Balance">
        <div className="space-y-4">
          <div className="flex justify-between text-gray-700 border-b border-gray-200 pb-2">
            <span className="font-medium">Unlocked Balance</span>
            <span className="font-semibold">{amount / 100} INR</span>
          </div>

          <div className="flex justify-between text-gray-700 border-b border-gray-200 pb-2">
            <span className="font-medium">Total Locked Balance</span>
            <span className="font-semibold">{locked / 100} INR</span>
          </div>

          <div className="flex justify-between text-gray-800 pt-2">
            <span className="font-semibold">Total Balance</span>
            <span className="font-bold">{(locked + amount) / 100} INR</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
