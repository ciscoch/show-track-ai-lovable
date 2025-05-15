
import React from "react";
import { badgeList } from "./badgeList";

export default function BadgeGallery({ unlocked }) {
  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
      {badgeList.map((buckle) => (
        <div key={buckle.id} className="text-center">
          <img
            src={buckle.image}
            alt={buckle.title}
            className={
              "w-32 mx-auto " + (unlocked.includes(buckle.id) ? "" : "opacity-40 grayscale")
            }
          />
          <div className="mt-2 font-bold text-sm">{buckle.title}</div>
        </div>
      ))}
    </div>
  );
}
