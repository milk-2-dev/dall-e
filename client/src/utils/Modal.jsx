import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Transition from '../utils/Transition';

function Modal({
                 children,
                 id,
                 ariaLabel,
                 show,
                 handleClose
               }) {

  const modalContent = useRef(null);

  // close the modal on click outside
  useEffect(() => {
    const clickHandler = ({target}) => {
      if (!show || modalContent.current.contains(target)) return;
      handleClose();
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close the modal if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({keyCode}) => {
      if (keyCode !== 27) return;
      handleClose();
    };
    document.addEventListener('keydown', keyHandler);

    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 z-50 bg-white bg-opacity-75 transition-opacity backdrop-blur-sm"
        show={show}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />

      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center transform px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabel}
        show={show}
        enter="transition ease-out duration-200"
        enterStart="opacity-0 scale-95"
        enterEnd="opacity-100 scale-100"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100 scale-100"
        leaveEnd="opacity-0 scale-95"
      >
        <div className="flex bg-white max-w-6xl w-ful h-full relative" ref={modalContent}>
          <button className="absolute top-2 right-2 p-2" onClick={() => handleClose()}>
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 320 512">
              <path
                d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/>
            </svg>
          </button>

          {children}
        </div>
      </Transition>
    </>
  );
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired
  ]),
  id: PropTypes.string,
  ariaLabel: PropTypes.string,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};
