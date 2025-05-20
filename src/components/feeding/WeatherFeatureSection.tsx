
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { getWeatherForecast, detectWeatherAlerts } from "@/services/weatherService";
import PremiumFeatureBanner from "@/components/PremiumFeatureBanner";
import { LocationStatus } from "@/components/feeding/LocationStatus";
import WeatherAlerts from "@/components/weather/WeatherAlerts";
import { useNavigate } from "react-router-dom";
import { getCurrentPosition } from "@/platform/geolocation";

interface WeatherFeatureProps {
  hasWeatherAccess: boolean;
  user: any;
}

export const WeatherFeatureSection = ({ hasWeatherAccess, user }: WeatherFeatureProps) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [weatherAlerts, setWeatherAlerts] = useState<any[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);

  // Request geolocation on component mount
  useEffect(() => {
    if (hasWeatherAccess) {
      setIsLoadingWeather(true);
      getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setLocationError(null);
        },
        (error) => {
          setLocationError("Unable to retrieve your location. Weather alerts disabled.");
          setIsLoadingWeather(false);
          console.error("Geolocation error:", error);
        }
      );
    } else if (!hasWeatherAccess) {
      setLocationError(null);
      setIsLoadingWeather(false);
    } else {
      setLocationError("Geolocation is not supported by your browser. Weather alerts disabled.");
      setIsLoadingWeather(false);
    }
  }, [hasWeatherAccess]);

  // Fetch weather forecast when location is available
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!location || !hasWeatherAccess) return;
      
      try {
        const forecast = await getWeatherForecast(location.latitude, location.longitude);
        const alerts = detectWeatherAlerts(forecast);
        setWeatherAlerts(alerts);
        
        const products = getRecommendedProducts(alerts);
        setRecommendedProducts(products);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        toast({
          title: "Weather Data Error",
          description: "Unable to fetch weather alerts. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingWeather(false);
      }
    };
    
    fetchWeatherData();
  }, [location, hasWeatherAccess]);
  
  const handleUpgradeClick = () => {
    navigate('/subscription');
  };

  // If user doesn't have premium access, show upgrade banner
  if (!hasWeatherAccess) {
    return (
      <PremiumFeatureBanner
        title="Weather Alerts"
        description="Receive weather alerts and recommended products for your animals based on your location. Upgrade to Pro or Elite to access this feature."
        requiredLevel="pro"
        onUpgrade={handleUpgradeClick}
        currentLevel={user?.subscriptionLevel || 'free'}
      />
    );
  }

  // If user has premium access, show weather components
  return (
    <>
      <LocationStatus isLoading={isLoadingWeather} error={locationError} />
      
      {!isLoadingWeather && !locationError && (
        <WeatherAlerts alerts={weatherAlerts} products={recommendedProducts} />
      )}
    </>
  );
};

const getRecommendedProducts = (alerts: any[]) => {
  // Mock function to return recommended products based on weather alerts
  const products: any[] = [];
  
  for (const alert of alerts) {
    if (alert.event.toLowerCase().includes('freeze') || alert.event.toLowerCase().includes('cold')) {
      products.push({
        title: "Heated Water Bucket",
        description: "Keep your animal's water from freezing in cold temperatures",
        price: "$49.99",
        imageUrl: "https://placehold.co/100x100",
        affiliateUrl: "https://amazon.com/sample-product"
      });
      
      products.push({
        title: "Cold Weather Animal Blanket",
        description: "Insulated blanket for livestock during freezing temperatures",
        price: "$39.99",
        imageUrl: "https://placehold.co/100x100",
        affiliateUrl: "https://amazon.com/sample-product"
      });
    }
    
    if (alert.event.toLowerCase().includes('heat')) {
      products.push({
        title: "Livestock Cooling Fan",
        description: "Keep your animals cool during hot weather",
        price: "$89.99",
        imageUrl: "https://placehold.co/100x100",
        affiliateUrl: "https://amazon.com/sample-product"
      });
      
      products.push({
        title: "Animal Shade Structure",
        description: "Portable shade to protect animals from excessive heat",
        price: "$129.99",
        imageUrl: "https://placehold.co/100x100",
        affiliateUrl: "https://amazon.com/sample-product"
      });
    }
    
    if (alert.event.toLowerCase().includes('storm') || alert.event.toLowerCase().includes('rain')) {
      products.push({
        title: "Waterproof Animal Shelter",
        description: "Protect your animals from storms and heavy rain",
        price: "$199.99",
        imageUrl: "https://placehold.co/100x100",
        affiliateUrl: "https://amazon.com/sample-product"
      });
    }
  }
  
  return products;
};
