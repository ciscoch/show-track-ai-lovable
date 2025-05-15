
export const getBadgeColor = (type: string) => {
  switch (type) {
    case "bronze":
      return "bg-amber-600 hover:bg-amber-700";
    case "silver":
      return "bg-gray-400 hover:bg-gray-500";
    case "gold":
      return "bg-yellow-500 hover:bg-yellow-600";
    case "platinum":
      return "bg-indigo-600 hover:bg-indigo-700";
    default:
      return "bg-primary hover:bg-primary/90";
  }
};

export const getBuckleColor = (type: string): string => {
  switch (type) {
    case "bronze":
      return "bg-amber-600 border-amber-700 text-white";
    case "silver":
      return "bg-gray-400 border-gray-500 text-white";
    case "gold":
      return "bg-yellow-500 border-yellow-600 text-white";
    case "platinum":
      return "bg-indigo-600 border-indigo-700 text-white";
    default:
      return "bg-primary border-primary-foreground text-white";
  }
};

export const getSizeClasses = (size: "sm" | "md" | "lg") => {
  return {
    icon: {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
    }[size],
    iconSize: {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5",
    }[size],
    yearBuckle: {
      sm: "h-5 w-5",
      md: "h-6 w-6", 
      lg: "h-7 w-7",
    }[size],
    yearText: {
      sm: "text-[10px]",
      md: "text-xs",
      lg: "text-sm",
    }[size],
    glowUpYearBuckle: {
      sm: "h-6 w-6",
      md: "h-8 w-8",
      lg: "h-9 w-9",
    }[size],
    glowUpYearText: {
      sm: "text-[8px]",
      md: "text-[10px]",
      lg: "text-xs",
    }[size]
  };
};
