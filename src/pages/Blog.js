import React, { useState } from 'react';
import Styles from './blog.module.css'
import axios from 'axios';
import sampleBlog from '../sampleBlog';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Audio } from 'react-loader-spinner'
import { doc , setDoc } from "firebase/firestore";
import { db } from './firebase'
import { useNavigate } from 'react-router-dom';


function Blog() {

  const navi = useNavigate();

  const [title, setTitle] = useState('');
  const [prompts, setPrompts] = useState([]);
  const [promptSel, setPromptSel] = useState(false);
  const [generatedBlog, setGeneratedBlog] = useState('');
  const [blog, setBlog] = useState('');
  const [generateBlogDiv,setGeneratedBlogDiv] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [submit,setSubmit] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loader,setLoader] = useState(false)
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [formatDate, setFormatDate] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePromptSelect = (prompt) => {
    setSelectedPrompt(prompt);
    setInputValue(prompt);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const generatePrompts = () => {
    setPrompts([
      `Write about the history of ${title}.`,
      `Discuss the importance of ${title} in today's society.`,
      `Share your personal experiences with ${title}.`,
    ]);
    setPromptSel(true);
  };

  const generateImages = async() => {
    const theme = title;
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos/?query=${theme}&per_page=4&client_id=j2vgPNrcDBpszBtI2ff5ximJjqxDKCw7qNGhtJO9U8w`);
      const data = response.data.results;
      console.log(data)
      setImageUrls(data);
      setSubmit(true)
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }

  const generateBlog = async () => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false);
      setGeneratedBlogDiv(true);
      generateImages();
    }, 2500);
  };

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
  
  const SavePost = () => {
    const currentDateTime = getCurrentDateTime();
    console.log(currentDateTime);
    let date = Date.now()
    console.log(date)
    setDoc(doc(db, "Address", `${'blogs_' + date.toString()}` ), {
      createdAt: currentDateTime,
      title: title,
      selectedDate: formatDate,
      desc: "Desc",
      status: true
    })  
    .then((res) => {
      console.log(res,"Success");
      navi( "/home" )
    })
    .catch((err) => {
      console.log("err",err)
    })
  }

  return (
    <>
      <header className={Styles.tit}>Blog Generation</header>
      <div className={Styles.container}>
        <div className={Styles.inpdiv}>
          <div className={Styles.inp}>
            <input
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <button onClick={generatePrompts} className={Styles.button} disabled={!title}>
            Generate Prompts
          </button>
        </div>
        {
          promptSel && (
          <div>
            <div>
              {prompts.map((item, index) => (
                <p
                  key={index}
                  onClick={() => handlePromptSelect(item)}
                  className={
                    selectedPrompt === item ? Styles.selectedPrompt : ''
                  }
                >
                  {item}
                </p>
              ))}
            </div>
            <div className={Styles.promptTit}>
              <div>Your Prompt </div>
            </div>
            <div className={Styles.selPrompt}>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter your response"
              />
            </div>
            <div className={Styles.genBlog}>
              <button
                className={Styles.button}
                disabled={!inputValue}
                onClick={generateBlog}
              >
                Generate Blog
              </button>
            </div>
          </div>
        )}
        <Audio height="80" width="80" radius="9" color="black" ariaLabel="three-dots-loading" wrapperStyle wrapperClass visible={loader}/>
        {
          generateBlogDiv && (
            <>
              <div className={Styles.generatedBlog}>
                <div className={Styles.promptTit}>Generated Blog</div>
                <h1>{sampleBlog.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: sampleBlog.content }}></div>
              </div>
              <div className={Styles.ImgDiv}>
                <div className={Styles.ImgTit}>Generated Images</div>
                <div className={Styles.images}>
                  {imageUrls.map((image, index) => (
                    <img
                      key={index}
                      src={image.urls.small}
                      alt={`Image ${index + 1}`}
                      className={selectedImages.includes(image) ? Styles.selectedImage : ''}
                      onClick={() => handleImageClick(image)}
                    />
                  ))}
                </div>
              </div>
            </>
          )
        }
      </div>
      {
        submit && (
          <>
            <div className={Styles.date}>
              <div className={Styles.dateTit}>Pickdate To Post:</div>
              <DatePicker selected={selectedDate} onChange={date => {
                const date_ = new Date(date);
                const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
                const formattedDate = date.toLocaleDateString('en-US', options)
                  .replace(/ /g, '_')
                  .toLowerCase();
                console.log(formattedDate);
                setFormatDate(formattedDate); 
                setSelectedDate(date);
                console.log(formatDate);
                }
              } minDate={new Date()} className={Styles.datepic}/>
            </div>
            <div className={Styles.post}><button onClick={SavePost}>Post Blog</button></div>
          </>
        )
      }
    </>
  );
}

export default Blog;


