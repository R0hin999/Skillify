import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAnalytics } from "@/actions/get-analytics";
import DataCard from "./_components/data-card";
import { redirect } from "next/navigation";
import { Chart } from "./_components/chart";

interface SessionProps {
  user: {
    id: string;
  };
}

const AnalyticsPage = async () => {
  const session: SessionProps | null = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return redirect("/");
  }
  const { data, totalSales, totalRevenue } = await getAnalytics(userId);
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Total Revenue" value={totalRevenue} shouldFormat />
        <DataCard label="Total Sales" value={totalSales} />
      </div>
      <Chart data={data} />
    </div>
  );
};

export default AnalyticsPage;
