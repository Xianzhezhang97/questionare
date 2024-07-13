import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import UpDownSVG from './UpDownSVG.jsx';
const TagStyle =
  'inline-flex px-2 py-0.5 text-xs border rounded-full group-hover:font-semibold text-sky-500  border-sky-500  hover:bg-sky-500 hover:text-white animate__animated animate__zoomIn animate__faster ';
const TagAnimation = {};

function Tool({ tool, index, onClick, handleFilterTools, handleClearFilter }) {
  const [isOpen, setIsIsOpen] = useState(false);
  const lang = localStorage.getItem('lang') || 0;
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      layout='position'
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
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className='flex flex-col mb-8'
    >
      <a href={tool.link} className='flex flex-col'>
        <div id='gallery' className='relative w-full'>
          <div className='relative overflow-hidden group-hover:shadow-md rounded-md md:rounded-[14px] lg:rounded-[28px] '>
            <div
              className={`relative flex items-center justify-center ${
                /\.(jpg|jpeg|JPG)$/.test(tool.pic) ? 'p-0' : 'p-8'
              } bg-sky-100`}
            >
              <div className='w-full h-full square-image'>
                <img
                  className='object-contain'
                  src={tool.pic}
                  alt={tool.name}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col px-2 mt-3'>
          <div href='#' className='flex items-center justify-between'>
            <p className='flex items-center text-base font-semibold text-gray-700 md:text-xl lg:text-2xl dark:text-gray-400'>
              {tool.name}
            </p>
          </div>
          {/* Tag */}
          <div
            className={`z-20 flex ${!isOpen ? 'justify-start overflow-hidden  gap-2 scrollbar-hide' : ' flex-wrap gap-2 justify-start'} items-center  py-1 mt-2  -mx-1`}
          >
            {tool.tag
              .slice(0, !isOpen ? 3 : tool.tag.length)
              .map((tag, index) => (
                <motion.button
                  key={tag + '-' + index}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClearFilter();
                    handleFilterTools(tag);
                  }}
                  layout
                  className={TagStyle}
                  style={{ animationDelay: `${(index - 3) * 0.15}s` }}
                >
                  {tag}
                </motion.button>
              ))}
            {tool.tag.length > 4 && (
              <div className='flex items-center'>
                <motion.button
                  className={TagStyle}
                  layout
                  initial={{ padding: '0em' }}
                  animate={{
                    padding: '0.25em',
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsIsOpen(!isOpen);
                  }}
                >
                  <UpDownSVG isExpanded={isOpen} size={'w-4 h-4 '} />
                </motion.button>
              </div>
            )}
          </div>

          <p className='flex justify-start pt-6 text-base text-gray-500 hover:underline dark:text-gray-400 hover:text-red'>
            {tool.des[lang]}
          </p>
        </div>
      </a>
    </motion.div>
  );
}

export default Tool;
