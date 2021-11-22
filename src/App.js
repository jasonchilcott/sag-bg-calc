import React from "react";
import Header from './Header.js';
import Main from './Main.js';
import './App.css';
import SideBar from './SideBar';
import Footer from './Footer.js';


function App() {
  return (
    <div className="App">
      <Header />
      <div className="content-wrapper">
        <Main />

      </div>

      <SideBar />
      <Footer />
    
    
      
    </div>
  );
}

export default App;
