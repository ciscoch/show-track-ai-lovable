
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
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
  return (
    <NavigationMenu className="mx-auto my-6">
      <NavigationMenuList className="gap-2">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    to="/"
                  >
                    <HomeIcon className="h-6 w-6 mb-2" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Home
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Return to the dashboard and manage your animals
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem to="/weights" title="Weight Tracking" icon={<WeightIcon className="h-4 w-4 mr-2" />}>
                Monitor weight progress for all your animals
              </ListItem>
              <ListItem to="/journal" title="Journal" icon={<BookIcon className="h-4 w-4 mr-2" />}>
                Log daily observations and training notes
              </ListItem>
              <ListItem to="/gallery" title="Gallery" icon={<GalleryVerticalIcon className="h-4 w-4 mr-2" />}>
                View progress photos of your animals
              </ListItem>
              <ListItem to="/expenses" title="Expenses" icon={<ChartBarIcon className="h-4 w-4 mr-2" />}>
                Track costs and generate tax reports
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Planning</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4">
              <ListItem to="/schedule" title="Schedule" icon={<CalendarIcon className="h-4 w-4 mr-2" />}>
                Manage upcoming events and appointments
              </ListItem>
              <ListItem to="/feed-reminders" title="Feed Reminders" icon={<CalendarIcon className="h-4 w-4 mr-2" />}>
                Set up feeding schedule reminders
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Social</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4">
              <ListItem to="/friends" title="Friends" icon={<UsersIcon className="h-4 w-4 mr-2" />}>
                Connect with other animal owners and exhibitors
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/settings">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Settings
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { 
    to: string;
    title: string;
    icon?: React.ReactNode;
  }
>(({ className, title, children, to, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          to={to}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center text-sm font-medium leading-none">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default MainNavigationMenu;
