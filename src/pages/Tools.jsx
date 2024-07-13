import React, { useState, useEffect } from 'react';
import Navbar from '../NavBar/Navbar';
import Tool from './SingleTool';
import datas from './RawData.json';
import { motion } from 'framer-motion';
import More from './More';
import UpDownSVG from './UpDownSVG';
import Hero from './Hero';
import WelcomeContribute from './WelcomeContribute';
import GridModedule from './GridModedule.jsx';

function Hosting() {
  const [expandedModules, setExpandedModules] = useState({});
  const [activeModule, setActiveModule] = useState(null);
  const [navbar, setNavbar] = useState(true);
  const [sidebar, setSidebar] = useState(true);
  const lang = localStorage.getItem('lang') || 0;
  const offset = 110;

  const toggleExpand = (index) => {
    setExpandedModules((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const openExpand = (index) => {
    setExpandedModules((prev) => ({
      ...prev,
      [index]: true,
    }));
  };
  const closeExpand = (index) => {
    setExpandedModules((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  const handleScroll = (event, targetId) => {
    event.preventDefault();
    const element = document.getElementById(targetId);
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50px 0px -50px 0px', // Adjust the margins to trigger more accurately
      threshold: 0.5, // Adjust the threshold to trigger when half of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveModule(entry.target.id);
        }
      });
    }, observerOptions);

    const targets = document.querySelectorAll('[id^="module-"]');
    targets.forEach((target) => observer.observe(target));

    return () => {
      targets.forEach((target) => observer.unobserve(target));
    };
  }, []);

  return (
    <div>
      {navbar && <Navbar />}
      <div className='relative flex-col m-0 pt-[100px] w-full '>
        {!sidebar && (
          <div className='fixed top-[80vh] -left-[140px] z-50  hidden md:flex'>
            <motion.button
              layoutId='sidebarButton'
              initial={{ opacity: 0.2, scale: 0.5 }}
              whileHover={{
                x: 40,
                opacity: 1,
                scale: 1,
              }}
              transition={{ duration: 0.5 }}
              onClick={() => setSidebar(!sidebar)}
              className={` flex items-center justify-end pr-[15px] backdrop-blur-[20px] rounded-full w-[270px] h-[100px] hover:bg-sky-200/30`}
            >
              <i className='fi fi-sr-angle-circle-right pt-[20px] text-[70px] text-sky-700   '></i>
            </motion.button>
          </div>
        )}

        <div
          className={`${window.innerWidth < 1000 && 'overflow-hidden'} w-full px-2 py-4 md:py-8 md:p-0 gap-y-8`}
        >
          <Hero />

          <div className={` md:flex  `}>
            {sidebar && (
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
                className='relative md:w-[400px] py-8 md:p-4 lg:p-8  md:bg-gray-100 rounded-r-[14px] lg:rounded-r-[28px]'
              >
                <div className={`sticky top-[${offset}px]  z-10 `}>
                  {datas.map((item, index) => (
                    <ul
                      key={index + item.header}
                      className={`mb-16 space-y-4 text-sm font-medium text-gray-500 flex-column space-y dark:text-gray-400 `}
                    >
                      <div className='flex items-center justify-start'>
                        <h3 className='text-2xl'>{item.header}</h3>
                      </div>

                      {item.data.map((module, moduleIndex) => (
                        <motion.li
                          layout='position'
                          onClick={(e) => {
                            handleScroll(
                              e,
                              `module-${item.header}-${moduleIndex}`,
                            );
                          }}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            transition: {
                              x: {
                                duration: 0.7,
                                delay: moduleIndex * 0.15,
                              },
                              opacity: {
                                duration: 1.2,
                                delay: moduleIndex * 0.15,
                              },
                            },
                            transitionEnd: { display: 'block' },
                          }}
                          transition={{ duration: 0.5 }}
                          key={moduleIndex}
                        >
                          <button
                            className={`inline-flex md:flex relative w-full items-center justify-start   rounded-[7px] lg:rounded-[14px] text-base font-medium px-5 py-2.5 text-center me-3 mb-3 hover:bg-sky-700 hover:text-white md:${activeModule === `module-${item.header}-${moduleIndex}` ? ' text-white' : ' text-sky-900'}`}
                            style={{ animationDelay: `${moduleIndex * 0.2}s` }}
                          >
                            <i className='flex mx-2 fi fi-ss-tools'></i>
                            {module.header}
                            {activeModule ===
                              `module-${item.header}-${moduleIndex}` && (
                              <motion.div
                                layoutId='activeButton'
                                className={`absolute top-0 left-0 w-full text-white h-full rounded-[7px] lg:rounded-[12px] -z-50 bg-sky-900 `}
                              ></motion.div>
                            )}
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  ))}
                </div>

                {sidebar && (
                  <motion.button
                    layoutId='sidebarButton'
                    transition={{ duration: 0.5 }}
                    onClick={() => setSidebar(!sidebar)}
                    className={` sticky hidden md:flex top-[80vh] z-10  w-full items-center justify-start  text-sky-900  rounded-[7px] lg:rounded-[14px] text-base font-medium px-5 py-2.5 text-center hover:bg-sky-700 hover:text-white `}
                  >
                    <i className='flex mr-2 fi fi-ss-eye'></i>Hide sidebar
                  </motion.button>
                )}
              </motion.div>
            )}

            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
              style={{ overflow: 'hidden' }}
              className='relative w-full '
            >
              {datas.map((item, i) => (
                <div
                  id={`module-${i}`}
                  className='relative flex flex-col gap-y-8'
                >
                  {item.data.map((module, moduleIndex) => (
                    <GridModedule
                      module={module}
                      moduleIndex={moduleIndex}
                      toggleExpand={toggleExpand}
                      expandedModules={expandedModules}
                      lang={lang}
                      sidebar={sidebar}
                      id={`module-${item.header}-${moduleIndex}`}
                      openExpand={openExpand}
                      closeExpand={closeExpand}
                    />
                  ))}
                </div>
              ))}

              <WelcomeContribute />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hosting;
