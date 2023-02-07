import React from 'react';

import { downloadImage } from '../utils';
import { useCheckWindowSize } from '../hooks';

const Card = ({_id, name, prompt, photo, onClickHandler}) => {
  const value = useCheckWindowSize();

  const clickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (value > 639) {
      onClickHandler(photo);
    }
  };

  const handleClickPrompt = (e) => {
    // e.preventDefault();
    // e.stopPropagation();
  };

  // const likeImage = (id) => {
  //   console.log(id);
  // }

  return (
    <>
      <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card"
           onClick={(e) => clickHandler(e)}>
        <img
          className="w-full h-auto object-cover rounded-xl"
          src={photo}
          alt={prompt}
        />
        <div
          className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md"
          onClick={handleClickPrompt}>
          <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

          <div className="mt-5 flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">{name[0]}</div>
              <p className="text-white text-sm">{name}</p>
            </div>

            <div className="flex items-center gap-2">
              {/*<div className="flex items-center gap-2">*/}
              {/*  <button type="button" onClick={() => likeImage(_id)}*/}
              {/*          className="outline-none bg-transparent border-none">*/}
              {/*    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"*/}
              {/*         className="w-6 h-6 text-white">*/}
              {/*      <path fill="currentColor"*/}
              {/*            d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"/>*/}
              {/*    </svg>*/}
              {/*  </button>*/}
              {/*</div>*/}


              <button type="button" onClick={() => downloadImage(_id, photo)}
                      className="outline-none bg-transparent border-none">
                <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor"
                        d="M344 240h-56L287.1 152c0-13.25-10.75-24-24-24h-16C234.7 128 223.1 138.8 223.1 152L224 240h-56c-9.531 0-18.16 5.656-22 14.38C142.2 263.1 143.9 273.3 150.4 280.3l88.75 96C243.7 381.2 250.1 384 256.8 384c7.781-.3125 13.25-2.875 17.75-7.844l87.25-96c6.406-7.031 8.031-17.19 4.188-25.88S353.5 240 344 240zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

    </>

  );
};

export default Card;