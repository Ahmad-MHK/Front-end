import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar/NavBar.jsx';
import Graph from './Graphs/Graph.jsx';
import FearAndGread from './Graphs/FearAndGread.jsx';
import CoinMonitoring from './Graphs/CoinMonitoring.jsx';
import ExchangeVolume from './Graphs/ExchangeVolume.jsx';
import ExchangeVolumeUsd from './Graphs/ExchangeVolumeUsd.jsx';
import CoinSupply from './Graphs/CoinSupply.jsx';
import Footer from './Footer/Footer.jsx';
import TopAssetsList from './RankCrypto/TopAssetsList.jsx';
import AssetDetails from './RankCrypto/AssetDetails.jsx'; // Import AssetDetails component

const App = () => {
  return (
    <Router>
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
        <Switch>
          <Route exact path="/" component={TopAssetsList} />
          <Route path="/assets/:id" component={AssetDetails} />
        </Switch>
        <Footer></Footer>
      </div>
    </Router>
  );
};

export default App;
