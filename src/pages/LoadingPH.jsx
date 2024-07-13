import React from 'react';
import { motion } from 'framer-motion';

const shimmer = {
  initial: {
    background:
      'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 60%)',
    backgroundSize: '200% 100%',
    backgroundPosition: '100% 0',
  },
  animate: {
    backgroundPosition: ['200% 0', '0% 0'],
    transition: {
      duration: 0.5,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};
const pulseAnimation = {
  initial: { opacity: 1 },
  animate: {
    opacity: [1, 0.5, 1],
    transition: {
      duration: 0.75,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Shared Styles
const containerStyle = ' bg-gray-300 rounded-[14px] md:rounded-[28px] mb-4';
const motionDivStyle = 'overflow-hidden rounded-[14px]';

// Component Code
const picture = (
  <div className={`${containerStyle} rounded-[28px]`}>
    <motion.div
      className={`relative w-full h-full flex-0 p-[50%] ${motionDivStyle}`}
      variants={shimmer}
      initial='initial'
      animate='animate'
    >
      <motion.i
        variants={pulseAnimation}
        initial='initial'
        animate='animate'
        className='fi fi-ss-mountains  text-[50px] absolute  -translate-x-1/2 -translate-y-1/2'
      ></motion.i>
    </motion.div>
  </div>
);

const halfHead = (
  <div className={`flex w-1/2 ${containerStyle} `}>
    <motion.div
      className={`w-full h-8  ${motionDivStyle}`}
      variants={shimmer}
      initial='initial'
      animate='animate'
    ></motion.div>
  </div>
);

const button = (index) => (
  <div className={`flex w-[${((12 * index) % 57) + 5}%] ${containerStyle} `}>
    <motion.div
      className={`w-full h-4  ${motionDivStyle}`}
      variants={shimmer}
      initial='initial'
      animate='animate'
    ></motion.div>
  </div>
);

const fullHead = (
  <div className={`flex w-full ${containerStyle}`}>
    <motion.div
      className={`w-full h-8  ${motionDivStyle}`}
      variants={shimmer}
      initial='initial'
      animate='animate'
    ></motion.div>
  </div>
);

const halfBody = (
  <div className={`flex w-1/2 ${containerStyle} `}>
    <motion.div
      className={`w-full h-4  ${motionDivStyle}`}
      variants={shimmer}
      initial='initial'
      animate='animate'
    ></motion.div>
  </div>
);

const fullBody = (
  <div className={`flex w-full ${containerStyle}`}>
    <motion.div
      className={`w-full h-4  ${motionDivStyle}`}
      variants={shimmer}
      initial='initial'
      animate='animate'
    ></motion.div>
  </div>
);

function Loading({ type }) {
  if (type === 'card') {
    return (
      <div className='block w-full gap-y-4'>
        {picture}
        {halfHead}
        {fullBody}
        {fullBody}
      </div>
    );
  }
  if (type === 'tags') {
    return (
      <div className='flex flex-wrap justify-start w-full my-6 gap-x-4'>
        {Array.from({ length: 10 }, (_, index) => button(index))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className='relative w-full'>
        <div className='relative flex flex-col p-6 mb-8 overflow-hidden bg-white border border-gray-200 rounded-md'>
          <div className='w-full mb-4'>
            <motion.div
              className='w-full h-6 mb-2 bg-gray-300'
              variants={shimmer}
              initial='initial'
              animate='animate'
            ></motion.div>
            <motion.div
              className='w-3/4 h-6 mb-2 bg-gray-300'
              variants={shimmer}
              initial='initial'
              animate='animate'
            ></motion.div>
            <motion.div
              className='w-1/2 h-6 mb-2 bg-gray-300'
              variants={shimmer}
              initial='initial'
              animate='animate'
            ></motion.div>
          </div>
          <div className='w-full'>
            <motion.div
              className='w-full h-6 mb-2 bg-gray-300'
              variants={shimmer}
              initial='initial'
              animate='animate'
            ></motion.div>
            <motion.div
              className='w-3/4 h-6 mb-2 bg-gray-300'
              variants={shimmer}
              initial='initial'
              animate='animate'
            ></motion.div>
            <motion.div
              className='w-1/2 h-6 mb-2 bg-gray-300'
              variants={shimmer}
              initial='initial'
              animate='animate'
            ></motion.div>
          </div>
        </div>
      </div>
    );
  }

  return null; // 默认情况如果没有匹配到类型
}

export default Loading;
