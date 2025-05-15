
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GalleryVerticalIcon, WeightIcon, BookIcon, ChartBarIcon, AlarmClockIcon } from "lucide-react";

const QuickAccessSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mt-12 space-y-8">
      <h2 className="text-2xl font-bold">Quick Access</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="hover:border-primary cursor-pointer" onClick={() => navigate('/weights')}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <WeightIcon className="h-5 w-5 text-primary" />
              <span>Weight Tracking</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Monitor weight progress for all your animals
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:border-primary cursor-pointer" onClick={() => navigate('/journal')}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <BookIcon className="h-5 w-5 text-primary" />
              <span>Journal</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Log daily observations and training notes
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:border-primary cursor-pointer" onClick={() => navigate('/expenses')}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <ChartBarIcon className="h-5 w-5 text-primary" />
              <span>Expenses</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Track costs and generate tax reports
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:border-primary cursor-pointer" onClick={() => navigate('/gallery')}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <GalleryVerticalIcon className="h-5 w-5 text-primary" />
              <span>Photo Gallery</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View progress photos of your animals
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:border-primary cursor-pointer" onClick={() => navigate('/feed-reminders')}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <AlarmClockIcon className="h-5 w-5 text-primary" />
              <span>Feed Reminders</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Set up feeding schedule reminders for all animals
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickAccessSection;
