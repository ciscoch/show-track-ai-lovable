
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, AlertTriangle, Thermometer, CloudRain } from "lucide-react";
import { WeatherAlert } from "@/services/weatherService";

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
  products: {
    title: string;
    description: string;
    imageUrl: string;
    price: string;
    affiliateUrl: string;
  }[];
}

const WeatherAlerts = ({ alerts, products }: WeatherAlertsProps) => {
  if (alerts.length === 0) return null;

  const getAlertIcon = (event: string) => {
    if (event.toLowerCase().includes('freeze') || event.toLowerCase().includes('cold'))
      return <Thermometer className="h-5 w-5" />;
    if (event.toLowerCase().includes('heat'))
      return <Thermometer className="h-5 w-5 text-orange-500" />;
    if (event.toLowerCase().includes('storm') || event.toLowerCase().includes('rain'))
      return <CloudRain className="h-5 w-5" />;
    return <AlertTriangle className="h-5 w-5" />;
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high': return "border-red-500 bg-red-50 dark:bg-red-950/30";
      case 'medium': return "border-amber-500 bg-amber-50 dark:bg-amber-950/30";
      default: return "border-blue-500 bg-blue-50 dark:bg-blue-950/30";
    }
  };

  return (
    <div className="space-y-6 my-6">
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <Alert 
            key={index} 
            className={`${getAlertColor(alert.severity)} flex items-center`}
          >
            <div className="flex gap-2 items-start">
              {getAlertIcon(alert.event)}
              <div>
                <AlertTitle className="text-sm font-semibold">{alert.event}</AlertTitle>
                <AlertDescription className="text-xs">
                  {alert.description}
                </AlertDescription>
                <p className="text-xs mt-1 text-muted-foreground">
                  {new Date(alert.start).toLocaleDateString()} - {new Date(alert.end).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Alert>
        ))}
      </div>

      {products.length > 0 && (
        <Card className="border-dashed border-yellow-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recommended Products</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product, index) => (
              <div key={index} className="flex border rounded-md overflow-hidden h-28">
                <div className="w-1/3 h-full">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-3 flex flex-col justify-between">
                  <div>
                    <h4 className="font-medium text-sm">{product.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{product.price}</span>
                    <Button
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => window.open(product.affiliateUrl, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View on Amazon
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WeatherAlerts;
