
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";

const AccountTypePage = () => {
  const navigate = useNavigate();

  const handleSelect = (type: string) => {
    if (type === "buyer") {
      navigate("/buyer/dashboard");
    } else if (type === "exhibitor") {
      navigate("/signup/exhibitor");
    } else {
      navigate("/signup/exhibitor");
    }
  };

  return (
    <MainLayout title="Create Account">
      <div className="flex flex-col items-center py-8 space-y-6">
        <h1 className="text-2xl font-bold">Select Account Type</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md">
          <Button onClick={() => handleSelect("exhibitor")}>Exhibitor</Button>
          <Button onClick={() => handleSelect("buyer")}>Buyer</Button>
          <Button onClick={() => handleSelect("parent")}>Parent</Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default AccountTypePage;
