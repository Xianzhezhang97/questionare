import React from 'react';
import { motion } from 'framer-motion';

const SvgSwitcher = ({ isExpanded, size }) => {
  return (
    <div className={`flex items-center ${size ? size : 'w-6 h-6'}  stroke-1`}>
      <motion.svg viewBox='0 0 17 8.85' transition={{ duration: 0.5 }}>
        {isExpanded ? (
          <motion.polyline
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            fill='none'
            fillRule='evenodd'
            animate={{
              points: isExpanded
                ? '15 7.72 8.5 1.13 2 7.72'
                : '15.85 4.42 8.5 4.42 1.15 4.42; 15 1.13 8.5 7.72 2 1.13',
            }}
          ></motion.polyline>
        ) : (
          <motion.polyline
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            fill='none'
            fillRule='evenodd'
            animate={{
              points: isExpanded
                ? '15 1.13 8.5 7.72 2 1.13; 15.85 4.42 8.5 4.42 1.15 4.42'
                : '15 1.13 8.5 7.72 2 1.13',
            }}
          ></motion.polyline>
        )}
      </motion.svg>
    </div>
  );
};

export default SvgSwitcher;
