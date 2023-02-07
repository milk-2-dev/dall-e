import React, { useCallback, useEffect, useState } from 'react';
import { Card, FormField, Loader } from '../components';
import API from '../api/api';
import Modal from '../utils/Modal.jsx';

const RenderCards = ({data, title}) => {
  const [ videoModalOpen, setVideoModalOpen ] = useState(false);
  const [ imageUrl, setImageUrl ] = useState('');

  const handleShowModal = (image) => {
    setVideoModalOpen(true);
    setImageUrl(image);
  };

  const handlelCloseModal = () => {
    setVideoModalOpen(false);
  };

  if (data?.length > 0) {
    return (
      <>
        {data.map((post) => <Card key={post._id} {...post} onClickHandler={handleShowModal}/>)}
        {/* Modal */}
        <Modal id="preview" ariaLabel="modal-headline" show={videoModalOpen} handleClose={handlelCloseModal}>
          <img
            className="w-full h-auto object-contain p-10"
            src={imageUrl}
          />
        </Modal>
      </>
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

function FeaturesBlocks() {
  const [ loading, setLoading ] = useState(false);
  const [ allPosts, setAllPosts ] = useState(null);

  const [ searchText, setSearchText ] = useState('');
  const [ searchTimeout, setSearchTimeout ] = useState(null);
  const [ searchedResults, setSearchedResults ] = useState(null);


  const fetchPosts = async () => {

    setLoading(true);

    await API.getPosts()
      .then(({data}) => {
        if (data.success) {
          setAllPosts(data.data.reverse());
        }
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  return (
    <section className="relative">

      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div className="absolute inset-0 bg-gray-100 pointer-events-none " aria-hidden="true"></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20 relative">
            <h2 className="h2 mb-4">See what people have posted</h2>

            {searchText && (
              <h2
                className="font-medium text-[#666e75] text-xl absolute left-1/2 bottom-2.5 m-auto transform -translate-x-1/2">
                Showing results for: <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
          </div>

          <div className="flex justify-end">
            <input type="text"
                   className="border-b border-black bg-transparent py-2 px-2 outline-none  min-w-full md:min-w-250"
                   name="text"
                   placeholder="Search something..."
                   value={searchText}
                   onChange={handleSearchChange}/>
          </div>

          <div className="mt-10 min-h-[calc(100vh-73px)]">
            {loading ? (
              <div className="flex justify-center items-center">
                <Loader/>
              </div>
            ) : (
              <>

                <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                  {searchText ? (
                    <RenderCards
                      data={searchedResults}
                      title="No Search Results Found"
                    />
                  ) : (
                    <RenderCards
                      data={allPosts}
                      title="No Posts Yet"
                    />
                  )}
                </div>
              </>
            )}
          </div>


        </div>
      </div>
    </section>
  );
}

export default FeaturesBlocks;
