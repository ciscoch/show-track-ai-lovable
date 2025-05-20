
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import QRCode from "qrcode";

export const generateBuyerLink = async (
  userId: string,
  animalIds: string[],
  expiresInDays = 30
) => {
  try {
    // Generate a unique token
    const token = uuidv4();
    
    // Get base URL from current location
    const baseUrl = window.location.origin;
    
    // Create the link
    const link = `${baseUrl}/buyer-link/${token}`;
    
    // Generate QR code
    const qrCodeDataUrl = await QRCode.toDataURL(link);
    
    return {
      token,
      link,
      qrCode: qrCodeDataUrl,
      expiresAt: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString(),
    };
  } catch (error) {
    console.error("Error generating buyer link:", error);
    throw new Error("Failed to generate buyer link");
  }
};
