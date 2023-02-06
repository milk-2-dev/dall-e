import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

import API from '../api/api';
import CreatePostPartial from '../partials/CreatePostPartial';

const CreatePost = () => {
  const navigate = useNavigate();

  const [ form, setForm ] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [ generatingImg, setGeneratingImg ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ isDisabled, setIsDisabled ] = useState(true);

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({...form, prompt: randomPrompt});
  };

  const generateImage = async () => {
    if (form.prompt) {
      setGeneratingImg(true);
      await API.getImage(form.prompt).then(({data}) => {
        setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`});
        setIsDisabled(false);
      })
        .catch((err) => alert(err))
        .finally(() => setGeneratingImg(false));
    } else {
      alert('Please provide proper prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      await API.postImage({...form})
        .then(() => {
          alert('Success');
          setIsDisabled(true);
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
    <div className="flex flex-col min-h-screen overflow-hidden">
      <header
        className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top && 'bg-white backdrop-blur-sm shadow-lg'}`}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Site branding */}
            <div className="flex-shrink-0 mr-4">
              {/* Logo */}
              <Link to="/" className="flex items-center" aria-label="WI">
                <svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 320 512"
                className="w-2.5 mr-5">
                  <path
                    d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"/>
                </svg>
                <span className="font-bold">Back</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <CreatePostPartial/>
      </main>
    </div>
  );
};

export default CreatePost;