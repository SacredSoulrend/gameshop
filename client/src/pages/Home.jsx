import React from 'react';
import Games from '../components/Games';
import GenreMenu from '../components/GenreMenu';
import Cart from '../components/Cart';
import Wishlist from '../components/Wishlist';

const Home = () => {
  return (
    <div className="container">
      <div className="main-content">
        <GenreMenu />
        <Games />
      </div>
      <div className="sidebar">
        <Cart />
        <Wishlist /> 
      </div>
    </div>
  );
};

export default Home;
