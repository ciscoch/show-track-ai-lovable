
// Weather service using WeatherAPI.com
// The API key is loaded from an environment variable

interface WeatherForecast {
  current: {
    temp: number;
    weather: {
      id: number;
      main: string;
      description: string;
    }[];
  };
  daily: {
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
    }[];
  }[];
  alerts?: {
    event: string;
    description: string;
    start: number;
    end: number;
  }[];
}

export interface WeatherAlert {
  event: string;
  description: string;
  start: Date;
  end: Date;
  severity: 'low' | 'medium' | 'high';
}

// WeatherAPI.com key from environment variables
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeatherForecast(
  latitude: number,
  longitude: number
): Promise<WeatherForecast | null> {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=3&alerts=yes&aqi=no`
    );

    if (!response.ok) {
      console.error("Weather API error:", await response.text());
      return null;
    }

    const data = await response.json();

    // Convert WeatherAPI response to WeatherForecast format
    const forecast: WeatherForecast = {
      current: {
        temp: data.current.temp_f,
        weather: [
          {
            id: data.current.condition.code,
            main: data.current.condition.text,
            description: data.current.condition.text,
          },
        ],
      },
      daily: data.forecast.forecastday.map((day: any) => ({
        dt: day.date_epoch,
        temp: {
          min: day.day.mintemp_f,
          max: day.day.maxtemp_f,
        },
        weather: [
          {
            id: day.day.condition.code,
            main: day.day.condition.text,
            description: day.day.condition.text,
          },
        ],
      })),
      alerts: data.alerts?.alert?.map((alert: any) => ({
        event: alert.event || alert.headline,
        description: alert.desc,
        start: alert.effective_epoch,
        end: alert.expires_epoch,
      })),
    };

    return forecast;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    return null;
  }
}

export function detectWeatherAlerts(forecast: WeatherForecast | null): WeatherAlert[] {
  if (!forecast) return [];
  
  const alerts: WeatherAlert[] = [];
  
  // Check for any official weather alerts
  if (forecast.alerts) {
    forecast.alerts.forEach(alert => {
      alerts.push({
        event: alert.event,
        description: alert.description,
        start: new Date(alert.start * 1000),
        end: new Date(alert.end * 1000),
        severity: 'high'
      });
    });
  }
  
  // Check for freezing temperatures in the next 3 days
  forecast.daily.slice(0, 3).forEach(day => {
    if (day.temp.min < 32) { // Freezing point in Fahrenheit
      alerts.push({
        event: 'Freeze Warning',
        description: `Temperatures will drop below freezing on ${new Date(day.dt * 1000).toLocaleDateString()}. Protect animals from cold.`,
        start: new Date(day.dt * 1000),
        end: new Date(day.dt * 1000 + 24 * 60 * 60 * 1000),
        severity: 'medium'
      });
    }
  });
  
  // Check for extreme heat in the next 3 days
  forecast.daily.slice(0, 3).forEach(day => {
    if (day.temp.max > 95) { // Very hot temperature
      alerts.push({
        event: 'Heat Advisory',
        description: `High temperatures expected on ${new Date(day.dt * 1000).toLocaleDateString()}. Ensure animals have shade and water.`,
        start: new Date(day.dt * 1000),
        end: new Date(day.dt * 1000 + 24 * 60 * 60 * 1000),
        severity: 'medium'
      });
    }
  });
  
  return alerts;
}

export function getRecommendedProducts(alerts: WeatherAlert[]): {
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  affiliateUrl: string;
}[] {
  const products = [];
  
  for (const alert of alerts) {
    if (alert.event.toLowerCase().includes('freeze') || alert.description.toLowerCase().includes('freez')) {
      products.push({
        title: "Goat Coat Winter Protection",
        description: "Keep your goats warm during freezing temperatures with this durable coat designed for livestock.",
        imageUrl: "https://m.media-amazon.com/images/I/71Jf9XiAsAL._AC_SL1500_.jpg",
        price: "$39.99",
        affiliateUrl: "https://www.amazon.com/s?k=goat+coat&tag=stockai-20"
      });
      
      products.push({
        title: "Livestock Water Heater",
        description: "Prevent water from freezing and ensure your animals stay hydrated during cold weather.",
        imageUrl: "https://m.media-amazon.com/images/I/71o1DM7CBML._AC_SL1500_.jpg",
        price: "$45.99",
        affiliateUrl: "https://www.amazon.com/s?k=livestock+water+heater&tag=stockai-20"
      });
    }
    
    if (alert.event.toLowerCase().includes('heat') || alert.description.toLowerCase().includes('heat')) {
      products.push({
        title: "Livestock Cooling Mister System",
        description: "Keep your animals cool during extreme heat with this easy-to-install mister system.",
        imageUrl: "https://m.media-amazon.com/images/I/81jbvmxx5RL._AC_SL1500_.jpg",
        price: "$29.99",
        affiliateUrl: "https://www.amazon.com/s?k=livestock+cooling+mister&tag=stockai-20"
      });
    }
    
    if (alert.event.toLowerCase().includes('storm') || alert.description.toLowerCase().includes('storm')) {
      products.push({
        title: "Portable Animal Shelter",
        description: "Protect your livestock from storms and harsh weather with this portable, easy-to-assemble shelter.",
        imageUrl: "https://m.media-amazon.com/images/I/71Df4CQaSQL._AC_SL1500_.jpg",
        price: "$189.99",
        affiliateUrl: "https://www.amazon.com/s?k=portable+animal+shelter&tag=stockai-20"
      });
    }
  }
  
  return products;
}
