import React from 'react';

export default function TestPlaceHolder() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url()`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left bottom',
          backgroundSize: '200px ',
        }}
        className='mt-[10vh] relative  h-[50vh] md:h-[50vh] lg:h-[30vh]  text-sky-900 overflow-hidden md:m-4  lg:m-8  rounded-[14px] lg:rounded-[28px]  bg-sky-50'
      >
        <div className='flex flex-col-reverse justify-between w-full lg:flex-row'>
          <div className='flex '>
            <img
              src='https://cdn.pixabay.com/photo/2016/02/07/14/45/smartphone-1184883_1280.png'
              alt=''
              className='absolute bottom-0 block w-[200px] h-auto'
            />
          </div>

          <div className='flex flex-col p-2 md:p-4 lg:p-8 lg:w-[80%]'>
            <div className='z-40 w-full px-2 my-4 text-3xl font-black text-left md:text-5xl lg:text-6xl'>
              Tool Libaray
            </div>
            <p className='flex  text-sm md:text-base lg:text-xl backdrop-blur-3xl  p-2 bg-sky-50/50 rounded-[14px]'>
              This page is under maintenance, function and data may not be
              available.
            </p>
            <p className='flex  text-sm md:text-base lg:text-xl backdrop-blur-3xl  p-2 bg-sky-50/50 rounded-[14px]'>
              This page is designed to be a tool library, where you can find the
              most useful tools for your daily work. Wecome to contribute your
              tools to this library.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
