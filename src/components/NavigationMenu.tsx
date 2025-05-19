
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { 
  HomeIcon, 
  WeightIcon, 
  BookIcon, 
  GalleryVerticalIcon, 
  ChartBarIcon,
  CalendarIcon,
  UsersIcon
} from "lucide-react";

const MainNavigationMenu = () => {
  const navigate = useNavigate();
  
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <NavigationMenu className="mx-auto my-6">
      <NavigationMenuList className="gap-2">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <li className="row-span-3">
                <div
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md cursor-pointer"
                  onClick={() => handleNavigate("/dashboard")}
                >
                  <HomeIcon className="h-6 w-6 mb-2" />
                  <div className="mb-2 mt-4 text-lg font-medium">
                    Home
                  </div>
                  <p className="text-sm leading-tight text-muted-foreground">
                    Return to the dashboard and manage your animals
                  </p>
                </div>
              </li>
              <ListItem 
                path="/weights" 
                title="Weight Tracking" 
                icon={<WeightIcon className="h-4 w-4 mr-2" />}
                onNavigate={handleNavigate}
              >
                Monitor weight progress for all your animals
              </ListItem>
              <ListItem 
                path="/journal" 
                title="Journal" 
                icon={<BookIcon className="h-4 w-4 mr-2" />}
                onNavigate={handleNavigate}
              >
                Log daily observations and training notes
              </ListItem>
              <ListItem 
                path="/gallery" 
                title="Gallery" 
                icon={<GalleryVerticalIcon className="h-4 w-4 mr-2" />}
                onNavigate={handleNavigate}
              >
                View progress photos of your animals
              </ListItem>
              <ListItem 
                path="/expenses" 
                title="Expenses" 
                icon={<ChartBarIcon className="h-4 w-4 mr-2" />}
                onNavigate={handleNavigate}
              >
                Track costs and generate tax reports
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Planning</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4">
              <ListItem 
                path="/schedule" 
                title="Schedule" 
                icon={<CalendarIcon className="h-4 w-4 mr-2" />}
                onNavigate={handleNavigate}
              >
                Manage upcoming events and appointments
              </ListItem>
              <ListItem 
                path="/feed-reminders" 
                title="Feed Reminders" 
                icon={<CalendarIcon className="h-4 w-4 mr-2" />}
                onNavigate={handleNavigate}
              >
                Set up feeding schedule reminders
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Social</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4">
              <ListItem 
                path="/friends" 
                title="Friends" 
                icon={<UsersIcon className="h-4 w-4 mr-2" />}
                onNavigate={handleNavigate}
              >
                Connect with other animal owners and exhibitors
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <div
            className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}
            onClick={() => handleNavigate("/settings")}
          >
            Settings
          </div>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

interface ListItemProps {
  path: string;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onNavigate: (path: string) => void;
}

const ListItem = ({
  path,
  title,
  children,
  icon,
  onNavigate
}: ListItemProps) => {
  return (
    <li>
      <div
        onClick={() => onNavigate(path)}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
        )}
      >
        <div className="flex items-center text-sm font-medium leading-none">
          {icon}
          {title}
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </div>
    </li>
  );
};

export default MainNavigationMenu;
