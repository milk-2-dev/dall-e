import React, { useEffect } from 'react';

import Header from '../partials/Header';
import HeroHome from '../partials/HeroHome';
import FeaturesHome from '../partials/Features';
import FeaturesBlocks from '../partials/FeaturesBlocks';
import Testimonials from '../partials/Testimonials';
import Newsletter from '../partials/Newsletter';
import Footer from '../partials/Footer';
import Banner from '../partials/Banner';
import { useLocation } from 'react-router-dom';

function Home() {

  const location = useLocation();

  useEffect(() => {
    // AOS.init({
    //   once: true,
    //   disable: 'phone',
    //   duration: 700,
    //   easing: 'ease-out-cubic',
    // });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <HeroHome />
        <FeaturesBlocks />
      </main>

      {/*<Banner />*/}

      {/*  Site footer */}
      {/*<Footer />*/}

    </div>
  );
}

export default Home;