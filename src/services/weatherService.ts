
// Weather service using OpenWeatherMap API
// We're using a free API key limit for demo purposes
// In production, this should be moved to environment variables

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

const API_KEY = "bd5e378503939ddaee76f12ad7a97608"; // Demo API key for OpenWeatherMap

export async function getWeatherForecast(
  latitude: number,
  longitude: number
): Promise<WeatherForecast | null> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=imperial&appid=${API_KEY}`
    );

    if (!response.ok) {
      console.error("Weather API error:", await response.text());
      return null;
    }

    return await response.json();
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
