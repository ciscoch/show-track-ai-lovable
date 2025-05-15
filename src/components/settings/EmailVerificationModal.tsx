
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import VerificationCodeInput from "./VerificationCodeInput";
import { useEmailVerification } from "@/hooks/useEmailVerification";

interface EmailVerificationModalProps {
  email: string;
  open: boolean;
  onClose: () => void;
  onVerified: () => void;
}

const EmailVerificationModal = ({
  email,
  open,
  onClose,
  onVerified,
}: EmailVerificationModalProps) => {
  const {
    code,
    setCode,
    isVerifying,
    isResending,
    handleVerify,
    handleResendCode
  } = useEmailVerification(email, onVerified);
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify your email</DialogTitle>
          <DialogDescription>
            We've sent a 6-digit verification code to {email}. 
            Enter the code below to verify your email address.
          </DialogDescription>
        </DialogHeader>
        
        <VerificationCodeInput
          code={code}
          setCode={setCode}
          isResending={isResending}
          onResendCode={handleResendCode}
        />
        
        <DialogFooter className="flex space-x-2 sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleVerify} disabled={code.length !== 6 || isVerifying}>
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailVerificationModal;
