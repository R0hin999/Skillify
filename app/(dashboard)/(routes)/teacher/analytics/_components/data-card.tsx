import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format";

interface DataCardProps {
  value: number;
  label: string;
  shouldFormat?: boolean;
}

const DataCard = ({ value, label, shouldFormat }: DataCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Card>
          <CardTitle className="text-sm font-medium p-2">{label}</CardTitle>
        </Card>
      </CardHeader>
      <CardContent>
        <div className={shouldFormat?"text-2xl font-bold text-green-500":"text-2xl font-bold "}>
          {shouldFormat ? formatPrice(value) : value}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataCard;
