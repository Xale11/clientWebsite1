import React, { useState, useEffect } from 'react'
import "./gallery.css"
import { Link, useParams } from 'react-router-dom'
import {HiOutlineMail, HiMenu} from "react-icons/hi"
import {ref, uploadBytes, listAll, getDownloadURL, getMetadata, updateMetadata, deleteObject} from "firebase/storage"
import { storage } from './firebaseConfig/firebase'


const Gallery = ({isDropdown, setIsDropdown, home, portfolio, about, contact, setToAbout, setToPortfolio, setToContact, setToHome, toAbout, toContact, toHome, toPortfolio}) => {

    const {id} = useParams()

    const [imageList, setImageList] = useState([])

    const showImages = async () => {
        try{
            const imagesRef = ref(storage, `${id}Photos/`)
            let data = await listAll(imagesRef)
            // console.log(data)
            let list = []
            data.items.forEach(async (item, i) => {
                let url = await getDownloadURL(item)
                // console.log(5,getMetadata(item))
                let time = await (await getMetadata(item)).customMetadata?.dateAdded
                let path = item._location?.path
                // console.log(path)
                time = new Date(time)
                let img = {url, time, path}
                list.push(img)
                list.sort((b, a) => a.time - b.time)
                setImageList([...list])

            })
        } catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
        showImages()
    }, [])

    console.log(2, imageList)

  return (
    <div className='galleryPage'>
        {isDropdown && <div className='ddMenu'>
            <div className="ddTitle">Menu</div>
            <Link to="/" className="ddLink" onClick={() => {setToHome(true); setIsDropdown(false)}}>Home</Link>
            <Link to="/" className="ddLink" onClick={() => {setToPortfolio(true); setIsDropdown(false)}}>Portfolio</Link>
            <Link to="/" className="ddLink" onClick={() => {setToAbout(true); setIsDropdown(false)}}>About</Link>
            <Link to="/" className="ddLink" onClick={() => {setToContact(true); setIsDropdown(false)}}>Contact</Link>
            <div className="ddClose" onClick={() => {setIsDropdown(false)}}>Close Menu</div>
      </div>}
      <div className="header galleryHeader" ref={home}>
        <Link to="/" className="logo">Daniel Pindura</Link>
        <div className="pageLinks">
          <Link to="/" className="pageLink" onClick={() => {setToHome(true)}}>Home</Link>
          <Link to="/" className="pageLink" onClick={() => {setToPortfolio(true)}}>Portfolio</Link>
          <Link to="/" className="pageLink" onClick={() => {setToAbout(true)}}>About</Link>
          <Link to="/" className="pageLink" onClick={() => {setToContact(true)}}>Contact</Link>
        </div>
        <Link to="/" className="contactMeHeaderBtn" onClick={() => {setToContact(true)}}>Contact Me</Link>
        <div className="linkDropdown" onClick={() => {setIsDropdown(true)}}><HiMenu/></div>
      </div>
      <div className="galleryTitle">{id.charAt(0).toUpperCase() + id.slice(1)} Photos</div>
      <div className="container">
        {imageList.map((image) => {
            return (<div className="columnImg img">
                    <img src={image.url} alt=""/>
                </div>)
        })}
      </div>
    </div>
  )
}

export default Gallery