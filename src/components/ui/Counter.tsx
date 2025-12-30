import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}

export function Counter({ 
  value, 
  prefix = '', 
  suffix = '',
  className = '',
  duration = 2
}: CounterProps) {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = parseInt(value.toString().replace(/[^0-9]/g, ''));
    const increment = Math.ceil(end / (duration * 60)); // 60fps for smooth animation
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
        return;
      }
      setCount(start);
    }, 1000 / 60); // 60fps

    return () => clearInterval(timer);
  }, [value, isInView, duration]);

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <motion.span 
      className={className}
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        y: isInView ? 0 : 20 
      }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{formatNumber(count)}{suffix}
    </motion.span>
  );
}
