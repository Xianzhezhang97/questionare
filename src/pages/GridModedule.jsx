import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  easeInOut,
} from 'framer-motion';
import CardLoading from './LoadingPH.jsx';

// 使用 React.lazy 懒加载组件并人为延迟加载
const Tool = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import('./SingleTool.jsx')), 1000);
    }),
);

const More = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import('./More.jsx')), 1000);
    }),
);
const UpDownSVG = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import('./UpDownSVG.jsx')), 2000);
    }),
);

const Tags = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import('./Tags.jsx')), 500);
    }),
);
// import Tags from './Tags.jsx';

export default function Grimodedule({
  module,
  moduleIndex,
  toggleExpand,
  expandedModules,
  lang,
  sidebar,
  id,
  openExpand,
  closeExpand,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['-250%', '-30%'],
  });
  const width = useTransform(scrollYProgress, [0, 1], ['80%', '100%']);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [40, 28]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  const [filteredTools, setFilteredTools] = useState(module.tools);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isOpen, setIsIsOpen] = useState(false);

  const toolsToDisplay =
    filteredTools.length <= 5
      ? filteredTools
      : filteredTools.slice(
          0,
          expandedModules[moduleIndex] ? filteredTools.length : sidebar ? 4 : 5,
        );

  const handleFilterTools = (tag) => {
    if (selectedTags.includes(tag)) {
      const newSelectedTags = selectedTags.filter((t) => t !== tag);
      setSelectedTags(newSelectedTags);
      const filtered = module.tools.filter((tool) =>
        newSelectedTags.every((selectedTag) => tool.tag.includes(selectedTag)),
      );
      setFilteredTools(filtered);
    } else {
      const newSelectedTags = [...selectedTags, tag];
      setSelectedTags(newSelectedTags);
      const filtered = module.tools.filter((tool) =>
        newSelectedTags.every((selectedTag) => tool.tag.includes(selectedTag)),
      );
      setFilteredTools(filtered);
    }
  };

  const handleClearFilter = () => {
    setFilteredTools(module.tools);
    setSelectedTags([]);
  };

  const isTagDisabled = (tag) => {
    const newSelectedTags = [...selectedTags, tag];
    const filtered = module.tools.filter((tool) =>
      newSelectedTags.every((selectedTag) => tool.tag.includes(selectedTag)),
    );
    return filtered.length === 0;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      id={id}
      transition={{ duration: 0.5 }}
      key={moduleIndex}
      ref={ref}
      className='mb-24 text-gray-500 md:p-4 md:mx-4 lg:p-8 lg:mx-8 snap-y-center md:bg-sky-50 rounded-[14px] lg:rounded-[28px]'
    >
      <motion.div
        layout='position'
        className='flex items-center justify-between'
      >
        <div className='flex items-center gap-x-4'>
          <h3 className='flex text-2xl font-bold tracking-wide md:text-3xl lg:text-4xl'>
            {module.header}
          </h3>

          {[...new Set(module.tools.flatMap((item) => item.tag))].length !=
            0 && (
            <motion.button
              className={'rounded-full  hover:bg-sky-800 hover:text-white p-4'}
              layout
              onClick={(e) => {
                e.preventDefault();
                setIsIsOpen(!isOpen);
              }}
            >
              <i class='flex fi text-2xl fi-sr-settings-sliders'></i>
            </motion.button>
          )}
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          {module.tools && module.tools.length > 5 && (
            <motion.button
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              layout
              className='flex hover:bg-sky-700 items-center  justify-center space-x-2 cursor-pointer text-sky-700 hover:text-white rounded-full px-3 py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-3'
              onClick={() => toggleExpand(moduleIndex)}
            >
              <motion.p layout className='flex'>
                {expandedModules[moduleIndex]
                  ? ['Collapse', '收起'][lang]
                  : ['Expand', '展开'][lang]}
              </motion.p>

              <UpDownSVG isExpanded={expandedModules[moduleIndex]} />
            </motion.button>
          )}
        </Suspense>
      </motion.div>
      {/* <CardLoading type='tags' /> */}
      {/* Tag */}
      <Suspense fallback={<CardLoading type='tags' />}>
        {isOpen && (
          <Tags
            module={module}
            expandedModules={expandedModules}
            moduleIndex={moduleIndex}
            sidebar={sidebar}
            handleClearFilter={handleClearFilter}
            handleFilterTools={handleFilterTools}
            isTagDisabled={isTagDisabled}
            selectedTags={selectedTags}
            openExpand={openExpand}
            closeExpand={closeExpand}
          />
        )}
      </Suspense>

      {/* 描述 */}
      <motion.p layout='position' className='my-2 mb-8'>
        {module.des}
      </motion.p>

      {filteredTools && (
        <motion.div
          style={
            moduleIndex !== 0
              ? {
                  width,
                  borderRadius,
                  opacity,
                }
              : {}
          }
          layout='position'
          className={`grid grid-cols-2 gap-2 md:gap-4 lg:gap-6 ${
            sidebar ? 'grid-col' : 'grid-cols'
          }`}
        >
          <Suspense
            fallback={Array.from({ length: sidebar ? 4 : 5 }).map(
              (_, index) => (
                <CardLoading key={index} type='card' />
              ),
            )}
          >
            {toolsToDisplay.map((item, index) => (
              <Tool
                key={index + item.name}
                tool={item}
                index={
                  expandedModules[moduleIndex]
                    ? (index - (sidebar ? 5 : 6)) % (sidebar ? 5 : 6)
                    : index % (sidebar ? 5 : 6)
                }
                id={`tool-${item.name}`}
                handleFilterTools={handleFilterTools}
                handleClearFilter={handleClearFilter}
              />
            ))}
          </Suspense>
          {!expandedModules[moduleIndex] && filteredTools.length >= 6 && (
            <Suspense fallback={<CardLoading type={'card'} />} key={'More'}>
              <More
                onClick={() => toggleExpand(moduleIndex)}
                tool={{
                  pic: filteredTools[sidebar ? 4 : 5].pic,
                  name: 'More',
                  des: [`Explore more ${module.header}`],
                }}
                index={
                  expandedModules[moduleIndex]
                    ? ((sidebar ? 5 : 6) - (sidebar ? 5 : 6)) %
                      (sidebar ? 5 : 6)
                    : sidebar
                      ? 5
                      : 6
                }
              />
            </Suspense>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
