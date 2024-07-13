import React from 'react';
import { motion } from 'framer-motion';

function Tool({ tool, index, onClick }) {
  const lang = localStorage.getItem('lang') || 0;
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          y: {
            duration: 0.7,
            delay: index * 0.15,
            easing: '(0.455, 0.03, 0.515, 0.955)',
          },
          opacity: { duration: 1.2, delay: index * 0.1 },
        },
        transitionEnd: { display: 'block' },
      }}
      viewport={{ once: true }}
    >
      <a href={tool.link} className='group'>
        <div
          id='gallery'
          className='relative w-full cursor-pointer hover:opacity-100'
        >
          <div className='relative overflow-hidden  rounded-md md:rounded-[14px] lg:rounded-[28px] group-hover:shadow-md  opacity-70 group-hover:opacity-100 '>
            <div className='relative flex items-center justify-center p-8 bg-sky-100 '>
              <div className='w-full h-full opacity-50 square-image group-hover:opacity-100'>
                <img
                  className='object-contain '
                  src={tool.pic}
                  alt={tool.name}
                ></img>
              </div>
            </div>

            <motion.div className='z-50 flex items-center justify-center w-full h-full '>
              <motion.svg
                className='absolute flex top-0  w-full group-hover:p-[30%] p-[40%]  h-full  fill-black  group-hover:fill-white group-hover:bg-black/20 group-hover:backdrop-blur-md transition-all duration-300 ease-in-out'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='8 8 20 20'
              >
                <path d='M23.5587,16.916 C24.1447,17.4999987 24.1467,18.446 23.5647,19.034 L16.6077,26.056 C16.3147,26.352 15.9287,26.4999987 15.5427,26.4999987 C15.1607,26.4999987 14.7787,26.355 14.4867,26.065 C13.8977,25.482 13.8947,24.533 14.4777,23.944 L20.3818,17.984 L14.4408,12.062 C13.8548,11.478 13.8528,10.5279 14.4378,9.941 C15.0218,9.354 15.9738,9.353 16.5588,9.938 L23.5588,16.916 L23.5587,16.916 Z'></path>
              </motion.svg>
            </motion.div>
          </div>
        </div>
        <div className='px-2 pt-3'>
          <div className='flex items-center justify-between'>
            <p className='flex items-center text-base font-semibold text-gray-400 md:text-xl lg:text-2xl dark:text-gray-400 group-hover:animate-pulse group-hover:text-black'>
              {tool.name}
            </p>
          </div>
          <p className='justify-start hidden pt-6 text-sm font-semibold text-gray-400 transition-all group-hover:flex animate__animated animate__fadeInUp dark:text-gray-400'>
            {tool.des[lang]}
          </p>
        </div>
      </a>
    </motion.div>
  );
}

export default Tool;
