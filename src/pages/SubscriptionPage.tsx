
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from "@/contexts/AppContext";

const SubscriptionPage = () => {
  const { userSubscription } = useAppContext();

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>
              Manage your subscription and billing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Plan</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-semibold capitalize">{userSubscription.level}</p>
                  <Badge variant={userSubscription.isActive ? "default" : "secondary"}>
                    {userSubscription.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
              
              {userSubscription.endDate && (
                <div>
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <p>{new Date(userSubscription.endDate).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SubscriptionPage;
