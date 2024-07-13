import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useTime, AnimatePresence } from 'framer-motion';
import data from './Navbardata.json';

const updateMonth = 6;
const updateDay = 9;
const updateTime = [
  `${updateDay} ${new Date(2000, updateMonth - 1, 1).toLocaleString('en-US', { month: 'long' })}`,
  `${updateMonth} 月 ${updateDay} 日`,
];

const navbarItem = data.navbarItem;
const navLocation = data.Location;
const Workbench = data.workbench;

function Navbar({ topTextColor, BG, ExpandElement, onHeightChange }) {
  const [currentVersion, setCurrentVersion] = useState(
    localStorage.getItem('Current version') || null,
  );
  const [lang, setLang] = useState(parseInt(localStorage.getItem('lang')) || 0);
  const [bgwhite, setBgwhite] = useState(false);
  const isTopTextColorWhite = topTextColor;
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isTop, setIsTop] = useState(true);
  const [isShowVersion, setIsShowVersion] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpened, setIsOpened] = useState(false);
  const currentPage = window.location.pathname;
  const isHomeOrRoot = currentPage === '/' || currentPage === '/home';
  const [selectedTab, setSelectedTab] = useState(null);
  const [ShowProfile, setShowProfile] = useState(false);
  const hideExpandElement = ExpandElement || false;
  const buttonStyles = {
    '--scrim-background-color': 'rgb(66, 66, 66)',
    '--scrim-hover-background-color': '#37373a',
    '--scrim-active-background-color': '#2f2f32',
    '--icon-color': '#f7f7f7',
    '--icon-interaction-color': 'rgb(255, 255, 255)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    height: '36px',
    width: '36px',
    outline: 'none',
    position: 'absolute',
    zIndex: 1,
    right: '20px',
    bottom: '20px',
    margin: 0,
    padding: 0,
    border: 0,
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 100ms linear, color 100ms linear',
    backgroundColor: 'var(--scrim-background-color)',
    color: 'var(--icon-color)',
  };
  const iconStyles = {
    fill: 'currentColor',
    pointerEvents: 'none',
  };

  const BTN = (functionName) => {
    const functions = {
      lang0: () => {
        setLang('0');
        localStorage.setItem('lang', '0');
        window.location.reload();
      },
      lang1: () => {
        setLang('1');
        localStorage.setItem('lang', '1');
        window.location.reload();
      },
      LangToggle: () => {
        const newLang = lang === 0 ? 1 : 0;
        setLang(newLang);
        localStorage.setItem('lang', newLang);
        window.location.reload();
      },
    };

    return () => {
      if (typeof functions[functionName] === 'function') {
        functions[functionName]();
      } else {
        // console.warn(`Function '${functionName}' not found.`);
        null;
      }
    };
  };

  useEffect(() => {
    function handleScroll1() {
      if (window.scrollY < 0.0001) {
        setIsExpanded(true);
        setIsTop(true);
        setIsScrolling(false);
      } else {
        setIsExpanded(false);
        setIsTop(false);
        setSelectedTab(null);
      }
    }

    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    let scrollTimer;
    function handleScrollStatus(event) {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        if (event.deltaY > 50) {
          setIsScrolling(true);
        } else if (event.deltaY < 0) {
          setIsScrolling(false);
        }
      }, []);
    }

    window.addEventListener('scroll', handleScroll1);
    window.addEventListener('wheel', handleScrollStatus);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll1);
      window.removeEventListener('wheel', handleScrollStatus);
      window.removeEventListener('resize', handleResize);
    };
  }, [isExpanded, selectedTab]);

  const navbar = (
    <AnimatePresence>
      <motion.div
        className={`z-50  duration-700 fixed  ${
          isScrolling ? '  -top-[100px]' : '  '
        }  `}
      >
        <motion.nav
          onMouseEnter={() => setBgwhite(true)}
          onMouseLeave={() => setBgwhite(false)}
          // layout
          className={` fixed w-full flex flex-col`}
        >
          <motion.div
            onMouseLeave={() => setSelectedTab(null)}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            layout='size'
            className={`flex flex-col w-full  ${BG} py-[10px] 
        ${
          windowWidth < 768
            ? ` p-[15px] ${isOpened && `backdrop-blur-[20px] ${isTopTextColorWhite ? 'bg-black/50' : 'bg-white/50'} `}`
            : `${isTop && isHomeOrRoot ? 'px-[5%] pt-[12vh] ' : 'pt-3'} 
              }  lg::px-10`
        }
        ${
          isScrolling
            ? `${isTop && ' backdrop-blur-[20px]'}`
            : `${
                !isTop &&
                `backdrop-blur-[20px]  border-b  ${
                  bgwhite ? 'bg-white/90' : 'bg-white/80'
                }`
              }`
        }`}
          >
            <motion.div className='flex items-center justify-center w-full '>
              <motion.div
                layout='false'
                className={`flex items-center justify-center flex-col  relative w-full `}
              >
                {/* 最主要的内容 */}
                <motion.div
                  layout='position'
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className='flex items-center justify-between w-full max-w-[1200px] px-[3%]'
                >
                  <motion.button
                    whileHover={{ scale: 1.03, transition: { duration: 1 } }}
                    whileTap={{ scale: 0.99 }}
                    layout
                    data-popover-target={`version`}
                    className='z-50 flex'
                  >
                    <a
                      href='/info'
                      style={{ animationDelay: `${0.5}s` }}
                      classname=' animate__animated animate__fadeInRight animate_slow'
                    >
                      <div className='flex item-center'>
                        <div className='relative flex items-center justify-center'>
                          <motion.img
                            layout
                            className={` animate__animated animate__zoomIn  ${
                              isTop ? 'w-24 rounded-full' : 'w-14  rounded-lg'
                            }   shadow-lg`}
                            src={
                              'https://3o.hk/images/2024/01/14/avatar.th.jpg'
                            }
                            alt="Xianzhe's Page"
                            width='100'
                            height='100'
                          ></motion.img>
                        </div>
                      </div>
                    </a>
                  </motion.button>

                  <motion.div
                    layout
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex items-center  ${
                      windowWidth < 876 ? 'w-[50%]' : 'w-[90%]'
                    } gap-3 justify-end `}
                  >
                    <AnimatePresence className='flex'>
                      {windowWidth > 876 && (
                        <motion.div
                          layout
                          transition={{
                            duration: 0.9,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          key='navbarItem'
                          // transition={{ duration: 0.3 }}
                          exit={{
                            opacity: 0,
                            scale: 0,
                            x: -100,
                            transition: { duration: 1 },
                          }}
                          className={`${
                            isTop ? 'gap-x-4' : 'gap-x-1'
                          } flex overflow-x-clip px-[10px] `}
                        >
                          {navbarItem.map((item, index) => (
                            <motion.button
                              layout
                              initial={{ opacity: 0, y: 30 }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                  duration: 0.7,
                                  delay: 0.15 * index,
                                },
                              }}
                              exit={{ opacity: 0, y: 30 }}
                              key={item.name}
                              whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.7 },
                              }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ duration: 0.3 }}
                              onClick={BTN(item.button)}
                              onMouseEnter={() => setSelectedTab(item.name[0])}
                            >
                              <a
                                href={item.href}
                                key={index}
                                style={{
                                  animationDelay: `${index * 0.2}s`,
                                }}
                                data-popover-target={`nav-des-${item.name[0]}`}
                                type='button'
                                className={`rounded-[5px]  items-center  px-6 py-3 text-[20px] gap-x-[10px] font-medium text-center ${
                                  isTopTextColorWhite & isTop
                                    ? 'text-white flex flex-col items-center justify-center '
                                    : 'flex'
                                } rounded-full hover:bg-gray-900/20  `}
                              >
                                <div className='flex items-center justify-center w-full '>
                                  <div className='flex flex-shrink-0'>
                                    <i
                                      className={`flex ${
                                        isTopTextColorWhite & isTop
                                          ? 'text-white text-xl'
                                          : 'text-gray-900 text-xl'
                                      }  fi ${item.icon} `}
                                    ></i>
                                  </div>
                                </div>
                                <div
                                  className={`${
                                    isTopTextColorWhite & isTop
                                      ? 'text-white text-[13px]'
                                      : 'text-gray-900 text-[15px]'
                                  } hidden lg:flex transition-all`}
                                >
                                  {item.name[lang]}
                                </div>
                              </a>
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* 下拉菜单按钮 */}
                    {windowWidth < 1024 && (
                      <motion.button
                        layout
                        style={{
                          animationDelay: `${navbarItem.length * 0.2}s`,
                        }}
                        type='button'
                        className={`mx-[10px] `}
                        onClick={(e) =>
                          e.preventDefault() &
                          setIsOpened(!isOpened) &
                          (isTop && setIsExpanded(!isExpanded))
                        }
                      >
                        <motion.svg
                          width='18'
                          height='18'
                          viewBox='0 0 18 18'
                          transition={{ duration: 0.5 }}
                          style={{
                            color:
                              isTopTextColorWhite & isTop
                                ? 'fill-white text-bold '
                                : 'fill-gray-700 ',
                          }}
                          className='text-3xl'
                        >
                          <motion.polyline
                            fill={
                              isTopTextColorWhite & isTop ? 'white' : 'gray'
                            }
                            stroke={
                              -isTopTextColorWhite & isTop
                                ? 'white'
                                : 'currentColor'
                            }
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            points='2 12, 16 12'
                            animate={{
                              points: !isOpened
                                ? '2 12, 16 12; 2 9, 16 9; 3.5 15, 15 3.5'
                                : '3.5 15, 15 3.5; 2 9, 16 9; 2 12, 16 12',
                            }}
                            transition={{ duration: 0.5 }}
                          />
                          <motion.polyline
                            fill={
                              isTopTextColorWhite & isTop ? 'white' : 'gray'
                            }
                            stroke={
                              isTopTextColorWhite & isTop
                                ? 'white'
                                : 'currentColor'
                            }
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            points='2 5, 16 5'
                            animate={{
                              points: !isOpened
                                ? '2 5, 16 5; 2 9, 16 9; 3.5 3.5, 15 15'
                                : '3.5 3.5, 15 15; 2 9, 16 9; 2 5, 16 5',
                            }}
                            transition={{ duration: 0.5 }}
                          />
                        </motion.svg>
                      </motion.button>
                    )}
                  </motion.div>
                </motion.div>

                {/* menu button */}
                {windowWidth <= 786 && isOpened && (
                  <div className={`w-full mx-[10px] `}>
                    <div className='z-20 w-full rounded-lg shadow '></div>
                    <div className={`rounded-2xl pt-[30px] `}>
                      {navbarItem.map((item, index) => (
                        <AnimatePresence>
                          <motion.div
                            layout
                            key={item.link}
                            exit={{
                              opacity: 0,
                              scale: 0,
                              transition: { duration: 0.7 },
                            }}
                            whileHover={{
                              scale: 1.02,
                              transition: { duration: 0.3 },
                            }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                          >
                            <a
                              style={{ animationDelay: `${index * 0.2}s` }}
                              key={index}
                              href={item.href}
                              className={`flex py-5 animate__animated animate__zoomIn  place-items-center items-center px-4 ${
                                isTop
                                  ? 'hover:bg-gray-900/50 rounded-l-full'
                                  : 'hover:bg-gray-300/50 rounded-l-full '
                              }`}
                            >
                              <div className='flex-shrink-0'>
                                <div className='flex items-center justify-center w-12 h-12 rounded-full'>
                                  <i
                                    className={`flex ${
                                      isTopTextColorWhite & isTop
                                        ? 'text-white'
                                        : 'text-gray-900'
                                    } text-4xl fi ${item.icon}`}
                                  ></i>
                                </div>
                              </div>
                              <div className='w-full ps-1'>
                                <div
                                  className={`${
                                    isTopTextColorWhite & isTop
                                      ? 'text-white'
                                      : 'text-gray-900'
                                  } font-bold text-xl`}
                                >
                                  {item.name && item.name[lang]}
                                </div>
                                <div
                                  className={`${
                                    isTopTextColorWhite & isTop
                                      ? 'text-white'
                                      : 'text-gray-900'
                                  } text-xs text-blue-500 `}
                                >
                                  {item.des[lang]}
                                </div>
                              </div>
                            </a>
                          </motion.div>
                        </AnimatePresence>
                      ))}
                    </div>
                  </div>
                )}

                {/* 二级菜单 */}
                {navbarItem.map(
                  (navItem, navIndex) =>
                    navItem.scondMenu &&
                    selectedTab === navItem.name[0] && (
                      <motion.div
                        key={'isExpanded' + navIndex}
                        layoutId='isExp'
                        className={`w-full flex my-[20px] px-[3%] ${
                          !isExpanded && selectedTab !== navItem.name[1]
                            ? ' items-center justify-center'
                            : 'items-center justify-center'
                        }`}
                      >
                        <motion.div
                          className={`w-full justify-between flex items-center max-w-[1200px]  ${
                            isExpanded ? 'my-8' : ''
                          }
                           ${
                             isTop
                               ? `${
                                   isTopTextColorWhite
                                     ? 'bg-white/70'
                                     : ' text-sky-950 bg-sky-200/30 border border-sky-950'
                                 }  backdrop-blur-md  mt-[50px] rounded-[28px]`
                               : 'border divide-x bg-sky-200/30 mt-[50px] divide-gray-50/0 rounded-full border-gray-700'
                           }`}
                        >
                          {navItem.scondMenu.map((item, index) => (
                            <motion.a
                              layout
                              key={index}
                              href={item.link}
                              animate={{ width: '100%' }}
                              whileHover={{ width: '120%' }}
                              whileTap={{ width: '100%' }}
                              style={{
                                animationDelay: `${index * 0.15}s`,
                                animationDuration: `${0.7}s`,
                              }}
                              className={`flex w-full ${!isTop && `rounded-full`} justify-center welcomeanimation ${index === 0 && (isTop ? `rounded-l-[28px]` : `rounded-full`)} ${
                                index === navItem.scondMenu.length - 1 &&
                                (isTop ? `rounded-r-[28px]` : `rounded-full`)
                              } opacity-80 hover:opacity-100 font-medium hover:bg-sky-900 hover:shadow-4xl hover:text-white focus:z-10 `}
                            >
                              <motion.button
                                layout
                                style={{ borderRadius: 20 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                whileFocus={{ scale: 1 }}
                                onClick={BTN(item.button)}
                                className='w-full'
                              >
                                <div className='flex flex-col items-center justify-center px-2 py-[20px] my-3 text-center gap-y-2 '>
                                  {(isTop || item.detail) && (
                                    <i
                                      className={`flex fi justify-center text-[14px] md:text-xl lg:text-2xl ${item.icon}`}
                                    ></i>
                                  )}

                                  {item.name && (
                                    <div
                                      className={`gap-x-4 gap-y-2 flex justify-center items-center w-full  ${
                                        isTop &&
                                        'text-[17px] md:text-[20px] lg:text-[23px] gap-x-0'
                                      }`}
                                    >
                                      {!isTop && window.innerWidth > 784 && (
                                        <i
                                          className={`flex fi justify-center  text-2xl  ${item.icon}`}
                                        ></i>
                                      )}

                                      <p className='flex items-center justify-center text-base'>
                                        {item.name[lang]}
                                      </p>

                                      {item.status && (
                                        <i
                                          className={`flex  ${
                                            isTop && ' mx-2'
                                          } justify-start text-sm ${item.status}`}
                                        ></i>
                                      )}
                                    </div>
                                  )}

                                  {item.detail && (
                                    <p className='flex items-center justify-center w-full text-base'>
                                      {item.detail[lang]}
                                    </p>
                                  )}
                                </div>
                              </motion.button>
                            </motion.a>
                          ))}
                        </motion.div>
                      </motion.div>
                    ),
                )}
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div layout children='container flex '>
            {navbarItem.map(
              (item, index) =>
                selectedTab == item.name[0] && (
                  <motion.div
                    key={item.name[0] + index + 'introduction'}
                    className='md:mx-[10%] mt-[30px] flex relative gap-x-[20px]  duration-200 '
                  >
                    <img
                      className=' max-w-[320px] absolute top-0 left-0 transition-all'
                      src={data.dialog}
                    ></img>
                    <div className='absolute top-0 left-[320px] animate__animated animate__fadeInUp  bg-sky-900 transition-all inline-flex  rounded-r-[35px] rounded-tl-[35px] max-w-[420px] overflow-hidden  '>
                      <div className='p-[28px] flex rounded-e-[28px] rounded-es-[28px] flex-col w-full  leading-1.5    dark:bg-gray-700/20'>
                        <p className='text-[25px] font-normal dark:text-gray-900 text-white  '>
                          {item.des[lang]}
                        </p>
                        <span className='text-center text-[30px] dark:text-gray-900 text-white '>
                          {item.expression}{' '}
                        </span>
                        <div className='group relative my-2.5 hidden'>
                          <div className='absolute flex items-center justify-center w-full transition-opacity duration-300 rounded-lg opacity-0 bg-gray-900/50 group-hover:opacity-100'>
                            <button
                              data-tooltip-target='download-image'
                              className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50'
                            >
                              <svg
                                className='w-5 h-5 text-white'
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 16 18'
                              >
                                <path
                                  stroke='currentColor'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3'
                                />
                              </svg>
                            </button>
                          </div>
                          <img
                            src='/docs/images/blog/image-1.jpg'
                            className='rounded-lg'
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ),
            )}
          </motion.div>
        </motion.nav>
      </motion.div>

      {/* toTop buttom */}
      {!isTop && (
        <motion.button
          key='toTop'
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3, type: 'easeInOut' },
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.7 }}
          whileTap={{ scale: 0.9, opacity: 1 }}
          whileHover={{ scale: 1.1, opacity: 1 }}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
          className={` anz-card-modal-link fixed bottom-4 right-4  z-50  `}
        >
          <div className='text-white rounded-full card-modal-trigger modal-trigger card-cta-modal-button lg:scale-150'>
            <div className='modal-trigger-visblecontainer '>
              <motion.span
                initial={{ rotate: 90 }}
                whileTap={{ scale: 0.9, opacity: 0.8, rotate: 270 }}
                className='bg-white shadow-xl opacity-70 card-cta-modal-button-icon hover:opacity-100 drop-shadow-md '
                style={buttonStyles}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='8 8 20 20'
                  style={iconStyles}
                  className='card-cta-modal-button-small-icon card-modal-button-small-icon w-[18px] h-[18px] text-white rotate-180'
                >
                  <path d='M23.5587,16.916 C24.1447,17.4999987 24.1467,18.446 23.5647,19.034 L16.6077,26.056 C16.3147,26.352 15.9287,26.4999987 15.5427,26.4999987 C15.1607,26.4999987 14.7787,26.355 14.4867,26.065 C13.8977,25.482 13.8947,24.533 14.4777,23.944 L20.3818,17.984 L14.4408,12.062 C13.8548,11.478 13.8528,10.5279 14.4378,9.941 C15.0218,9.354 15.9738,9.353 16.5588,9.938 L23.5588,16.916 L23.5587,16.916 Z'></path>
                </svg>
              </motion.span>
            </div>
          </div>
        </motion.button>
      )}
      <div className='relative z-50 '>
        <div
          id='toast-root'
          className='fixed flex flex-col top-40 right-20 '
        ></div>
      </div>
      <AnimatePresence>
        {selectedTab != null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed top-0 left-0 z-40 w-full h-full  backdrop-blur-[20px] ${isTopTextColorWhite ? 'bg-gray-900/40' : 'bg-white/40'} `}
          ></motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );

  return navbar;
}

export default Navbar;
