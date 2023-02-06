import React, { useState, useRef, useEffect } from 'react';
import Transition from '../utils/Transition';

import FeaturesBg from '../images/features-bg.png';
import FeaturesElement from '../images/features-element.png';
import { FormField, Loader } from '../components/index.js';
import { preview } from '../assets/index.js';
import { useNavigate } from 'react-router-dom';
import { getRandomPrompt } from '../utils/index.js';
import API from '../api/api.js';
import Modal from '../utils/Modal.jsx';

function Features() {
  const navigate = useNavigate();

  const [ form, setForm ] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [ generatingImg, setGeneratingImg ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ hasImage, setHasImage ] = useState(false);
  const [ hasNick, setIHasNick ] = useState(false);
  const [ shareModalOpen, setShareModalOpen ] = useState(false);



  const handleChange = (e) => {
    if(e.target.value !== ''){
      setIHasNick(true)
    } else {
      setIHasNick(false)
    }

    setForm({...form, [e.target.name]: e.target.value})
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({...form, prompt: randomPrompt});
  };

  const generateImage = async () => {
    if (form.prompt) {
      setGeneratingImg(true);
      await API.getImage(form.prompt).then(({data}) => {
        setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`});
        setHasImage(true);
      })
        .catch((err) => alert(err))
        .finally(() => setGeneratingImg(false));
    } else {
      alert('Please provide proper prompt');
    }
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShareModalOpen(true);
  };

  const handleShareSubmit = async (e) => {
    // e.preventDefault();
    // e.stopPropagation();

    if (form.prompt && form.photo) {
      setLoading(true);
      await API.postImage({...form})
        .then(() => {
          setShareModalOpen(false);
          alert('Success');
          navigate('/');
        }).catch((err) => {
          alert(err);
        }).finally(() => {
          setLoading(false);
        });
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return (
    <section className="relative">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">

          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">

            {/* Content */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6">
              <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                <h3 className="h3 mb-3">Generation form</h3>
                <p className="text-xl text-gray-600">Write your image prompt and click button "Generate". Or you can try
                  some random prompt if you click button "Suprise me"</p>
              </div>
              {/* Tabs buttons */}
              <div className="mb-8 md:mb-0">
                <form className="mt-16 max-w-3xl mx-auto">
                  <div className="flex flex-col gap-5">
                    <FormField
                      labelName="Prompt"
                      type="text"
                      name="prompt"
                      placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
                      value={form.prompt}
                      handleChange={handleChange}
                      isSurpriseMe
                      handleSurpriseMe={handleSurpriseMe}
                    />
                  </div>

                  <div className="mt-5 flex gap-5">
                    <button
                      type="button"
                      onClick={generateImage}
                      className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                      {generatingImg ? 'Generating...' : 'Generate'}
                    </button>

                    <button
                      type="button"
                      disabled={!hasImage}
                      onClick={handleOpenModal}
                      className="text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-[#ccc]"
                    >
                      Share with the community
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Tabs items */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1">
              <div
                className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-84 p-3 h-84 flex justify-center items-center">
                {form.photo ? (
                  <img
                    src={form.photo}
                    alt={form.prompt}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-9/12 h-9/12 object-contain opacity-40"
                  />
                )}

                {generatingImg && (
                  <div
                    className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                    <Loader/>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal id="share" ariaLabel="modal-headline" show={shareModalOpen} handleClose={() => setShareModalOpen(false)}>
        <div className="flex flex-col gap-5 relative max-w-2xl mx-auto px-4 sm:px-6 pt-12 md:pt-20">
          <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
            <h3 className="h3 mb-3">Share form</h3>
            <p className="text-xl text-gray-600">Please, input your name or nick.</p>
          </div>
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          />

          <div className="mt-5 flex gap-5">
            <button
              type="button"
              onClick={handleShareSubmit}
              disabled={!hasNick}
              className="text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-[#ccc]"
            >
              {loading ? 'Sharing...' : 'Share with the Community'}
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}

export default Features;
