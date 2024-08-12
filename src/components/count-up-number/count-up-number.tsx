"use client";

import React, { useEffect, useState } from "react";

function CountUpNumber({
  duration,
  endValue,
  suffix,
  className = "",
  isSectionInterSecting,
}: {
  duration: number;
  endValue: number;
  suffix?: string;
  className?: string;
  isSectionInterSecting?: boolean | undefined;
}) {
  const [count, setCount] = useState(0);

  useEffect(
    function () {
      let startTime: number;
      let animationFrameId: number;

      const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;

        if (progress < duration) {
          setCount(Math.min(endValue, (progress / duration) * endValue));
          animationFrameId = requestAnimationFrame(updateCount);
        } else {
          setCount(endValue);
        }
      };

      if (isSectionInterSecting || true)
        animationFrameId = requestAnimationFrame(updateCount);

      return () => cancelAnimationFrame(animationFrameId);
    },
    [duration, endValue, isSectionInterSecting]
  );

  return (
    <p className={`${className}`}>
      {Math.round(count)}
      {suffix}
    </p>
  );
}

export default CountUpNumber;
