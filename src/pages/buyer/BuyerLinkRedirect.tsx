import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

const BuyerLinkRedirect = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLinkedUser() {
      if (!token) return;

      const { data, error } = await supabase
        .from("buyer_links")
        .select("user_id")
        .eq("token", token)
        .single();

      if (error || !data) {
        console.error("Invalid or expired token:", error);
        navigate("/not-found");
        return;
      }

      // Redirect buyer to the linked user's dashboard
      navigate(`/buyer/user/${data.user_id}`);
    }

    fetchLinkedUser();
  }, [token, navigate]);

  return <div className="p-6 text-center text-lg">Loading workspace...</div>;
};

export default BuyerLinkRedirect;

