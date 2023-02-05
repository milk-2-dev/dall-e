import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './css/style.css';

import { Home, CreatePost } from './pages';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/create-post' element={<CreatePost/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
