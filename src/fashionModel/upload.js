import React, { useEffect, useState, useRef } from 'react'
import { storage, db } from './firebaseConfig/firebase'
import {ref, uploadBytes, listAll, getDownloadURL, getMetadata, updateMetadata, deleteObject} from "firebase/storage"
import {collection, updateDoc, doc} from "firebase/firestore"
import {v4} from "uuid"
import "./upload.css"

const Upload = () => {

    const [imageUpload, setImageUpload] = useState(null)
    const [profList, setProfList] = useState([])
    const [instaList, setInstaList] = useState([])
    const [show, setShow] = useState(false)
    const [timeRef, setTimeRef] = useState()
    const [isProf, setIsProf] = useState(false)
    const [isInsta, setIsInsta] = useState(false)
    const [flText, setFlText] = useState()
    const [slText, setSlText] = useState()
    const [descText, setDescText] = useState()

    const imageRef = ref(storage, `professionalPhotos/${imageUpload?.name + v4()}`)
    const heroFl = doc(db, "text", "headerFl")
    const heroSl = doc(db, "text", "headerSl")
    const description = doc(db, "text", "description")

    const updateFl = async () => {
        try{
            if(!flText || flText == ""){
                alert("Please enter text before submitting! - First Line!")
                return
            }
            await updateDoc(heroFl, {
                text: flText
            })
            setFlText("")
        }catch (err){
            console.error(err)
        }
    }

    const updateSl = async () => {
        try{
            if(!slText || slText == ""){
                alert("Please enter text before submitting! - Second Line!")
                return
            }
            await updateDoc(heroSl, {
                text: slText
            })
            setSlText("")
        }catch (err){
            console.error(err)
        }
    }

    const updateDesc = async () => {
        try{
            if(!descText || descText == ""){
                alert("Please enter text before submitting! - Description!")
                return
            }
            await updateDoc(description, {
                text: descText
            })
            setDescText("")
        }catch (err){
            console.error(err)
        }
    }

    const uploadImage = async () => {
        try{
            if (imageUpload == null) {
                alert("No image was uploaded. Try Again!")
                return
            };
            if (!isProf && !isInsta){
                alert("Pick a gallery to upload to. Professional or Instagram!")
                return
            }
            for(let i = 0; i < imageUpload.length; i++){
                let name = `${isProf ? "professionalPhotos" : "instagramPhotos"}/${imageUpload[i]?.name + v4()}`
                await uploadBytes(ref(storage, name), imageUpload[i])
                const metadata = {
                    customMetadata: {
                      'dateAdded': `${new Date().toString()}`,
                    }
                  };
                const fileRef = ref(storage, name)
                await updateMetadata(fileRef, metadata)
            }
            if(isProf){
                showProfImages()
            }
            else{
                showInstaImages()
            }
            alert("The images was uploaded!")
        } catch(err){
            console.error(err)
        }    
    }

    const showProfImages = async () => {
        try{
            const imagesRef = ref(storage, `professionalPhotos/`)
            let data = await listAll(imagesRef)
            console.log(data)
            let list = []
            data.items.forEach(async (item, i) => {
                let url = await getDownloadURL(item)
                console.log(5,getMetadata(item))
                let time = await (await getMetadata(item)).customMetadata?.dateAdded
                let path = item._location?.path
                console.log(path)
                time = new Date(time)
                let img = {url, time, path}
                list.push(img)
                list.sort((b, a) => a.time - b.time)
                setProfList([...list])

            })
        } catch(err){
            console.error(err)
        }
    }

    const showInstaImages = async () => {
        try{
            const imagesRef = ref(storage, `instagramPhotos/`)
            let data = await listAll(imagesRef)
            console.log(data)
            let list = []
            data.items.forEach(async (item, i) => {
                let url = await getDownloadURL(item)
                console.log(5,getMetadata(item))
                let time = await (await getMetadata(item)).customMetadata?.dateAdded
                let path = item._location?.path
                console.log(path)
                time = new Date(time)
                let img = {url, time, path}
                list.push(img)
                list.sort((b, a) => a.time - b.time)
                setInstaList([...list])

            })
        } catch(err){
            console.error(err)
        }
    }

    const updateDate = async (path) => {
        try{
            if(timeRef == undefined || timeRef == "Invalid Date"){
                alert("There was an error, please make sure you have added a time before pressing update date. Try again.")
                return
            }
            const metadata = {
                customMetadata: {
                  'dateAdded': `${timeRef}`,
                }
              };
            const fileRef = ref(storage, path)
            await updateMetadata(fileRef, metadata)
            console.log(timeRef)
            alert("Date has been updated")
        } catch (err){
            alert("There was an error, please make sure you have added a time before pressing update date. Try again.")
            console.error(err)
        }
    }

    const deleteImage = async (path) => {
        try{
            await deleteObject(ref(storage, `${path}`))
            showProfImages()
            showInstaImages()
        }catch (err){
            console.error(err)
        }
        
    }

    useEffect(() => {
        showProfImages()
        showInstaImages()
    }, [])

    console.log(new Date(), descText, slText, flText)

  return (
    <div className='upload'>
        <div className="uploadTitle">Website Manager</div>
        <div className="editText">
            <div className="textTitle">
                Edit Text
            </div>
            <div className="introFl textEdit">
                <label>Home Page intro - first line:</label>
                <textarea placeholder="I'm Daniel Pindura" value={flText} name="1" id="1" cols="30" rows="10" onChange={(e) => setFlText(e.target.value)}></textarea>
                <div className='textSubmit' onClick={updateFl}>Submit</div>
            </div>
            <div className="introSl textEdit">
                <label>Home Page intro - first line:</label>
                <textarea placeholder="Welcome to my modelling portfolio" value={flText} name="2" id="2" cols="30" rows="10" onChange={(e) => setSlText(e.target.value)}></textarea>
                <div className='textSubmit' onClick={updateSl}>Submit</div>
            </div>
            <div className="aboutSec textEdit">
                <label>About me description:</label>
                <textarea placeholder="Welcome to my modelling portfolio. I'm a 20 year old model with a love for streetwear and fashion. I have modelled for various small brands and I am currently building presence in the fashion and modelling industry. If you haven't already take a look at my portfolio and get in contact with me. I sure with my passion and love for this industry we can collaborate to achieve your vision." value={flText} name="3" id="3" cols="30" rows="10" onChange={(e) => setDescText(e.target.value)}></textarea>
                <div className='textSubmit' onClick={updateDesc}>Submit</div>
            </div>
        </div>
        <div className="photoManager">
            <div className="photoManagerTitle">Photos</div>
            <input type="file" multiple onChange={(e) => {setImageUpload(e.target.files)}}/>
            <div className='pickFolder'>Pick which photo gallery!</div>
            <div className='checkbox'>
                <div className={`folderOption ${isProf ? 'picked' : ""}`} onClick={() => {setIsProf(true); setIsInsta(false)}}>Professional</div>
                <div className={`folderOption ${isInsta ? 'picked' : ""}`} onClick={() => {setIsProf(false); setIsInsta(true)}}>Instagram</div>
            </div>
            <button onClick={uploadImage}>Upload Image</button>
            <div className="display">
                <div className="profImgs">
                    <div>Professional</div>
                    {profList.map((image) => {
                        return (<div className='imgFile'>
                                <img src={image.url} onClick={() => setShow(true)}/>
                                <div>{image.time.toString()}</div>
                                {show && <div>
                                        <input type="datetime-local" step={1} name="" id="" onChange={(e) => setTimeRef(new Date(e.target.value))}/>
                                        <button onClick={() => {updateDate(image.path); setShow(false)}}>Update Date</button>
                                        <div className='close' onClick={() => setShow(false)}>Close</div>
                                        <button onClick={() => deleteImage(image.path)}>Delete Image</button>
                                    </div>}
                            </div>)
                    })}
                </div>
                <div className="instaImgs">
                    <div>Instagram</div>
                    {instaList.map((image) => {
                        return (<div className='imgFile'>
                                <img src={image.url} onClick={() => setShow(true)}/>
                                <div>{image.time.toString()}</div>
                                {show && <div>
                                        <input type="datetime-local" step={1} name="" id="" onChange={(e) => setTimeRef(new Date(e.target.value))}/>
                                        <button onClick={() => {updateDate(image.path); setShow(false)}}>Update Date</button>
                                        <div className='close' onClick={() => setShow(false)}>Close</div>
                                        <button onClick={() => deleteImage(image.path)}>Delete Image</button>
                                    </div>}
                            </div>)
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Upload