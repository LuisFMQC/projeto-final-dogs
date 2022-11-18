import React from 'react';
import Feed from './Feed/Feed.js';
import Head from './Helper/Head.js';
import Loading from './Helper/Loading.js';

const Home = () => {
  return (
    <section className="container mainContainer">
      <Head
        title="Fotos"
        description="Home do site Dogs, com o feed de fotos."
      />
      <Feed />
    </section>
  );
};

export default Home;
