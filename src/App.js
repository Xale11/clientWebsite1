import React, {useRef, useState} from 'react'
import './App.css';
import Fm1 from './fashionModel/fm1';
import Gallery from './fashionModel/gallery';
import Upload from './fashionModel/upload';
import {Routes, Route} from "react-router-dom"
import {Helmet} from "react-helmet";


function App() {

  const home = useRef(null)
  const portfolio = useRef(null)
  const about = useRef(null)
  const contact = useRef(null)

  const [toHome, setToHome] = useState(false)
  const [toPortfolio, setToPortfolio] = useState(false)
  const [toAbout, setToAbout] = useState(false)
  const [toContact, setToContact] = useState(false)
  const [isDropdown, setIsDropdown] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className="App">
      <Helmet>
                <meta charSet="utf-8" />
                <title>Daniel Pindura</title>
                <meta name="description" content="Portfolio website for a model" />
      </Helmet>
      <Routes>
        <Route path='/' element={<Fm1 isDropdown={isDropdown} setIsDropdown={setIsDropdown} home={home} portfolio={portfolio} about={about} contact={contact} setToHome={setToHome} setToPortfolio={setToPortfolio} setToAbout={setToAbout} setToContact={setToContact} toHome={toHome} toPortfolio={toPortfolio} toAbout={toAbout} toContact={toContact}/>}/>
        <Route path="/upload" element={<Upload/>}/>
        <Route path="/gallery/:id" element={<Gallery isDropdown={isDropdown} setIsDropdown={setIsDropdown} home={home} portfolio={portfolio} about={about} contact={contact} setToHome={setToHome} setToPortfolio={setToPortfolio} setToAbout={setToAbout} setToContact={setToContact} toHome={toHome} toPortfolio={toPortfolio} toAbout={toAbout} toContact={toContact}/>}/>
      </Routes>
    </div>
  );
}

export default App;
