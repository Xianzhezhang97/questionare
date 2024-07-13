import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  easeInOut,
} from 'framer-motion';
import N from './Num.jsx';

function KeyFeature() {
  const lang = localStorage.getItem('lang') || 0;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['-150%', '-50%'],
  });
  const bg = 'https://3o.hk/images/2024/01/14/keyfeaturebg.jpg';

  const width = useTransform(scrollYProgress, [0, 1], ['80%', '100%']);
  const y = useTransform(scrollYProgress, [0, 1], ['70%', '0%']);
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 1],
    [100, window.innerWidth < 786 ? 14 : 28],
  );

  const KeyFeature = (
    <motion.section
      ref={ref}
      style={{
        backgroundImage: `url(https://3o.hk/images/2024/01/22/profilebg.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundFit: 'cover',
        backgroundSize: 'cover',
        width,
        borderRadius,
      }}
      layout
      className='sticky top-[100px] w-full h-[70vh]  overflow-hidden  md:mx-8'
    >
      <motion.span
        className={`w-full h-full absolute  transition-all bg-black/30  z-40`}
      ></motion.span>

      <motion.div
        // variants={Welcomevisblecontainer}
        initial='hidden'
        whileInView='visible'
        // transition={StagerFadeInUp}
        // viewport={{ once: true }}

        className='grid visblecontainer  py-48  z-50  absolute left-0 right-0 items-center md:top-[40vh] '
      >
        <h3 id='About'>About</h3>
      </motion.div>
    </motion.section>
  );

  return <div className='flex justify-center'>{KeyFeature}</div>;
}

export default KeyFeature;
