import React, { useState, useEffect } from "react";
import { InfoTileSketch } from "../infoTile";

export function Timer({
  tillDateTime,
  tileclassName,
}: {
  tillDateTime: string | Date;
  tileclassName?: any;
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const targetDate = new Date(tillDateTime).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(intervalId);
        // Optionally, you can perform an action when the countdown reaches zero
        // For example, display a message or execute a function
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [tillDateTime]);

  return (
    <>
      <InfoTileSketch tileclassName={tileclassName}>
        <p className="text-2xl">{timeLeft.days.toString().padStart(2, "0")}</p>
        <p className="text-[6px] md:text-sm">Days</p>
      </InfoTileSketch>
      <InfoTileSketch tileclassName={tileclassName}>
        <p className="text-2xl">{timeLeft.hours.toString().padStart(2, "0")}</p>
        <p className="text-[6px] md:text-sm">Hours</p>
      </InfoTileSketch>
      <InfoTileSketch tileclassName={tileclassName}>
        <p className="text-2xl">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </p>
        <p className="text-[6px] md:text-sm">Minutes</p>
      </InfoTileSketch>
      <InfoTileSketch tileclassName={tileclassName}>
        <p className="text-2xl">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </p>
        <p className="text-[6px] md:text-sm">Seconds</p>
      </InfoTileSketch>
    </>
  );
}

export function TimerOnlyText({
  tillDateTime,
  className,
}: {
  tillDateTime: string | Date;
  className?: string;
}) {
  const [timeLeft, setTimeLeft] = useState({
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const targetDate = new Date(tillDateTime).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(intervalId);
        // Optionally, you can perform an action when the countdown reaches zero
        // For example, display a message or execute a function
      } else {
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [tillDateTime]);
  return (
    <span className={className}>
      {timeLeft.minutes.toString().padStart(2, "0")}:
      {timeLeft.seconds.toString().padStart(2, "0")}
    </span>
  );
}
