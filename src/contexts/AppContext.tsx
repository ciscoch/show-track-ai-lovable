
import { createContext, useContext } from "react";
import { AppContextType } from "./AppContextTypes";
import { useAppProviderState } from "./AppContextProvider";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const state = useAppProviderState();
  
  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
