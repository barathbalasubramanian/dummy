import React, { useRef, useState } from 'react'
import Styles from './socio.module.css';
import { Audio } from 'react-loader-spinner'
import axios from 'axios';
import { doc , setDoc } from "firebase/firestore";
import { db } from '../firebase'
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

function Captions({title,desc}) {

    const navi = useNavigate();
    console.log(desc,"....")
    const [hash,sethash] = useState(false);
    const [loader,setLoader] = useState(false);
    const [loaderhash_,setLoaderhash_] = useState(false);
    const [genimage,setgenimage] = useState(false);
    const [image,setImage] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [savePost,setSavePost] = useState(false);
    const captionRef = useRef(null);
    const hashRef = useRef(null);

    const [values,Setvalues] = useState({});


    function getCurrentDateTime() {
        const currentDate = new Date();
      
        // Get date components
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(currentDate.getDate()).padStart(2, '0');
      
        // Get time components
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
      
        // Construct the date and time string in the desired format
        const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      
        return dateTimeString;
    }


    const _fetchcap = async() => {
        setLoader(true)
        const {
            GoogleGenerativeAI,
            HarmCategory,
            HarmBlockThreshold,
          } = require("@google/generative-ai");
          
        const MODEL_NAME = "gemini-1.0-pro";
        const API_KEY = "AIzaSyB-gYeps1h7YUPOSCNIDtB0Z4zBGDLzhoA";

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
        };
                
        const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        ];
                
        const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
            {
            role: "user",
            parts: [{ text: "Generate one caption for social media post \"AI\""}],
            },
            {
            role: "model",
            parts: [{ text: "*Unleashing the Power of Artificial Intelligence: Automation, Innovation, and Efficiency at Your Fingertips.*"}],
            },
        ],
        });
    
        const result = await chat.sendMessage(title);
        const response = result.response;
        console.log(response.text());
        displaySentence(response.text())
        setLoader(false)

        Setvalues(prevState => ({
            ...prevState,
            'caption': response.text(),
        }));
    }
    
    const _fetchhash = async() => {

        setLoaderhash_(true)
        const {
            GoogleGenerativeAI,
            HarmCategory,
            HarmBlockThreshold,
          } = require("@google/generative-ai");
          
        const MODEL_NAME = "gemini-1.0-pro";
        const API_KEY = "AIzaSyB-gYeps1h7YUPOSCNIDtB0Z4zBGDLzhoA";
        
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
        const generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        };
        
        const safetySettings = [
            {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];
        
        const chat = model.startChat({
            generationConfig,
            safetySettings,
            history: [
            {
                role: "user",
                parts: [{ text: "Generate hashtags for the given title \"AI\""}],
            },
            {
                role: "model",
                parts: [{ text: "#ArtificialIntelligence #AI #MachineLearning #DeepLearning #DataScience #DataAnalytics #CognitiveComputing #Robotics #NaturalLanguageProcessing #ComputerVision #AI4Good #FutureOfAI #Innovation #Technology #DigitalTransformation #MachineLearningAlgorithms #DeepLearningArchitectures #ReinforcementLearning #AIResearch #AIDevelopment #AIApplications"}],
            },
            ],
        });
        
        const result = await chat.sendMessage(title);
        const response = result.response;
        console.log(response.text());
        displaySentence_(response.text())
        setLoaderhash_(false)

        Setvalues(prevState => ({
            ...prevState,
            'hash': response.text(),
        }));
    }

    const genCaptions = () => {
        _fetchcap();
    }

    const genhash = () => {
        _fetchhash()
    }

    function displaySentence(res) {
        // const capElement = document.querySelector(`.${Styles.cap}`);
        const capElement = captionRef.current;
        if (!capElement) {
            console.error("Caption element not found");
            return;
        }
        capElement.innerHTML = "";
        let index = 0;
        function displayNextCharacter() {
            // console.log("Index:", index);
            if (index < res.length) {
                // console.log("Adding character:", res[index]);
                capElement.innerHTML += res[index];
                index++;
                setTimeout(displayNextCharacter, 1);
            } else {
                console.log("Display complete");
                sethash(true);
            }
        }
        displayNextCharacter();
    }
    
    
    function displaySentence_(res) {
        // document.querySelector(`.${Styles.hash}`).innerHTML = ""
        const hashElement = hashRef.current;
        if (!hashElement) {
            console.error("Hash element not found");
            return;
        }
        hashElement.innerHTML = "";
        let index = 0;
        function displayNextCharacter() {
            if (index < res.length) {
                hashElement.innerHTML += res[index];
                index++;
                setTimeout(displayNextCharacter, 1);
            } else {
                res = '';
                setgenimage(true)
            }
        }
        displayNextCharacter();
    }

    const handleImageClick = (imageUrl) => {
        setSelectedImages(prevSelectedImages => {
          if (prevSelectedImages.includes(imageUrl)) {
            return prevSelectedImages.filter(image => image !== imageUrl);
          } else {
            return [...prevSelectedImages, imageUrl];
          }
        });
        console.log(selectedImages)
    };

    const genImage = async() => {
            try {
              const response = await axios.get(`https://api.unsplash.com/search/photos/?query=${title}&per_page=4&client_id=j2vgPNrcDBpszBtI2ff5ximJjqxDKCw7qNGhtJO9U8w`);
              const data = response.data.results;
              console.log(data)
              setImage(data);
              setSavePost(true)
            } catch (error) {
              console.error('Error fetching images:', error);
            }
    }

    const Savepost = async() => {
        const currentDateTime = getCurrentDateTime();
        console.log(currentDateTime);
        let date = Date.now()
        console.log(values)
        setDoc(doc(db, "Address", `${'socio_' + date.toString()}` ), {
          createdAt: currentDateTime,
          title: title,
          tags: values['hash'],
          desc: desc,
          caption: values['caption'],
          media: 'facebook'
        })  
        .then((res) => {
            toast.success("Post Saved Successfully !");
            navi('/home')
            console.log(res,"Success");
        })
        .catch((err) => {
          console.log("err",err)
        })
    }

    return (
        <>
            <Toaster toastOptions={{ duration: 4000 }} />
            <div className={Styles.sepCon}>  
                <button onClick={genCaptions}>Generate Captions</button>
                {
                    loader ? <Audio height="80" width="80" radius="9" color="black" ariaLabel="three-dots-loading" wrapperStyle wrapperClass visible={loader}/>
                    : null
                }
                {/* <div className={Styles.cap}></div> */}
                <div ref={captionRef} className={Styles.cap}></div>
            </div> 
            {
                hash && (
                    <div className={Styles.sepCon}>
                        <button onClick={genhash}>Generate Hashtags</button>
                        {
                            loaderhash_ ? <Audio height="80" width="80" radius="9" color="black" ariaLabel="three-dots-loading" wrapperStyle wrapperClass visible={loaderhash_}/>
                            : null
                        }
                        {/* <div className={Styles.hash}></div> */}
                        <div ref={hashRef} className={Styles.hash}></div>
                    </div>
                )
            }

            {
                genimage && (
                    <>
                        <div><button onClick={genImage}>Generate Image</button></div>
                        <div className={Styles.images}>
                            {image.map((image, index) => (
                                <img
                                key={index}
                                src={image.urls.small}
                                alt={`${index}`}
                                className={selectedImages.includes(image) ? Styles.selectedImage : ''}
                                onClick={() => handleImageClick(image)}
                                />
                            ))}
                        </div>
                    </>
                )
            }
            {
                savePost && (
                    <>
                        <div><button onClick={Savepost}>Save Post</button></div>
                    </>
                )
            }
        </>
    )
}

export default Captions;
