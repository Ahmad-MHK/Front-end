import React from 'react';
import './App.css'
import NavBar from './NavBar/NavBar.jsx';
import Graph from './Graphs/Graph.jsx';
import FearAndGread from './Graphs/FearAndGread.jsx';
import CoinMonitoring from './Graphs/CoinMonitoring.jsx';
import ExchangeVolume from './Graphs/ExchangeVolume.jsx';
import ExchangeVolumeUsd from './Graphs/ExchangeVolumeUsd.jsx';
import CoinSupply from './Graphs/CoinSupply.jsx';
import Footer from './Footer/Footer.jsx';
import TopAssetsList from './RankCrypto/TopAssetsList.jsx'; 

const App = () => {
  return (
    <div>
      <NavBar></NavBar>
        <div className="row">
          <Graph></Graph>
          <FearAndGread></FearAndGread>
          <CoinMonitoring></CoinMonitoring>
        </div>
        <div className="row">
          <ExchangeVolume></ExchangeVolume>
          <ExchangeVolumeUsd></ExchangeVolumeUsd>
          <CoinSupply></CoinSupply>
        </div> 
        <TopAssetsList></TopAssetsList>
      <Footer></Footer>
    </div>
  );
};
export default App;


