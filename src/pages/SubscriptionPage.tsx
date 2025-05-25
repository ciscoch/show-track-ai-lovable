
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from "@/contexts/AppContext";
import { User } from "@/types/models";

const SubscriptionPage = () => {
  const { userSubscription, user } = useAppContext();

  const transformedUser: User = user ? {
    ...user,
    email: user.email || "",
    firstName: user.user_metadata?.first_name || "",
    lastName: user.user_metadata?.last_name || "",
    subscriptionLevel: "pro" as "free" | "pro" | "elite",
    createdAt: user.created_at || new Date().toISOString()
  } : {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    subscriptionLevel: "free" as "free" | "pro" | "elite",
    createdAt: new Date().toISOString()
  };

  return (
    <MainLayout title="Subscription" user={transformedUser}>
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
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SubscriptionPage;
