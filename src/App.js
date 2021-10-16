import React from "react";
import Header from './Header.js';
import MainForm from './MainForm.js';
import Mark from './Mark.js';
import Summary from './Summary.js'
import SideBar from './SideBar';
import Footer from './Footer.js';


function App() {
  return (
    <div className="App">
      <Header />
      <div className="content-wrapper">
        <MainForm />
        <Mark />
        <Summary />
      </div>

      <SideBar />
      <Footer />
    
    
      
    </div>
  );
}

export default App;
