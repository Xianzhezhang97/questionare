import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Tags = ({
  module,
  handleFilterTools,
  handleClearFilter,
  isTagDisabled,
  selectedTags,
  moduleIndex,
  toggleExpand,
  openExpand,
  closeExpand,
}) => {
  const [hoveredTagIndex, setHoveredTagIndex] = useState(null);

  const calculatePadding = (index) => {
    if (hoveredTagIndex === null) {
      return '0.9em';
    }
    const distance = Math.abs(index - hoveredTagIndex);
    switch (distance) {
      case 0:
        return '1.1em';
      case 1:
        return '1.0em';
      case 2:
        return '0.9em';
      default:
        return '0.8em';
    }
  };

  const calculateFontSize = (index) => {
    if (hoveredTagIndex === null) {
      return '0.9em';
    }
    const distance = Math.abs(index - hoveredTagIndex);
    switch (distance) {
      case 0:
        return '1.1em';
      case 1:
        return '1.0em';
      case 2:
        return '0.9em';
      default:
        return '0.9em';
    }
  };

  const BanAnimation = {
    layout: true,
    initial: { paddingInline: '0.5em', fontSize: '0.9em' },
    animate: {
      paddingInline: '0.5em',
      fontSize: '0.9em',
    },
  };
  const TagAnimation = {
    layout: true,
    initial: { paddingInline: '0.8em', fontSize: '0.8em' },
    animate: { paddingInline: '0.9em', fontSize: '0.9em' },
  };
  const tagGap = 'p-1';
  const BanTagStyle =
    'inline-flex px-2 py-2 text-xs border rounded-full  text-gray-8400 bg-gray-100 border-gray-300 cursor-not-allowed animate__animated animate__zoomIn';
  const TagStyle =
    'inline-flex px-2 py-2 text-xs border rounded-full group-hover:font-semibold text-sky-800  border-sky-700  group-hover:bg-sky-700 group-hover:text-white animate__animated animate__zoomIn';
  const ActiveTagStyle =
    'bg-sky-900 text-white border-sky-900 inline-flex px-2 py-2 font-semibold text-xs border rounded-full ';

  const tags = [...new Set(module.tools.flatMap((item) => item.tag))].sort();

  return (
    <motion.div
      layout
      className='z-40 flex flex-wrap items-center justify-start max-w-full pr-48 my-6 '
    >
      {tags.map((tag, index) => {
        const isTagSelected = selectedTags.includes(tag);
        const paddingInline = calculatePadding(index);
        const fontSize = calculateFontSize(index);
        const animation = isTagDisabled(tag)
          ? BanAnimation
          : {
              initial: { paddingInline: paddingInline, fontSize: fontSize },
              animate: { paddingInline: paddingInline, fontSize: fontSize },
              whileHover: { paddingInline: '1.2em', fontSize: '1.2em' },
            };

        return (
          <motion.button
            layout
            onClick={(e) => {
              e.preventDefault();
              handleFilterTools(tag);
              openExpand(moduleIndex);
            }}
            onMouseEnter={() => setHoveredTagIndex(index)}
            onMouseLeave={() => setHoveredTagIndex(null)}
            disabled={isTagDisabled(tag)}
            className={`${tagGap} group`}
          >
            <motion.button
              key={tag + '-' + index}
              className={` ${
                isTagSelected
                  ? ActiveTagStyle
                  : isTagDisabled(tag)
                    ? BanTagStyle
                    : TagStyle
              }`}
              {...animation}
              style={{ whiteSpace: 'nowrap' }}
            >
              {tag}
              {isTagSelected && (
                <span
                  className='ml-2 cursor-pointer'
                  onClick={(e) => e.stopPropagation()}
                >
                  &times;
                </span>
              )}
            </motion.button>
          </motion.button>
        );
      })}
      <motion.button
        layout
        {...(selectedTags.length === 0 ? BanAnimation : TagAnimation)}
        key={'-jskdjs'}
        disabled={selectedTags.length === 0}
        onClick={(e) => {
          e.preventDefault();
          handleClearFilter();
          closeExpand(moduleIndex);
        }}
        className={`${tagGap} group`}
      >
        <motion.button
          layout
          {...(selectedTags.length === 0
            ? BanAnimation
            : {
                layout: true,
                initial: { paddingInline: '0.8em', fontSize: '0.8em' },
                animate: { paddingInline: '0.9em', fontSize: '0.9em' },
                whileHover: { paddingInline: '1.2em', fontSize: '1.2em' },
              })}
          className={
            selectedTags.length === 0 ? BanTagStyle : TagStyle + ' hover:px-4'
          }
        >
          <p className='flex ' style={{ whiteSpace: 'nowrap' }}>
            {selectedTags.length === 0 ? (
              <div className='flex items-center justify-center gap-x-2'>
                <i className='flex fi fi-rr-search'></i>
                <p className='flex'>Filter you like</p>
              </div>
            ) : (
              <>
                <div className='flex items-center justify-center gap-x-2'>
                  <i className='flex fi fi-sr-filter-slash'></i>
                  <p className='flex'>Clear selected</p>
                </div>

                <span className='absolute w-6 h-6 text-base text-white transform -translate-y-1/2 border rounded-full top-1/2 ani -right-2 animate__animated animate__zoomIn bg-sky-900'>
                  {selectedTags.length}
                </span>
              </>
            )}
          </p>

          {selectedTags.length > 0 && (
            <span className='flex items-center mx-3 text-sky-900 group-hover:text-white'>
              &times;
            </span>
          )}
        </motion.button>
      </motion.button>
    </motion.div>
  );
};

export default Tags;
