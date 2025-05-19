import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadBuyerUserDetail } from "@/lib/loadBuyerUserDetail";

const BuyerUserDetail = () => {
  const { userId } = useParams();
  const [data, setData] = useState({
    animals: [],
    journals: [],
    weights: [],
    gallery: []
  });

  useEffect(() => {
    if (userId) {
      loadBuyerUserDetail(userId).then(setData);
    }
  }, [userId]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Overview</h1>

      <section>
        <h2 className="text-lg font-semibold">Animals</h2>
        <ul className="list-disc ml-6">
          {data.animals.map((a: any) => (
            <li key={a.id}>{a.name} ({a.species})</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Recent Journal Entries</h2>
        <ul className="list-disc ml-6">
          {data.journals.map((j: any) => (
            <li key={j.id}>{j.title} — {j.created_at}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Weight Entries</h2>
        <ul className="list-disc ml-6">
          {data.weights.map((w: any) => (
            <li key={w.id}>{w.weight} lbs on {w.date}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.gallery.map((img: any) => (
            <img key={img.id} src={img.url} alt="Animal" className="rounded shadow" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default BuyerUserDetail;
