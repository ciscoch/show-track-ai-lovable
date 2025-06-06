
import { User } from "@/types/models";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";

type PageHeaderProps = {
  user: User | null;
};

const PageHeader = ({ user }: PageHeaderProps) => {
  const navigate = useNavigate();
  const { userSubscription } = useAppContext();

  if (!user) return null;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div className="flex items-center gap-4">
        <img 
          src="/lovable-uploads/d119b8a7-7a15-4e8f-810a-9920bdb1b775.png" 
          alt="ShowTrack AI Logo" 
          className="w-20 h-20 md:w-24 md:h-24"
        />
        <div>
          <h1 className="text-4xl font-bold">ShowTrack AI</h1>
          <p className="text-muted-foreground">Built for Champions. Wired with Data. Raised on Grit.</p>
          <p className="text-sm font-medium text-primary-foreground/80 mt-1 italic">
            "Measure More. Guess Less. Win Bigger."
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Badge className={`py-1 px-3 text-xs ${
          userSubscription.level === 'elite' 
            ? 'bg-primary' 
            : userSubscription.level === 'pro' 
              ? 'bg-accent' 
              : 'bg-gray-600'
        }`}>
          {userSubscription.level.charAt(0).toUpperCase() + userSubscription.level.slice(1)} Plan
        </Badge>
        
        <Button variant="outline" onClick={() => navigate('/subscription')}>
          Manage Subscription
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
