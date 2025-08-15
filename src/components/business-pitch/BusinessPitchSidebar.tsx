import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Star, DollarSign } from "lucide-react";

interface BusinessPitchSidebarProps {
  registrationPrice: number;
}

const BusinessPitchSidebar = ({
  registrationPrice,
}: BusinessPitchSidebarProps) => {
  return (
    <div className="md:col-span-1">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-festival-green" />
            Eligibility
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Ages 18-40</li>
            <li>• Intending Business owners</li>
            <li>• Small Business Owners</li>
            <li>• Student Entrepreneurs</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-festival-gold" />
            Prizes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• General Prize of ₦1,000,000</li>
            <li>• Consolation Prizes</li>
            <li>• Mentorship opportunities</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-festival-green" />
            Entry Fee
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-festival-green">
            ₦{registrationPrice.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">
            One-time registration fee
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessPitchSidebar;
