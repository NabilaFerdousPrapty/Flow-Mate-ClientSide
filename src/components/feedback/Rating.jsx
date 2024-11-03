/* eslint-disable react/prop-types */
import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const ratingVariants = {
  default: {
    star: "text-foreground",
    emptyStar: "text-muted-foreground",
  },
  destructive: {
    star: "text-red-500",
    emptyStar: "text-red-200",
  },
  yellow: {
    star: "text-yellow-500",
    emptyStar: "text-yellow-200",
  },
};

// Rating.js
const Rating = ({
  rating,
  totalStars = 5,
  size = 20,
  variant = "default",
  fill = true,
  Icon = <Star />,
}) => {
  // Component code as you wrote it
  return (
    <div className="flex items-center gap-2">
      {/* Full stars */}
      {[...Array(Math.floor(rating))].map((_, i) =>
        React.cloneElement(Icon, {
          key: i,
          size,
          className: `fill-current ${ratingVariants[variant].star}`,
        })
      )}
      {/* Partial star */}
      {rating % 1 > 0 && (
        <PartialStar
          fillPercentage={rating % 1}
          size={size}
          className={ratingVariants[variant].star}
          Icon={Icon}
        />
      )}
      {/* Empty stars */}
      {[...Array(totalStars - Math.ceil(rating))].map((_, i) =>
        React.cloneElement(Icon, {
          key: i + Math.ceil(rating),
          size,
          className: ratingVariants[variant].emptyStar,
        })
      )}
    </div>
  );
};

export default Rating;
