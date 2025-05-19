
import { supabase } from "@/lib/supabaseClient";
import { nanoid } from "nanoid";
import QRCode from "qrcode";

/**
 * Generates a shareable buyer link and a QR code for a specific user.
 * Stores the token with expiration in buyer_links.
 */
export async function generateBuyerLink(userId: string, buyerId: string): Promise<{ url: string, qr: string } | null> {
  try {
    const token = nanoid(12);
    const expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days from now

    const { error } = await supabase
      .from("buyer_links")
      .insert({
        user_id: userId,
        buyer_id: buyerId,
        token,
        expires_at
      });

    if (error) {
      console.error("Error saving buyer link:", error);
      return null;
    }

    const url = `${window.location.origin}/buyer-link/${token}`;
    const qr = await QRCode.toDataURL(url);
    return { url, qr };
  } catch (err) {
    console.error("QR link generation error:", err);
    return null;
  }
}
