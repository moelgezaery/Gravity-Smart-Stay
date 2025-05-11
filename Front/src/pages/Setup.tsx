
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, KeyRound, CreditCard, BedDouble, HomeIcon, Settings, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface SetupCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
}

const SetupCard = ({ title, description, icon, to }: SetupCardProps) => {
  return (
    <Link to={to}>
      <Card className="h-full hover:border-primary/40 transition-colors cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

const Setup = () => {
  const { t } = useTranslation();
  
  const setupItems = [
    {
      title: t("hotelDetails"),
      description: t("hotelDetailsDescription"),
      icon: <Building2 size={20} />,
      to: "/setup/hotel-details"
    },
    {
      title: t("usersPermissions"),
      description: t("usersPermissionsDescription"),
      icon: <Users size={20} />,
      to: "/setup/users"
    },
    {
      title: t("roomsFloors"),
      description: t("roomsFloorsDescription"),
      icon: <BedDouble size={20} />,
      to: "/setup/rooms-floors"
    },
    {
      title: t("roomTypes"),
      description: t("roomTypesDescription"),
      icon: <HomeIcon size={20} />,
      to: "/setup/room-types"
    },
    {
      title: t("roomRates"),
      description: t("roomRatesDescription"),
      icon: <DollarSign size={20} />,
      to: "/setup/room-rates"
    },
    {
      title: t("currencies"),
      description: t("currenciesDescription"),
      icon: <CreditCard size={20} />,
      to: "/setup/currencies"
    },
    {
      title: t("services"),
      description: t("servicesDescription"),
      icon: <KeyRound size={20} />,
      to: "/setup/services"
    },
    {
      title: t("generalSettings"),
      description: t("settingsDescription"),
      icon: <Settings size={20} />,
      to: "/setup/settings"
    },
  ];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-navy-500">{t("setup")}</h1>
        <p className="text-muted-foreground mt-1">{t("settingsDescription")}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {setupItems.map((item, index) => (
          <SetupCard
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
            to={item.to}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Setup;
