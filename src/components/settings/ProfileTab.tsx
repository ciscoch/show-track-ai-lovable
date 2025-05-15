
import React, { useState } from "react";
import { User } from "@/types/models";
import EmailVerificationModal from "./EmailVerificationModal";
import ProfileForm from "./ProfileForm";
import DeleteAccountSection from "./DeleteAccountSection";

interface ProfileTabProps {
  user: User | null;
}

const ProfileTab = ({ user }: ProfileTabProps) => {
  const [emailVerified, setEmailVerified] = useState(true);
  const [isEmailVerificationOpen, setIsEmailVerificationOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  
  const handleEmailChange = (email: string) => {
    setNewEmail(email);
    setEmailVerified(false);
    setIsEmailVerificationOpen(true);
  };
  
  const handleEmailVerified = () => {
    setIsEmailVerificationOpen(false);
    setEmailVerified(true);
  };

  return (
    <>
      <ProfileForm 
        user={user} 
        emailVerified={emailVerified}
        onEmailChange={handleEmailChange}
      />
      
      <DeleteAccountSection />
      
      <EmailVerificationModal
        email={newEmail || user?.email || ""}
        open={isEmailVerificationOpen}
        onClose={() => setIsEmailVerificationOpen(false)}
        onVerified={handleEmailVerified}
      />
    </>
  );
};

export default ProfileTab;
