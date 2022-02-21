//========================== Import Modules Start ===========================

import React from 'react'
import Navbar from './Components/Navbar';
import Routes from './Router/Routes';
import "./App.css";

//========================== Import Modules End =============================

//============================= App Start =============================


const App = () => {
  return (
    <>
        <Navbar />
        <Routes />
    </>
  )
}

//============================= App End =============================

//============================= Export Default Start =============================

export default App;

//============================= Export Default End =============================