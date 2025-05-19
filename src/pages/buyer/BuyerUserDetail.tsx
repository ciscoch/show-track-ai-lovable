import { useParams } from "react-router-dom";
import React from "react";

const BuyerUserDetail = () => {
  const { userId } = useParams();

  // fetch that user's data: animals, weights, gallery, journals
  // using useEffect + supabase.from().select(...).eq('user_id', userId)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Render animal cards, weight graphs, journal preview, gallery */}
        <div className="p-4 border rounded">Animal summary here</div>
        <div className="p-4 border rounded">Weight tracking graph</div>
        <div className="p-4 border rounded">Latest photo gallery</div>
        <div className="p-4 border rounded">Recent journal entries</div>
      </div>
    </div>
  );
};

export default BuyerUserDetail;
