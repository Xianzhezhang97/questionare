import React from 'react';

function Card() {
  return (
    <div className='mb-6 transition bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-green snap-center'>
      <a href='#'>
        <div id='gallery' className='relative w-full' data-carousel='static'>
          {/* <!-- Carousel wrapper --> */}
          <div className='relative overflow-hidden rounded-[28px] shadow square-image'>
            {/* <!-- Item 1 --> */}
            <div className='hidden duration-700 ease-in-out' data-carousel-item>
              <img
                className='object-cover w-full h-full rounded-t-lg'
                src='https://picsum.photos/200/300?1'
                alt='Article'
              ></img>
            </div>
            {/* <!-- Item 2 --> */}
            <div
              className='hidden duration-700 ease-in-out'
              data-carousel-item='active'
            >
              <img
                className='object-cover w-full rounded-t-lg h-36'
                src='https://picsum.photos/200/300?2'
                alt='Article'
              ></img>
            </div>
            {/* <!-- Item 3 --> */}
            <div className='hidden duration-700 ease-in-out' data-carousel-item>
              <img
                className='object-cover w-full rounded-t-lg h-36'
                src='https://picsum.photos/200/300?3'
                alt='Article'
              ></img>
            </div>
            {/* <!-- Item 4 --> */}
            <div className='hidden duration-700 ease-in-out' data-carousel-item>
              <img
                className='object-cover w-full rounded-t-lg h-36'
                src='https://picsum.photos/200/300?4'
                alt='Article'
              ></img>
            </div>
            {/* <!-- Item 5 --> */}
            <div className='hidden duration-700 ease-in-out' data-carousel-item>
              <img
                className='object-cover w-full rounded-t-lg h-36'
                src='https://picsum.photos/200/300?5'
                alt='Article'
              ></img>
            </div>
          </div>
          {/* <!-- Slider controls --> */}
          <button
            type='button'
            className='absolute top-0 left-0 z-30 flex items-center justify-center h-full px-2 cursor-pointer group focus:outline-none'
            data-carousel-prev
          >
            <span className='inline-flex items-center justify-center rounded-full w-7 h-7 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
              <svg
                className='w-2 h-2 text-white dark:text-gray-800'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 6 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5 1 1 5l4 4'
                />
              </svg>
              <span className='sr-only'>Previous</span>
            </span>
          </button>
          <button
            type='button'
            className='absolute top-0 right-0 z-30 flex items-center justify-center h-full px-2 cursor-pointer group focus:outline-none'
            data-carousel-next
          >
            <span className='inline-flex items-center justify-center rounded-full w-7 h-7 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
              <svg
                className='w-2 h-2 text-white dark:text-gray-800'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 6 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 9 4-4-4-4'
                />
              </svg>
              <span className='sr-only'>Next</span>
            </span>
          </button>
        </div>
        <div className='px-4 pt-3'>
          <div href='#' className='flex items-center justify-between'>
            <p className='flex items-center font-semibold text-gray-700 text-m dark:text-gray-400'>
              Moss Vale
            </p>

            <div className='flex items-center justify-betwee'>
              <i className='px-1 fi fi-ss-stars'></i>
              <div className='text-sm text-gray-700 dark:text-gray-400 '>
                4.95
              </div>
            </div>
          </div>
          <p className='flex justify-start pt-1 text-gray-500 text-m hover:underline dark:text-gray-400 hover:text-red'>
            Learn more
          </p>
        </div>
      </a>
    </div>
  );
}

export default Card;
