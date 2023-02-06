import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../partials/Header';
import HeroHome from '../partials/HeroHome';
import FeaturesBlocks from '../partials/FeaturesBlocks';


function Home() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      <main className="flex-grow">
        <HeroHome />
        <FeaturesBlocks />
      </main>
    </div>
  );
}

export default Home;