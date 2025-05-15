
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export const useEmailVerification = (
  email: string,
  onVerified: () => void
) => {
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  
  // Handle verification of the OTP code
  const handleVerify = async () => {
    if (code.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter the 6-digit verification code",
        variant: "destructive",
      });
      return;
    }
    
    setIsVerifying(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful verification
      if (code === "123456") { // In real app, server would validate this
        toast({
          title: "Email verified",
          description: "Your email has been successfully verified",
        });
        onVerified();
      } else {
        toast({
          title: "Invalid verification code",
          description: "Please check the code and try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };
  
  // Handle resending the OTP code
  const handleResendCode = async () => {
    setIsResending(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Verification code sent",
        description: `A new verification code has been sent to ${email}`,
      });
    } catch (error) {
      toast({
        title: "Failed to send verification code",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return {
    code,
    setCode,
    isVerifying,
    isResending,
    handleVerify,
    handleResendCode
  };
};
