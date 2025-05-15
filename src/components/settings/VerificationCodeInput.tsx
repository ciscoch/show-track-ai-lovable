
import React from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Loader2 } from "lucide-react";

interface VerificationCodeInputProps {
  code: string;
  setCode: (code: string) => void;
  isResending: boolean;
  onResendCode: () => void;
}

const VerificationCodeInput = ({
  code,
  setCode,
  isResending,
  onResendCode
}: VerificationCodeInputProps) => {
  return (
    <div className="flex flex-col items-center space-y-4 py-4">
      <InputOTP maxLength={6} value={code} onChange={setCode}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      
      <p className="text-sm text-muted-foreground">
        Didn't receive the code?{" "}
        <Button 
          variant="link" 
          size="sm" 
          className="p-0 h-auto" 
          onClick={onResendCode} 
          disabled={isResending}
        >
          {isResending ? (
            <>
              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              Resending...
            </>
          ) : (
            "Resend"
          )}
        </Button>
      </p>
    </div>
  );
};

export default VerificationCodeInput;
