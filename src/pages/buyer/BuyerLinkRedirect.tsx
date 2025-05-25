
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const BuyerLinkRedirect = () => {
  const { linkId } = useParams<{ linkId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validateAndRedirect = async () => {
      if (!linkId) {
        setError("Invalid link");
        setLoading(false);
        return;
      }

      try {
        const { data: link, error: linkError } = await supabase
          .from('buyer_links')
          .select('*')
          .eq('id', linkId)
          .single();

        if (linkError || !link) {
          setError("Link not found or expired");
          setLoading(false);
          return;
        }

        // Check if link is expired
        if (link.expires_at && new Date(link.expires_at) < new Date()) {
          setError("This link has expired");
          setLoading(false);
          return;
        }

        // Redirect to buyer dashboard with user info
        navigate(`/buyer/user/${link.user_id}`);
      } catch (err) {
        console.error("Error validating link:", err);
        setError("An error occurred while validating the link");
        setLoading(false);
      }
    };

    validateAndRedirect();
  }, [linkId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Validating link...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default BuyerLinkRedirect;
