import React, {useRef, useState, useEffect} from 'react'
import "./fm1.css"
import modelImg from "./img/model.png"
import collageImg from "./img/photoCollage.png"
import headshotImg from "./img/headshot.png"
import { Link } from 'react-router-dom'
import {collection, doc, getDoc} from "firebase/firestore"
import { db } from './firebaseConfig/firebase'
import {BsFacebook, BsInstagram, BsTiktok, BsChevronDown} from "react-icons/bs"
import {HiOutlineMail, HiMenu} from "react-icons/hi"


const Fm1 = ({isDropdown, setIsDropdown, home, portfolio, about, contact, setToAbout, setToPortfolio, setToContact, setToHome, toAbout, toContact, toHome, toPortfolio}) => {

  const [userEmail, setUserEmail] = useState("shackz3pin@gmail.com")
  const [introHeader, setIntroHeader] = useState("")
  const [introSubheader, setIntroSubheader] = useState("")
  const [aboutDesc, setAboutDesc] = useState("")

  const scrollToHome = () => {
    home.current.scrollIntoView()
  }

  const scrollToPortfolio = () => {
    portfolio.current.scrollIntoView()
  }

  const scrollToContact = () => {
    contact.current.scrollIntoView()
  }

  const scrollToAbout = () => {
    about.current.scrollIntoView()
  }

  const scrollTo = () => {
    if(toHome) {
      setToHome(false)
      home.current.scrollIntoView()
      return
    }

    if(toPortfolio) {
      setToPortfolio(false)
      portfolio.current.scrollIntoView()
      return
    }

    if(toAbout) {
      setToAbout(false)
      about.current.scrollIntoView()
      return
    }

    if(toContact) {
      setToContact(false)
      contact.current.scrollIntoView()
      return
    }
  }

  const getPageText = async () => {
    try{
      let docRef = doc(db, "text", "headerFl")
      let data = await getDoc(docRef)
      if (data.exists()){
        setIntroHeader(data.data().text)
      }else{
        return
      }
      docRef = doc(db, "text", "headerSl")
      data = await getDoc(docRef)
      if (data.exists()){
        setIntroSubheader(data.data().text)
      }else{
        return
      }
      docRef = doc(db, "text", "description")
      data = await getDoc(docRef)
      if (data.exists()){
        setAboutDesc(data.data().text)
      }else{
        return
      }
    }catch (err){
      console.error(err)
    }
  }

  useEffect(() => {
    scrollTo()
    getPageText()
  }, [])


  return (
    <div className="frame">
      {isDropdown && <div className='ddMenu'>
            <div className="ddTitle">Menu</div>
            <div className="ddLink" onClick={() => {scrollToHome(); setIsDropdown(false)}}>Home</div>
            <div className="ddLink" onClick={() => {scrollToPortfolio(); setIsDropdown(false)}}>Portfolio</div>
            <div className="ddLink" onClick={() => {scrollToAbout(); setIsDropdown(false)}}>About</div>
            <div className="ddLink" onClick={() => {scrollToContact(); setIsDropdown(false)}}>Contact</div>
            <div className="ddClose" onClick={() => {setIsDropdown(false)}}>Close Menu</div>
      </div>}
      <div className="header" ref={home}>
        <Link to="/" className="logo">Daniel Pindura</Link>
        <div className="pageLinks">
          <div className="pageLink" onClick={scrollToHome}>Home</div>
          <div className="pageLink" onClick={scrollToPortfolio}>Portfolio</div>
          <div className="pageLink" onClick={scrollToAbout}>About</div>
          <div className="pageLink" onClick={scrollToContact}>Contact</div>
        </div>
        <div className="contactMeHeaderBtn" onClick={scrollToContact}>Contact Me</div>
        <div className="linkDropdown" onClick={() => {setIsDropdown(true)}}><HiMenu/></div>
      </div>
      <div className="body">
        <img className="modelImg"src={modelImg} alt="" />
        <div className="bodyContent">
          <div className="bodyIntro">
            <p className='introHeader'>{introHeader}</p>
            <p className='introSubheader'>{introSubheader}</p>
          </div>
          <div className="bodyBtns">
            <div className="bodyBtn darkGray2" onClick={scrollToPortfolio}>View Portfolio</div>
            <div className="bodyBtn" onClick={scrollToContact}>Contact Me</div>
          </div>
          <div className="socialMedias">
            <div className="socialIcons darkGray2" onClick={() => {window.open("http://google.com", "_blank")}}>
                <BsFacebook/>
            </div>
            <div className="socialIcons darkGray2" onClick={() => {window.open("http://google.com", "_blank")}}>
                <BsTiktok/>
            </div>
            <div className="socialIcons" onClick={scrollToContact}>
                <HiOutlineMail/>
            </div>
            <div className="socialIcons" onClick={() => {window.open("http://google.com", "_blank")}}>
                <BsInstagram/>
            </div>
          </div>
        </div>
        <div className="viewMore">
            <BsChevronDown/>
        </div>
      </div>
      <div className="portfolio">
        <div className="gallery" ref={portfolio}>
          
          <div className="professional">
            <Link to="/gallery/professional" className="portfolioButtons profPhotos">View Professional Photos</Link>
          </div>
          <div className="instagram">
          <Link to="/gallery/instagram" className="portfolioButtons instaPhotos">View Instagram Photos</Link>
          </div>
        </div>
      </div>
      <div className="about" ref={about}>
        <img className='aboutImg' src={headshotImg} alt="" />
        <div className="aboutText">
          <div className="aboutTitle">About Me</div>
          <div className="aboutDesc">{aboutDesc}</div>
          <div className="aboutBtns">
            <div className="aboutBtn darkGray2" onClick={scrollToPortfolio}>View Portfolio</div>
            <div className="aboutBtn" onClick={scrollToContact}>Contact Me</div>
          </div>
        </div>
      </div>
      <div className="contact" ref={contact}>
        <div className="contactTitle">Contact Me</div>
        <form className='contactForm' action={`https://formsubmit.co/${userEmail}`} method="POST">
          <div className='contactDets'>
            <div className='contactName'>
              <label for="fname">Name:</label>
              <input type="text" id="fname" name="fname" placeholder="Enter your name..." required/>
            </div>
            <div className='contactEmail'>
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" placeholder="Enter your email..." required/>  
            </div>
            <div className='contactSubject'>
              <label for="Subject">Subject:</label>
              <input type="Subject" id="Subject" name="_subject" placeholder="Enter email subject..." required/>  
            </div>
          </div>
          <div className='contactMessage'>
            <label for="message">Message:</label>
            <textarea type="text" id="message" name="message" placeholder="Send a message..." required/>  
            <button>Send</button>
          </div>
        </form>
        <div className="myEmail">{userEmail}</div>
      </div>
      <div className="credit">
        <div>Designed and Developed by: Alex Diyan</div>
        <div>Email: alexdiyan@outlook.com</div>
      </div>
    </div>
  );
};

export default Fm1