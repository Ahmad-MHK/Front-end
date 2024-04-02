import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './NavBar/NavBar.jsx';
import Graph from './Graphs/Graph.jsx';
import FearAndGread from './Graphs/FearAndGread.jsx';

const App = () => {
    return (
      <div>
        <NavBar></NavBar>
        <div className="row">
          <Graph></Graph>
          <FearAndGread></FearAndGread>
        </div>
      </div>
    );
};
export default App;
