import { useState, useEffect } from 'react';

export const useRateLimit = (limit = 5, interval = 60000) => {
  const [count, setCount] = useState(0);
  const [lastReset, setLastReset] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() - lastReset > interval) {
        setCount(0);
        setLastReset(Date.now());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lastReset, interval]);

  const increment = () => {
    setCount(prev => prev + 1);
  };

  const isLimited = count >= limit;

  return { count, isLimited, increment };
};